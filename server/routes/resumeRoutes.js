import express from "express";
import { saveCareerObjective, savePersonalInfo, saveEducation,saveWorkExperience, saveSkills, saveProjects, renderResume} from "../controller/resumeController.js";

const router = express.Router();

router.post("/career-objective", saveCareerObjective);
router.post("/personal-info", savePersonalInfo);
router.post("/education",saveEducation);
router.post("/work-experience",saveWorkExperience);
router.post("/skills",saveSkills);
router.post("/projects",saveProjects);

router.get("/resume/:email", renderResume);

export default router;
