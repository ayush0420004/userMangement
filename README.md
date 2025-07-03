# 📋 User Management System

🎥 **Preview Video**: [Watch Here](https://drive.google.com/file/d/1T7UElwx_KCK91Wt0so_0HP8a8TfFn8PQ/view?usp=sharing)

A complete full-stack web application to manage users using React (frontend) and Node.js + Express + MySQL (backend). It supports user CRUD operations, Excel-based uploads, downloadable templates, and masked PAN numbers.

## 🚀 Features

- ➕ Add, Edit, Delete Users  
- 📥 Bulk Excel upload  
- 📄 Download sample Excel template  
- 🔒 PAN number masking/unmasking  
- ✅ Validations for Email, Phone, PAN Format  
- 🔁 Edit functionality using selected user data  
- 📱 Responsive UI with inline CSS  
- 📂 Alert-based notifications on actions

## 🧱 Tech Stack

Frontend: React, Inline CSS, React Icons  
Backend: Node.js, Express, Sequelize ORM  
Database: MySQL  
File Upload: Multer  
Excel Handling: ExcelJS  
Validation: Regex-based (PAN, Email, Phone)

## 📁 Folder Structure

userMangement/  
├── client/          # React frontend  
├── server/          # Node.js + Express backend  
└── README.md  

## 📥 Clone & Setup

git clone https://github.com/ayush0420004/userMangement.git  
cd userMangement

## ⚙️ Backend Setup

cd server  
npm install

Create a `.env` file inside `server/` with the following:

DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=your_mysql_password  
DB_NAME=user_management  
PORT=5000

Then run:

npm start

## 💻 Frontend Setup

cd ../client  
npm install  
npm start

Visit: http://localhost:3000

## 📄 Excel Format (Upload File)

| First Name | Last Name | Email          | Phone Number | PAN Number  |
|------------|-----------|----------------|---------------|-------------|
| John       | Doe       | john@mail.com  | 9876543210    | ABCDE1234F  |

Sample file can be downloaded directly from the app.

## 🔧 How I Built This Project

1. **Backend Setup**
   - Set up Node.js + Express + Sequelize + MySQL
   - Created User model
   - Added REST APIs for CRUD + Excel upload/download
   - Used Multer for handling file uploads
   - Used ExcelJS for parsing Excel files

2. **Frontend Setup**
   - Used React with functional components and inline CSS
   - Created UserForm with validations and PAN masking
   - Created UserTable for displaying users
   - Added Excel upload + download functionality
   - PAN toggle with eye icon using react-icons

3. **Final Integration**
   - Connected frontend and backend
   - Tested full CRUD operations
   - Created and uploaded preview video

## ⚠️ Assumptions & Known Issues

- 📂 “Choose File” does not trigger  
- 🚫 No backend duplicate check for phone or email  
- 📝 Edit may misbehave if validation is bypassed or fields are manually altered  

## 📌 To Do (Future Enhancements)

- Replace `alert()` with react-toastify  
- Add search/filter and pagination  
- Backend-level duplicate checks  
- Secure PAN masking on backend  
- Dockerize and deploy to cloud  

## 🙋 Made with ❤️ by [Ayush Thakur](https://github.com/ayush0420004)
