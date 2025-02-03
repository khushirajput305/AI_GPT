require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your .env file has this key
});

// 📝 Summary Controller
exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Summarize this: ${text}` }],
      max_tokens: 500,
      temperature: 0.5,
    });

    res.status(200).json({ summary: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 📝 Paragraph Generator
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Write a detailed paragraph about: ${text}` }],
      max_tokens: 500,
      temperature: 0.5,
    });

    res.status(200).json({ paragraph: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 🤖 Chatbot (Yoda Style)
exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Yoda from Star Wars. Respond in Yoda's style." },
        { role: "user", content: text },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    res.status(200).json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 💻 JavaScript Code Converter
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Convert these instructions into JavaScript code: ${text}` }],
      max_tokens: 400,
      temperature: 0.25,
    });

    res.status(200).json({ jsCode: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 🌌 Sci-Fi Image Generator
exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.images.generate({
      prompt: `A sci-fi scene featuring ${text}`,
      n: 1,
      size: "512x512",
    });

    res.status(200).json({ imageUrl: response.data[0].url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
