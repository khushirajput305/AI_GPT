const dotenv = require("dotenv");
dotenv.config();
const OpenAI = require("openai");

// Initialize OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in .env
});

// Controller for chatbot responding like Yoda
exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Yoda from Star Wars. Respond like Yoda would." },
        { role: "user", content: text },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    if (response.choices[0]?.message?.content) {
      return res.status(200).json({ response: response.choices[0].message.content.trim() });
    } else {
      throw new Error("Failed to generate chatbot response.");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
