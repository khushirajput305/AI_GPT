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

// 📌 JavaScript Code Converter Controller
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Convert user instructions into JavaScript code." },
        { role: "user", content: `Convert these instructions into JavaScript:\n${text}` },
      ],
      max_tokens: 400,
      temperature: 0.25,
    });

    return res.status(200).json({ javascriptCode: response.choices[0]?.message?.content.trim() || "No code generated." });
  } catch (err) {
    console.error("Error in jsconverterController:", err);
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// 📌 Summary Controller
exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize the given text concisely." },
        { role: "user", content: `Summarize this:\n${text}` },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });

    return res.status(200).json({ summary: response.choices[0]?.message?.content.trim() || "No summary generated." });
  } catch (err) {
    console.error("Error in summaryController:", err);
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// 📌 Paragraph Controller
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Write a detailed paragraph based on the given topic." },
        { role: "user", content: `Write a detailed paragraph about:\n${text}` },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });

    return res.status(200).json({ paragraph: response.choices[0]?.message?.content.trim() || "No paragraph generated." });
  } catch (err) {
    console.error("Error in paragraphController:", err);
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

// 📌 Sci-Fi Image Generator Controller
exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Generate a sci-fi image of ${text}`,
      n: 1,
      size: "1024x1024",
    });

    return res.status(200).json({ imageUrl: response.data[0]?.url || "No image generated." });
  } catch (err) {
    console.error("Error in scifiImageController:", err);
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};