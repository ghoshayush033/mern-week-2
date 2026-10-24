# Week 2 - Assignment 2: User Authentication API

User registration and login API built with Node.js, Express, MongoDB, bcrypt password hashing, and JWT authorization.

## API Endpoints

1. **Register User**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/auth/register`
   - **Body (JSON):**
     ```json
     {
       "name": "Test User",
       "email": "test@example.com",
       "password": "password123"
     }
     ```

2. **Login User**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/api/auth/login`
   - **Body (JSON):**
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```

3. **Get Protected Profile**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/api/auth/profile`
   - **Headers:** `Authorization: Bearer <YOUR_JWT_TOKEN>`
   - 
