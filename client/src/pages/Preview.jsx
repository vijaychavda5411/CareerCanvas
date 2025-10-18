import React, { useState } from "react";
import { useUser } from "../context/userContext";
import API_BASE_URL from "../api";

const Preview = () => {
  const { userEmail } = useUser();
  const [template, setTemplate] = useState("modern");

  const email = userEmail;
  if (!email) return <p>Email not found. Please log in.</p>;

  // URL to preview the resume
  const backendUrl = `${API_BASE_URL}/api/resume/${email}?template=${template}`;

  // Download resume as PDF
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
    <div style={{ textAlign: "center" }}>
      <h2>Resume Preview</h2>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setTemplate("modern")}>Modern</button>
        <button onClick={() => setTemplate("colorful")}>Colorful</button>
        <button onClick={downloadPDF}>Download PDF</button>
      </div>

      <iframe
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
