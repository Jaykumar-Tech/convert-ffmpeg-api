const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

async function uploadFile() {
  try {
    const form = new FormData();

    console.log(path);

    // Read the file to be uploaded from the local filesystem
    const filePath = path.join(__dirname, "files", "13.wav"); // Change this to your file path
    const fileStream = fs.createReadStream(filePath);

    // Append the file to the form data
    form.append("audio", fileStream, "example.wav");

    // Make the request to the API using axios
    const response = await axios.post(
      // "https://whisper-component-mu.vercel.app/api/whisper",
      "https://convert-ffmpeg-api.vercel.app/convert",
      form,
      {
        headers: {
          ...form.getHeaders(), // Set the necessary headers for multipart/form-data
        },
        responseType: "stream", // Expect the response to be a stream
      }
    );

    // Path where the MP3 file will be saved
    const outputPath = path.join(__dirname, "output.mp3");

    // Create a writable stream to save the response data
    const writer = fs.createWriteStream(outputPath);

    // Pipe the response data to the file
    response.data.pipe(writer);

    // Handle the 'finish' and 'error' events
    writer.on("finish", () => {
      console.log("File saved successfully:", outputPath);
    });

    writer.on("error", (err) => {
      console.error("Error saving file:", err);
    });
  } catch (error) {
    console.error("Error uploading file:", error.message);
  }
}

uploadFile();
