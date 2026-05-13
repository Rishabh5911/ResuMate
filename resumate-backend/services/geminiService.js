const { GoogleGenerativeAI } = require("@google/generative-ai");



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const generateResponse = async(prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Gemini API error:", error.message);
    throw error;
  }
}


module.exports = {
  generateResponse
};