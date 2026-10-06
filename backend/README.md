# Brrrgrrr + Blog Application

A full-stack web application combining a **Brrrgrrr Burger Customizer** frontend with a **Blog Application** backend.

The project demonstrates frontend JavaScript concepts such as arrays, DOM manipulation, ES6 features, and higher-order functions, along with backend concepts including CRUD operations, authentication, file storage, Excel/Word export, and Object-Oriented Programming.


## Features

### 🍔 Brrrgrrr Burger Customizer

- Customize a burger using different ingredients
- Add and remove ingredients
- Calculate burger price dynamically
- Shopping cart functionality
- Uses `localStorage` for cart data
- Dynamic UI updates using DOM manipulation
- Uses JavaScript arrays
- Uses ES6 features
- Uses higher-order functions:
  - `map()`
  - `filter()`
  - `reduce()`
  - `forEach()`

### 📝 Blog Application

- User signup
- User login
- Authentication using JWT
- Create blog posts
- View blog posts
- Update blog posts
- Delete blog posts
- Search blog posts
- Store users in Excel
- Store posts in JSON
- Export blog posts to Word document
- Object-Oriented Programming using `User` and `Post` classes

---

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript ES6+
- DOM Manipulation
- LocalStorage

### Backend

- Node.js
- Express.js
- CORS
- JSON Web Token (JWT)

### File Storage

- JSON
- Excel (`.xlsx`)
- Microsoft Word (`.docx`)


## Requirements
- Node.js 18+
- npm

## Run
```bash
cd backend
npm install
node server.js
```
Open `http://localhost:5000`.

For the frontend-only version, open `frontend/index.html` with a browser. For the complete demo, copy the frontend files into `backend/public/` or use the supplied `backend/public` copy.

## Mandatory concepts
Frontend: arrays, DOM manipulation, ES6, higher-order functions (`map`, `filter`, `reduce`, `forEach`).
Backend: CRUD, Excel saving (`users.xlsx`), Word export (`blog_posts.docx`), OOP classes (`User`, `Post`).

## API
POST `/api/auth/signup`
POST `/api/auth/login`
GET `/api/posts?search=term`
POST `/api/posts`
PUT `/api/posts/:id`
DELETE `/api/posts/:id`
GET `/api/health`

---

## Project Structure

```text
BrrrGrr_FullStack_Project/
│
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── postController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── services/
│   │   ├── excelService.js
│   │   └── wordService.js
│   │
│   ├── data/
│   │   ├── users.xlsx
│   │   ├── posts.json
│   │   └── blog_posts.docx
│   │
│   └── public/
│       ├── index.html
│       ├── app.js
│       ├── style.css
│       ├── blog.html
│       └── blog.js
│
└── frontend/
    ├── index.html
    ├── app.js
    └── style.css