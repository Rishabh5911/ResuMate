const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});


const generateResponse = async(prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw error;
  }
}


module.exports = {
  generateResponse
};