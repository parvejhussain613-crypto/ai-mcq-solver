import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/solve", async (req, res) => {

    try {

        const { question, options } = req.body;

        if (!question) {
            return res.status(400).json({
                error: "Question is required"
            });
        }

        const prompt = `
You are an AI MCQ Solver.

Solve the following multiple-choice question.

Question:
${question}

Options:
${options || "No options provided"}

Return the response in this format:

Answer: [Correct option]
Explanation: [Short and clear explanation]
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        res.json({
            answer: response.text
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "AI could not solve the question"
        });

    }

});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🤖 AI MCQ Server running on port ${PORT}`);
});
