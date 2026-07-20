// AI MCQ Solver v1.0

async function solveMCQ() {
    const question = document.getElementById("question").value;

    if (!question.trim()) {
        document.getElementById("result").innerHTML = "❌ Please enter a question!";
        return;
    }

    document.getElementById("result").innerHTML = "🤖 AI is solving...";

    try {
        const response = await fetch("http://localhost:3000/solve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        document.getElementById("result").innerHTML = `
            <h3>✅ Answer</h3>
            <p>${data.answer}</p>

            <h3>📖 Explanation</h3>
            <p>${data.explanation}</p>
        `;
        saveHistory(question, data.answer);
loadHistory();
    } catch (error) {
        document.getElementById("result").innerHTML =
            "❌ Server se connect nahi ho paya!";
    }
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
// 🌙 Dark Mode Toggle
const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
}
// 📚 Save MCQ History
function saveHistory(question, answer) {
    let history = JSON.parse(localStorage.getItem("mcqHistory")) || [];

    history.unshift({
        question,
        answer,
        time: new Date().toLocaleString()
    });

    if (history.length > 20) {
        history.pop();
    }

    localStorage.setItem("mcqHistory", JSON.stringify(history));
}

// 📖 Show History
function loadHistory() {
    const history = JSON.parse(localStorage.getItem("mcqHistory")) || [];
    const historyBox = document.getElementById("history");

    if (!historyBox) return;

    historyBox.innerHTML = history.map(item => `
        <div class="history-item">
            <strong>Q:</strong> ${item.question}<br>
            <strong>A:</strong> ${item.answer}<br>
            <small>${item.time}</small>
        </div>
    `).join("");
}

window.onload = loadHistory;
// 📄 Read PDF (Demo)
function readPDF() {
    const file = document.getElementById("pdfInput").files[0];

    if (!file) {
        alert("Please select a PDF file!");
        return;
    }

    document.getElementById("result").innerHTML =
        "📄 PDF selected: " + file.name +
        "<br><br>✅ PDF reader is ready. Next step is extracting text from the PDF.";
}
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
            .then(() => console.log("Service Worker Registered"))
            .catch(err => console.log(err));
    });
}
