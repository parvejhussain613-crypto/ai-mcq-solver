// ==========================================
// SMART AI - MAIN JAVASCRIPT
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

const plusBtn = document.getElementById("plusBtn");
const attachmentMenu =
  document.getElementById("attachmentMenu");

const messageInput =
  document.getElementById("messageInput");

const sendBtn =
  document.getElementById("sendBtn");

const chatContainer =
  document.getElementById("chatContainer");

const welcomeScreen =
  document.getElementById("welcomeScreen");

const newChatBtn =
  document.getElementById("newChatBtn");

const historyBtn =
  document.getElementById("historyBtn");

const cameraBtn =
  document.getElementById("cameraBtn");

const photoBtn =
  document.getElementById("photoBtn");

const fileBtn =
  document.getElementById("fileBtn");

const cameraInput =
  document.getElementById("cameraInput");

const photoInput =
  document.getElementById("photoInput");

const fileInput =
  document.getElementById("fileInput");


// ==========================================
// SIDEBAR
// ==========================================

menuBtn.addEventListener("click", () => {

  sidebar.classList.toggle("active");

});


// ==========================================
// PLUS MENU
// ==========================================

plusBtn.addEventListener("click", () => {

  attachmentMenu.classList.toggle("active");

});


// ==========================================
// CAMERA
// ==========================================

cameraBtn.addEventListener("click", () => {

  cameraInput.click();

  attachmentMenu.classList.remove("active");

});


// ==========================================
// PHOTOS
// ==========================================

photoBtn.addEventListener("click", () => {

  photoInput.click();

  attachmentMenu.classList.remove("active");

});


// ==========================================
// FILES
// ==========================================

fileBtn.addEventListener("click", () => {

  fileInput.click();

  attachmentMenu.classList.remove("active");

});


// ==========================================
// CAMERA SELECTED
// ==========================================

cameraInput.addEventListener(
  "change",
  function () {

    if (!this.files[0]) return;

    const file =
      this.files[0];

    addUserMessage(
      "📷 " + file.name
    );

    showThinking();

    setTimeout(() => {

      removeThinking();

      addAIMessage(
        "I received your camera image. 🤖<br><br>" +
        "Image analysis will be connected to the AI in the next step."
      );

    }, 1500);

  }
);


// ==========================================
// PHOTO SELECTED
// ==========================================

photoInput.addEventListener(
  "change",
  function () {

    if (!this.files[0]) return;

    const file =
      this.files[0];

    addUserMessage(
      "🖼️ " + file.name
    );

    showThinking();

    setTimeout(() => {

      removeThinking();

      addAIMessage(
        "I received your photo. 🤖<br><br>" +
        "AI image analysis will be connected in the next step."
      );

    }, 1500);

  }
);


// ==========================================
// FILE SELECTED
// ==========================================

fileInput.addEventListener(
  "change",
  function () {

    if (!this.files[0]) return;

    const file =
      this.files[0];

    addUserMessage(
      "📄 " + file.name
    );

    showThinking();

    setTimeout(() => {

      removeThinking();

      addAIMessage(
        "I received your file: <b>" +
        file.name +
        "</b><br><br>" +
        "File analysis will be connected in the next step."
      );

    }, 1500);

  }
);


// ==========================================
// SEND MESSAGE
// ==========================================

sendBtn.addEventListener(
  "click",
  sendMessage
);


// ==========================================
// ENTER TO SEND
// ==========================================

messageInput.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();

    }

  }
);


// ==========================================
// SEND MESSAGE FUNCTION
// ==========================================

function sendMessage() {

  const message =
    messageInput.value.trim();

  if (!message) return;


  // Hide welcome screen
  welcomeScreen.style.display =
    "none";


  // Show chat
  chatContainer.classList.add(
    "active"
  );


  // Add user message
  addUserMessage(message);


  // Clear input
  messageInput.value = "";


  // Show AI thinking
  showThinking();


  // Temporary response
  setTimeout(() => {

    removeThinking();

    addAIMessage(
      "Hello! 👋 I'm <b>Smart AI</b>.<br><br>" +
      "Your AI assistant is ready. 🤖<br><br>" +
      "In the next step, we'll connect the real AI API so I can answer your questions."
    );

  }, 1500);

}


// ==========================================
// USER MESSAGE
// ==========================================

function addUserMessage(message) {

  const messageBox =
    document.createElement("div");

  messageBox.className =
    "user-message";


  const content =
    document.createElement("div");

  content.className =
    "message-content";

  content.textContent =
    message;


  messageBox.appendChild(
    content
  );


  chatContainer.appendChild(
    messageBox
  );


  saveChat();


  scrollToBottom();

}


// ==========================================
// AI MESSAGE
// ==========================================

function addAIMessage(message) {

  const messageBox =
    document.createElement("div");

  messageBox.className =
    "ai-message";


  const content =
    document.createElement("div");

  content.className =
    "message-content";

  content.innerHTML =
    message;


  messageBox.appendChild(
    content
  );


  chatContainer.appendChild(
    messageBox
  );


  saveChat();


  scrollToBottom();

}


// ==========================================
// THINKING ANIMATION
// ==========================================

function showThinking() {

  const thinking =
    document.createElement("div");

  thinking.id =
    "thinkingMessage";

  thinking.className =
    "ai-message";


  thinking.innerHTML = `
    <div class="message-content">
      Smart AI is thinking
      <span class="dots">•••</span>
    </div>
  `;


  chatContainer.appendChild(
    thinking
  );


  scrollToBottom();

}


// ==========================================
// REMOVE THINKING
// ==========================================

function removeThinking() {

  const thinking =
    document.getElementById(
      "thinkingMessage"
    );

  if (thinking) {

    thinking.remove();

  }

}


// ==========================================
// NEW CHAT
// ==========================================

newChatBtn.addEventListener(
  "click",
  function () {

    chatContainer.innerHTML =
      "";

    chatContainer.classList.remove(
      "active"
    );

    welcomeScreen.style.display =
      "flex";

    sidebar.classList.remove(
      "active"
    );

  }
);


// ==========================================
// CHAT HISTORY
// ==========================================

historyBtn.addEventListener(
  "click",
  function () {

    const savedChat =
      localStorage.getItem(
        "smartAIChat"
      );

    if (!savedChat) {

      alert(
        "No previous chat found."
      );

      return;

    }

    welcomeScreen.style.display =
      "none";

    chatContainer.classList.add(
      "active"
    );

    chatContainer.innerHTML =
      savedChat;

    sidebar.classList.remove(
      "active"
    );

    scrollToBottom();

  }
);


// ==========================================
// SAVE CHAT
// ==========================================

function saveChat() {

  localStorage.setItem(
    "smartAIChat",
    chatContainer.innerHTML
  );

}


// ==========================================
// SCROLL
// ==========================================

function scrollToBottom() {

  setTimeout(() => {

    window.scrollTo({
      top:
        document.body.scrollHeight,

      behavior:
        "smooth"
    });

  }, 100);

}


// ==========================================
// VOICE INPUT
// ==========================================

const micBtn =
  document.getElementById(
    "micBtn"
  );


micBtn.addEventListener(
  "click",
  function () {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      alert(
        "Voice input is not supported in this browser."
      );

      return;

    }


    const recognition =
      new SpeechRecognition();


    recognition.lang =
      "en-IN";


    recognition.start();


    recognition.onresult =
      function (event) {

        const text =
          event.results[0][0]
            .transcript;

        messageInput.value =
          text;

