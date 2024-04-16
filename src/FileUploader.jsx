import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Loader from '../Loader/Loader';

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
      alert("Please upload the file");
      return;
    }
  
    setIsLoading(true);
  
    // Create a FormData object to send the file to the backend
    const formData = new FormData();
    formData.append("image", file);
  
    // Make the API call to the backend
    setTimeout(() => {
      fetch("http://localhost:8080/helmetDetection", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          setIsLoading(false);
          if (data.result === true) {
            alert("Helmet Found");
          } else {
            alert("Helmet Not Found");
          }
          setFile(null);
          setUploadedImage(null);
        })
        .catch(error => {
          setIsLoading(false);
          alert("Error occurred while detecting helmet");
          console.error("Error occurred while detecting helmet:", error);
        });
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
