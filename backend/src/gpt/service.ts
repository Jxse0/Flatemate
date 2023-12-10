import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "APIKEYHERE", // defaults to process.env["OPENAI_API_KEY"]
});

const service = {
  async get() {
    const stream = openai.beta.chat.completions.stream({
      model: "gpt-4",
      messages: [{ role: "user", content: "What is the meaning of life?" }],
      stream: true,
    });
    const completion = await stream.finalChatCompletion();

    return { message: completion.choices[0].message.content };
  },
};
export default service;
