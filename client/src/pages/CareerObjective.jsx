import { cache, useState } from "react";
import "../styles/careerobjective.css";
import { useUser } from "../context/userContext";
import axios from "axios";
import API_BASE_URL from "../api";

function CareerObjective() {

  const { userEmail }=useUser();
  const [ careerObjective, setCareerObjective] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      await
      axios.post(`${API_BASE_URL}/api/career-objective`, {
        email: userEmail,
        careerObjective
      });
      alert("Career Objective saved Successfully!");
    }
    catch(err){
      console.error(err);
      alert(" Error saving career Objective");
    }
  };


  
  return (
    
    <div className="page-wrapper">
    <div className="page-box">
      <div className="c-page-container">
        <div className="c-form-wrapper">
           <form onSubmit={handleSubmit}>
              <label className="c-label">Career Objective</label>
        <textarea className="c-textarea" placeholder="Enter Your Career Objective..."value={careerObjective} onChange={(e)=>setCareerObjective(e.target.value)}required></textarea>
        <button type="submit" name="textarea" className="c-submit-btn">Submit</button>
      </form>

    </div>
    </div>
    </div>
    </div>
  );
}

export default CareerObjective;
