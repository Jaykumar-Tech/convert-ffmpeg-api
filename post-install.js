const fs = require("fs");
const path = require("path");

// Source path: ffmpeg binary inside node_modules/ffmpeg-static
const ffmpegPath = require("ffmpeg-static");

console.log(ffmpegPath);

// Destination path: lib/ffmpeg folder
const destDir = path.join(__dirname, "lib", "ffmpeg");
const destFile = path.join(destDir, "ffmpeg"); // Destination file name

// Function to copy ffmpeg binary
function copyFFmpeg() {
  // Check if the destination directory exists, if not, create it
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created directory: ${destDir}`);
  }

  // Copy the ffmpeg binary
  fs.copyFileSync(ffmpegPath, destFile);
  console.log(`Copied ffmpeg to ${destFile}`);
}

// Run the function
copyFFmpeg();
