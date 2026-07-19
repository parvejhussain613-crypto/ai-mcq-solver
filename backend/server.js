const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/solve", async (req, res) => {

    const { question, options } = req.body;

    // Abhi demo response
    res.json({
        answer: "AI answer yaha aayega",
        explanation: "AI explanation yaha aayega"
    });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
