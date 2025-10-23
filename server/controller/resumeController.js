import Resume from "../models/Resume.js";
import puppeteer from "puppeteer";

// Save Career Objective
export const saveCareerObjective = async (req, res) => {
  try {
    const { email, careerObjective } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const updatedResume = await Resume.findOneAndUpdate(
      {_id: email },
      { careerObjective },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Career Objective Saved", data: updatedResume });
  } catch (err) {
    console.error("Error saving career objective:", err);
    res.status(500).json({ error: err.message });
  }
};

// Save Personal Info
export const savePersonalInfo = async (req, res) => {
    console.log("Received data:", req.body);
  try {
    const { name, dob, email, contact, location, linkedin, github } = req.body;
    if(!email)return res.status(400).json({ message: "Email is required" });


    const updatedResume = await Resume.findOneAndUpdate(
      {_id:email},
      {
        personalInfo: { name, dob, email, contact, location, linkedin, github },
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Personal Info saved successfully",
      data: updatedResume,
    });
  } catch (err) {
    console.error("Error saving personal info:", err);
    res.status(500).json({ message: "Error saving personal Info", error: err.message });
  }
};

//save education 
export const  saveEducation = async (req,res) =>{
  try
  {
    const { email, education } =req.body;
    if(!email)return res.status(400).json({message:"Email is requried"});

    const updatedResume= await Resume.findOneAndUpdate(
      {_id: email },
      { $push: { education: { $each: education } } },
      { upsert: true, new:true }
    );
    res.status(200).json({message:"Education saved successfully",data: updatedResume});
  }
  catch(err){
    console.error(err);
    res.status(500).json({message:"Error saving education",error:err.message});

  }
};

// Save Work Experience
export const saveWorkExperience = async (req, res) => {
  console.log("Received data:", req.body);
  try {
    const { email, workExperience } = req.body; // ✅ correct
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Make sure workExperience is an array
    if (!Array.isArray(workExperience)) {
      return res.status(400).json({ message: "workExperience must be an array" });
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: email },
      { $push: { experience: { $each: workExperience } } },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Work Experience saved successfully",
      data: updatedResume,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving Work Experience", error: err.message });
  }
};

//saving Skills
export const saveSkills = async (req, res) => {
  try {
    const { email, skills } = req.body;

    if (!email || !skills) {
      return res.status(400).json({ message: "Email and skills are required" });
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: email },
      { skills },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Skills saved successfully", data: updatedResume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving skills", error: err.message });
  }
};
//project save
// Save Projects
export const saveProjects = async (req, res) => {
  try {
    const { email, projects } = req.body;

    if (!email || !projects || !Array.isArray(projects)) {
      return res.status(400).json({ message: "Email and projects array are required" });
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: email },
      { $push: { projects: { $each: projects } } }, 
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Projects saved successfully", data: updatedResume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving projects", error: err.message });
  }
};

//render resume

export const renderResume = async (req, res) => {
  try {
    // ✅ Allow frontend domain (CORS)
    res.setHeader("Access-Control-Allow-Origin", "https://careercanvas-1-2w94.onrender.com");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    const { email } = req.params;
    const { template, download } = req.query;
    const templateName = template === "modern" ? "modern" : "colorful";

    console.log("🎯 Rendering resume for:", email);
    console.log("📄 Template:", templateName);

    const resumeDoc = await Resume.findById(email);
    console.log("📦 Resume document found:", !!resumeDoc);

    if (!resumeDoc) {
      return res.status(404).send("Resume not found in MongoDB");
    }

    const resume = resumeDoc.toObject();

    res.render(`template/${templateName}`, { resume }, async (err, html) => {
      if (err) {
        console.error("🧩 Handlebars render error:", err);
        return res.status(500).send("Error rendering template");
      }

      // ✅ If download=true → Generate PDF
      if (download === "true") {
        try {
          const browser = await puppeteer.launch({
            headless: true,
            args: [
              "--no-sandbox",
              "--disable-setuid-sandbox",
              "--disable-dev-shm-usage",
              "--disable-accelerated-2d-canvas",
              "--no-first-run",
              "--no-zygote",
              "--disable-gpu",
              "--single-process"
            ],
          });

          const page = await browser.newPage();
          await page.setContent(html, { waitUntil: "networkidle0", timeout: 60000 });

          const pdfBuffer = await page.pdf({ format: "A4" });
          await browser.close();

          res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=${templateName}_resume.pdf`,
          });

          return res.send(pdfBuffer);
        } catch (pdfError) {
          console.error("🧨 Puppeteer PDF generation failed:", pdfError);
          return res.status(500).send("Error generating PDF: " + pdfError.message);
        }
      }

      // ✅ If not download → Send HTML response
      res.send(html);
    });

  } catch (err) {
    console.error("🔥 Error rendering resume:", err);
    res.status(500).send("Error rendering resume: " + err.message);
  }
};
