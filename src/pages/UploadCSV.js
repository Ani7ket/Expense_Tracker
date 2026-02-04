
import React, { useState } from "react";
import axios from "axios";

function UploadCSV() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );
      setMessage(res.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>FlowWise – Upload Transactions</h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadFile}>Upload CSV</button>

      <p>{message}</p>
    </div>
  );
}

export default UploadCSV;
