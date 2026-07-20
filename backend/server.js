const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/solve", async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({
            answer: "No question provided.",
            explanation: "Please enter a question."
        });
    }

    // Demo response (AI API baad me connect karenge)
    res.json({
        answer: "Option B",
        explanation: `Received question: "${question}". This is a demo response. A real AI model will provide the correct answer and explanation after the AI API is connected.`
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
