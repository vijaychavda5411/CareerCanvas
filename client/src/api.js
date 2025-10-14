import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

axios.get(`${API_BASE_URL}/api/resume`)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

export default API_BASE_URL;
