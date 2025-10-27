import "../styles/Skill.css";
import { useUser } from "../context/userContext";
import { useState } from "react";
import API_BASE_URL from "../api";
import axios from "axios";

function Skills() {
  const { userEmail } = useUser();
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!skills) {
      alert("Please enter skills");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/skills`, {
        email: userEmail,
        skills: [skills], 
      });
      alert("Skills saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving skills");
    }
  };

  return (
    <div className="page-wrapper">
  <div className="page-box">
    <div className="s-form-wrapper">
      <label className="s-label">Skills</label>
      <form onSubmit={handleSubmit}>
        <input
          className="s-input-group"
          id="skills"
          type="text"
          placeholder="e.g. JavaScript, React, Node.js"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />
        <button type="submit" className="s-submit-btn">
          Submit
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Skills;
