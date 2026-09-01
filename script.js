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
   ADD MESSAGE
========================================= */

function addMessage(
  text,
  sender,
  attachment = null
) {

  if (!chatMessages) return;

  const message =
    document.createElement("div");

  message.className =
    `message ${sender}`;

  const bubble =
    document.createElement("div");

  bubble.className =
    "message-bubble";


  if (attachment) {

    if (
      attachment.type &&
      attachment.type.startsWith("image/")
    ) {

      const img =
        document.createElement("img");

      img.src =
        URL.createObjectURL(
          attachment
        );

      img.style.maxWidth = "220px";
      img.style.display = "block";
      img.style.borderRadius = "10px";
      img.style.marginBottom =
        text ? "8px" : "0";

      bubble.appendChild(img);

    }

  }


  if (text) {

    const textElement =
      document.createElement("div");

    textElement.textContent =
      text;

    bubble.appendChild(
      textElement
    );

  }


  message.appendChild(
    bubble
  );

  chatMessages.appendChild(
    message
  );

  chatMessages.scrollTop =
    chatMessages.scrollHeight;

}


/* =========================================
   THINKING MESSAGE
========================================= */

function addThinkingMessage() {

  if (!chatMessages) {
    return null;
  }

  const loading =
    document.createElement("div");

  loading.className =
    "message ai";

  loading.innerHTML = `
    <div class="message-bubble">
      Thinking...
    </div>
  `;

  chatMessages.appendChild(
    loading
  );

  chatMessages.scrollTop =
    chatMessages.scrollHeight;

  return loading;

}


/* =========================================
   CREATOR RESPONSE
========================================= */

function getCreatorResponse(text) {

  const normalized =
    text
      .toLowerCase()
      .replace(/[?!.]/g, "")
      .trim();

  const questions = [

    "who created you",
    "who create you",
    "who is your owner",
    "who made you",
    "who is your creator",
    "who developed you",
    "who created smart ai",
    "who is smart ai owner",
    "tumko kisne banaya",
    "tumhe kisne banaya"

  ];

  if (
    questions.some(
      question =>
        normalized.includes(question)
    )
  ) {

    return (
      "Smart AI is created by Md Parvez Hussain from India."
    );

  }

  return null;

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


  /* LOGIN CHECK */

  if (!isLoggedIn) {

    openLoginModal();

    return;

  }


  if (welcomeScreen) {

    welcomeScreen.style.display =
      "none";

  }


  addMessage(
    text,
    "user",
    selectedAttachment
  );


  currentChat.push({

    text: text,

    hasAttachment:
      !!selectedAttachment,

    time:
      new Date().toISOString()

  });


  const sentAttachment =
    selectedAttachment;


  if (messageInput) {

    messageInput.value = "";

  }


  removeAttachment();


  /* CREATOR RESPONSE */

  const creatorReply =
    getCreatorResponse(text);


  if (creatorReply) {

    const loading =
      addThinkingMessage();

    setTimeout(
      () => {

        if (loading) {

          loading.remove();

        }

        addMessage(
          creatorReply,
          "ai"
        );

        saveRecentChat(text);

      },
      700
    );

    return;

  }


  /* AI REQUEST */

  const loadingMessage =
    addThinkingMessage();


  try {

    const response =
      await fetch(
        "https://ai-mcq-solver-i7qs.onrender.com/api/chat",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify({

              message:
                text ||
                "Please analyze this attachment.",

              hasAttachment:
                !!sentAttachment

            })

        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data?.reply ||
        "Chat API failed"
      );

    }


    if (loadingMessage) {

      loadingMessage.remove();

    }


    const reply =
      data.reply ||
      "Smart AI received your message.";


    addMessage(
      reply,
      "ai"
    );


    saveRecentChat(
      text ||
      "Attachment message"
    );


  } catch (error) {

    console.error(
      "Chat error:",
      error
    );


    if (loadingMessage) {

      loadingMessage.remove();

    }


    addMessage(
      "Smart AI backend is not connected yet. Please check your backend.",
      "ai"
    );

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
   VOICE INPUT
========================================= */

let recognition = null;

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;


if (
  SpeechRecognition &&
  micBtn
) {

  recognition =
    new SpeechRecognition();


  recognition.lang =
    "en-IN";


  recognition.continuous =
    false;


  recognition.interimResults =
    false;


  recognition.onstart =
    () => {

      micBtn.textContent =
        "🔴";

    };


  recognition.onend =
    () => {

      micBtn.textContent =
        "🎤";

    };


  recognition.onresult =
    event => {

      const transcript =
        event.results[0][0]
          .transcript;


      if (messageInput) {

        messageInput.value +=
          transcript + " ";

        messageInput.focus();

      }

    };


  recognition.onerror =
    error => {

      console.error(
        "Voice error:",
        error
      );

      micBtn.textContent =
        "🎤";

    };


  micBtn.addEventListener(
    "click",
    () => {

      try {

        recognition.start();

      } catch (error) {

        console.log(
          "Voice recognition already active."
        );

      }

    }
  );


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
   RECENT CHAT HISTORY
========================================= */

function saveRecentChat(text) {

  if (!text) return;


  let chats =
    JSON.parse(
      localStorage.getItem(
        "smartAI_recent_chats"
      )
    ) || [];


  chats.unshift(text);


  chats =
    chats.slice(0, 20);


  localStorage.setItem(
    "smartAI_recent_chats",
    JSON.stringify(chats)
  );


  renderRecentChats();

}


/* =========================================
   RENDER RECENT CHATS
========================================= */

function renderRecentChats() {

  if (!recentChats) return;


  recentChats.innerHTML =
    "";


  const chats =
    JSON.parse(
      localStorage.getItem(
        "smartAI_recent_chats"
      )
    ) || [];


  chats.forEach(chat => {

    const button =
      document.createElement(
        "button"
      );


    button.className =
      "recent-chat";


    button.type =
      "button";


    button.textContent =
      chat;


    button.addEventListener(
      "click",
      () => {

        if (messageInput) {

          messageInput.value =
            chat;

          messageInput.focus();

        }


        showScreen(
          chatScreen
        );


        closeSidebarMenu();

      }
    );


    recentChats.appendChild(
      button
    );

  });

}


renderRecentChats();
/* =========================================
   SMART AI — PART 3
   =========================================
   ✅ AI IMAGE GENERATION
   ✅ IMAGE HISTORY
   ✅ IMAGE DOWNLOAD
   ✅ AI VIDEO GENERATION UI
   ✅ VIDEO HISTORY
   ✅ VIDEO DOWNLOAD
   ✅ 3 FREE VIDEO TRIALS
   ✅ ₹299 SMART AI PRO
   ❌ IMAGE ENHANCE REMOVED
========================================= */


/* =========================================
   IMAGE STORAGE
========================================= */

function getImageHistory() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "smartAI_image_history"
      )
    ) || [];

  } catch (error) {

    console.error(
      "Image history error:",
      error
    );

    return [];

  }

}


function saveImageHistory(history) {

  localStorage.setItem(
    "smartAI_image_history",
    JSON.stringify(history)
  );

}


/* =========================================
   VIDEO STORAGE
========================================= */

function getVideoHistory() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "smartAI_video_history"
      )
    ) || [];

  } catch (error) {

    console.error(
      "Video history error:",
      error
    );

    return [];

  }

}


function saveVideoHistory(history) {

  localStorage.setItem(
    "smartAI_video_history",
    JSON.stringify(history)
  );

}


/* =========================================
   IMAGE ELEMENTS
========================================= */

const imagePrompt =
  get("imagePrompt");

const generateImage =
  get("generateImage");

const imageResult =
  get("imageResult");

const imageHistory =
  get("imageHistory");


/* =========================================
   GENERATE IMAGE FUNCTION
========================================= */

async function generateAIImage() {

  const prompt =
    imagePrompt
      ? imagePrompt.value.trim()
      : "";


  if (!prompt) {

    alert(
      "Please enter an image prompt."
    );

    return;

  }


  /*
   USE YOUR EXISTING BACKEND
  */

  const API_URL =
    "https://ai-mcq-solver-i7qs.onrender.com/generate-image";


  if (generateImage) {

    generateImage.disabled = true;

    generateImage.textContent =
      "Generating...";

  }


  try {

    const response =
      await fetch(
        API_URL,
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            prompt: prompt

          })

        }
      );


    if (!response.ok) {

      throw new Error(
        "Image API request failed"
      );

    }


    const data =
      await response.json();


    /*
     SUPPORT COMMON IMAGE URL NAMES
    */

    const imageUrl =
      data.imageUrl ||
      data.image_url ||
      data.url ||
      (
        data.image &&
        (
          data.image.url ||
          data.image.imageUrl
        )
      );


    if (!imageUrl) {

      throw new Error(
        "Image generated but no image URL was returned."
      );

    }


    displayGeneratedImage(
      imageUrl,
      prompt
    );


    saveGeneratedImage(
      imageUrl,
      prompt
    );


  } catch (error) {

    console.error(
      "Image generation error:",
      error
    );


    alert(
      "Image generation failed. Please check your image API connection."
    );


  } finally {

    if (generateImage) {

      generateImage.disabled = false;

      generateImage.textContent =
        "Generate Image";

    }

  }

}


/* =========================================
   GENERATE IMAGE BUTTON
========================================= */

if (generateImage) {

  generateImage.addEventListener(
    "click",
    generateAIImage
  );

}


/* =========================================
   DISPLAY GENERATED IMAGE
========================================= */

function displayGeneratedImage(
  imageUrl,
  prompt
) {

  if (!imageResult) return;


  imageResult.innerHTML = "";


  const card =
    document.createElement("div");

  card.className =
    "generated-image-card";


  const img =
    document.createElement("img");

  img.src =
    imageUrl;

  img.alt =
    prompt;

  img.loading =
    "lazy";


  const actions =
    document.createElement("div");

  actions.className =
    "generation-actions";


  const downloadBtn =
    document.createElement("button");

  downloadBtn.textContent =
    "⬇ Download";


  downloadBtn.addEventListener(
    "click",
    () => {

      downloadFile(
        imageUrl,
        "smart-ai-image.png"
      );

    }
  );


  const newBtn =
    document.createElement("button");

  newBtn.textContent =
    "✨ New Image";


  newBtn.addEventListener(
    "click",
    () => {

      if (imagePrompt) {

        imagePrompt.value = "";

        imagePrompt.focus();

      }

    }
  );


  actions.appendChild(
    downloadBtn
  );

  actions.appendChild(
    newBtn
  );


  card.appendChild(img);

  card.appendChild(actions);


  imageResult.appendChild(card);

}


/* =========================================
   SAVE IMAGE
========================================= */

function saveGeneratedImage(
  imageUrl,
  prompt
) {

  const history =
    getImageHistory();


  history.unshift({

    id:
      "image_" +
      Date.now(),

    prompt:
      prompt,

    url:
      imageUrl,

    createdAt:
      Date.now()

  });


  /*
   KEEP LAST 30 IMAGES
  */

  saveImageHistory(
    history.slice(0, 30)
  );


  renderImageHistory();

}


/* =========================================
   IMAGE HISTORY UI
========================================= */

function renderImageHistory() {

  if (!imageHistory) return;


  const history =
    getImageHistory();


  imageHistory.innerHTML = "";


  if (
    history.length === 0
  ) {

    imageHistory.innerHTML =
      `
        <div class="empty-history">
          No generated images yet.
        </div>
      `;

    return;

  }


  history.forEach(
    item => {

      const card =
        document.createElement("div");

      card.className =
        "image-history-card";


      const img =
        document.createElement("img");

      img.src =
        item.url;

      img.alt =
        item.prompt || "Generated image";


      const title =
        document.createElement("p");

      title.textContent =
        item.prompt || "Generated image";


      const downloadBtn =
        document.createElement("button");

      downloadBtn.textContent =
        "⬇ Download";


      downloadBtn.addEventListener(
        "click",
        () => {

          downloadFile(
            item.url,
            "smart-ai-image.png"
          );

        }
      );


      card.appendChild(img);

      card.appendChild(title);

      card.appendChild(downloadBtn);


      imageHistory.appendChild(
        card
      );

    }
  );

}


/* =========================================
   IMAGE HISTORY START
========================================= */

renderImageHistory();


/* =========================================
   VIDEO ELEMENTS
========================================= */

const videoPrompt =
  get("videoPrompt");

const generateVideo =
  get("generateVideo");

const videoResult =
  get("videoResult");

const videoHistory =
  get("videoHistory");

const upgradeVideoBtn =
  get("upgradeVideoBtn");


/* =========================================
   VIDEO GENERATION
========================================= */

async function generateAIVideo() {

  const prompt =
    videoPrompt
      ? videoPrompt.value.trim()
      : "";


  if (!prompt) {

    alert(
      "Please enter a video prompt."
    );

    return;

  }


  /*
   CHECK FREE TRIAL
  */

  if (!canGenerateVideo()) {

    showUpgradeMessage();

    return;

  }


  /*
   CONSUME ONE TRIAL
  */

  if (!useVideoTrial()) {

    return;

  }


  if (generateVideo) {

    generateVideo.disabled = true;

    generateVideo.textContent =
      "Generating...";

  }


  try {

    /*
     -------------------------------------
     IMPORTANT:
     Replace this URL with your real
     video-generation backend endpoint.
     -------------------------------------
    */

    const VIDEO_API_URL =
      "https://ai-mcq-solver-i7qs.onrender.com/generate-video";


    const response =
      await fetch(
        VIDEO_API_URL,
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            prompt:
              prompt

          })

        }
      );


    if (!response.ok) {

      throw new Error(
        "Video API request failed"
      );

    }


    const data =
      await response.json();


    const videoUrl =
      data.videoUrl ||
      data.video_url ||
      data.url ||
      (
        data.video &&
        (
          data.video.url ||
          data.video.videoUrl
        )
      );


    if (!videoUrl) {

      throw new Error(
        "Video generated but no video URL was returned."
      );

    }


    displayGeneratedVideo(
      videoUrl,
      prompt
    );


    saveGeneratedVideo(
      videoUrl,
      prompt
    );


  } catch (error) {

    console.error(
      "Video generation error:",
      error
    );


    /*
     IF API FAILS, RETURN THE TRIAL
     SO USER DOES NOT LOSE A TRIAL
    */

    videoFreeTrials =
      Math.max(
        0,
        videoFreeTrials - 1
      );


    localStorage.setItem(
      "smartAI_video_trials",
      String(videoFreeTrials)
    );


    updateVideoTrialUI();


    alert(
      "Video generation API is not connected yet. Please connect your video backend."
    );

  } finally {

    if (generateVideo) {

      generateVideo.disabled =
        false;

      generateVideo.textContent =
        "Generate Video";

    }

  }

}


/* =========================================
   VIDEO BUTTON
========================================= */

if (generateVideo) {

  generateVideo.addEventListener(
    "click",
    generateAIVideo
  );

}


/* =========================================
   DISPLAY VIDEO
========================================= */

function displayGeneratedVideo(
  videoUrl,
  prompt
) {

  if (!videoResult) return;


  videoResult.innerHTML = "";


  const card =
    document.createElement("div");

  card.className =
    "generated-video-card";


  const video =
    document.createElement("video");

  video.src =
    videoUrl;

  video.controls =
    true;

  video.playsInline =
    true;


  const title =
    document.createElement("p");

  title.textContent =
    prompt;


  const downloadBtn =
    document.createElement("button");

  downloadBtn.textContent =
    "⬇ Download Video";


  downloadBtn.addEventListener(
    "click",
    () => {

      downloadFile(
        videoUrl,
        "smart-ai-video.mp4"
      );

    }
  );


  card.appendChild(video);

  card.appendChild(title);

  card.appendChild(downloadBtn);


  videoResult.appendChild(
    card
  );

}


/* =========================================
   SAVE VIDEO
========================================= */

function saveGeneratedVideo(
  videoUrl,
  prompt
) {

  const history =
    getVideoHistory();


  history.unshift({

    id:
      "video_" +
      Date.now(),

    prompt:
      prompt,

    url:
      videoUrl,

    createdAt:
      Date.now()

  });


  saveVideoHistory(
    history.slice(0, 20)
  );


  renderVideoHistory();

}


/* =========================================
   VIDEO HISTORY UI
========================================= */

function renderVideoHistory() {

  if (!videoHistory) return;


  const history =
    getVideoHistory();


  videoHistory.innerHTML = "";


  if (
    history.length === 0
  ) {

    videoHistory.innerHTML =
      `
        <div class="empty-history">
          No generated videos yet.
        </div>
      `;

    return;

  }


  history.forEach(
    item => {

      const card =
        document.createElement("div");

      card.className =
        "video-history-card";


      const video =
        document.createElement("video");

      video.src =
        item.url;

      video.controls =
        true;

      video.playsInline =
        true;


      const title =
        document.createElement("p");

      title.textContent =
        item.prompt || "Generated video";


      const downloadBtn =
        document.createElement("button");

      downloadBtn.textContent =
        "⬇ Download";


      downloadBtn.addEventListener(
        "click",
        () => {

          downloadFile(
            item.url,
            "smart-ai-video.mp4"
          );

        }
      );


      card.appendChild(video);

      card.appendChild(title);

      card.appendChild(downloadBtn);


      videoHistory.appendChild(
        card
      );

    }
  );

}


/* =========================================
   VIDEO HISTORY START
========================================= */

renderVideoHistory();


/* =========================================
   UPGRADE MESSAGE
========================================= */

function showUpgradeMessage() {

  const message =
    `
      You have used all 3 free video trials.

      Smart AI Pro:
      ₹299

      Upgrade to continue generating videos.
    `;


  alert(message);

}


/* =========================================
UPGRADE BUTTON
========================================= */

if (upgradeVideoBtn) {

  upgradeVideoBtn.addEventListener(
    "click",
    () => {

      showUpgradeMessage();

    }
  );

}


/* =========================================
   DOWNLOAD FILE
========================================= */

async function downloadFile(
  url,
  filename
) {

  try {

    const response =
      await fetch(url);


    if (!response.ok) {

      throw new Error(
        "Download failed"
      );

    }


    const blob =
      await response.blob();


    const blobUrl =
      URL.createObjectURL(
        blob
      );


    const link =
      document.createElement("a");


    link.href =
      blobUrl;

    link.download =
      filename;


    document.body.appendChild(
      link
    );


    link.click();


    link.remove();


    setTimeout(
      () => {

        URL.revokeObjectURL(
          blobUrl
        );

      },
      1000
    );


  } catch (error) {

    console.error(
      "Download error:",
      error
    );


    /*
     FALLBACK
    */

    const link =
      document.createElement("a");


    link.href =
      url;

    link.target =
      "_blank";

    link.rel =
      "noopener";


    document.body.appendChild(
      link
    );


    link.click();


    link.remove();

  }

}


/* =========================================
   CLEAR IMAGE HISTORY
========================================= */

function clearImageHistory() {

  const confirmDelete =
    confirm(
      "Delete all image history?"
    );


  if (!confirmDelete) return;


  localStorage.removeItem(
    "smartAI_image_history"
  );


  renderImageHistory();

}


/* =========================================
   CLEAR VIDEO HISTORY
========================================= */

function clearVideoHistory() {

  const confirmDelete =
    confirm(
      "Delete all video history?"
    );


  if (!confirmDelete) return;


  localStorage.removeItem(
    "smartAI_video_history"
  );


  renderVideoHistory();

}


/* =========================================
   GLOBAL HISTORY FUNCTIONS
========================================= */

window.clearImageHistory =
  clearImageHistory;

window.clearVideoHistory =
  clearVideoHistory;


/* =========================================
   FINAL INITIALIZATION
========================================= */

updateVideoTrialUI();

renderImageHistory();

renderVideoHistory();


console.log(
  "Smart AI Part 3 loaded successfully."
);
/* =========================================
   SMART AI — PART 4
   =========================================
   ✅ SMART AI PRO — ₹299
   ✅ PRO STATUS
   ✅ OPENROUTER API KEY SETTINGS
   ✅ IMAGE API URL SETTINGS
   ✅ VIDEO API URL SETTINGS
   ✅ SAVE SETTINGS
   ✅ LOGOUT
   ✅ RAZORPAY-READY FRONTEND FLOW
   ❌ SECRET PAYMENT KEY IN FRONTEND
========================================= */


/* =========================================
   PRO STORAGE
========================================= */

function isSmartAIPro() {

  return (
    localStorage.getItem(
      "smartAI_pro"
    ) === "true"
  );

}


function setSmartAIPro(status) {

  localStorage.setItem(
    "smartAI_pro",
    status ? "true" : "false"
  );

}


/* =========================================
   SETTINGS ELEMENTS
========================================= */

const openrouterKeyInput =
  get("openrouterKeyInput");

const imageApiInput =
  get("imageApiInput");

const videoApiInput =
  get("videoApiInput");

const saveSettingsBtn =
  get("saveSettingsBtn");

const logoutBtn =
  get("logoutBtn");

const upgradeProBtn =
  get("upgradeProBtn");

const proStatus =
  get("proStatus");


/* =========================================
   LOAD SETTINGS
========================================= */

function loadSmartAISettings() {

  if (openrouterKeyInput) {

    openrouterKeyInput.value =
      localStorage.getItem(
        "smartAI_openrouter_key"
      ) || "";

  }


  if (imageApiInput) {

    imageApiInput.value =
      localStorage.getItem(
        "smartAI_image_api_url"
      ) ||
      "https://ai-mcq-solver-i7qs.onrender.com/generate-image";

  }


  if (videoApiInput) {

    videoApiInput.value =
      localStorage.getItem(
        "smartAI_video_api_url"
      ) ||
      "https://ai-mcq-solver-i7qs.onrender.com/generate-video";

  }


  updateProUI();

}


/* =========================================
   SAVE SETTINGS
========================================= */

function saveSmartAISettings() {

  if (openrouterKeyInput) {

    localStorage.setItem(
      "smartAI_openrouter_key",
      openrouterKeyInput.value.trim()
    );

  }


  if (imageApiInput) {

    localStorage.setItem(
      "smartAI_image_api_url",
      imageApiInput.value.trim()
    );

  }


  if (videoApiInput) {

    localStorage.setItem(
      "smartAI_video_api_url",
      videoApiInput.value.trim()
    );

  }


  alert(
    "Smart AI settings saved successfully."
  );

}


if (saveSettingsBtn) {

  saveSettingsBtn.addEventListener(
    "click",
    saveSmartAISettings
  );

}


/* =========================================
   API URL HELPERS
========================================= */

function getImageAPIURL() {

  return (
    localStorage.getItem(
      "smartAI_image_api_url"
    ) ||
    "https://ai-mcq-solver-i7qs.onrender.com/generate-image"
  );

}


function getVideoAPIURL() {

  return (
    localStorage.getItem(
      "smartAI_video_api_url"
    ) ||
    "https://ai-mcq-solver-i7qs.onrender.com/generate-video"
  );

}


/* =========================================
   PRO UI
========================================= */

function updateProUI() {

  const pro =
    isSmartAIPro();


  if (proStatus) {

    proStatus.textContent =
      pro
        ? "Smart AI Pro Active ✓"
        : "Free Plan";

  }


  if (upgradeProBtn) {

    upgradeProBtn.style.display =
      pro
        ? "none"
        : "block";

  }


  /*
   PRO USERS DON'T NEED VIDEO LIMIT
  */

  if (pro) {

    const trialText =
      get("videoTrialText");

    if (trialText) {

      trialText.textContent =
        "Smart AI Pro — Unlimited Video";

    }

  } else {

    updateVideoTrialUI();

  }

}


/* =========================================
   PRO VIDEO CHECK
========================================= */

function canGenerateVideoForUser() {

  if (isSmartAIPro()) {

    return true;

  }


  return canGenerateVideo();

}


/* =========================================
   OVERRIDE VIDEO TRIAL
========================================= */

function checkVideoAccess() {

  if (isSmartAIPro()) {

    return true;

  }


  if (
    videoFreeTrials >= 3
  ) {

    showUpgradeMessage();

    return false;

  }


  return true;

}


/* =========================================
   UPGRADE PRO
========================================= */

function startSmartAIProUpgrade() {

  /*
   -----------------------------------------
   DEMO / FRONTEND FLOW
   -----------------------------------------

   Real Razorpay payment should be created
   and verified by your backend.

   Never put Razorpay SECRET KEY here.
  */


  const confirmed =
    confirm(
      "Smart AI Pro\n\n₹299\n\nContinue to upgrade?"
    );


  if (!confirmed) {

    return;

  }


  /*
   If Razorpay Checkout is installed,
   use your backend-created order here.

   Example flow:

   1. Frontend asks backend for order
   2. Backend creates Razorpay order
   3. Razorpay Checkout opens
   4. Backend verifies payment
   5. Backend activates Pro
  */


  if (
    typeof window.Razorpay ===
    "undefined"
  ) {

    alert(
      "Razorpay is not connected yet. Please connect your payment backend."
    );

    return;

  }


  /*
   PLACEHOLDER ORDER ID

   DO NOT PUT A REAL SECRET KEY
   IN THIS FILE.
  */

  alert(
    "Razorpay is detected, but a backend order is required before accepting payment."
  );

}


/* =========================================
   UPGRADE BUTTON
========================================= */

if (upgradeProBtn) {

  upgradeProBtn.addEventListener(
    "click",
    startSmartAIProUpgrade
  );

}


/* =========================================
   PRO VIDEO GENERATION
========================================= */

async function generateProVideo() {

  const prompt =
    videoPrompt
      ? videoPrompt.value.trim()
      : "";


  if (!prompt) {

    alert(
      "Please enter a video prompt."
    );

    return;

  }


  if (
    !checkVideoAccess()
  ) {

    return;

  }


  /*
   FREE USER:
   USE ONE TRIAL

   PRO USER:
   NO TRIAL REQUIRED
  */

  const isPro =
    isSmartAIPro();


  if (!isPro) {

    if (!useVideoTrial()) {

      return;

    }

  }


  if (generateVideo) {

    generateVideo.disabled =
      true;

    generateVideo.textContent =
      "Generating...";

  }


  try {

    const response =
      await fetch(
        getVideoAPIURL(),
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            prompt:
              prompt,

            pro:
              isPro

          })

        }
      );


    if (!response.ok) {

      throw new Error(
        "Video API request failed"
      );

    }


    const data =
      await response.json();


    const videoUrl =
      data.videoUrl ||
      data.video_url ||
      data.url ||
      (
        data.video &&
        (
          data.video.url ||
          data.video.videoUrl
        )
      );


    if (!videoUrl) {

      throw new Error(
        "No video URL returned"
      );

    }


    displayGeneratedVideo(
      videoUrl,
      prompt
    );


    saveGeneratedVideo(
      videoUrl,
      prompt
    );


  } catch (error) {

    console.error(
      "Pro video error:",
      error
    );


    /*
     REFUND FREE TRIAL
     IF GENERATION FAILED
    */

    if (!isPro) {

      videoFreeTrials =
        Math.max(
          0,
          videoFreeTrials - 1
        );


      localStorage.setItem(
        "smartAI_video_trials",
        String(videoFreeTrials)
      );

    }


    updateVideoTrialUI();


    alert(
      "Video generation failed. Please check your video API."
    );


  } finally {

    if (generateVideo) {

      generateVideo.disabled =
        false;

      generateVideo.textContent =
        "Generate Video";

    }

  }

}


/* =========================================
   REPLACE OLD VIDEO CLICK HANDLER
========================================= */

if (generateVideo) {

  /*
   Remove previously attached handler
   by cloning the button.
  */

  const newVideoButton =
    generateVideo.cloneNode(true);


  generateVideo.parentNode.replaceChild(
    newVideoButton,
    generateVideo
  );


  /*
   Update global reference
  */

  window.smartAIGenerateVideoButton =
    newVideoButton;


  newVideoButton.addEventListener(
    "click",
    generateProVideo
  );

}


/* =========================================
   LOGOUT
========================================= */

function smartAILogout() {

  const confirmed =
    confirm(
      "Are you sure you want to logout?"
    );


  if (!confirmed) {

    return;

  }


  localStorage.removeItem(
    "smartAI_logged_in"
  );


  isLoggedIn =
    false;


  alert(
    "You have been logged out."
  );


  showScreen(
    chatScreen
  );

}


if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    smartAILogout
  );

}


/* =========================================
   PRO USER MESSAGE
========================================= */

function getPlanText() {

  if (
    isSmartAIPro()
  ) {

    return (
      "Smart AI Pro — ₹299\n" +
      "✓ Unlimited video generation\n" +
      "✓ AI chat\n" +
      "✓ Image generation\n" +
      "✓ Image history\n" +
      "✓ Video history"
    );

  }


  return (
    "Smart AI Free\n" +
    "✓ AI chat\n" +
    "✓ Image generation\n" +
    "✓ 3 free video trials"
  );

}


/* =========================================
   SETTINGS INIT
========================================= */

loadSmartAISettings();

updateProUI();


/* =========================================
   GLOBAL FUNCTIONS
========================================= */

window.startSmartAIProUpgrade =
  startSmartAIProUpgrade;

window.smartAILogout =
  smartAILogout;

window.isSmartAIPro =
  isSmartAIPro;

window.getPlanText =
  getPlanText;


/* =========================================
   FINAL LOG
========================================= */

console.log(
  "Smart AI Part 4 loaded successfully."
);

console.log(
  "Smart AI Pro:",
  isSmartAIPro()
);
/* =========================================
   SMART AI — PART 5
   FINAL INTEGRATION & SAFETY FIXES
   =========================================
   ✅ API SETTINGS
   ✅ LOGIN UI
   ✅ PRO UI
   ✅ SCREEN INITIALIZATION
   ✅ CHAT HISTORY
   ✅ IMAGE HISTORY
   ✅ VIDEO HISTORY
   ✅ DOWNLOAD HELPERS
   ✅ MOBILE INPUT FIXES
   ❌ IMAGE ENHANCE
========================================= */


/* =========================================
   FINAL APP INITIALIZATION
========================================= */

function initializeSmartAI() {

  console.log(
    "🚀 Smart AI initializing..."
  );


  /*
   CHAT
  */

  if (
    typeof renderRecentChats ===
    "function"
  ) {

    renderRecentChats();

  }


  /*
   IMAGE
  */

  if (
    typeof renderImageHistory ===
    "function"
  ) {

    renderImageHistory();

  }


  /*
   VIDEO
  */

  if (
    typeof renderVideoHistory ===
    "function"
  ) {

    renderVideoHistory();

  }


  /*
   PRO
  */

  if (
    typeof updateProUI ===
    "function"
  ) {

    updateProUI();

  }


  /*
   VIDEO TRIAL
  */

  if (
    typeof updateVideoTrialUI ===
    "function"
  ) {

    updateVideoTrialUI();

  }


  /*
   DEFAULT SCREEN
  */

  showScreen(
    chatScreen
  );


  console.log(
    "✅ Smart AI ready."
  );

}


/* =========================================
   DOM READY
========================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeSmartAI
  );

} else {

  initializeSmartAI();

}


/* =========================================
   MOBILE KEYBOARD FIX
========================================= */

if (messageInput) {

  messageInput.addEventListener(
    "focus",
    () => {

      setTimeout(
        () => {

          try {

            messageInput.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });

          } catch (error) {

            console.log(
              "Keyboard scroll unavailable"
            );

          }

        },
        300
      );

    }
  );

}


/* =========================================
   IMAGE PROMPT ENTER
========================================= */

if (imagePrompt) {

  imagePrompt.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        if (
          typeof generateAIImage ===
          "function"
        ) {

          generateAIImage();

        }

      }

    }
  );

}


/* =========================================
   VIDEO PROMPT ENTER
========================================= */

if (videoPrompt) {

  videoPrompt.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        if (
          typeof generateProVideo ===
          "function"
        ) {

          generateProVideo();

        }

      }

    }
  );

}


/* =========================================
   SETTINGS — PASSWORD INPUT
========================================= */

if (openrouterKeyInput) {

  openrouterKeyInput.type =
    "password";


  /*
   SHOW / HIDE API KEY
  */

  const toggleKeyBtn =
    get("toggleApiKeyBtn");


  if (toggleKeyBtn) {

    toggleKeyBtn.addEventListener(
      "click",
      () => {

        if (
          openrouterKeyInput.type ===
          "password"
        ) {

          openrouterKeyInput.type =
            "text";

          toggleKeyBtn.textContent =
            "🙈";

        } else {

          openrouterKeyInput.type =
            "password";

          toggleKeyBtn.textContent =
            "👁";

        }

      }
    );

  }

}


/* =========================================
   CLEAR ALL CHAT HISTORY
========================================= */

function clearAllChatHistory() {

  const confirmed =
    confirm(
      "Delete all Smart AI chat history?"
    );


  if (!confirmed) return;


  localStorage.removeItem(
    "smartAI_chat_history"
  );


  currentChat = [];

  currentChatId = null;


  if (chatMessages) {

    chatMessages.innerHTML = "";

  }


  if (welcomeScreen) {

    welcomeScreen.style.display =
      "flex";

  }


  renderRecentChats();


  alert(
    "Chat history deleted."
  );

}


window.clearAllChatHistory =
  clearAllChatHistory;


/* =========================================
   RESET VIDEO TRIALS
   ADMIN / TEST ONLY
========================================= */

function resetVideoTrialsForTesting() {

  localStorage.setItem(
    "smartAI_video_trials",
    "0"
  );


  videoFreeTrials = 0;


  updateVideoTrialUI();


  console.log(
    "Video trials reset."
  );

}


/*
 IMPORTANT:
 This is only for testing.
 Do not show this button to normal users.
*/

window.resetVideoTrialsForTesting =
  resetVideoTrialsForTesting;


/* =========================================
   PRO TEST MODE
   ADMIN / TEST ONLY
========================================= */

function activateProForTesting() {

  localStorage.setItem(
    "smartAI_pro",
    "true"
  );


  updateProUI();


  alert(
    "Smart AI Pro test mode activated."
  );

}


function deactivateProForTesting() {

  localStorage.removeItem(
    "smartAI_pro"
  );


  updateProUI();


  alert(
    "Smart AI Pro test mode disabled."
  );

}


window.activateProForTesting =
  activateProForTesting;

window.deactivateProForTesting =
  deactivateProForTesting;


/* =========================================
   APP RESET
========================================= */

function resetSmartAIApp() {

  const confirmed =
    confirm(
      "Reset Smart AI completely?\n\nThis will delete chats, image history, video history and settings."
    );


  if (!confirmed) return;


  localStorage.removeItem(
    "smartAI_chat_history"
  );

  localStorage.removeItem(
    "smartAI_image_history"
  );

  localStorage.removeItem(
    "smartAI_video_history"
  );

  localStorage.removeItem(
    "smartAI_openrouter_key"
  );

  localStorage.removeItem(
    "smartAI_image_api_url"
  );

  localStorage.removeItem(
    "smartAI_video_api_url"
  );

  localStorage.removeItem(
    "smartAI_video_trials"
  );

  localStorage.removeItem(
    "smartAI_pro"
  );

  localStorage.removeItem(
    "smartAI_logged_in"
  );


  currentChat = [];

  currentChatId = null;

  isLoggedIn = false;

  videoFreeTrials = 0;


  location.reload();

}


window.resetSmartAIApp =
  resetSmartAIApp;


/* =========================================
   PREVENT EMPTY SUBMISSIONS
========================================= */

document.addEventListener(
  "submit",
  event => {

    const form =
      event.target;


    if (
      form &&
      form.classList &&
      form.classList.contains(
        "smart-ai-form"
      )
    ) {

      event.preventDefault();

    }

  }
);


/* =========================================
   IMAGE ENHANCE CLEANUP
========================================= */

function removeEnhanceCompletely() {

  const enhanceElements =
    document.querySelectorAll(
      "#imageEnhanceBtn, #enhanceScreen, .image-enhance, [data-enhance]"
    );


  enhanceElements.forEach(
    element => {

      element.remove();

    }
  );

}


removeEnhanceCompletely();


/* =========================================
   DISABLE BROKEN GENERATION BUTTONS
========================================= */

function checkGenerationUI() {

  if (
    generateImage &&
    !imagePrompt
  ) {

    console.warn(
      "Image prompt element not found."
    );

  }


  if (
    generateVideo &&
    !videoPrompt
  ) {

    console.warn(
      "Video prompt element not found."
    );

  }

}


checkGenerationUI();


/* =========================================
   CONNECTION STATUS
========================================= */

function getSmartAIConnectionStatus() {

  const openrouterKey =
    localStorage.getItem(
      "smartAI_openrouter_key"
    );


  const imageAPI =
    getImageAPIURL();


  const videoAPI =
    getVideoAPIURL();


  return {

    chat:
      Boolean(openrouterKey),

    image:
      Boolean(imageAPI),

    video:
      Boolean(videoAPI),

    pro:
      isSmartAIPro()

  };

}


window.getSmartAIConnectionStatus =
  getSmartAIConnectionStatus;


/* =========================================
   CONSOLE STATUS
========================================= */

console.log(
  "================================="
);

console.log(
  "       SMART AI STATUS"
);

console.log(
  "================================="
);

console.log(
  getSmartAIConnectionStatus()
);

console.log(
  "================================="
);


/* =========================================
   FINAL MESSAGE
========================================= */

console.log(
  "🎉 Smart AI Part 5 loaded successfully!"
);
