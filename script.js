// =====================================
// MCQ TOOLS - FRONTEND JAVASCRIPT
// =====================================

async function solveMCQ() {

  const question = document
    .getElementById("question")
    .value
    .trim();

  const A = document
    .getElementById("optionA")
    .value
    .trim();

  const B = document
    .getElementById("optionB")
    .value
    .trim();

  const C = document
    .getElementById("optionC")
    .value
    .trim();

  const D = document
    .getElementById("optionD")
    .value
    .trim();

  const result = document.getElementById("result");


  // Check Question
  if (!question) {

    result.innerHTML = `
      ❌ Please enter an MCQ question.
    `;

    return;
  }


  // Options
  const options = `
A) ${A}
B) ${B}
C) ${C}
D) ${D}
`;


  // Loading Message
  result.innerHTML = `
    🤖 AI is solving your MCQ...
    <br><br>
    ⏳ Please wait...
  `;


  try {

    // Backend API
    const response = await fetch(
      "https://ai-mcq-solver-i7qs.onrender.com/solve",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          question: question,
          options: options
        })
      }
    );


    const data = await response.json();


    // Error Check
    if (!response.ok) {

      throw new Error(
        data.error || "Something went wrong"
      );

    }


    // Show AI Answer
    result.innerHTML = `
      <strong>🤖 AI Answer</strong>
      <br><br>
      ${data.answer}
    `;


    // Save History
    saveHistory(
      question,
      data.answer
    );


    // Load History
    loadHistory();


  } catch (error) {

    console.error(error);

    result.innerHTML = `
      ❌ AI se connect nahi ho paya.
      <br><br>
      Backend server check karo.
    `;

  }

}


// =====================================
// SAVE HISTORY
// =====================================

function saveHistory(question, answer) {

  let history =
    JSON.parse(
      localStorage.getItem("mcqHistory")
    ) || [];


  history.unshift({
    question: question,
    answer: answer,
    time: new Date().toLocaleString()
  });


  // Keep only latest 20
  history = history.slice(0, 20);


  localStorage.setItem(
    "mcqHistory",
    JSON.stringify(history)
  );

}


// =====================================
// LOAD HISTORY
// =====================================

function loadHistory() {

  const historyList =
    document.getElementById("historyList");


  if (!historyList) return;


  let history =
    JSON.parse(
      localStorage.getItem("mcqHistory")
    ) || [];


  if (history.length === 0) {

    historyList.innerHTML =
      "No questions solved yet.";

    return;

  }


  historyList.innerHTML =
    history.map((item, index) => `

      <div class="history-item">

        <strong>
          ${index + 1}. ${item.question}
        </strong>

        <br><br>

        <span>
          🤖 ${item.answer}
        </span>

        <br><br>

        <small>
          ${item.time}
        </small>

      </div>

    `).join("");

}


// =====================================
// IMAGE CAPTURE
// =====================================

const imageInput =
  document.getElementById("imageInput");


if (imageInput) {

  imageInput.addEventListener(
    "change",
    function () {

      const file =
        this.files[0];

      if (!file) return;


      const result =
        document.getElementById("result");


      result.innerHTML = `
        📷 MCQ Image Selected
        <br><br>
        🧠 Image OCR feature is ready.
      `;

    }
  );

}


// =====================================
// LOAD HISTORY WHEN PAGE OPENS
// =====================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    loadHistory();

  }
);
