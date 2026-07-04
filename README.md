# 🚀 DevConnectAI

An AI-powered full-stack developer collaboration platform that enables teams to manage projects, assign tasks, share files, receive notifications, and collaborate efficiently through a secure web application.

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Password Storage

### 📊 Dashboard
- Project Overview
- Task Summary
- Team Statistics
- Activity Tracking

### 📁 Project Management
- Create Project
- Update Project
- Delete Project
- View All Projects

### ✅ Task Management
- Create Tasks
- Assign Tasks
- Edit Tasks
- Delete Tasks
- Track Task Status

### 👥 Team Management
- Create Teams
- Manage Members
- View Team Details

### 📂 File Management
- Upload Files
- Download Files
- Organize Project Files

### 🔔 Notifications
- User Notifications
- Project Updates
- Task Alerts

### 👤 User Profile
- View Profile
- Update Profile

---

# 🛠 Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Spring Boot
- Spring Security
- JWT Authentication
- REST APIs

## Database
- MySQL

## Build Tools
- Gradle
- npm

---

# 📂 Project Structure

```
DevConnectAI/
│
├── backend/
│   ├── src/
│   ├── build.gradle
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🚀 Getting Started

## Backend

```bash
cd backend
./gradlew bootRun
```

Windows

```bash
gradlew.bat bootRun
```

---

## Frontend

```bash
cd frontend
npm install
npm start
```

---

# 🔐 Environment Configuration

Configure your MySQL database in:

```
backend/src/main/resources/application.properties
```

Example

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/devconnectai
spring.datasource.username=root
spring.datasource.password=your_password

jwt.secret=your_secret_key
```

---

# 📡 REST API Modules

- Authentication
- Users
- Projects
- Tasks
- Teams
- Notifications
- Files
- Dashboard

---

# 🎯 Future Enhancements

- AI Project Recommendation
- AI Task Generation
- AI Code Review
- AI Chat Assistant
- Real-Time Chat
- Video Meetings
- GitHub Integration
- Email Notifications
- Docker Deployment
- Cloud Deployment

---

# 👩‍💻 Author

**Shajini Uppada**

- GitHub: https://github.com/uppadashajini-art

---

## ⭐ If you like this project, don't forget to star the repository!