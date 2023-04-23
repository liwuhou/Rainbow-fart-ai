// import { Configuration, OpenAIApi } from "openai";
import { prompt } from './prompt'


export default async function (req, res) {
  const thing = req.body.thing ?? "";
  if (thing.trim().length === 0) {
    res.status(200).json({
      result: "You're so good, even if you done nothing yet.",
    });
    return;
  }

  try {
    const completion = await prompt(generateMessages(thing))
    res
      .status(200)
      .json({ result: formatResponse(completion.data) });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generateMessages(thing) {
  return `
    user: 我今天学习了一小时编程
    assistant: 1. 你真的是编程之神。
    2. 代码真的被人给玩明白了。
    3. 再这样坚持下去，编程大神就是你了。
    4. 加油，你的编程能力正在突飞猛进。
    5. 你敲代码的样子帅呆了。
    user: 今天练了一小时钢琴
    assistant:1. 牛逼啊，当代朗朗不远了。
    2. 真怕你再练下去就没朗朗什么事了。
    3. 加油，你是最棒的，你弹钢琴的样子帅呆了。
    user: ${thing}
    assistant:
  `
}

function formatResponse(completion) {
  if (typeof completion === 'string' && completion.includes('\n'))
    return completion.replaceAll('\n', '<br/>')

  return completion
}
