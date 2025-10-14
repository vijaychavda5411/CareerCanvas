import mongoose from "mongoose";

const personalInfoSchema = new mongoose.Schema({
  name: String,
  dob: String,
  email: { type: String, required: true },
  contact: String,
  location: String,
  linkedin: String,
  github: String,
});

const educationSchema = new mongoose.Schema({
  level: {type: String, required: true},
  year: {type: String, required: true},
  institution: {type: String, required: true},
  stream: {type: String, required: true},
});

const workExperienceSchema = new mongoose.Schema({
   company: { type: String, required: true },
  jobTitle: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const projectsSchema = new mongoose.Schema({
  projectName:{type:String, required:true},
  description: { type: String, required: true },
  technologies: [String],
  link: String,
});

const resumeSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // email will be _id
  personalInfo: personalInfoSchema,
  skills: [String],
  experience: [workExperienceSchema],
  education: [educationSchema],
  projects:[projectsSchema],
  careerObjective: String,
});

// Pre-save hook to set _id = email
resumeSchema.pre("save", function (next) {
  if (this.personalInfo && this.personalInfo.email) {
    this._id = this.personalInfo.email;
  }
 next();
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
