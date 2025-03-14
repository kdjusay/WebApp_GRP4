import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5000/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setMessage(response.data.message || "File uploaded successfully!");
        } catch (error) {
            setMessage("Upload failed. Try again.");
        }
    };

    return (
        <div className="p-4 border rounded shadow-md w-96 mx-auto mt-5">
            <h2 className="text-lg font-bold mb-3">Upload File</h2>
            <input type="file" onChange={handleFileChange} className="mb-2" />
            <button 
                onClick={handleUpload} 
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
                Upload
            </button>
            {message && <p className="mt-2 text-red-500">{message}</p>}
        </div>
    );
};

export default FileUpload;
