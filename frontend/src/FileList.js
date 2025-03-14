import React, { useEffect, useState } from 'react';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/files') // Ensure this matches your backend endpoint
      .then((response) => response.json())
      .then((data) => setFiles(data))
      .catch((error) => console.error('Error fetching files:', error));
  }, []);

  return (
    <div>
      <h2>Uploaded Files</h2>
      {files.map((file) => (
        <div key={file._id}>
          <p>{file.filename}</p>
          <img src={file.url} alt={file.filename} style={{ width: '200px' }} />
          <a href={file.url} download>
            Download
          </a>
        </div>
      ))}
    </div>
  );
};

export default FileList;
