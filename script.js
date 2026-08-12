/* =========================================
   SMART AI — FINAL SCRIPT
   Main Features:
   - Sidebar
   - New Chat
   - Recent Chat History
   - Login Required
   - Camera / Photo / File Attachment
   - Image Preview + X Remove
   - Microphone Voice Input
   - AI Chat API
   - Image Generation
   - Video Generation
   - 3 Free Video Trials
   - ₹299 Upgrade UI
   - Image Enhance
   - Download Generated Image/Video
   - Creator Identity Response
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
  Number(localStorage.getItem("smartAI_video_trials")) || 0;


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
   SCREEN SWITCHING
========================================= */

function showScreen(screen) {

  const screens = [
    chatScreen,
    imageScreen,
    videoScreen,
    enhanceScreen,
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

  if (!sidebar) return;

  sidebar.classList.add("open");

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
   IMAGE ENHANCE
========================================= */

if (imageEnhanceBtn) {

  imageEnhanceBtn.addEventListener(
    "click",
    () => {

      showScreen(enhanceScreen);

      closeSidebarMenu();

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

function handleAttachment(
  file,
  type
) {

  if (!file) return;

  selectedAttachment = file;

  selectedAttachmentType = type;

  if (!attachmentPreview) return;

  attachmentPreview.innerHTML = "";


  const chip =
    document.createElement("div");

  chip.className =
    "attachment-chip";


  /* IMAGE PREVIEW */

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


  /* FILE NAME */

  const name =
    document.createElement("span");

  name.textContent =
    file.name || "Selected file";

  chip.appendChild(name);


  /* REMOVE BUTTON */

  const removeBtn =
    document.createElement("button");

  removeBtn.type = "button";

  removeBtn.textContent = "✕";

  removeBtn.setAttribute(
    "aria-label",
    "Remove attachment"
  );

  removeBtn.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      removeAttachment();

    }
  );

  chip.appendChild(removeBtn);


  attachmentPreview.appendChild(
    chip
  );

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

      img.style.maxWidth =
        "220px";

      img.style.display =
        "block";

      img.style.borderRadius =
        "10px";

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
   CREATOR RESPONSE
========================================= */

function getCreatorResponse(text) {

  const normalized =
    text
      .toLowerCase()
      .replace(/[?!.]/g, "")
      .trim();


  const creatorQuestions = [

    "who created you",
    "who create you",
    "who is your owner",
    "who made you",
    "who is your creator",
    "who developed you",
    "who created smart ai",
    "who is smart ai owner"

  ];


  if (
    creatorQuestions.some(
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
    messageInput ?
    messageInput.value.trim() :
    "";


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


  /* CREATOR QUESTION */

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


  /* AI THINKING */

  const loadingMessage =
    addThinkingMessage();


  try {

    const response =
      await fetch("https://ai-mcq-solver-i7qs.onrender.com/api/chat", {

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


    if (!response.ok) {
      throw new Error(
        "API request failed"
      );
    }


    const data =
      await response.json();


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

      "Smart AI backend is not connected yet. Please connect your AI API.",

      "ai"

    );

  }

}


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
        event
          .results[0][0]
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

function saveRecentChat(
  text
) {

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
      localStorage.getItem("smartAI_recent_chats")
    ) || [];

  chats.forEach((chat) => {
    const button = document.createElement("button");

    button.className = "recent-chat";
    button.type = "button";

    // Clean single-line text
    button.textContent = chat;

    button.addEventListener("click", () => {
      if (messageInput) {
        messageInput.value = chat;
        messageInput.focus();
      }

      showScreen(chatScreen);
      closeSidebarMenu();
    });

    recentChats.appendChild(button);
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
        imagePrompt ?
        imagePrompt.value.trim() :
        "";


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
          await fetch("https://ai-mcq-solver-i7qs.onrender.com/generate-image", {

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


        if (!response.ok) {

          throw new Error(
            "Image API failed"
          );

        }


        const data =
          await response.json();


        if (imageLoading) {

          imageLoading.classList.remove(
            "show"
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


        if (imageLoading) {

          imageLoading.classList.remove(
            "show"
          );

        }


        alert(
          "Image generation API is not connected yet."
        );

      }

    }
  );

}


/* =========================================
   DISPLAY GENERATED IMAGE
========================================= */

function displayGeneratedImage(
  data
) {

  if (!generatedImageResult) {
    return;
  }


  let imageUrl =
    data.imageUrl ||
    data.url ||
    data.image;


  if (!imageUrl) {

    alert(
      data.message ||
      "Image generated, but no image URL was returned."
    );

    return;

  }


  generatedImageResult.innerHTML = `

    <div class="result-header">

      <span>Generated Image</span>

      <button
        class="download-btn"
        id="downloadGeneratedImage"
        title="Download Image"
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
   IMAGE REFERENCE
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

      if (
        videoFreeTrials >= 3
      ) {

        showUpgradeMessage();

        return;

      }


      const prompt =
        videoPrompt ?
        videoPrompt.value.trim() :
        "";


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


      if (generatedVideoResult) {

        generatedVideoResult.classList.remove(
          "show"
        );

      }


      try {

        const response =
          await fetch("https://ai-mcq-solver-i7qs.onrender.com/api/chat", {

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


        if (!response.ok) {

          throw new Error(
            "Video API failed"
          );

        }


        const data =
          await response.json();


        if (videoLoading) {

          videoLoading.classList.remove(
            "show"
          );

        }


        /* Count only successful response */

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


        if (videoLoading) {

          videoLoading.classList.remove(
            "show"
          );

        }


        alert(
          "Video generation API is not connected yet."
        );

      }

    }
  );

}


function displayGeneratedVideo(
  data
) {

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

      <span>Generated 8s Video</span>

      <button
        class="download-btn"
        id="downloadGeneratedVideo"
        title="Download Video"
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

  const message =

    "Your 3 free AI video generations are finished.\n\n" +

    "Upgrade for ₹299 to continue generating AI videos.";


  const confirmed =
    confirm(
      message +
      "\n\nPress OK to view Upgrade options."
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
   IMAGE ENHANCE
========================================= */

const enhanceInput =
  get("enhanceInput");

const uploadEnhanceBtn =
  get("uploadEnhanceBtn");

const enhancePreviewBox =
  get("enhancePreviewBox");

const enhancePreview =
  get("enhancePreview");

const enhanceAction =
  get("enhanceAction");

const enhanceLoading =
  get("enhanceLoading");


if (
  uploadEnhanceBtn &&
  enhanceInput
) {

  uploadEnhanceBtn.addEventListener(
    "click",
    () => {

      enhanceInput.click();

    }
  );

}


if (enhanceInput) {

  enhanceInput.addEventListener(
    "change",
    event => {

      const file =
        event.target.files[0];


      if (!file) return;


      if (
        !file.type.startsWith("image/")
      ) {

        alert(
          "Please select an image."
        );

        return;

      }


      if (enhancePreview) {

        enhancePreview.src =
          URL.createObjectURL(file);

      }


      if (enhancePreviewBox) {

        enhancePreviewBox.classList.add(
          "show"
        );

      }

    }
  );

}


if (enhanceAction) {

  enhanceAction.addEventListener(
    "click",
    async () => {

      const file =
        enhanceInput ?
        enhanceInput.files[0] :
        null;


      if (!file) {

        alert(
          "Please upload a photo first."
        );

        return;

      }


      if (enhanceLoading) {

        enhanceLoading.classList.add(
          "show"
        );

      }


      try {

        const formData =
          new FormData();


        formData.append(
          "image",
          file
        );


        const response =
          await fetch("https://ai-mcq-solver-i7qs.onrender.com/enhance-image", {

              method: "POST",

              body: formData

            }
          );


        if (!response.ok) {

          throw new Error(
            "Enhance API failed"
          );

        }


        const data =
          await response.json();


        if (enhanceLoading) {

          enhanceLoading.classList.remove(
            "show"
          );

        }


        displayEnhancedImage(
          data
        );


      } catch (error) {

        console.error(
          "Enhance error:",
          error
        );


        if (enhanceLoading) {

          enhanceLoading.classList.remove(
            "show"
          );

        }


        alert(
          "Image enhancement API is not connected yet."
        );

      }

    }
  );

}
/* =========================================
   IMAGE ENHANCE API — HUGGING FACE
========================================= */

app.post(
  "/enhance-image",
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload an image."
        });
      }

      if (!process.env.HF_TOKEN) {
        return res.status(500).json({
          success: false,
          message: "HF_TOKEN is missing."
        });
      }

      console.log(
        "Enhancing image:",
        req.file.originalname
      );

      const enhancedBlob = await hf.imageToImage({
        model: "qualcomm/Real-ESRGAN-x4plus",
        inputs: req.file.buffer
      });

      const buffer = Buffer.from(
        await enhancedBlob.arrayBuffer()
      );

      const imageUrl =
        `data:image/png;base64,${buffer.toString("base64")}`;

      console.log("Image enhanced successfully.");

      return res.json({
        success: true,
        imageUrl: imageUrl
      });

    } catch (error) {
      console.error(
        "IMAGE ENHANCE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error?.message ||
          "Image enhancement failed."
      });
    }
  }
);

/* =========================================
   DISPLAY ENHANCED IMAGE
========================================= */

function displayEnhancedImage(
  data
) {

  const result =
    get("generatedEnhanceResult");


  if (!result) {

    alert(
      data.message ||
      "Enhanced image is ready."
    );

    return;

  }


  const imageUrl =
    data.imageUrl ||
    data.url ||
    data.image;


  if (!imageUrl) {

    alert(
      data.message ||
      "No enhanced image URL returned."
    );

    return;

  }


  result.innerHTML = `

    <div class="result-header">

      <span>Enhanced HD Image</span>

      <button
        class="download-btn"
        id="downloadEnhancedImage"
      >
        ⬇️
      </button>

    </div>

    <img
      src="${imageUrl}"
      alt="Enhanced Image"
    >

  `;


  result.classList.add(
    "show"
  );


  const downloadBtn =
    get("downloadEnhancedImage");


  if (downloadBtn) {

    downloadBtn.addEventListener(
      "click",
      () => {

        downloadFile(
          imageUrl,
          "smart-ai-enhanced-image"
        );

      }
    );

  }

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


    document.body.appendChild(
      link
    );


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
   LOGIN FORM — FIXED
========================================= */

const loginForm = get("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const emailInput = get("loginEmail");

    const email = emailInput
      ? emailInput.value.trim()
      : "";

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    // Save login state
    isLoggedIn = true;

    localStorage.setItem(
      "smartAI_logged_in",
      "true"
    );

    // Close login modal
    closeLoginModal();

    // Make sure Chat screen is visible
    showScreen(chatScreen);

    if (welcomeScreen) {
      welcomeScreen.style.display = "flex";
    }

    // Clear email field
    if (emailInput) {
      emailInput.value = "";
    }

    console.log(
      "Smart AI Login successful:",
      email
    );

    alert(
      "Login successful! Welcome to Smart AI. 🎉"
    );

  });

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

        "Later you can connect Razorpay or another payment gateway."

      );

    }
  );

}


/* =========================================
   CLOSE MODALS ON OUTSIDE CLICK
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
   INITIAL VIDEO UI
========================================= */

updateVideoTrialUI();


/* =========================================
   SMART AI READY
========================================= */

console.log(
  "Smart AI frontend loaded successfully."
);
