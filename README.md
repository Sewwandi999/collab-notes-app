# Collaborative Note-Taking App

A MERN stack collaborative note-taking web application built with:

- MongoDB
- Express.js
- React
- Node.js
- Tailwind CSS

This application allows users to create, edit, search, and collaborate on notes in real time.


# Features

• JWT Authentication  
• Create, edit, and delete notes  
• Rich text editor  
• Full-text search for notes  
• Collaborator management  
• Modern responsive UI with Tailwind CSS



# Tech Stack

Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- React Quill

Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs


# Project Structure
collab-notes-app
│
├── client (React frontend)
├── server (Node.js backend)
├── README.md
└── .gitignore


# Setup Instructions

## 1 Clone the repository
git clone https://github.com/Sewwandi999/collab-notes-app.git


## 2 Install backend dependencies
cd server
npm install


## 3 Create environment variables

Create a file: server/.env


Add:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


## 4 Start backend
npm run dev



## 5 Install frontend dependencies

Open another terminal:
cd client
npm install
npm run dev


# API Endpoints

Auth Routes

POST /api/auth/register  
POST /api/auth/login  

Notes

GET /api/notes  
POST /api/notes  
PUT /api/notes/:id  
DELETE /api/notes/:id  

Search

GET /api/notes/search?q=keyword  


# Demo Video



# Author

Sewwandi.


