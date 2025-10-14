// App.jsx
import "./App.css";
import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import './styles/nav.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CareerObjective from './pages/CareerObjective';
import Skills from './pages/Skills';
import Eduction from './pages/Eduction';
import WorkExperience from './pages/WorkExperience';
import Projects from './pages/Projects';
import Preview from "./pages/Preview";

const Nav = () => {
  // Optionally hide navbar on auth pages:
  const { pathname } = useLocation();
  if (pathname === '/' || pathname === '/register') return null;

  return (
    <nav className="navbar">
      <div className="ResumeBuilder">CareerCanvas</div>
      <ul>
        <li>
          <NavLink to="/home" end>

          
            Personal Info
          </NavLink>
        </li>
        <li>
          <NavLink to="/careerobjective" end>
            Career Objective
          </NavLink>
        </li>
        <li>
        <NavLink to="/eduction">
            Education
          </NavLink>
        </li>
        <li>
        <NavLink to="/workexperience">
            Work Experience
          </NavLink>
        </li>
        <li>
          <NavLink to="/skills">
            Skills
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects">
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/preview">
            Preview
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

function App() {
  return (
    <>
      <Nav />
      <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/careerobjective" element={<CareerObjective />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/eduction" element={<Eduction/>}/>
        <Route path="/workexperience" element={<WorkExperience />}/>
        <Route path="/projects" element={<Projects />}/>
        <Route path="/preview" element={<Preview/>}/>
      </Routes>
      </main>
    </>
  );
}

export default App;