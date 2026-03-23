# MERN Authentication App

A full-stack **Authentication System** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.
This project provides secure user authentication using **JWT (JSON Web Tokens)** and stores user data in **MongoDB**.

---

# 🚀 Features

* User Signup
* User Login
* JWT Authentication
* Secure API routes
* MongoDB database integration
* Modern UI with Tailwind CSS
* API communication using Fetch API
* Request data validation using Joi

---

# 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Fetch API
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* Joi (for request validation)

---

# 📁 Project Structure

```
project-root

frontend
src
public
package.json

backend
routes
controllers
models
middleware
api
package.json
.env

README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```
MONGO_URI=
JWT_SECRET=
```

⚠️ Do not upload `.env` file to GitHub.

---

# 🔍 Data Validation

This project uses **Joi** to validate incoming request data such as:

* User signup input
* User login input

This helps ensure that the server only processes **valid and properly formatted data**, improving security and reliability.

---

# 📦 node_modules

The **node_modules folder is not uploaded to GitHub** because it is large and can be recreated using `package.json`.

Install dependencies using:

Backend:

```
cd backend
npm install
```

Frontend:

```
cd frontend
npm install
```

---

# 💻 Running the Project

Start Backend:

```
cd backend
npm run dev
```

Start Frontend:

```
cd frontend
npm run dev
```

---

# 🌐 Deployment

Frontend can be deployed using **Vercel**.

Backend can be deployed using **Vercel, Render, or Railway**.

Add environment variables during deployment:

```
MONGO_URI
JWT_SECRET
```

---

# 👨‍💻 Author

**Nishkarsh Gupta**

MCA Student | MERN Stack Developer

Skills:

* JavaScript
* React.js
* Node.js
* Express.js
* MongoDB
* Tailwind CSS
* Joi Validation
