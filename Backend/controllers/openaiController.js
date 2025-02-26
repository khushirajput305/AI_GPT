require("dotenv").config();
const axios = require("axios");

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const CHAT_MODEL = "tiiuae/falcon-7b-instruct"; 

async function queryHuggingFace(model, inputs) {
    console.log("API Key:", HF_API_KEY); // Debugging

    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${model}`,
            { inputs },
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        console.log("API Response:", response.data); // Debugging
        return response.data;
    } catch (error) {
        console.error("Hugging Face API Error:", error.response ? error.response.data : error.message);
        return null;
    }
}

queryHuggingFace(CHAT_MODEL, "Hello, how are you?");


// 📌 Chatbot Controller (Yoda-like responses)
exports.chatbotController = async (req, res) => {
    const { text } = req.body;
    const prompt = `Hello friend:\n${text}`;

    const response = await queryHuggingFace(CHAT_MODEL, prompt);
    return res.status(200).json({ response });
};

// 📌 JavaScript Code Converter Controller
exports.jsconverterController = async (req, res) => {
    const { text } = req.body;
    const prompt = `Convert these instructions into JavaScript code:\n${text}`;

    const response = await queryHuggingFace(CHAT_MODEL, prompt);
    return res.status(200).json({ javascriptCode: response });
};

// 📌 Summary Controller
exports.summaryController = async (req, res) => {
    const { text } = req.body;
    const prompt = `Summarize the following text concisely:\n${text}`;

    const response = await queryHuggingFace(CHAT_MODEL, prompt);
    return res.status(200).json({ summary: response });
};

// 📌 Paragraph Controller
exports.paragraphController = async (req, res) => {
    const { text } = req.body;
    const prompt = `Write a detailed paragraph about:\n${text}`;

    const response = await queryHuggingFace(CHAT_MODEL, prompt);
    return res.status(200).json({ paragraph: response });
};

// 📌 Sci-Fi Image Generator Controller (Using Hugging Face DALL-E Alternative)
exports.scifiImageController = async (req, res) => {
    const { text } = req.body;

    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            { inputs: `Generate a sci-fi image of ${text}` },
            { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
        );

        if (response.data.error) throw new Error(response.data.error);

        return res.status(200).json({ imageUrl: response.data[0]?.url || "No image generated." });
    } catch (err) {
        console.error("Error in scifiImageController:", err);
        return res.status(500).json({ message: err.message || "Internal Server Error" });
    }
};
