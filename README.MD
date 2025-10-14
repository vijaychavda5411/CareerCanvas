🖋️ CareerCanvas

Build, preview, and download stunning resumes instantly.
CareerCanvas is a full-stack Resume Builder web app built using React, Node.js, Express, MongoDB, and Puppeteer for PDF generation.

🚀 Features

✅ Create and edit resumes dynamically
✅ Live template preview (Modern & Colorful templates)
✅ Download resumes as PDF
✅ MongoDB integration for data storage
✅ Puppeteer-based server-side PDF rendering
✅ Responsive React frontend

🏗️ Tech Stack

Frontend: React + Vite
Backend: Node.js + Express + Handlebars
Database: MongoDB Atlas
PDF Engine: Puppeteer
Hosting: Render

Folder Structure

CareerCanvas/
├── client/                 # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Express Backend
│   ├── controller/
│   ├── routes/
│   ├── views/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md

⚙️ Environment Variables

Create a .env file inside the server folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string

💻 Run Locally

1️⃣ Start Backend

cd server
npm install
npm start

Server runs at: http://localhost:5000

2️⃣ Start Frontend

cd client
npm install
npm run dev

Frontend runs at: http://localhost:5173

🌐 Deployment (Render)
Backend:

1.Push the project to GitHub
2.Go to Render.com
3.  → “New Web Service”
4.Connect your GitHub repo
5.Choose server folder as root
6.Set Build Command: npm install
7.Set Start Command: npm start
8.Add environment variables (PORT, MONGO_URI)

Frontend:

1.Create new Static Site on Render
2.Root Directory → client
3.Build Command → npm run build
4.Publish Directory → dist

🧩 Future Improvements

1.Add more resume templates
2.Support image upload (profile picture)
3.Auto-save user data in MongoDB


👨‍💻 Author

Vijay Chavda
Built with ❤️ and code.
