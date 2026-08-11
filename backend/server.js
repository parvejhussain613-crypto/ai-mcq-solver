require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;


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
   CHAT API
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

      console.log(
        "OpenRouter Chat Error:",
        data
      );

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
      reply: reply
    });


  } catch (err) {

    console.log(
      "Chat Server Error:",
      err
    );

    res.json({
      success: false,
      reply: "Server Error."
    });

  }
});



/* =========================================
   IMAGE GENERATION API
========================================= */

app.post("/generate-image", async (req, res) => {

  try {

    const { prompt } = req.body;


    if (!prompt) {

      return res.json({
        success: false,
        message: "Please enter an image prompt."
      });

    }


    console.log(
      "Image Prompt:",
      prompt
    );


    const response = await fetch(
      "https://openrouter.ai/api/v1/images",
      {

        method: "POST",

        headers: {

          "Authorization":
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          model:
            "google/gemini-2.5-flash-image",

          prompt:
            prompt

        })

      }
    );


    const data =
      await response.json();


    console.log(
      "IMAGE API RESPONSE:",
      JSON.stringify(
        data,
        null,
        2
      )
    );


    if (!response.ok) {

      console.log(
        "OpenRouter Image Error:",
        data
      );


      return res.status(
        response.status
      ).json({

        success: false,

        message:
          data?.error?.message ||
          "OpenRouter image generation failed."

      });

    }


    const imageData =
      data?.data?.[0]?.b64_json;


    const mediaType =
      data?.data?.[0]?.media_type ||
      "image/png";


    if (!imageData) {

      return res.json({

        success: false,

        message:
          "Image data was not returned by OpenRouter."

      });

    }


    const imageUrl =
      `data:${mediaType};base64,${imageData}`;


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
        "Image generation server error."

    });

  }

});



/* =========================================
   START SERVER
========================================= */

app.listen(
  PORT,
  () => {

    console.log(
      `Smart AI Backend running on port ${PORT}`
    );

  }
);
