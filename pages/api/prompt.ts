// import fetch from './fetch'

const BaixingKey = process.env.BAIXING_API_KEY

interface Response {
  code: number
  message: string
  type: 'text'
  data: string
}

export type Prompt = (prompt: string) => Promise<Response>
export const prompt: Prompt = async (prompt) => {
  const res = await fetch(`https://gpt.baixing.com?p=${prompt}&k=${BaixingKey}`)

  return res.json()
}