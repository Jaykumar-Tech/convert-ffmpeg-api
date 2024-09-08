const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const { PassThrough } = require("stream");
const path = require("path");

const app = express();

// Use memory storage instead of disk storage
const upload = multer({ storage: multer.memoryStorage() });

// Set the FFmpeg path for fluent-ffmpeg
const pathToFfmpeg = path.join(__dirname, "lib/ffmpeg/ffmpeg");
ffmpeg.setFfmpegPath(pathToFfmpeg);

// Endpoint to convert WAV to MP3
app.post("/convert", upload.single("audio"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Create a readable stream from the file buffer
  const readableStream = new PassThrough();
  readableStream.end(req.file.buffer);

  // Create a stream for the response
  const outputStream = new PassThrough();

  // Set the headers for the MP3 response
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Content-Disposition", 'inline; filename="output.mp3"');

  // Use ffmpeg to convert the in-memory WAV file to MP3
  ffmpeg(readableStream)
    .toFormat("mp3")
    .on("error", (err) => {
      console.error("Error during conversion:", err);
      res.status(500).json({ error: "Conversion failed" });
    })
    .pipe(outputStream);

  // Pipe the output stream directly to the response
  outputStream.pipe(res);
});

app.get("/", (req, res) => {
  return res.json({ message: "Hello world!" });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
