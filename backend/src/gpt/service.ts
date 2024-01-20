import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

const service = {
  async retrieveMessage(message: string) {
    const stream = openai.beta.chat.completions.stream({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
      stream: true,
    });
    const completion = await stream.finalChatCompletion();

    return { message: completion.choices[0].message.content };
  },
};
export default service;
