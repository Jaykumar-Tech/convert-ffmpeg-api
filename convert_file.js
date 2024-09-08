const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static"); // Import the static FFmpeg binary

ffmpeg.setFfmpegPath(ffmpegPath); // Set the FFmpeg path for fluent-ffmpeg

// Example of converting a WAV file to MP3
ffmpeg("./files/13.wav")
  .toFormat("mp3")
  .on("end", () => {
    console.log("Conversion finished!");
  })
  .on("error", (err) => {
    console.error("Error:", err);
  })
  .save("output.mp3");
