import { useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import API_BASE_URL from "../Api";
import { useUser } from "../context/userContext";

function Home() {
  const { setUserEmail } = useUser(); // Access context
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    contact: "",
    location: "",
    linkedin: "",
    github: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Axios POST request
      const response = await axios.post(
        `${API_BASE_URL}/api/personal-info`,
        formData
      );

      console.log("Saved:", response.data);

      // Save email globally using context
      setUserEmail(formData.email);

      alert(response.data.message || "Personal Info Saved successfully!");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Failed to save data");
    }
  };

  return (
    <div className="page-container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <h3 className="form-title">Personal Info</h3>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" name="dob" onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="contact">Contact</label>
              <input type="tel" id="contact" name="contact" onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" name="location" onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="linkedin">LinkedIn</label>
              <input type="url" id="linkedin" name="linkedin" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="github">GitHub</label>
              <input type="url" id="github" name="github" onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
