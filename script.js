// AI MCQ Solver v1.0
function solveMCQ() {

    let question = document.getElementById("question").value;
    let A = document.getElementById("optionA").value;
    let B = document.getElementById("optionB").value;
    let C = document.getElementById("optionC").value;
    let D = document.getElementById("optionD").value;

    if(question.trim() === ""){
        document.getElementById("result").innerHTML = "❌ Question likho bhai!";
        return;
    }

    document.getElementById("result").innerHTML = "🤖 AI solve kar raha hai...";

    setTimeout(() => {

        document.getElementById("result").innerHTML =
        `
        <h3>✅ Answer</h3>
        Question: ${question}<br><br>
        Options:<br>
        A) ${A}<br>
        B) ${B}<br>
        C) ${C}<br>
        D) ${D}<br><br>
        💡 Correct answer AI generate karega.
        `;

    },1500);
}

// Clear question
function clearQuestion() {
  document.getElementById("question").value = "";
  document.getElementById("result").innerHTML = "Answer will appear here...";
}
// 📸 Camera Image Preview
function previewImage(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        const preview = document.getElementById("preview");
        preview.src = e.target.result;
        preview.style.display = "block";
    };

    reader.readAsDataURL(file);
}
// 📸 OCR: Image to Text
async function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const preview = document.getElementById("preview");
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";

    const result = document.getElementById("result");
    result.innerHTML = "⏳ Reading image...";

    const {
        data: { text }
    } = await Tesseract.recognize(file, "eng");

    document.getElementById("question").value = text;
    result.innerHTML = "✅ MCQ extracted successfully!";
}
