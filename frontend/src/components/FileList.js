import { useEffect, useState } from "react";
import axios from "axios";

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/files").then((res) => setFiles(res.data));
  }, []);

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FileList;