import React, { useState } from "react";

const MediaRenderer = ({ fileUrl }) => {
  // Helper function to determine the file type
  const getFileType = (url) => {
    const extension = url.split(".").pop().toLowerCase();
    return extension;
  };

  //   const [pdfUrl,setPdfUrl]=useState(`https://res.cloudinary.com/df9t8sdnq/raw/upload/v1612742520/{fileUrl}`
  // )

  const renderMedia = () => {
    const fileType = getFileType(fileUrl);

    const imageTypes = ["jpg", "jpeg", "png", "gif", "webp"];
    const videoTypes = ["mp4", "webm", "ogg"];
    const pdfTypes = ["pdf"];

    if (imageTypes.includes(fileType)) {
      return (
        <>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            <img
              className="w-48 h-48 object-cover border rounded-lg"
              src={fileUrl}
              alt="Media"
            />
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              Download
            </a>
          </a>
        </>
      );
    } else if (videoTypes.includes(fileType)) {
      return (
        <>
          {" "}
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            <video
              className="w-48 h-48 object-cover border rounded-lg"
              src={fileUrl}
              controls
            />
          </a>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Download
          </a>
        </>
      );
    } else if (pdfTypes.includes(fileType)) {
      return (
        <>
          {" "}
          <object
            data={fileUrl}
            type="application/pdf"
            className="w-56 h-48 object-cover border rounded-lg"/>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Download
          </a>
        </>
      );
    } else {
      return (
        <p>
          Unsupported media type.{" "}
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            Download File
          </a>
        </p>
      );
    }
  };

  return <div>{renderMedia()}</div>;
};

export default MediaRenderer;
