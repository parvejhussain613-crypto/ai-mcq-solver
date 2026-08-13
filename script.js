/* =========================================
   SMART AI — CLEAN FINAL SCRIPT
   =========================================
   Features:
   ✅ AI Chat
   ✅ Login
   ✅ Recent Chats
   ✅ New Chat
   ✅ Camera / Photo / File
   ✅ Voice Input
   ✅ Image Generation
   ✅ Video Generation UI
   ✅ 3 Free Video Trials
   ✅ ₹299 Upgrade UI
   ✅ Download Generated Image/Video
   ❌ Image Enhance removed
========================================= */


/* =========================================
   GLOBAL STATE
========================================= */

let selectedAttachment = null;
let selectedAttachmentType = null;

let currentChat = [];

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

if (newChatBtn) {

  newChatBtn.addEventListener(
    "click",
    () => {

      currentChat = [];

      if (chatMessages) {
        chatMessages.innerHTML = "";
      }

      if (welcomeScreen) {
        welcomeScreen.style.display = "flex";
      }

      showScreen(chatScreen);

      closeSidebarMenu();

    }
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

  attachmentPreview.classList.add("show");

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


  message.appendChild(bubble);

  chatMessages.appendChild(message);

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

  chatMessages.appendChild(loading);

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
    welcomeScreen.style.display = "none";
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


  /* CREATOR */

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


  /* AI */

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


    addMessage(
      data.reply ||
      "Smart AI received your message.",
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
        event.results[0][0].transcript;

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


function renderRecentChats() {

  if (!recentChats) return;

  recentChats.innerHTML = "";

  const chats =
    JSON.parse(
      localStorage.getItem(
        "smartAI_recent_chats"
      )
    ) || [];


  chats.forEach(chat => {

    const button =
      document.createElement("button");

    button.className =
      "recent-chat";

    button.type = "button";

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

        showScreen(chatScreen);

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
   IMAGE GENERATION
========================================= */

const imagePrompt =
  get("imagePrompt");

const generateImageAction =
  get("generateImageAction");

const imageLoading =
  get("imageLoading");

const generatedImageResult =
  get("generatedImageResult");


if (generateImageAction) {

  generateImageAction.addEventListener(
    "click",
    async () => {

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


      if (imageLoading) {
        imageLoading.classList.add(
          "show"
        );
      }


      if (generatedImageResult) {

        generatedImageResult.classList.remove(
          "show"
        );

      }


      try {

        const response =
          await fetch(
            "https://ai-mcq-solver-i7qs.onrender.com/generate-image",
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify({
                  prompt: prompt
                })

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data?.message ||
            "Image API failed"
          );

        }


        displayGeneratedImage(
          data
        );


      } catch (error) {

        console.error(
          "Image generation error:",
          error
        );

        alert(
          error.message ||
          "Image generation failed."
        );

      } finally {

        if (imageLoading) {

          imageLoading.classList.remove(
            "show"
          );

        }

      }

    }
  );

}


/* =========================================
   DISPLAY GENERATED IMAGE
========================================= */

function displayGeneratedImage(data) {

  if (!generatedImageResult) {
    return;
  }


  const imageUrl =
    data.imageUrl ||
    data.url ||
    data.image;


  if (!imageUrl) {

    alert(
      data.message ||
      "Image generated, but no image was returned."
    );

    return;

  }


  generatedImageResult.innerHTML = `

    <div class="result-header">

      <span>
        Generated Image
      </span>

      <button
        class="download-btn"
        id="downloadGeneratedImage"
        type="button"
      >
        ⬇️
      </button>

    </div>

    <img
      id="generatedImageElement"
      src="${imageUrl}"
      alt="Generated Image"
    >

  `;


  generatedImageResult.classList.add(
    "show"
  );


  const downloadBtn =
    get("downloadGeneratedImage");


  if (downloadBtn) {

    downloadBtn.addEventListener(
      "click",
      () => {

        downloadFile(
          imageUrl,
          "smart-ai-generated-image"
        );

      }
    );

  }

}


/* =========================================
   IMAGE REFERENCE BUTTON
========================================= */

const imageReferenceInput =
  get("imageReferenceInput");

const uploadImageReferenceBtn =
  get("uploadImageReferenceBtn");


if (
  uploadImageReferenceBtn &&
  imageReferenceInput
) {

  uploadImageReferenceBtn.addEventListener(
    "click",
    () => {

      imageReferenceInput.click();

    }
  );

}


/* =========================================
   VIDEO GENERATION
========================================= */

const videoPrompt =
  get("videoPrompt");

const generateVideoAction =
  get("generateVideoAction");

const videoLoading =
  get("videoLoading");

const generatedVideoResult =
  get("generatedVideoResult");


function updateVideoTrialUI() {

  if (!generateVideoAction) {
    return;
  }


  const remaining =
    Math.max(
      0,
      3 - videoFreeTrials
    );


  if (remaining <= 0) {

    generateVideoAction.disabled =
      true;

    generateVideoAction.textContent =
      "🔒 Upgrade to Generate Video";

  } else {

    generateVideoAction.disabled =
      false;

    generateVideoAction.textContent =
      `🎬 Generate 8s Video (${remaining} Free Left)`;

  }

}


if (generateVideoAction) {

  generateVideoAction.addEventListener(
    "click",
    async () => {

      if (videoFreeTrials >= 3) {

        showUpgradeMessage();

        return;

      }


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


      if (videoLoading) {

        videoLoading.classList.add(
          "show"
        );

      }


      try {

        /*
          NOTE:
          Your current backend does NOT have
          a real /generate-video endpoint yet.

          This request is kept separate from
          the Chat API so it won't break Chat.
        */

        const response =
          await fetch(
            "https://ai-mcq-solver-i7qs.onrender.com/generate-video",
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify({

                  prompt: prompt,

                  duration: 8

                })

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data?.message ||
            "Video generation API is not connected yet."
          );

        }


        videoFreeTrials++;

        localStorage.setItem(
          "smartAI_video_trials",
          videoFreeTrials
        );

        updateVideoTrialUI();

        displayGeneratedVideo(
          data
        );


      } catch (error) {

        console.error(
          "Video generation error:",
          error
        );

        alert(
          error.message ||
          "Video generation API is not connected yet."
        );

      } finally {

        if (videoLoading) {

          videoLoading.classList.remove(
            "show"
          );

        }

      }

    }
  );

}


/* =========================================
   DISPLAY VIDEO
========================================= */

function displayGeneratedVideo(data) {

  if (!generatedVideoResult) {
    return;
  }


  const videoUrl =
    data.videoUrl ||
    data.url ||
    data.video;


  if (!videoUrl) {

    alert(
      data.message ||
      "Video generated, but no video URL was returned."
    );

    return;

  }


  generatedVideoResult.innerHTML = `

    <div class="result-header">

      <span>
        Generated 8s Video
      </span>

      <button
        class="download-btn"
        id="downloadGeneratedVideo"
        type="button"
      >
        ⬇️
      </button>

    </div>

    <video
      controls
      playsinline
      src="${videoUrl}"
    ></video>

  `;


  generatedVideoResult.classList.add(
    "show"
  );


  const downloadBtn =
    get("downloadGeneratedVideo");


  if (downloadBtn) {

    downloadBtn.addEventListener(
      "click",
      () => {

        downloadFile(
          videoUrl,
          "smart-ai-generated-video"
        );

      }
    );

  }

}


/* =========================================
   UPGRADE
========================================= */

function showUpgradeMessage() {

  const confirmed =
    confirm(
      "Your 3 free AI video generations are finished.\n\n" +
      "Upgrade for ₹299 to continue generating AI videos.\n\n" +
      "Press OK to view upgrade options."
    );


  if (confirmed) {
    openUpgradeModal();
  }

}


/* =========================================
   VIDEO REFERENCE
========================================= */

const videoReferenceInput =
  get("videoReferenceInput");

const uploadVideoReferenceBtn =
  get("uploadVideoReferenceBtn");


if (
  uploadVideoReferenceBtn &&
  videoReferenceInput
) {

  uploadVideoReferenceBtn.addEventListener(
    "click",
    () => {

      videoReferenceInput.click();

    }
  );

}


/* =========================================
   DOWNLOAD
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
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");


    link.href =
      blobUrl;

    link.download =
      filename;


    document.body.appendChild(link);

    link.click();

    link.remove();


    URL.revokeObjectURL(
      blobUrl
    );


  } catch (error) {

    console.error(
      "Download error:",
      error
    );

    window.open(
      url,
      "_blank"
    );

  }

}


/* =========================================
   LOGIN MODAL
========================================= */

function openLoginModal() {

  const modal =
    get("loginModal");


  if (modal) {

    modal.classList.add(
      "show"
    );

  } else {

    alert(
      "Please login to use Smart AI."
    );

  }

}


function closeLoginModal() {

  const modal =
    get("loginModal");


  if (modal) {

    modal.classList.remove(
      "show"
    );

  }

}


const closeLoginBtn =
  get("closeLoginModal");


if (closeLoginBtn) {

  closeLoginBtn.addEventListener(
    "click",
    closeLoginModal
  );

}


/* =========================================
   LOGIN FORM
========================================= */

const loginForm =
  get("loginForm");


if (loginForm) {

  loginForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const emailInput =
        get("loginEmail");


      const email =
        emailInput
          ? emailInput.value.trim()
          : "";


      if (!email) {

        alert(
          "Please enter your email."
        );

        return;

      }


      isLoggedIn = true;


      localStorage.setItem(
        "smartAI_logged_in",
        "true"
      );


      closeLoginModal();


      showScreen(chatScreen);


      if (welcomeScreen) {

        welcomeScreen.style.display =
          "flex";

      }


      if (emailInput) {
        emailInput.value = "";
      }


      alert(
        "Login successful! Welcome to Smart AI. 🎉"
      );

    }
  );

}


/* =========================================
   UPGRADE MODAL
========================================= */

function openUpgradeModal() {

  const modal =
    get("upgradeModal");


  if (modal) {

    modal.classList.add(
      "show"
    );

  } else {

    alert(
      "Upgrade plan: ₹299"
    );

  }

}


function closeUpgradeModal() {

  const modal =
    get("upgradeModal");


  if (modal) {

    modal.classList.remove(
      "show"
    );

  }

}


const closeUpgradeBtn =
  get("closeUpgradeModal");


if (closeUpgradeBtn) {

  closeUpgradeBtn.addEventListener(
    "click",
    closeUpgradeModal
  );

}


/* =========================================
   PAYMENT PLACEHOLDER
========================================= */

const upgradePaymentBtn =
  get("upgradePaymentBtn");


if (upgradePaymentBtn) {

  upgradePaymentBtn.addEventListener(
    "click",
    () => {

      alert(
        "Payment gateway is not connected yet.\n\n" +
        "Later you can connect Razorpay or UPI."
      );

    }
  );

}


/* =========================================
   CLOSE MODALS OUTSIDE CLICK
========================================= */

document.addEventListener(
  "click",
  event => {

    const loginModal =
      get("loginModal");

    const upgradeModal =
      get("upgradeModal");


    if (
      loginModal &&
      event.target === loginModal
    ) {

      closeLoginModal();

    }


    if (
      upgradeModal &&
      event.target === upgradeModal
    ) {

      closeUpgradeModal();

    }

  }
);


/* =========================================
   INITIAL UI
========================================= */

updateVideoTrialUI();


/* =========================================
   SMART AI READY
========================================= */

console.log(
  "Smart AI frontend loaded successfully 🚀"
);
