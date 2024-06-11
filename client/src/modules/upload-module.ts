import axios from "axios";

const API_URL = "http://localhost:3000/upload";

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      console.log("PDF sent to API successfully!", response.data);
    } else {
      console.error("Error sending PDF to API:", response.data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
