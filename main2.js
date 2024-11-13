import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from 'markdown-it';
import { maybeShowApiKeyBanner } from './gemini-api-banner';
import './style2.css';

// 🔥🔥 FILL THIS OUT FIRST! 🔥🔥
// Get your Gemini API key by:
// - Selecting "Add Gemini API" in the "Project IDX" panel in the sidebar
// - Or by visiting https://g.co/ai/idxGetGeminiKey
let API_KEY = 'AIzaSyBfXnrEjOCD7F1MUhlJJWGqDeKvV0grLEc';

const form = document.querySelector('form');
const promptInput = document.querySelector('input[name="prompt"]');
const Add = "Berikan saya saran : ";
const output = document.querySelector('.output');
// const clearButton = document.querySelector('.clear-history'); // Uncomment if using clear button

// Call the multimodal model, and get a stream of results
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // or gemini-1.5-pro
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ],
});

// Create chat instance
const chat = model.startChat({
  history: [],
  generationConfig: {
    maxOutputTokens: 5000
  }
});

// // Function to clear the chat history
// const clearHistory = () => {
//   chat.history = [];
//   output.textContent = "Chat history cleared!";
// };

// // Event listener for clearing history when button is clicked
// clearButton?.addEventListener('click', clearHistory); // Uncomment if using clear button

form.onsubmit = async (ev) => {
  ev.preventDefault();
  output.textContent = 'Generating...';

  try {
    const prompt = Add + promptInput.value;
    const result = await chat.sendMessageStream(prompt);

    const buffer = [];
    const md = new MarkdownIt();
    for await (const response of result.stream) {
      buffer.push(response.text());
      output.innerHTML = md.render(buffer.join(''));
    }
  } catch (e) {
    output.innerHTML += '<hr>' + e;
  }
};

// You can delete this once you've filled out an API key
maybeShowApiKeyBanner(API_KEY);