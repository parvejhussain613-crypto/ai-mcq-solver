// ==========================================
// SMART AI — GEMINI BACKEND
// ==========================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { GoogleGenAI } = require("@google/genai");

const app = express();

const PORT = process.env.PORT || 3000;

// ==========================================
// GEMINI SETUP
// ==========================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

// ==========================================
// FILE UPLOAD
// ==========================================

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {

  res.json({
    success: true,
    message: "Smart AI backend is running 🚀"
  });

});

// ==========================================
// SMART AI CHAT — GEMINI
// ==========================================

app.post("/api/chat", async (req, res) => {

  try {

    const message =
      req.body.message?.trim();

    if (!message) {

      return res.status(400).json({

        success: false,

        reply:
          "Please enter a message."

      });

    }

    // ======================================
    // SMART AI IDENTITY
    // ======================================

    const lowerMessage =
      message.toLowerCase().trim();

    const identityQuestions = [

      "who created you",
      "who create you",
      "who is your owner",
      "who made you",
      "who built you",
      "who developed you",
      "tumko kisne banaya",
      "tumhe kisne banaya",
      "tumhara owner kaun hai",
      "aapko kisne banaya"

    ];

    const isIdentityQuestion =
      identityQuestions.some(
        question =>
          lowerMessage.includes(question)
      );


    if (isIdentityQuestion) {

      return res.json({

        success: true,

        reply:
          "Smart AI is created by Md Parvez Hussain from India."

      });

    }

    // ======================================
    // GEMINI REQUEST
    // ======================================

    const response =
      await ai.models.generateContent({

        model:
          "gemini-2.0-flash",

        contents: [

          {
            role: "user",

            parts: [

              {
                text:
`You are Smart AI, a helpful and friendly AI assistant.

Always answer clearly and naturally.

Your name is Smart AI.

If someone asks who created you, who is your owner, who made you, or similar questions, answer:
"Smart AI is created by Md Parvez Hussain from India."

User question:
${message}`
              }

            ]

          }

        ]

      });


    const reply =
      response.text ||
      "Sorry, I couldn't generate a response.";

    res.json({

      success: true,

      reply: reply

    });


  } catch (error) {

    console.error(
      "Gemini Chat Error:",
      error
    );

    res.status(500).json({

      success: false,

      reply:
        "Smart AI is temporarily unavailable. Please check your Gemini API key and try again."

    });

  }

});

// ==========================================
// IMAGE GENERATION
// ==========================================

app.post(
  "/api/generate-image",
  async (req, res) => {

    try {

      const prompt =
        req.body.prompt?.trim();

      if (!prompt) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter an image prompt."

        });

      }

      /*
       * Image generation API
       * will be connected separately.
       */

      res.json({

        success: true,

        message:
          "Image generation API is ready to be connected.",

        prompt: prompt

      });

    } catch (error) {

      console.error(
        "Image Error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Image generation failed."

      });

    }

  }
);

// ==========================================
// VIDEO GENERATION
// ==========================================

app.post(
  "/api/generate-video",
  async (req, res) => {

    try {

      const prompt =
        req.body.prompt?.trim();

      const duration =
        Number(req.body.duration) || 8;

      if (!prompt) {

        return res.status(400).json({

          success: false,

          message:
            "Please enter a video prompt."

        });

      }

      res.json({

        success: true,

        message:
          "Video generation API is ready to be connected.",

        prompt: prompt,

        duration: duration

      });

    } catch (error) {

      console.error(
        "Video Error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Video generation failed."

      });

    }

  }
);

// ==========================================
// IMAGE ENHANCE
// ==========================================

app.post(
  "/api/enhance-image",
  upload.single("image"),
  async (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).json({

          success: false,

          message:
            "Please upload an image."

        });

      }

      res.json({

        success: true,

        message:
          "Image enhancement API is ready to be connected.",

        fileName:
          req.file.originalname

      });

    } catch (error) {

      console.error(
        "Enhance Error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Image enhancement failed."

      });

    }

  }
);

// ==========================================
// PAYMENT
// ==========================================

app.post(
  "/api/create-payment",
  async (req, res) => {

    try {

      res.json({

        success: true,

        amount: 299,

        message:
          "Payment gateway will be connected next."

      });

    } catch (error) {

      console.error(
        "Payment Error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          "Payment initialization failed."

      });

    }

  }
);

// ==========================================
// START SERVER
// ==========================================

app.listen(
  PORT,
  () => {

    console.log(
      `Smart AI backend running on port ${PORT}`
    );

  }
);
