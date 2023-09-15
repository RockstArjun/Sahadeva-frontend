import React, { useState } from "react";
import "./admin.css";

const Admin = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [youtubeLinkInput, setYoutubeLinkInput] = useState("");

  const handleFileChange = event => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleDiscard = fileIndex => {
    setSelectedFiles(prevFiles => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(fileIndex, 1);
      return updatedFiles;
    });
  };

  const handleUpload = () => {
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    // Send formData to your backend for handling multiple files

    // Clear selected files
    setSelectedFiles([]);
  };

  const handleDrop = event => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...droppedFiles]);
  };

  const preventDefault = event => {
    event.preventDefault();
  };

  const handleYoutubeLinkInput = () => {
    setYoutubeLinks(prevLinks => [...prevLinks, youtubeLinkInput]);
    setYoutubeLinkInput(""); // Clear the input field
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-300 min-h-screen flex items-center justify-center page">
      <div className="container">
        <div className="card">
          <h1 className="title">FILE UPLOAD</h1>
          <div className="flex flex-col items-center space-y-4">
            <label
              className="drop-zone"
              onDrop={handleDrop}
              onDragOver={preventDefault}
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input"
                multiple
              />
              {selectedFiles.length > 0 ? (
                <div>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="selected-file">
                      {file.name}
                      <button
                        className="remove-file"
                        onClick={() => handleDiscard(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-xl font-medium text-gray-500">
                  Insert or Drop files here
                </span>
              )}
            </label>

            <div className="youtube-link-input">
              <input
                type="text"
                placeholder="Paste or type YouTube links here"
                value={youtubeLinkInput}
                onChange={e => setYoutubeLinkInput(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleYoutubeLinkInput}
              >
                Add Link
              </button>
            </div>

            {youtubeLinks.length > 0 && (
              <div className="youtube-links-list">
                <h2>YouTube Links:</h2>
                <ul>
                  {youtubeLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleUpload}
              className={`upload-button`}
              disabled={selectedFiles.length === 0}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
