import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini SDK to avoid crashing on launch if the key is not defined yet
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined in environment variables.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API endpoint for AI client interaction
app.post("/api/copilot", async (req, res) => {
  try {
    const { prompt, history } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        text: "💡 [Notice: Gemini API Key is missing list. This response is locally generated] Let's analyze. Under our high-tech UI scheme, the DCA (Dollar-Cost Averaging) model leverages smart sentiment rebalancing. By evaluating localized risk profiles (e.g. BTC/ETH volatility spreads), AIP optimizes entry price points. We recommend configuring a Weekly plan with a Conservative risk profile during volatile markets!"
      });
    }

    // Build contents with optional chat history
    let contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: { role: string; content: string }) => {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        });
      });
    }
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: "You are the AIP (AI Investment Platform) custom co-pilot. Your tone is highly professional, clean, encouraging, and rich in tech-crypto knowledge. Suggest intelligent dollar-cost-averaging plans, evaluate portfolio balances, explain proposal rules (AIP-001, etc.), and guide developers on navigating the app. Keep answers highly constructive, concise, and structured in Markdown.",
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Copilot Error:", error);
    res.status(500).json({ error: error.message || "Failed to contact Gemini" });
  }
});

// Vite middleware setup
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}).catch(err => {
  console.error("Vite setup error:", err);
});
