import React, { useState } from "react";
import Swal from "sweetalert2";
import "./admin.css";

const Admin = ({ axiosClient }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [youtubeLinkInput, setYoutubeLinkInput] = useState("");

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDiscard = (fileIndex) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(fileIndex, 1);
      return updatedFiles;
    });
  };

  const handleUpload = async () => {
    const promises = [];

    selectedFiles.forEach((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const formData = new FormData();
      formData.append("files", file);

      let endpoint;
      if (
        fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "png"
      ) {
        endpoint = "/images";
      } else if (
        fileExtension === "mp4" ||
        fileExtension === "avi" ||
        fileExtension === "mov"
      ) {
        endpoint = "/videos";
      } else if (fileExtension === "pdf") {
        endpoint = "/documents";
      } else {
        Swal.fire({
          text: `Unsupported file type: ${file.name}`,
          icon: "error",
        });
        return;
      }

      promises.push(
        axiosClient.current
          .post(endpoint, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then(() => {
            Swal.fire({
              text: `File "${file.name}" uploaded successfully`,
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              text: `Error uploading file "${file.name}": ${error.message}`,
              icon: "error",
            });
          })
      );
    });

    youtubeLinks.forEach((link) => {
      promises.push(axiosClient.current.post("/youtube?url=" + link));
    });

    await Promise.allSettled(promises);

    setSelectedFiles([]);
    setYoutubeLinks([]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  const handleYoutubeLinkInput = () => {
    setYoutubeLinks((prevLinks) => [...prevLinks, youtubeLinkInput]);
    setYoutubeLinkInput("");
  };

  return (
    <>
      <div className="page-container">
        <div className="container">
          <div className="card">
            {/* Image, PDF, Video ka Upload */}
            <h1
              className="title"
              style={{ marginTop: "2vh", marginBottom: "1vh" }}
            >
              File Upload
            </h1>
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
                          style={{ marginLeft: "5px" }}
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
                  onChange={(e) => setYoutubeLinkInput(e.target.value)}
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
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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
                disabled={
                  selectedFiles.length === 0 && youtubeLinks.length === 0
                }
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;