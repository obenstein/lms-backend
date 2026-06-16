import fs from "fs";

const testUpload = async () => {
  try {
    // Create a dummy file
    fs.writeFileSync("test.txt", "Hello, this is a test upload file.");

    const formData = new FormData();
    const fileBlob = new Blob([fs.readFileSync("test.txt")], { type: "text/plain" });
    formData.append("file", fileBlob, "test.txt");

    const response = await fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("Status Code:", response.status);
    console.log("Response:", result);

    // Clean up
    fs.unlinkSync("test.txt");
  } catch (err) {
    console.error("Test failed:", err);
  }
};

testUpload();
