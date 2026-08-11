require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { InferenceClient } = require("@huggingface/inference");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 10000;

const hf = new InferenceClient(process.env.HF_TOKEN);


/* =========================================
   HOME
========================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart AI Backend is running 🚀"
  });
});


/* =========================================
   CHAT API — OPENROUTER
========================================= */

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({
        success: false,
        reply: "Please enter a message."
      });
    }

    const text = message.toLowerCase();

    if (
      text.includes("who created you") ||
      text.includes("who made you") ||
      text.includes("who is your owner") ||
      text.includes("tumko kisne banaya") ||
      text.includes("tumhe kisne banaya")
    ) {
      return res.json({
        success: true,
        reply:
          "Smart AI is created by Md Parvez Hussain from India."
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content:
                "You are Smart AI, a helpful assistant created by Md Parvez Hussain from India."
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("OpenRouter Chat Error:", data);

      return res.json({
        success: false,
        reply: "OpenRouter Error."
      });
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "No response.";

    return res.json({
      success: true,
      reply
    });

  } catch (error) {
    console.error("Chat Server Error:", error);

    return res.status(500).json({
      success: false,
      reply: "Server Error."
    });
  }
});


/* =========================================
   IMAGE GENERATION — HUGGING FACE
========================================= */

app.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Please enter an image prompt."
      });
    }

    if (!process.env.HF_TOKEN) {
      return res.status(500).json({
        success: false,
        message: "HF_TOKEN is missing on the server."
      });
    }

    console.log("Image Prompt:", prompt);

    const imageBlob = await hf.textToImage({
      model: "black-forest-labs/FLUX.1-dev",
      inputs: prompt
    });

    const buffer = Buffer.from(
      await imageBlob.arrayBuffer()
    );

    const imageUrl =
      `data:image/png;base64,${buffer.toString("base64")}`;

    console.log("Image generated successfully.");

    return res.json({
      success: true,
      image: imageUrl
    });

  } catch (error) {
    console.error(
      "IMAGE GENERATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Hugging Face image generation failed."
    });
  }
});


/* =========================================
   START SERVER
========================================= */

app.listen(PORT, () => {
  console.log(
    `Smart AI Backend running on port ${PORT}`
  );
});
