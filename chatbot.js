import * as sdk from "@d-id/client-sdk";

const videoElement = document.getElementById("video");
const input = document.getElementById("textInput");
const sendBtn = document.getElementById("sendBtn");

const agentId = "agt_5IcQ8ndx";
const auth = {
  type: "key",
  clientKey: "YXV0aDB8NjY5Y2MxMTI5NzgyMmJkNjNkYjJjZDRhOkcxMWczei1WTlhlYnhhbEZQQ0N5TQ=="
};

const callbacks = {
  onSrcObjectReady: (stream) => {
    videoElement.srcObject = stream;
  },
  onVideoStateChange: (state) => {
    console.log("Video state:", state);
  },
  onConnectionStateChange: (state) => {
    console.log("Connection:", state);
  },
  onNewMessage: (messages, type) => {
    console.log("Message:", messages);
  },
  onError: (err, data) => {
    console.error("Agent Error:", err, data);
  }
};

let agentManager;

(async () => {
  agentManager = await sdk.createAgentManager(agentId, {
    auth,
    callbacks,
    streamOptions: {
      compatibilityMode: "auto",
      streamWarmup: true
    }
  });
  await agentManager.connect();
})();

sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text && agentManager) {
    agentManager.chat(text);
    input.value = "";
  }
});
