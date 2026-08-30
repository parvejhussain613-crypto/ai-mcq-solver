/* =========================================
   SMART AI — FIXED FINAL SCRIPT
   =========================================
   ✅ AI Chat
   ✅ Full Chat History
   ✅ Recent Chats
   ✅ Open Previous Chat
   ✅ New Chat
   ✅ Login
   ✅ Camera / Photo / File
   ✅ Voice Input
   ✅ Image Generation
   ✅ Image History
   ✅ Video Generation UI
   ✅ Video History
   ✅ 3 Free Video Trials
   ✅ ₹299 Smart AI Pro
   ✅ Razorpay-ready upgrade flow
   ✅ Download Image / Video
   ❌ Image Enhance removed
========================================= */


/* =========================================
   GLOBAL STATE
========================================= */

let selectedAttachment = null;
let selectedAttachmentType = null;

let currentChat = [];

let currentChatId = null;

let isLoggedIn =
  localStorage.getItem("smartAI_logged_in") === "true";

let videoFreeTrials =
  Number(
    localStorage.getItem("smartAI_video_trials")
  ) || 0;


/* =========================================
   HELPER
========================================= */

function get(id) {
  return document.getElementById(id);
}


/* =========================================
   STORAGE HELPERS
========================================= */

function getChatHistory() {

  try {

    return JSON.parse(
      localStorage.getItem("smartAI_chat_history")
    ) || [];

  } catch (error) {

    console.error("Chat history error:", error);

    return [];

  }

}


function saveChatHistory(history) {

  localStorage.setItem(
    "smartAI_chat_history",
    JSON.stringify(history)
  );

}


/* =========================================
   ELEMENTS
========================================= */

const menuBtn = get("menuBtn");
const sidebar = get("sidebar");
const closeSidebar = get("closeSidebar");
const overlay = get("overlay");

const newChatBtn = get("newChatBtn");
const generateImageBtn = get("generateImageBtn");
const generateVideoBtn = get("generateVideoBtn");
const imageEnhanceBtn = get("imageEnhanceBtn");
const settingsBtn = get("settingsBtn");

const chatScreen = get("chatScreen");
const imageScreen = get("imageScreen");
const videoScreen = get("videoScreen");
const enhanceScreen = get("enhanceScreen");
const settingsScreen = get("settingsScreen");

const welcomeScreen = get("welcomeScreen");
const chatMessages = get("chatMessages");
const messageInput = get("messageInput");
const sendBtn = get("sendBtn");

const plusBtn = get("plusBtn");
const micBtn = get("micBtn");

const attachmentMenu = get("attachmentMenu");
const attachmentPreview = get("attachmentPreview");

const cameraBtn = get("cameraBtn");
const photoBtn = get("photoBtn");
const fileBtn = get("fileBtn");

const cameraInput = get("cameraInput");
const photoInput = get("photoInput");
const fileInput = get("fileInput");

const recentChats = get("recentChats");


/* =========================================
   REMOVE IMAGE ENHANCE
========================================= */

if (imageEnhanceBtn) {

  imageEnhanceBtn.style.display = "none";

}

if (enhanceScreen) {

  enhanceScreen.style.display = "none";

}


/* =========================================
   SCREEN SWITCHING
========================================= */

function showScreen(screen) {

  const screens = [
    chatScreen,
    imageScreen,
    videoScreen,
    settingsScreen
  ];

  screens.forEach(item => {

    if (item) {

      item.classList.remove("active");

    }

  });

  if (screen) {

    screen.classList.add("active");

  }

}


/* =========================================
   SIDEBAR
========================================= */

function openSidebar() {

  if (sidebar) {

    sidebar.classList.add("open");

  }

  if (overlay) {

    overlay.classList.add("show");

  }

}


function closeSidebarMenu() {

  if (sidebar) {

    sidebar.classList.remove("open");

  }

  if (overlay) {

    overlay.classList.remove("show");

  }

}


if (menuBtn) {

  menuBtn.addEventListener(
    "click",
    openSidebar
  );

}


if (closeSidebar) {

  closeSidebar.addEventListener(
    "click",
    closeSidebarMenu
  );

}


if (overlay) {

  overlay.addEventListener(
    "click",
    closeSidebarMenu
  );

}


/* =========================================
   NEW CHAT
========================================= */

function startNewChat() {

  currentChat = [];

  currentChatId =
    "chat_" +
    Date.now();

  if (chatMessages) {

    chatMessages.innerHTML = "";

  }

  if (welcomeScreen) {

    welcomeScreen.style.display = "flex";

  }

  showScreen(chatScreen);

  closeSidebarMenu();

}


if (newChatBtn) {

  newChatBtn.addEventListener(
    "click",
    startNewChat
  );

}


/* =========================================
   GENERATE IMAGE
========================================= */

if (generateImageBtn) {

  generateImageBtn.addEventListener(
    "click",
    () => {

      showScreen(imageScreen);

      closeSidebarMenu();

    }
  );

}


/* =========================================
   GENERATE VIDEO
========================================= */

if (generateVideoBtn) {

  generateVideoBtn.addEventListener(
    "click",
    () => {

      showScreen(videoScreen);

      closeSidebarMenu();

      updateVideoTrialUI();

    }
  );

}


/* =========================================
   SETTINGS
========================================= */

if (settingsBtn) {

  settingsBtn.addEventListener(
    "click",
    () => {

      showScreen(settingsScreen);

      closeSidebarMenu();

    }
  );

}


/* =========================================
   BACK BUTTONS
========================================= */

document
  .querySelectorAll("[data-back]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        showScreen(chatScreen);

      }
    );

  });


/* =========================================
   ATTACHMENT MENU
========================================= */

if (plusBtn) {

  plusBtn.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      if (attachmentMenu) {

        attachmentMenu.classList.toggle(
          "show"
        );

      }

    }
  );

}


document.addEventListener(
  "click",
  event => {

    if (
      attachmentMenu &&
      !attachmentMenu.contains(event.target) &&
      event.target !== plusBtn
    ) {

      attachmentMenu.classList.remove(
        "show"
      );

    }

  }
);


/* =========================================
   CAMERA
========================================= */

if (cameraBtn && cameraInput) {

  cameraBtn.addEventListener(
    "click",
    () => {

      cameraInput.click();

      if (attachmentMenu) {

        attachmentMenu.classList.remove(
          "show"
        );

      }

    }
  );

}


/* =========================================
   PHOTO
========================================= */

if (photoBtn && photoInput) {

  photoBtn.addEventListener(
    "click",
    () => {

      photoInput.click();

      if (attachmentMenu) {

        attachmentMenu.classList.remove(
          "show"
        );

      }

    }
  );

}


/* =========================================
   FILE
========================================= */

if (fileBtn && fileInput) {

  fileBtn.addEventListener(
    "click",
    () => {

      fileInput.click();

      if (attachmentMenu) {

        attachmentMenu.classList.remove(
          "show"
        );

      }

    }
  );

}


/* =========================================
   HANDLE ATTACHMENT
========================================= */

function handleAttachment(file, type) {

  if (!file) return;

  selectedAttachment = file;

  selectedAttachmentType = type;

  if (!attachmentPreview) return;

  attachmentPreview.innerHTML = "";

  const chip =
    document.createElement("div");

  chip.className =
    "attachment-chip";


  if (
    file.type &&
    file.type.startsWith("image/")
  ) {

    const img =
      document.createElement("img");

    img.src =
      URL.createObjectURL(file);

    chip.appendChild(img);

  }


  const name =
    document.createElement("span");

  name.textContent =
    file.name || "Selected file";

  chip.appendChild(name);


  const removeBtn =
    document.createElement("button");

  removeBtn.type = "button";

  removeBtn.textContent = "✕";


  removeBtn.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      removeAttachment();

    }
  );


  chip.appendChild(removeBtn);

  attachmentPreview.appendChild(chip);

  attachmentPreview.classList.add(
    "show"
  );

}


/* =========================================
   REMOVE ATTACHMENT
========================================= */

function removeAttachment() {

  selectedAttachment = null;

  selectedAttachmentType = null;


  if (attachmentPreview) {

    attachmentPreview.innerHTML = "";

    attachmentPreview.classList.remove(
      "show"
    );

  }


  if (cameraInput) {

    cameraInput.value = "";

  }


  if (photoInput) {

    photoInput.value = "";

  }


  if (fileInput) {

    fileInput.value = "";

  }

}


if (cameraInput) {

  cameraInput.addEventListener(
    "change",
    event => {

      handleAttachment(
        event.target.files[0],
        "camera"
      );

    }
  );

}


if (photoInput) {

  photoInput.addEventListener(
    "change",
    event => {

      handleAttachment(
        event.target.files[0],
        "photo"
      );

    }
  );

}


if (fileInput) {

  fileInput.addEventListener(
    "change",
    event => {

      handleAttachment(
        event.target.files[0],
        "file"
      );

    }
  );

}
/* =========================================
   SMART AI — PART 2
   =========================================
   ✅ Send Message
   ✅ Login Check
   ✅ Chat History
   ✅ Recent Chats
   ✅ Open Previous Chat
   ✅ Voice Input
   ✅ OpenRouter AI
   ========================================= */


/* =========================================
   LOGIN MODAL
========================================= */

function showLoginModal() {

  let modal = get("loginModal");

  if (modal) {

    modal.style.display = "flex";

    return;

  }

  modal =
    document.createElement("div");

  modal.id = "loginModal";

  modal.className = "smart-login-modal";

  modal.innerHTML = `
    <div class="login-box">

      <button
        class="login-close"
        id="loginCloseBtn">
        ✕
      </button>

      <div class="login-icon">🤖</div>

      <h2>Login to Smart AI</h2>

      <p>
        Please login to continue using Smart AI.
      </p>

      <button
        id="loginContinueBtn"
        class="login-main-btn">
        Login / Sign Up
      </button>

    </div>
  `;

  document.body.appendChild(modal);


  const closeBtn =
    get("loginCloseBtn");

  if (closeBtn) {

    closeBtn.onclick = () => {

      modal.style.display = "none";

    };

  }


  const continueBtn =
    get("loginContinueBtn");

  if (continueBtn) {

    continueBtn.onclick = () => {

      isLoggedIn = true;

      localStorage.setItem(
        "smartAI_logged_in",
        "true"
      );

      modal.style.display = "none";

      alert("Login successful!");

    };

  }

}


/* =========================================
   CHAT ID
========================================= */

function ensureChatId() {

  if (!currentChatId) {

    currentChatId =
      "chat_" +
      Date.now();

  }

  return currentChatId;

}


/* =========================================
   SAVE CURRENT CHAT
========================================= */

function saveCurrentChat() {

  if (
    !currentChat ||
    currentChat.length === 0
  ) {

    return;

  }


  const history =
    getChatHistory();


  const id =
    ensureChatId();


  const existingIndex =
    history.findIndex(
      chat => chat.id === id
    );


  const firstUserMessage =
    currentChat.find(
      message =>
        message.role === "user"
    );


  let title =
    firstUserMessage
      ? firstUserMessage.content
      : "New Chat";


  title =
    title.substring(0, 40);


  const chatData = {

    id: id,

    title: title,

    updatedAt: Date.now(),

    messages: currentChat

  };


  if (existingIndex !== -1) {

    history[existingIndex] =
      chatData;

  } else {

    history.unshift(chatData);

  }


  saveChatHistory(history);

  renderRecentChats();

}


/* =========================================
   ADD MESSAGE TO UI
========================================= */

function addMessageToUI(
  role,
  text
) {

  if (!chatMessages) return;


  if (welcomeScreen) {

    welcomeScreen.style.display =
      "none";

  }


  const message =
    document.createElement("div");


  message.className =
    "chat-message " +
    role;


  const bubble =
    document.createElement("div");


  bubble.className =
    "message-bubble";


  bubble.textContent =
    text;


  message.appendChild(bubble);


  chatMessages.appendChild(message);


  chatMessages.scrollTop =
    chatMessages.scrollHeight;

}


/* =========================================
   TYPING MESSAGE
========================================= */

function addTypingMessage() {

  if (!chatMessages) return null;


  const message =
    document.createElement("div");

  message.className =
    "chat-message assistant";


  const bubble =
    document.createElement("div");

  bubble.className =
    "message-bubble typing";


  bubble.innerHTML =
    `
      <span></span>
      <span></span>
      <span></span>
    `;


  message.appendChild(bubble);

  chatMessages.appendChild(message);


  chatMessages.scrollTop =
    chatMessages.scrollHeight;


  return message;

}


/* =========================================
   SEND MESSAGE
========================================= */

async function sendMessage() {

  const text =
    messageInput
      ? messageInput.value.trim()
      : "";


  if (
    !text &&
    !selectedAttachment
  ) {

    return;

  }


  /*
   LOGIN CHECK
  */

  if (!isLoggedIn) {

    showLoginModal();

    return;

  }


  ensureChatId();


  let userText =
    text || "Please analyze this attachment.";


  if (selectedAttachment) {

    userText +=
      "\n[Attachment: " +
      selectedAttachment.name +
      "]";

  }


  /*
   ADD USER MESSAGE
  */

  currentChat.push({

    role: "user",

    content: userText,

    time: Date.now()

  });


  addMessageToUI(
    "user",
    userText
  );


  /*
   CLEAR INPUT
  */

  if (messageInput) {

    messageInput.value = "";

  }


  removeAttachment();


  saveCurrentChat();


  /*
   TYPING
  */

  const typingMessage =
    addTypingMessage();


  /*
   AI RESPONSE
  */

  try {

    const reply =
      await getSmartAIResponse(
        userText
      );


    if (typingMessage) {

      typingMessage.remove();

    }


    currentChat.push({

      role: "assistant",

      content: reply,

      time: Date.now()

    });


    addMessageToUI(
      "assistant",
      reply
    );


    saveCurrentChat();


  } catch (error) {

    console.error(
      "Smart AI Error:",
      error
    );


    if (typingMessage) {

      typingMessage.remove();

    }


    const errorMessage =
      "Sorry, Smart AI could not connect right now. Please check your AI API connection.";


    currentChat.push({

      role: "assistant",

      content: errorMessage,

      time: Date.now()

    });


    addMessageToUI(
      "assistant",
      errorMessage
    );


    saveCurrentChat();

  }

}


/* =========================================
   SEND BUTTON
========================================= */

if (sendBtn) {

  sendBtn.addEventListener(
    "click",
    sendMessage
  );

}


/* =========================================
   ENTER TO SEND
========================================= */

if (messageInput) {

  messageInput.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        sendMessage();

      }

    }
  );

}


/* =========================================
   OPENROUTER AI
========================================= */

async function getSmartAIResponse(
  userMessage
) {

  /*
   IMPORTANT:
   Put your OpenRouter API key here.
  */

  const OPENROUTER_API_KEY =
    localStorage.getItem(
      "smartAI_openrouter_key"
    );


  if (!OPENROUTER_API_KEY) {

    throw new Error(
      "OpenRouter API key missing"
    );

  }


  /*
   SEND PREVIOUS CHAT CONTEXT
  */

  const messages =
    currentChat.map(
      message => ({

        role: message.role,

        content: message.content

      })
    );


  const response =
    await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          "Authorization":
            "Bearer " +
            OPENROUTER_API_KEY,

          "HTTP-Referer":
            window.location.origin,

          "X-Title":
            "Smart AI"

        },

        body: JSON.stringify({

          model:
            "openai/gpt-4o-mini",

          messages: [

            {
              role: "system",

              content:
                "You are Smart AI, a helpful, friendly and intelligent AI assistant. Give clear and useful answers."
            },

            ...messages

          ],

          temperature: 0.7

        })

      }
    );


  if (!response.ok) {

    const errorText =
      await response.text();

    console.error(
      "OpenRouter Error:",
      errorText
    );

    throw new Error(
      "OpenRouter request failed"
    );

  }


  const data =
    await response.json();


  const answer =
    data &&
    data.choices &&
    data.choices[0] &&
    data.choices[0].message
      ? data.choices[0].message.content
      : "";


  if (!answer) {

    throw new Error(
      "Empty AI response"
    );

  }


  return answer;

}


/* =========================================
   RECENT CHAT RENDER
========================================= */

function renderRecentChats() {

  if (!recentChats) return;


  const history =
    getChatHistory();


  recentChats.innerHTML = "";


  if (
    history.length === 0
  ) {

    recentChats.innerHTML =
      `
        <div class="no-recent-chat">
          No recent chats
        </div>
      `;

    return;

  }


  history
    .slice(0, 20)
    .forEach(chat => {

      const item =
        document.createElement("button");


      item.className =
        "recent-chat-item";


      item.textContent =
        chat.title || "New Chat";


      item.title =
        chat.title || "New Chat";


      item.addEventListener(
        "click",
        () => {

          openPreviousChat(
            chat.id
          );

        }
      );


      recentChats.appendChild(item);

    });

}


/* =========================================
   OPEN PREVIOUS CHAT
========================================= */

function openPreviousChat(
  chatId
) {

  const history =
    getChatHistory();


  const chat =
    history.find(
      item =>
        item.id === chatId
    );


  if (!chat) return;


  currentChatId =
    chat.id;


  currentChat =
    Array.isArray(chat.messages)
      ? [...chat.messages]
      : [];


  if (chatMessages) {

    chatMessages.innerHTML = "";

  }


  if (welcomeScreen) {

    welcomeScreen.style.display =
      currentChat.length
        ? "none"
        : "flex";

  }


  currentChat.forEach(
    message => {

      addMessageToUI(
        message.role,
        message.content
      );

    }
  );


  showScreen(chatScreen);

  closeSidebarMenu();

}


/* =========================================
   LOAD RECENT CHATS
========================================= */

renderRecentChats();


/* =========================================
   VOICE INPUT
========================================= */

let speechRecognition = null;

let isListening = false;


const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;


if (
  SpeechRecognition &&
  micBtn
) {

  speechRecognition =
    new SpeechRecognition();


  speechRecognition.lang =
    "en-IN";


  speechRecognition.continuous =
    false;


  speechRecognition.interimResults =
    false;


  micBtn.addEventListener(
    "click",
    () => {

      if (isListening) {

        speechRecognition.stop();

        return;

      }


      try {

        speechRecognition.start();

      } catch (error) {

        console.log(
          "Voice already running"
        );

      }

    }
  );


  speechRecognition.onstart =
    () => {

      isListening = true;

      micBtn.classList.add(
        "listening"
      );

    };


  speechRecognition.onresult =
    event => {

      const transcript =
        event.results[0][0].transcript;


      if (messageInput) {

        messageInput.value +=
          (
            messageInput.value
              ? " "
              : ""
          ) +
          transcript;

        messageInput.focus();

      }

    };


  speechRecognition.onerror =
    error => {

      console.error(
        "Voice Error:",
        error
      );

    };


  speechRecognition.onend =
    () => {

      isListening = false;

      micBtn.classList.remove(
        "listening"
      );

    };

} else if (micBtn) {

  micBtn.addEventListener(
    "click",
    () => {

      alert(
        "Voice input is not supported in this browser."
      );

    }
  );

}


/* =========================================
   VIDEO TRIAL UI
========================================= */

function updateVideoTrialUI() {

  const trialText =
    get("videoTrialText");

  const upgradeBtn =
    get("upgradeVideoBtn");


  const remaining =
    Math.max(
      0,
      3 - videoFreeTrials
    );


  if (trialText) {

    trialText.textContent =
      remaining +
      " free video trial" +
      (
        remaining === 1
          ? ""
          : "s"
      ) +
      " remaining";

  }


  if (upgradeBtn) {

    upgradeBtn.style.display =
      remaining <= 0
        ? "block"
        : "none";

  }

}


/* =========================================
   VIDEO TRIAL CHECK
========================================= */

function canGenerateVideo() {

  if (
    videoFreeTrials >= 3
  ) {

    return false;

  }

  return true;

}


/* =========================================
   USE VIDEO TRIAL
========================================= */

function useVideoTrial() {

  if (!canGenerateVideo()) {

    updateVideoTrialUI();

    return false;

  }


  videoFreeTrials++;


  localStorage.setItem(
    "smartAI_video_trials",
    String(videoFreeTrials)
  );


  updateVideoTrialUI();


  return true;

}


/* =========================================
   INITIAL VIDEO UI
========================================= */

updateVideoTrialUI();


/* =========================================
   SMART AI STARTUP
========================================= */

console.log(
  "Smart AI loaded successfully."
);

console.log(
  "Logged in:",
  isLoggedIn
);

console.log(
  "Video trials used:",
  videoFreeTrials
);
