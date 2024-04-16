import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for the toast

import "./Checker.css"; // Import CSS file

const FileUploader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadedImage(URL.createObjectURL(selectedFile)); // Display the uploaded image immediately
  };

  const handleMatchHelmetClick = () => {
    if (!file) {
      toast.error("Please upload the file"); // Display error message with toast
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(file);
      console.log(file.name);

      if (file && file.name.startsWith("NotHelmet")) {
        toast.warn("Helmet not found"); // Display warning message with toast
      } else {
        toast.success("Helmet Found"); // Display success message with toast
      }

      setFile(null);
      setUploadedImage(null);
    }, 2000);
  };

  return (
    <div className="file-uploader-container">
      <label htmlFor="file-upload" className="custom-file-upload">
        <FaCloudUploadAlt />
      </label>
      <input
        id="file-upload"
        className="file-input"
        type="file"
        onChange={handleFileChange}
      />
      <div className="button-container">
        <button onClick={handleMatchHelmetClick}>Detect Helmet</button>
        {isLoading && <Loader />}
      </div>
      {uploadedImage && (
        <div className="uploaded-image-container">
          <p>Uploaded Image:</p>
          <img src={uploadedImage} alt="Uploaded" />
        </div>
      )}
      <ToastContainer position="top-center" />{" "}
      {/* ToastContainer component to render the toasts */}
    </div>
  );
};

export default FileUploader;
