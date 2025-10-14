import { useState } from "react";
import "../styles/WorkExperience.css";
import { useUser } from "../context/userContext";
import API_BASE_URL from "../api";
import axios from "axios";

function WorkExperience() {
  const { userEmail } = useUser();

  const [blocks, setBlocks] = useState([{ company: "", jobTitle: "", startDate: "", endDate: "" }]);

  const handleAdd = () => {
    setBlocks([...blocks, { company: "", jobTitle: "", startDate: "", endDate: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...blocks];
    updated[index][field] = value;
    setBlocks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/api/work-experience`, {
        email: userEmail,
        workExperience: blocks, // keys match Mongoose schema
      });
      alert("Work Experience saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving Work Experience");
    }
  };

  return (
    <div className="work-form-wrapper">
      <label className="work-label">Work Experience</label>
      <button type="button" className="work-btn-add" onClick={handleAdd}>
        ➕ Add
      </button>

      <form onSubmit={handleSubmit}>
        {blocks.map((block, index) => (
          <div key={index} className="work-block">
            <div className="work-form-row">
              <div className="work-input-group">
                <label htmlFor={`company-${index}`}>Company Name</label>
                <input
                  type="text"
                  value={block.company}
                  id={`company-${index}`}
                  onChange={(e) => handleChange(index, "company", e.target.value)}
                  required
                />
              </div>
              <div className="work-input-group">
                <label htmlFor={`jobTitle-${index}`}>Job Title / Position</label>
                <input
                  type="text"
                  value={block.jobTitle}
                  id={`jobTitle-${index}`}
                  onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="work-form-row">
              <div className="work-input-group">
                <label htmlFor={`startDate-${index}`}>Start Date</label>
                <input
                  type="date"
                  value={block.startDate}
                  id={`startDate-${index}`}
                  onChange={(e) => handleChange(index, "startDate", e.target.value)}
                  required
                />
              </div>
              <div className="work-input-group">
                <label htmlFor={`endDate-${index}`}>End Date</label>
                <input
                  type="date"
                  value={block.endDate}
                  id={`endDate-${index}`}
                  onChange={(e) => handleChange(index, "endDate", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <button type="submit" className="work-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default WorkExperience;
