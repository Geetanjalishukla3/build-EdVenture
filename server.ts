import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // 1. AI Career Match Endpoint
  app.post("/api/ai/career-match", async (req, res) => {
    try {
      const { userInterests, userSkills, educationLevel } = req.body;
      const prompt = `Based on the following user profile, recommend the top 3 most suitable future careers from emerging fields (like AI, Quantum Tech, Climate Tech, Neurotech, BioTech, EdTech):
- Interests: ${userInterests}
- Current Skills: ${userSkills}
- Education Level: ${educationLevel}

Provide the response in JSON format matching this schema:
{
  "matches": [
    {
      "careerTitle": "string",
      "matchPercentage": number,
      "reasoning": "string",
      "keyGapSkills": ["string"]
    }
  ],
  "encouragingAdvice": "string"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matches: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    careerTitle: { type: Type.STRING },
                    matchPercentage: { type: Type.NUMBER },
                    reasoning: { type: Type.STRING },
                    keyGapSkills: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                  },
                  required: ["careerTitle", "matchPercentage", "reasoning", "keyGapSkills"],
                },
              },
              encouragingAdvice: { type: Type.STRING },
            },
            required: ["matches", "encouragingAdvice"],
          },
        },
      });

      const result = JSON.parse(response.text || "{}");
      res.json(result);
    } catch (error: any) {
      console.error("Career match error:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI career match" });
    }
  });

  // 2. AI Custom Roadmap Generator Endpoint
  app.post("/api/ai/roadmap", async (req, res) => {
    try {
      const { targetCareerTitle, currentSkills } = req.body;
      const prompt = `Create a step-by-step personalized learning roadmap for someone wanting to become a "${targetCareerTitle}" given they currently have these skills: "${currentSkills}".
Provide 4 distinct milestone steps. Each milestone must have stepNumber, title, description, estimatedWeeks, and skillsToAcquire.
Return JSON matching schema:
{
  "roadmapTitle": "string",
  "overview": "string",
  "milestones": [
    {
      "stepNumber": number,
      "title": "string",
      "description": "string",
      "estimatedWeeks": number,
      "skillsToAcquire": ["string"]
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              roadmapTitle: { type: Type.STRING },
              overview: { type: Type.STRING },
              milestones: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stepNumber: { type: Type.NUMBER },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    estimatedWeeks: { type: Type.NUMBER },
                    skillsToAcquire: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                  },
                  required: ["stepNumber", "title", "description", "estimatedWeeks", "skillsToAcquire"],
                },
              },
            },
            required: ["roadmapTitle", "overview", "milestones"],
          },
        },
      });

      const result = JSON.parse(response.text || "{}");
      res.json(result);
    } catch (error: any) {
      console.error("Roadmap generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate roadmap" });
    }
  });

  // 3. AI Career Coach Chat Endpoint
  app.post("/api/ai/coach", async (req, res) => {
    try {
      const { messages } = req.body; // array of { sender, text }
      const formattedHistory = messages
        .map((m: any) => `${m.sender === "user" ? "User" : "Coach"}: ${m.text}`)
        .join("\n");

      const prompt = `You are 'Nova', an expert AI Career Coach and Educational Technologist specializing in guiding students and professionals into 21st-century careers (AI, Green Tech, Quantum, Neurotech, EdTech). Be encouraging, highly insightful, practical, and concise.

Conversation history:
${formattedHistory}
Coach:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are Nova, an expert AI Career Coach in EdTech and future careers.",
          temperature: 0.7,
        },
      });

      res.json({ reply: response.text || "I am here to guide your career journey!" });
    } catch (error: any) {
      console.error("Coach error:", error);
      res.status(500).json({ error: error.message || "Failed to get AI coach response" });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EdVenture server running on http://localhost:${PORT}`);
  });
}

startServer();
