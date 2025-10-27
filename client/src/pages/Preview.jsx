import React, { useState } from "react";
import { useUser } from "../context/userContext";
import API_BASE_URL from "../api";
import "../styles/preview.css";

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

      if (!response.ok) throw new Error("Failed to download PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${template}_resume.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download resume. Please try again later.");
    }
  };

  return (
    <div className="preview-page">
      <h2 className="preview-title">Resume Preview</h2>

      <div className="preview-buttons">
        <button
          onClick={() => setTemplate("modern")}
          className={template === "modern" ? "active" : ""}
        >
          Modern
        </button>
        <button
          onClick={() => setTemplate("colorful")}
          className={template === "colorful" ? "active" : ""}
        >
          Colorful
        </button>
        <button onClick={downloadPDF}>Download PDF</button>
      </div>

      <iframe
        src={backendUrl}
        title="Resume Preview"
        className="preview-frame"
      ></iframe>
    </div>
  );
};

export default Preview;
