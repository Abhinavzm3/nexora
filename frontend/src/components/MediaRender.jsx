import React from "react";

const MediaRenderer = ({ fileUrl }) => {
  // Helper function to determine the file type
  const getFileType = (url) => {
    const extension = url.split(".").pop().toLowerCase();
    return extension;
  };

  const renderMedia = () => {
    const fileType = getFileType(fileUrl);

    const imageTypes = ["jpg", "jpeg", "png", "gif", "webp"];
    const videoTypes = ["mp4", "webm", "ogg"];
    const pdfTypes = ["pdf"];

    if (imageTypes.includes(fileType)) {
      return <img src={fileUrl} alt="Media" style={{ maxWidth: "100%", height: "auto" }} />;
    } else if (videoTypes.includes(fileType)) {
      return <video src={fileUrl} controls style={{ maxWidth: "100%", height: "auto" }} />;
    } else if (pdfTypes.includes(fileType)) {
      return (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
             <iframe
          src={fileUrl} // URL to the PDF
          width="100%"   // Make iframe responsive
          height="100%"  // Adjust height to 600px or any preferred height
          title="PDF Viewer"></iframe>
  <object data={fileUrl} type="application/pdf" width="100%" height="600" className="w-24 h-24 object-cover border rounded-lg">
          <p>
            Your browser does not support PDFs.{" "}
              Download PDF
          </p>
        </object>
            </a>
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
