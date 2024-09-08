const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require("dotenv").config(); // For loading your OpenAI key from .env

// Load your OpenAI API key from the environment or directly set it
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "your-openai-api-key";

// Path to your 11.wav file
const filePath = "./output.mp3"; // Ensure the file path is correct

// Function to convert audio to text using OpenAI Whisper API
const convertAudioToText = async (filePath) => {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));
    formData.append("model", "whisper-1"); // Specify Whisper model
    formData.append("language", "en"); // Specify language if known (optional)

    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    console.log("Transcription:", response.data.text);
  } catch (error) {
    console.error(
      "Error transcribing audio:",
      error.response ? error.response.data : error.message
    );
  }
};

// Call the function to convert 11.wav to text
convertAudioToText(filePath);
