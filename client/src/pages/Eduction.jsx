import React, { useState } from "react";
import "../styles/Eduction.css";
import { useUser } from "../context/userContext";
import axios from "axios";
import API_BASE_URL from "../Api";
function Eduction() {

  const { userEmail } =  useUser();
  const [blocks, setBlocks] = useState([ 
    {level: "", year: "", institution: "", stream: ""}

  ]); // Start with 1 block

  const handleAdd = () => {
    setBlocks([...blocks, { level: "", year: "", institution: "", stream: "" }]); // Add new block
  };

  const handleChange =(index,field,value)=>{
    const updated = [...blocks];
    updated[index][field] = value;
    setBlocks(updated);
  } 

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      await axios.post(`${API_BASE_URL}/api/education`,{
        email: userEmail,
        education: blocks, 
      });
      alert("Education Saved Successfully!");
    }
    catch(err){
      console.error(err);
      alert("Failed to save education");
    }
  };



   return (
   <div className="edu-form-wrapper">

  <label className="edu-label">Education Details</label>
  <button type="button" className="edu-btn-add" onClick={handleAdd}>
    ➕ Add
  </button>

  <form onSubmit={handleSubmit}>
    {blocks.map((block, index) => (
      <div key={index} className="edu-block">
        <div className="edu-form-row">
          <div className="edu-input-group">
            <label>10th/12th/Degree</label>
            <input type="text" value={block.level} onChange={(e)=>handleChange(index,"level",e.target.value)} required />
          </div>
          <div className="edu-input-group">
            <label>Year</label>
            <input type="text" value={block.year} onChange={(e)=>handleChange(index,"year",e.target.value)} required />
          </div>
        </div>

        <div className="edu-form-row">
          <div className="edu-input-group">
            <label>School-Name/College-Name</label>
            <input type="text" value={block.institution} onChange={(e)=>handleChange(index,"institution",e.target.value)} required />
          </div>
          <div className="edu-input-group">
            <label>Stream</label>
            <input type="text" value={block.stream} onChange={(e)=>handleChange(index,"stream",e.target.value)} required />
          </div>
        </div>
      </div>
    ))}

    <button type="submit" className="edu-submit-btn">
      Submit
    </button>
  </form>
</div>


  );
}

export default Eduction;



