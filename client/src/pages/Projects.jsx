import { useState } from "react";
import { useUser } from "../context/userContext";
import axios from "axios";
import API_BASE_URL from "../api";
import "../styles/Projects.css";

function Projects() {
  const { userEmail } = useUser();
  const [blocks, setBlocks] = useState([
    { projectName: "", description: "", technologies: "", link: "" }
  ]);

  const handleAdd = () => {
    setBlocks([...blocks, { projectName: "", description: "", technologies: "", link: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...blocks];
    updated[index][field] = value;
    setBlocks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/api/projects`, {
        email: userEmail,
        projects: blocks.map((p) => ({
          projectName: p.projectName,
          description: p.description,
          technologies: p.technologies.split(",").map((t) => t.trim()), // ✅ split into array
          link: p.link,
        })),
      });

      alert("Projects saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving projects");
    }
  };

  return (
    <div className="page-wrapper">
  <div className="page-box">
    <div className="p-form-wrapper">
      <label className="p-label">Projects</label>
      <button type="button" className="p-btn-add" onClick={handleAdd}>➕ Add</button>

      <form onSubmit={handleSubmit}>
        {blocks.map((block, index) => (
          <div key={index} className="P-block">
            <div className="p-form-row">
              <div className="p-input-group">
                <label>Project Name</label>
                <input
                  type="text"
                  value={block.projectName}
                  onChange={(e) => handleChange(index, "projectName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="p-form-row">
              <div className="p-input-group">
                <label>Description</label>
                <textarea
                  className="p-textarea"
                  placeholder="Description"
                  value={block.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="p-form-row">
              <div className="p-input-group">
                <label>Technologies Used</label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js"
                  value={block.technologies}
                  onChange={(e) => handleChange(index, "technologies", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="p-form-row">
              <div className="p-input-group">
                <label>Link</label>
                <input
                  type="url"
                  value={block.link}
                  onChange={(e) => handleChange(index, "link", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <button type="submit" className="P-submit-btn">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Projects;
