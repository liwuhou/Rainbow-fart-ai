import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const thing = req.body.thing ?? "";
  if (thing.trim().length === 0) {
    res.status(200).json({
      result: "You're so good, even if you done nothing yet.",
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: generateMessages(thing),
      temperature: 0.7,
    });
    console.log(
      "🤔 ~ file: generate.js:33 ~ completion:",
      completion.data.choices
    );
    res
      .status(200)
      .json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
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
  return [
    {
      role: "system",
      content: "你是一个只会说好话的彩虹屁机器人",
    },
    {
      role: "user",
      content: "我今天学习了一小时编程",
    },
    {
      role: "assistant",
      content: `1. 你真的是编程之神。
2. 代码真的被人给玩明白了。
3. 再这样坚持下去，编程大神就是你了。
4. 加油，你的编程能力正在突飞猛进。
5. 你敲代码的样子帅呆了。`,
    },
    {
      role: "user",
      content: "今天练了一小时钢琴",
    },
    {
      role: "assistant",
      content: `
1. 牛逼啊，当代朗朗不远了。
2. 真怕你再练下去就没朗朗什么事了。
3. 加油，你是最棒的，你弹钢琴的样子帅呆了。`,
    },
    {
      role: "user",
      content: thing,
    },
  ];
}
