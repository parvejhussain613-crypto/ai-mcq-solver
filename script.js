// AI MCQ Solver v1.0
// 🤖 Real AI MCQ Solver
async function solveMCQ() {

    const question = document.getElementById("question").value.trim();

    const A = document.getElementById("optionA")?.value || "";
    const B = document.getElementById("optionB")?.value || "";
    const C = document.getElementById("optionC")?.value || "";
    const D = document.getElementById("optionD")?.value || "";

    const result = document.getElementById("result");

    if (!question) {
        result.innerHTML = "❌ Please enter a question!";
        return;
    }

    const options = `
A) ${A}
B) ${B}
C) ${C}
D) ${D}
`;

    result.innerHTML = "🤖 AI is solving your MCQ... ⏳";

    try {

const response = await fetch("https://ai-mcq-solver-i7qs.onrender.com/solve",
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question,
                options: options
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        result.innerHTML = `
            <div class="ai-answer">
                <h3>🤖 AI Answer</h3>
                <p>${data.answer}</p>
            </div>
        `;

        // 📚 Save History
        saveHistory(question, data.answer);
        loadHistory();

    } catch (error) {

        console.error(error);

        result.innerHTML =
            "❌ AI se connect nahi ho paya. Backend URL check karo.";

    }
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
// 📝 Signup Function
function signup() {
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("❌ Please fill all fields!");
        return;
    }

    if (password.length < 6) {
        alert("❌ Password must be at least 6 characters!");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("mcqUser", JSON.stringify(user));

    alert("✅ Account created successfully!");

    window.location.href = "login.html";
}
function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("❌ Please enter email and password!");
        return;
    }

    const savedUser = JSON.parse(localStorage.getItem("mcqUser"));

    if (!savedUser) {
        alert("❌ Account nahi mila! Pehle Sign Up karo.");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {

        localStorage.setItem("isLoggedIn", "true");

        alert("✅ Login successful!");

        window.location.href = "index.html";

    } else {
        alert("❌ Incorrect email or password!");
    }
}
// 👤 Show User Name
function showUser() {

    const user = JSON.parse(localStorage.getItem("mcqUser"));

    const welcomeUser = document.getElementById("welcomeUser");

    if (user && welcomeUser) {
        welcomeUser.innerHTML = `Hello, ${user.name}! 👋`;
    }
}

// 🚪 Logout
function logout() {

    localStorage.removeItem("isLoggedIn");

    alert("✅ You have been logged out!");

    window.location.href = "login.html";
}

showUser();
window.location.href = "dashboard.html";
