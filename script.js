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
