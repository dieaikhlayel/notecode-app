# NoteCode - Code Sharing App

A full-stack code sharing application built for DevChallenges.io.

## 🌟 Features

- 📝 **Live Code Editor** with syntax highlighting
- 🌙 **Multiple Themes** (Dark, Light, High Contrast)
- 🔗 **Generate Shareable URLs** with unique IDs
- 💾 **Save Code Snippets** to database
- 📱 **Fully Responsive** design
- ⚡ **Real-time Editing** with Monaco Editor
- 🔄 **Auto-save** functionality

## 🏗️ Project Structure

notecode-app/
├── client/ # React Frontend Application
├── server/ # Node.js Backend API
├── .gitignore
└── README.md

text

## 🛠️ Tech Stack

### Frontend:

- **React** - UI library
- **Monaco Editor** - Code editor component
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend:

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **UUID** - Unique ID generation
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**

````bash
git clone https://github.com/dieaikhlayel/notecode-app.git
cd notecode-app
Set up the Backend:

bash
cd server
npm install
# Create .env file with your MongoDB URI
echo "MONGODB_URI=mongodb://localhost:27017/notecode" > .env
echo "PORT=5000" >> .env
npm run dev
Set up the Frontend:

bash
cd ../client
npm install
npm start
Open your browser:

Frontend: http://localhost:3000

Backend API: http://localhost:5000

📚 API Documentation
Endpoints
GET /api/snippets/default
Returns the default HTML snippet.

Response:

json
{
  "code": "<html>...</html>"
}
POST /api/snippets
Save a new code snippet.

Request Body:

json
{
  "code": "console.log('Hello World');",
  "language": "javascript",
  "theme": "vs-dark"
}
Response:

json
{
  "id": "abc123def",
  "message": "Code saved successfully!"
}
GET /api/snippets/:id
Retrieve a saved snippet by ID.

Response:

json
{
  "id": "abc123def",
  "code": "console.log('Hello World');",
  "language": "javascript",
  "theme": "vs-dark",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
🎨 Features in Detail
Code Editor
Supports multiple languages (HTML, CSS, JavaScript, Python, Java)

Theme selection (Dark, Light, High Contrast)

Line numbers and syntax highlighting

Auto-completion and IntelliSense

Word wrap and minimap options

Sharing Functionality
Edit Code in the editor

Select Language and Theme

Click "Share Code" button

Get a unique shareable URL

Button disables after sharing

Edit to re-enable sharing

Responsive Design
Mobile-first approach

Flexbox/Grid layouts

Media queries for different screen sizes

Touch-friendly buttons on mobile

🚢 Deployment
Frontend (Vercel)
bash
# Install Vercel CLI
npm i -g vercel

# Deploy client
cd client
vercel
Backend (Railway/Render)
Railway:

Connect GitHub repository

Set root directory to /server

Add MongoDB database

Set environment variables

Render:

Create new Web Service

Connect to GitHub

Set build command: npm install

Set start command: node server.js

📱 Environment Variables
Backend (.env)
env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notecode
PORT=5000
NODE_ENV=production
Frontend (.env)
env
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
🧪 Testing
Run tests:

bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
🤝 Contributing
Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
DevChallenges.io for the project idea

Monaco Editor for the code editor

React for the frontend framework

📞 Contact
Your Name - @yourtwitter

Project Link: https://github.com/dieaikhlayel/notecode-app

text

## 📦 Step 4: Create Package.json for Root Folder (Optional)

```bash
# Create package.json in root for project management
touch package.json
````
