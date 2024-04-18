import axios from "axios";
import { useState } from "react";

const ContactPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imagesArrUrl, setImagesArrUrl] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  //------
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileInput = event.target.elements.profile_pic;
    if (!fileInput || fileInput.files.length === 0) {
      console.error("No file selected");
      alert("Please choose a file");
      return;
    }
    const formData = new FormData();

    formData.append("profile_pic", fileInput.files[0]);
    try {
      const response = await axios.post(
        "http://localhost:3000/upload-profile-pic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("res", response);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  //------

  const handleMultiSubmit = async (event) => {
    event.preventDefault();
    console.log("files", event.target.elements);
    const fileInput = event.target.elements.cat_pics;
    if (!fileInput || fileInput.files.length === 0) {
      console.error("No files selected");
      alert("Please choose a file");
      return;
    }
    const formData = new FormData();

    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append("cat_pics", fileInput.files[i]);
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/upload-cat-pics",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("res", response);
      setImagesArrUrl(response.data.imagesUrl);
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
        <img
          style={{ with: "400px" }}
          src={`${BACKEND_URL}/${imageUrl}`}
          alt="Uploaded Profile Pic"
        />
      )}

      <hr />

      <form
        //action="/upload-cat-pics"
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleMultiSubmit}
      >
        <div>
          <label>Select your cat pictures:</label>
          <input multiple="multiple" name="cat_pics" type="file" />
        </div>
        <div>
          <input type="submit" value="Upload Cat Pics" />
        </div>
      </form>
      <ul>
        {imagesArrUrl.length > 0 &&
          imagesArrUrl.map((image) => (
            <li key={image}>
              <img
                style={{ with: "400px" }}
                src={`${BACKEND_URL}/${image}`}
                alt="Uploaded Cats Pics"
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ContactPage;
//let imageFullName = 'https://localhost:3000/' + imageUrl
