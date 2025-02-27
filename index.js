const firebaseConfig = {
  apiKey: "AIzaSyBaLje6pBY_ioxfXToaQuxQmV-hS9cqzfs",
  authDomain: "chat-application-d1045.firebaseapp.com",
  projectId: "chat-application-d1045",
  storageBucket: "chat-application-d1045.firebasestorage.app",
  messagingSenderId: "1074147512702",
  appId: "1:1074147512702:web:13fe42014ebe97a7f7232f",
  measurementId: "G-1K2QNSL4PP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages"); // Fixed ID reference

sendButton.addEventListener("click", async () => {
  const message = messageInput.value;
  if (message.trim()) {
      try {
          await db.collection('messages').add({
              text: message,
              timestamp: firebase.firestore.FieldValue.serverTimestamp() // Fixed method name
          });
          messageInput.value = '';
      } catch (e) {
          console.error("Error adding document:", e);
      }
  }
});

db.collection("messages")
  .orderBy("timestamp")
  .onSnapshot((querySnapshot) => {
      chatMessages.innerHTML = ''; // Ensure container is cleared before adding new messages
      querySnapshot.forEach((doc) => {
          const messageData = doc.data();
          const messageElement = document.createElement("div");
          messageElement.textContent = messageData.text;
          messageElement.style.padding = "5px";
          messageElement.style.borderBottom = "1px solid #ddd";
          chatMessages.appendChild(messageElement);
      });
  });