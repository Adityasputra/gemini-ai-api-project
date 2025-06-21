# 🧠 Gemini Multimodal AI API Server - Workshop Assignment

This is a Node.js Express server that provides multiple endpoints to interact with **Gemini 1.5 Flash**, allowing text, image, audio, and document inputs for content generation.

Designed for assignment or workshop purposes to demonstrate the use of **multimodal AI models** with file uploads and prompt chaining.

---

## 📦 Features

- ✅ Text-to-Text generation (`/generate-text`)
- 🖼️ Image + Prompt processing (`/generate-from-image`)
- 📄 Document + Prompt analysis (`/generate-from-document`)
- 🎧 Audio + Prompt transcription (`/generate-from-audio`)
- 🧱 Uses `multer` for file handling
- 🧠 Powered by `@google/generative-ai` (Gemini 1.5 Flash)
- ♻️ Automatically deletes temp files after processing

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Adityasputra/gemini-ai-api-project.git
cd gemini-ai-api-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```
GOOGLE_API_KEY=your_google_api_key_here
```

### 4. Start the server

```bash
npm start
```

The server runs on [http://localhost:3000](http://localhost:3000).

---

## 🚀 API Endpoints

### `POST /generate-text`

Generate text based on a prompt.

```json
{
  "prompt": "Explain how rainbows form."
}
```

### `POST /generate-from-image`

Send an image + prompt (form-data: `image`, `prompt` optional)

### `POST /generate-from-document`

Send a document + prompt (form-data: `document`, `prompt` optional)

### `POST /generate-from-audio`

Send an audio file + prompt (form-data: `audio`, `prompt` optional)

---

## 🧠 Example Use Cases

- Image captioning or scene description
- Document summarization or sentiment analysis
- Audio transcription or intent classification
- Prompt-based content generation

---

## 📁 Folder Structure

```
├── index.js
├── .env
├── package.json
├── /uploads        # temp storage for files
```

---

## 🧪 Tech Stack

- Node.js + Express
- @google/generative-ai
- Multer (for handling file uploads)
- dotenv (for API key loading)
- fs/promises (file cleanup)

---

## 📝 License

This project is licensed for educational use. You are free to modify and expand it for learning or portfolio purposes.

---

## 🧑‍💻 Author

**Aditya Saputra**
Workshop Participant & Fullstack Developer
[GitHub](https://github.com/Adityasputra) | [LinkedIn](https://linkedin.com/in/adityasputra)

---
