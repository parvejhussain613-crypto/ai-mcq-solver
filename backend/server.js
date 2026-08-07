require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Home
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart AI Backend is running 🚀"
  });
});

// Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({
        success: false,
        reply: "Please enter a message."
      });
    }

    // Smart AI identity
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
        reply: "Smart AI is created by Md Parvez Hussain from India."
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
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
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data);

      return res.json({
        success: false,
        reply: "OpenRouter Error."
      });
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "No response.";

    res.json({
      success: true,
      reply
    });

  } catch (err) {
    console.log(err);

    res.json({
      success: false,
      reply: "Server Error."
    });
  }
});
// Image Generation API
app.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({
        success: false,
        reply: "Please enter a prompt."
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        prompt: prompt,
        size: "512x512"
      })
    });

    const data = await response.json();

    if (data.data && data.data[0].url) {
      return res.json({
        success: true,
        image: data.data[0].url
      });
    } else {
      return res.json({
        success: false,
        reply: "Image generate nahi ho payi."
      });
    }

  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      reply: "Server Error."
    });
  }
});
app.listen(PORT, () => {
  console.log(`Smart AI Backend running on port ${PORT}`);
});
