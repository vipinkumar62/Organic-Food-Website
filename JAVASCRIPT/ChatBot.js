 // Elements
 const chatIcon = document.getElementById('chat-icon');
 const chatPopup = document.getElementById('chat-popup');
 const sendButton = document.getElementById('send-btn');
 const userInput = document.getElementById('user-input');
 const chatBody = document.getElementById('chat-body');
 const micButton = document.getElementById('mic-btn');
 const minimizeButton = document.getElementById('minimize-btn');
 const refreshButton = document.getElementById('refresh-btn');
 const loadingIndicator = document.getElementById('loading');
 const chatTime = document.getElementById('chat-time');

 // Predefined Responses
 const predefinedResponses = {

    "hello": ["You're Welcome to Tazza organic Food. Hi! How can I help you?", "Welcome to Tazza organic Food. Hello! What can I do for you today?", "Welcome to Tazza organic Food. Hey there! How can I assist?"],
     "hi": ["Hi! How can I help you?", "Hello! What can I do for you today?", "Hey there! How can I assist?"],

     "bye": ["Goodbye!", "See you later!", "Take care!","It was nice talking to you!","Have a great day!"],
     "how are you": ["I'm doing great, thank you for asking!", "I'm doing well, how about you?" ,"Feeling good, thanks!","I'm just fine, how about yourself?"],
     "thanks": ["You're welcome!", "No problem!", "Happy to help!"],
     "good morning": [
        "Good morning! How can I assist you today?",
        "Good morning! What can I help you with?",
        "Good morning! How is everything going?",
        "Good morning! What is on your mind?",
        "Good morning! How can I be of service?"
    ],
    "good night": [
        "Good night! Sleep well!",
        "Good night! Sweet dreams!",
        "Have a restful night!",
        "Good night! Take care!",
        "Sleep tight!"
    ],
    "what's your name": [
        "I am a chatbot, and I'm here to help!",
        "I'm your friendly chatbot!",
        "I don't have a name, but you can call me chatbot!",
        "You can call me Assistant!"
    ],
     "ok": [
        "You're welcome!", "No problem!", "Happy to help!",
        "Got it! Let me know if you need anything else.",
        "Okay! I'm here if you need further assistance.",
        "Alright! Feel free to ask if you need help with anything.",
        "Okay, great! What can I assist you with next?",
        "Understood! Let me know how I can help you further.",
        "Gotcha! Feel free to ask me anything else.",
        "Alright, if you need anything else, just let me know.",
        "Okay! I'm ready for the next task.",
        "Perfect! What's next on your mind?",
        "Okay, I'll be here if you need me!"
    ],
    "about fruits": [
        "Fruits are a great source of vitamins and fiber! Do you need information about any specific fruit?",
        "I can help with fruit recommendations! What kind of fruit are you looking for?",
        "Fruits are healthy and delicious. Do you need suggestions for a fruit salad?",
        "There are so many fruits to choose from. What are you in the mood for today?",
        "Fruits like apples, oranges, bananas, and berries are nutritious and easy to enjoy."
    ],
    "about vegetables": [
        "Vegetables like spinach, broccoli, carrots, and bell peppers are great for a healthy diet.",
        "Eating a variety of vegetables helps improve overall health. They're rich in vitamins, minerals, and fiber!",
        "Need tips for cooking vegetables? Roasting or steaming vegetables is an easy and healthy way to enjoy them."
    ],
     "who are you": [
        "I'm a virtual assistant, here to help you with anything you need.",
        "I'm just a friendly chatbot created to answer your questions.",
        "I'm a program designed to assist and provide useful information.",
        "I'm an AI chatbot, here to assist you in any way I can."
    ],
     "default": [
        "I'm not sure how to respond. Could you ask something else?",
        "Sorry, I didn't understand that. Could you rephrase your question?",
        "I didn't quite catch that. Could you clarify?",
        "Hmm, I'm not sure about that. Can you try asking something else?",
        "Sorry, I don't have an answer for that. Can you ask in a different way?"
    ]
};



 // Open/Close Chat Popup
 chatIcon.addEventListener('click', () => {
     if (chatPopup.style.display === 'flex') {
         chatPopup.style.display = 'none';
         chatIcon.classList.remove('close');
     } else {
         chatPopup.style.display = 'flex';
         chatIcon.classList.add('close');
         updateCurrentTime();  // Update time when popup opens
     }
 });

 // Minimize Chat Popup
 minimizeButton.addEventListener('click', () => {
     chatPopup.style.display = 'none';
     chatIcon.classList.remove('close');
 });

 // Refresh Chat with Animation
 refreshButton.addEventListener('click', () => {
     refreshButton.classList.add('refresh-rotate');
     setTimeout(() => {
         refreshButton.classList.remove('refresh-rotate');
     }, 1000);

     setTimeout(() => {
         chatBody.innerHTML = `<div class="message bot-message">
             <span>Hi, how can I assist you today?</span>
             <small class="time" id="chat-time">${getCurrentTime()}</small>
         </div>`;
     }, 1000);
 });

 // Send Message
 sendButton.addEventListener('click', () => {
     const message = userInput.value.trim();
     if (message) {
         sendUserMessage(message);
     }
 });

 // Send User Message
 function sendUserMessage(message) {
     const userMessageDiv = document.createElement('div');
     userMessageDiv.classList.add('message', 'user-message');
     userMessageDiv.innerHTML = `<span>${message}</span><small class="time">${getCurrentTime()}</small>`;
     chatBody.appendChild(userMessageDiv);
     userInput.value = '';  // Clear input after sending

     // Show loading indicator
     loadingIndicator.style.display = 'block';

     // Simulate bot response after delay
     setTimeout(() => {
         const botMessage = getBotResponse(message);
         const botMessageDiv = document.createElement('div');
         botMessageDiv.classList.add('message', 'bot-message');
         botMessageDiv.innerHTML = `<span>${botMessage}</span><small class="time">${getCurrentTime()}</small>`;
         chatBody.appendChild(botMessageDiv);

         loadingIndicator.style.display = 'none'; // Hide loading indicator
         chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom

         // Speak Bot Response
         speakBotResponse(botMessage);
     }, 1500);
 }

 // Get Bot's Response
 function getBotResponse(message) {
     for (let key in predefinedResponses) {
         if (message.toLowerCase().includes(key)) {
             const responses = predefinedResponses[key];
             return responses[Math.floor(Math.random() * responses.length)];
         }
     }
     return predefinedResponses["default"][Math.floor(Math.random() * predefinedResponses["default"].length)];
 }

 // Speak Bot Response (Text-to-Speech)
 function speakBotResponse(text) {
     const utterance = new SpeechSynthesisUtterance(text);
     utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'en-US');
     speechSynthesis.speak(utterance);
 }

 // Handle Mic Input (Speech Recognition)
 micButton.addEventListener('click', () => {
     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
     recognition.lang = 'en-US';
     recognition.start();

     recognition.onresult = function (event) {
         const userSpeech = event.results[0][0].transcript;
         userInput.value = userSpeech;
         sendUserMessage(userSpeech);  // Automatically send the message after speech input
     };
 });

 // Get Current Time
 function getCurrentTime() {
     const now = new Date();
     return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
 }

 // Update Current Time in the Header
 function updateCurrentTime() {
     chatTime.textContent = getCurrentTime();
 }

 // Send Message (for Enter key press)
userInput.addEventListener('keypress', (event) => {
if (event.key === 'Enter' && userInput.value.trim()) {
 sendUserMessage(userInput.value.trim());
 event.preventDefault(); // Prevent default action (new line)
}
});

// Send Message (for Send button click)
sendButton.addEventListener('click', () => {
const message = userInput.value.trim();
if (message) {
 sendUserMessage(message);
}
});