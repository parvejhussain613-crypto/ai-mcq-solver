// ============================================
// MCQ TOOLS AI - MAIN JAVASCRIPT
// ============================================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

const newChatBtn = document.getElementById("newChatBtn");

const plusBtn = document.getElementById("plusBtn");
const plusMenu = document.getElementById("plusMenu");

const cameraBtn = document.getElementById("cameraBtn");
const photoBtn = document.getElementById("photoBtn");
const fileBtn = document.getElementById("fileBtn");

const cameraInput = document.getElementById("cameraInput");
const photoInput = document.getElementById("photoInput");
const fileInput = document.getElementById("fileInput");

const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");

const chatMessages = document.getElementById("chatMessages");
const welcomeScreen = document.getElementById("welcomeScreen");


// ============================================
// SIDEBAR OPEN / CLOSE
// ============================================

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});


// ============================================
// PLUS MENU
// ============================================

plusBtn.addEventListener("click", () => {
  plusMenu.classList.toggle("active");
});


// ============================================
// CAMERA
// ============================================

cameraBtn.addEventListener("click", () => {
  cameraInput.click();
  plusMenu.classList.remove("active");
});


// ============================================
// PHOTOS
// ============================================

photoBtn.addEventListener("click", () => {
  photoInput.click();
  plusMenu.classList.remove("active");
});


// ============================================
// FILES
// ============================================

fileBtn.addEventListener("click", () => {
  fileInput.click();
  plusMenu.classList.remove("active");
});


// ============================================
// CAMERA FILE SELECTED
// ============================================

cameraInput.addEventListener("change", (event) => {

  const file = event.target.files[0];

  if (!file) return;

  addUserMessage(
    "📷 Image selected: " + file.name
  );

  showAIMessage(
    "Image received successfully. Image analysis will be connected in the next step. 🤖"
  );

});


// ============================================
// PHOTO SELECTED
// ============================================

photoInput.addEventListener("change", (event) => {

  const file = event.target.files[0];

  if (!file) return;

  addUserMessage(
    "🖼️ Photo selected: " + file.name
  );

  showAIMessage(
    "Photo received successfully. AI image analysis will be connected in the next step. 🤖"
  );

});


// ============================================
// FILE SELECTED
// ============================================

fileInput.addEventListener("change", (event) => {

  const file = event.target.files[0];

  if (!file) return;

  addUserMessage(
    "📄 File selected: " + file.name
  );

  showAIMessage(
    "File received: " + file.name +
    "<br><br>File analysis will be connected in the next step. 🤖"
  );

});


// ============================================
// SEND MESSAGE
// ============================================

sendBtn.addEventListener("click", sendMessage);


messageInput.addEventListener("keydown", (event) => {

  if (event.key === "Enter" && !event.shiftKey) {

    event.preventDefault();

    sendMessage();

  }

});


// ============================================
// SEND MESSAGE FUNCTION
// ============================================

function sendMessage() {

  const message =
    messageInput.value.trim();

  if (!message) return;


  // Hide welcome screen
  welcomeScreen.style.display = "none";


  // Add user message
  addUserMessage(message);


  // Clear input
  messageInput.value = "";


  // Show AI typing
  showTyping();


  // Temporary AI response
  setTimeout(() => {

    removeTyping();

    showAIMessage(
      "Hello! 👋 I'm MCQ Tools AI. Your AI assistant is ready. 🤖<br><br>" +
      "In the next step, we'll connect the AI API so I can answer your questions."
    );

  }, 1500);

}


// ============================================
// ADD USER MESSAGE
// ============================================

function addUserMessage(message) {

  const div =
    document.createElement("div");

  div.className =
    "message user-message";

  div.textContent =
    message;

  chatMessages.appendChild(div);

  scrollToBottom();

}


// ============================================
// ADD AI MESSAGE
// ============================================

function showAIMessage(message) {

  const div =
    document.createElement("div");

  div.className =
    "message ai-message";

  div.innerHTML =
    message;

  chatMessages.appendChild(div);

  scrollToBottom();

}


// ============================================
// AI TYPING
// ============================================

function showTyping() {

  const div =
    document.createElement("div");

  div.id =
    "typingMessage";

  div.className =
    "message ai-message";

  div.innerHTML =
    "🤖 Thinking...";

  chatMessages.appendChild(div);

  scrollToBottom();

}


function removeTyping() {

  const typing =
    document.getElementById(
      "typingMessage"
    );

  if (typing) {

    typing.remove();

  }

}


// ============================================
// SCROLL TO BOTTOM
// ============================================

function scrollToBottom() {

  setTimeout(() => {

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });

  }, 100);

}


// ============================================
// NEW CHAT
// ============================================

newChatBtn.addEventListener(
  "click",
  () => {

    chatMessages.innerHTML = "";

    welcomeScreen.style.display =
      "block";

    sidebar.classList.remove(
      "active"
    );

    overlay.classList.remove(
      "active"
    );

    messageInput.value = "";

  }
);
