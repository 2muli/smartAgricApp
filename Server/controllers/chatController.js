import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;  
//https://console.groq.com/keys =======Api for chat
export const chatController = async (req, res) => {
    try {
        const { message } = req.body;
    
        const response = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: "llama-3.1-8b-instant",   
            messages: [
              { role: "system", content: "You are an agriculture assistant helping farmers." },
              { role: "user", content: message }
            ],
            max_tokens: 200,
          },
          {
            headers: {
              Authorization: `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
    
        res.json({ reply: response.data.choices[0].message.content });
      } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Something went wrong" });
        
    }
};
