function solveMCQ() {
  const question = document.getElementById("question").value.trim();
  const subject = document.getElementById("subject").value;
  const result = document.getElementById("result");

  if (question === "") {
    alert("Please enter your MCQ question.");
    return;
  }

  result.innerHTML = `
    <h3>🤖 AI Analysis</h3>
    <p><b>Subject:</b> ${subject}</p>
    <p>⏳ AI is analyzing your question...</p>
    <br>
    <p><b>Note:</b> Real AI answer will be connected in the next update.</p>
  `;
}
