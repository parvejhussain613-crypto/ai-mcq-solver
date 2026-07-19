// AI MCQ Solver v1.0

function solveMCQ() {
  const question = document.getElementById("question").value.trim();
  const subject = document.getElementById("subject").value;
  const result = document.getElementById("result");

  if (question === "") {
    alert("⚠️ Please enter your MCQ question.");
    return;
  }

  result.innerHTML = `
    <h3>🤖 AI MCQ Solver</h3>
    <p><strong>Subject:</strong> ${subject}</p>
    <hr>
    <p>📄 <strong>Question:</strong></p>
    <p>${question}</p>
    <br>
    <p>⏳ AI is analyzing your question...</p>
  `;

  setTimeout(() => {
    result.innerHTML += `
      <hr>
      <h3>✅ Demo Result</h3>
      <p><strong>Answer:</strong> Coming soon...</p>
      <p><strong>Explanation:</strong> Gemini AI integration will be added in the next version.</p>
    `;
  }, 2000);
}

// Clear question
function clearQuestion() {
  document.getElementById("question").value = "";
  document.getElementById("result").innerHTML = "Answer will appear here...";
}
