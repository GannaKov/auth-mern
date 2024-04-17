import axios from "axios";
import { useState } from "react";

const ContactPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profile_pic", event.target.elements.profile_pic.files[0]);
    try {
      const response = await axios.post(
        "http://localhost:3000/upload-profile-pic",
        formData
      );
      console.log("File uploaded successfully:", response);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div>
      <form
        // action="/upload-profile-pic"
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div>
          <label>Select your profile picture:</label>
          <input name="profile_pic" type="file" />
        </div>
        <button>
          <input type="submit" value="Upload" />
        </button>
      </form>

      {imageUrl && (
        <img src={`${BACKEND_URL}/${imageUrl}`} alt="Uploaded Profile Pic" />
      )}
    </div>
  );
};

export default ContactPage;
//let imageFullName = 'https://localhost:3000/' + imageUrl
