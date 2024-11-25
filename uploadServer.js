import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Setup __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000; // Port for your Express server

// Enable CORS for requests from http://localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust if you have a different frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/uploads")); // Folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Static folder to serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Handle image upload
app.post("/upload", upload.array("images"), (req, res) => {
  try {
    const filePaths = req.files.map((file) => `/uploads/${file.filename}`);
    res.status(200).json({ message: "Files uploaded successfully", filePaths });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ error: "Failed to upload files" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
