require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

// ================================
// MIDDLEWARE
// ================================

app.use(cors());

app.use(express.json({ limit: "10mb" }));


// ================================
// BASIC ROUTE
// ================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart AI Backend is running 🚀"
  });
});


// ================================
// GEMINI AI CHAT
// ================================

app.post("/api/chat", async (req, res) => {

  try {

    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        success: false,
        reply: "Please enter a message."
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        reply: "Gemini API key is missing in the backend .env file."
      });
    }


    // Special Smart AI identity response

    const lowerMessage =
      userMessage.toLowerCase().trim();


    if (
      lowerMessage.includes("who created you") ||
      lowerMessage.includes("who create you") ||
      lowerMessage.includes("who is your owner") ||
      lowerMessage.includes("who made you") ||
      lowerMessage.includes("tumko kisne banaya") ||
      lowerMessage.includes("tumhe kisne banaya")
    ) {

      return res.json({
        success: true,
        reply:
          "Smart AI is created by Md Parvez Hussain from India."
      });

    }


    // Gemini API

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
      apiKey,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          contents: [

            {
              role: "user",

              parts: [

                {
                  text:
                    `You are Smart AI, a helpful AI assistant created by Md Parvez Hussain from India.

Answer the user's question clearly and helpfully.

User question:
${userMessage}`
                }

              ]

            }

          ]

        })

      }
    );


    const data =
      await response.json();


    if (!response.ok) {

      console.error(
        "Gemini API Error:",
        data
      );

      return res.status(500).json({

        success: false,

        reply:
          "Sorry, Smart AI could not connect to Gemini right now."

      });

    }


    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;


    if (!reply) {

      return res.json({

        success: true,

        reply:
          "Sorry, I could not generate a response."

      });

    }


    res.json({

      success: true,

      reply: reply

    });


  } catch (error) {

    console.error(
      "Smart AI Error:",
      error
    );


    res.status(500).json({

      success: false,

      reply:
        "Smart AI backend error. Please try again."

    });

  }

});


// ================================
// START SERVER
// ================================

app.listen(
  PORT,
  () => {

    console.log(
      `Smart AI Backend running on port ${PORT}`
    );

  }
);
