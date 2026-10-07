# BrrrGrrr Backend

Backend service for the **BrrrGrrr Full-Stack Burger Website & Community Blog**.

The backend is built with Node.js and Express and provides the REST API used by the BrrrGrrr Blog page. It handles user authentication, blog post CRUD operations, file-based data storage, and Word document export.

---

## 🚀 Backend Features

### 🔐 Authentication

- User signup
- User login
- JWT-based authentication
- Protected blog post operations
- Authentication verification endpoint
- Password hashing using SHA-256
- Token expiration after 2 hours

### 📝 Blog API

- Create blog posts
- Read/list blog posts
- Search blog posts
- Update blog posts
- Delete blog posts
- Owner-based update/delete authorization
- Automatic Word document export after post changes

### 💾 File-Based Storage

The current project uses files instead of a database:

- `users.xlsx` — stores registered users
- `posts.json` — stores blog posts
- `blog_posts.docx` — exported Word document containing blog posts

This keeps the project simple and demonstrates file handling as part of the internship project.

---

## 🛠️ Technologies Used

### Runtime & Framework

- Node.js
- Express.js
- JavaScript
- REST API

### Authentication

- JSON Web Token (JWT)
- SHA-256 password hashing
- Bearer token authentication

### File Storage & Export

- JSON
- Excel (`.xlsx`)
- Microsoft Word (`.docx`)

### Development

- npm
- Git / GitHub
- Render

---

## 📁 Backend Project Structure

```text
backend/
│
├── package.json
├── package-lock.json
├── server.js
│
├── controllers/
│   ├── authController.js
│   └── postController.js
│
├── models/
│   ├── User.js
│   └── Post.js
│
├── routes/
│   ├── authRoutes.js
│   └── postRoutes.js
│
├── services/
│   └── fileService.js
│
├── data/
│   ├── users.xlsx
│   ├── posts.json
│   ├── blog_posts.docx
│   └── README.txt
│
└── public/
    ├── index.html
    ├── app.js
    ├── style.css
    ├── blog.html
    └── blog.js
```

> `backend/public/` contains the frontend files served by the Express backend in the deployed application.

---

## ⚙️ Installation

Make sure Node.js 18+ and npm are installed.

From the project root:

```bash
cd backend
npm install
```

---

## ▶️ Run the Backend Locally

Start the Express server with:

```bash
npm start
```

The server uses:

```text
http://localhost:5001
```

The health-check endpoint is:

```text
http://localhost:5001/api/health
```

You can also start the server directly with:

```bash
node server.js
```

The application uses the following port configuration:

```javascript
const PORT = process.env.PORT || 5001;
```

This allows Render to provide its own production port while using port `5001` locally.

---

## 🌐 API Base URL

The frontend communicates with the backend using the same-origin API path:

```javascript
const API = "/api";
```

### Local development

When running the Express server locally:

```text
http://localhost:5001/api
```

### Production

The deployed application is available at:

```text
https://brrrgrrr-qa8w.onrender.com/
```

The API is available under the same domain:

```text
https://brrrgrrr-qa8w.onrender.com/api
```

Because the frontend uses `/api`, the frontend code does not need a separate production API URL.

---

## 🔗 API Endpoints

### Health Check

**GET**

```text
/api/health
```

Returns the current backend status.

Example response:

```json
{
  "status": "OK",
  "message": "Brrrgrrr Blog API running"
}
```

---

### Authentication

#### Sign Up

**POST**

```text
/api/auth/signup
```

Creates a new user.

Example request:

```json
{
  "name": "Harshita",
  "email": "harshita@example.com",
  "password": "password123"
}
```

---

#### Login

**POST**

```text
/api/auth/login
```

Authenticates a user and returns a JWT token.

Example request:

```json
{
  "email": "harshita@example.com",
  "password": "password123"
}
```

The returned token is used for protected blog operations.

---

#### Verify Authentication

**GET**

```text
/api/auth/verify
```

Checks whether the supplied JWT token is valid.

The token is sent using the Bearer authentication format:

```text
Authorization: Bearer <token>
```

---

## 📝 Blog Post Endpoints

### Get Posts

**GET**

```text
/api/posts
```

Returns available blog posts.

---

### Search Posts

**GET**

```text
/api/posts?search=burger
```

Searches blog posts using the supplied search term.

---

### Create Post

**POST**

```text
/api/posts
```

Creates a new blog post.

Authentication is required.

Example:

```json
{
  "title": "My Favorite Burger",
  "content": "A delicious burger made with fresh ingredients."
}
```

Header:

```text
Authorization: Bearer <token>
```

---

### Update Post

**PUT**

```text
/api/posts/:id
```

Updates an existing blog post.

Authentication is required, and the authenticated user must be the owner of the post.

---

### Delete Post

**DELETE**

```text
/api/posts/:id
```

Deletes an existing blog post.

Authentication is required, and the authenticated user must be the owner of the post.

---

## 🔒 Authentication Flow

The authentication flow works as follows:

```text
User
 │
 ├── Sign Up
 │      ↓
 │   User saved in users.xlsx
 │
 ├── Login
 │      ↓
 │   Credentials verified
 │      ↓
 │   JWT token generated
 │
 └── Protected Blog Request
        ↓
   Authorization: Bearer <token>
        ↓
   JWT verified
        ↓
   Controller performs requested action
```

The JWT token is used to protect blog post creation, editing, and deletion.

---

## 💾 Data Storage

### Users

Registered users are stored in:

```text
backend/data/users.xlsx
```

The backend reads and writes user data through:

```text
backend/services/fileService.js
```

### Blog Posts

Blog posts are stored in:

```text
backend/data/posts.json
```

### Word Export

Blog posts are also exported to:

```text
backend/data/blog_posts.docx
```

When posts are created, updated, or deleted, the backend updates the JSON data and regenerates the Word document.

---

## 🧱 Object-Oriented Programming

The backend demonstrates Object-Oriented Programming through model classes.

### User

```text
backend/models/User.js
```

Represents an application user.

### Post

```text
backend/models/Post.js
```

Represents a blog post.

These classes are used by the backend controllers when handling application data.

---

## 📂 Backend Architecture

The backend follows a basic layered structure:

```text
Request
   ↓
Routes
   ↓
Controllers
   ↓
Models / Services
   ↓
File Storage
```

### Routes

Routes define the available API endpoints.

```text
routes/
├── authRoutes.js
└── postRoutes.js
```

### Controllers

Controllers contain the application logic.

```text
controllers/
├── authController.js
└── postController.js
```

### Models

Models represent application objects.

```text
models/
├── User.js
└── Post.js
```

### Services

The file service handles reading and writing application data and exporting blog posts.

```text
services/
└── fileService.js
```

---

## 🧪 API Testing

The API can be tested using tools such as:

- Browser — for GET endpoints
- Postman
- Thunder Client
- VS Code REST Client

Useful endpoints for testing:

```text
GET  /api/health
GET  /api/posts
GET  /api/posts?search=burger
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/verify
POST /api/posts
PUT  /api/posts/:id
DELETE /api/posts/:id
```

---

## 🌍 Deployment

The application is deployed using **Render**.

### Production URL

```text
https://brrrgrrr-qa8w.onrender.com/
```

The Render service runs the backend from the `backend` directory.

### Render Configuration

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

The application uses:

```javascript
process.env.PORT || 5001
```

so it can work with Render's assigned port.

---

## ⚠️ File Storage and Deployment

This project currently stores users and posts in local files rather than a database.

The important files are:

```text
data/users.xlsx
data/posts.json
data/blog_posts.docx
```

For an internship/demo project, this approach is suitable for demonstrating backend concepts and file handling.

However, file-based storage on a cloud deployment should not be treated as permanent production storage. A production application would normally use a database such as PostgreSQL or MongoDB, or another persistent storage solution.

---

## 🔐 Security Notes

- `.env` and other environment files should not be committed to GitHub.
- JWTs should be kept private on the client side.
- Passwords should never be stored as plain text.
- Production applications should use a strong secret stored in an environment variable.
- For a production deployment, database-backed persistent storage is recommended.

---

## 🧰 Useful Commands

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Start directly with Node:

```bash
node server.js
```

Check the API:

```text
http://localhost:5001/api/health
```

---

## 📌 Project Purpose

The BrrrGrrr backend was created as part of an internship project to demonstrate practical backend development concepts, including:

- Node.js
- Express.js
- REST APIs
- CRUD operations
- JWT authentication
- File handling
- Excel data storage
- JSON data storage
- Word document export
- Object-Oriented Programming
- Frontend-to-backend API integration
- Cloud deployment with Render

---

## 👩‍💻 Project

**BrrrGrrr — Full-Stack Burger Website & Community Blog**

Backend service for the BrrrGrrr web application.

Live application:

```text
https://brrrgrrr-qa8w.onrender.com/
```
