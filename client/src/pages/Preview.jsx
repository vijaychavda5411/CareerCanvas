import React, { useState } from "react";
import { useUser } from "../context/userContext";
import API_BASE_URL from "../api";

const Preview = () => {
  const { userEmail } = useUser();
  const [template, setTemplate] = useState("modern");
  
  
  const email = userEmail;
   if (!email) return <p>Email not found. Please log in.</p>;

  const backendUrl = `${API_BASE_URL}/api/resume/${email}?template=${template}`;

  const downloadPDF = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/resume/${email}?template=${template}&download=true`
      );

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${template}_resume.pdf`); // File name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Resume Preview</h2>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setTemplate("modern")}>Modern</button>
        <button onClick={() => setTemplate("colorful")}>Colorful</button>
        <button onClick={downloadPDF}>Download PDF</button>
      </div>

      <iframe
        id="resume-frame"
        src={backendUrl}
        title="Resume Preview"
        style={{
          width: "800px",
          height: "1130px",
          border: "2px solid #ccc",
          borderRadius: "8px",
        }}
      ></iframe>
    </div>
  );
};

export default Preview;
