const express = require("express");
const fs = require("fs/promises");
const multer = require("multer");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.GOOGLE_API_KEY) {
    console.error("GOOGLE_API_KEY is not set in environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(express.json());

const upload = multer({ dest: "uploads/" });

// Utility: Convert file to inlineData part
async function fileToPart(filePath, mimeType) {
    const data = await fs.readFile(filePath);
    return {
        inlineData: {
            data: data.toString("base64"),
            mimeType,
        },
    };
}

// Centralized error handler
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
}

// Text generation endpoint
app.post("/generate-text", async (req, res, next) => {
    try {
        const { prompt } = req.body;
        if (!prompt || typeof prompt !== "string") {
            return res.status(400).json({ error: "Prompt must be a non-empty string" });
        }
        const result = await model.generateContent(prompt);
        res.json({ text: result.response.text() });
    } catch (err) {
        next(err);
    }
});

// Image generation endpoint
app.post("/generate-from-image", upload.single("image"), async (req, res, next) => {
    if (!req.file || !req.file.mimetype.startsWith("image/")) {
        return res.status(400).json({ error: "Valid image file is required" });
    }
    const prompt = req.body.prompt || "Describe the image";
    try {
        const imagePart = await fileToPart(req.file.path, req.file.mimetype);
        const result = await model.generateContent([prompt, imagePart]);
        res.json({ output: result.response.text() });
    } catch (err) {
        next(err);
    } finally {
        if (req.file) await fs.unlink(req.file.path).catch(() => {});
    }
});

// Document generation endpoint
app.post("/generate-from-document", upload.single("document"), async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: "Document file is required" });
    }
    const prompt = req.body.prompt || "Analyze the document";
    try {
        const docPart = await fileToPart(req.file.path, req.file.mimetype);
        const result = await model.generateContent([prompt, docPart]);
        res.json({ output: result.response.text() });
    } catch (err) {
        next(err);
    } finally {
        if (req.file) await fs.unlink(req.file.path).catch(() => {});
    }
});

// Audio generation endpoint
app.post("/generate-from-audio", upload.single("audio"), async (req, res, next) => {
    if (!req.file || !req.file.mimetype.startsWith("audio/")) {
        return res.status(400).json({ error: "Valid audio file is required" });
    }
    const prompt = req.body.prompt || "Transcribe the audio";
    try {
        const audioPart = await fileToPart(req.file.path, req.file.mimetype);
        const result = await model.generateContent([prompt, audioPart]);
        res.json({ output: result.response.text() });
    } catch (err) {
        next(err);
    } finally {
        if (req.file) await fs.unlink(req.file.path).catch(() => {});
    }
});

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
