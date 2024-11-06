
MERN Chat App Backend

This is the backend server for a simple chat application built with the MERN stack MongoDB Express React Nodejs The backend provides user authentication profile management and hardcoded chat responses

Table of Contents

1 Motivation
2 Features
3 Setup
4 API Routes
5 Database Schema

Motivation

The purpose of this project is to build a basic chat application with a focus on backend functionality This backend allows users to create accounts log in manage their profiles and interact with hardcoded chat responses The project serves as a learning experience for implementing common features in a REST API such as authentication user profile management and handling various HTTP methods

Features

User Authentication Register login and logout functionality with password hashing
Profile Management Update profile information and add profile images
HardCoded Chat Responses Simulates a simple chat experience with predefined responses
APIDriven Provides REST API endpoints for all app interactions
Data Validation Ensures data integrity and security through validation

Setup

1 Clone the repository

git clone https://github.com/AmanKumar1411/cannect-server
cd mern-chat-app-backend

2 Install dependencies

npm install

3 Environment Variables Create a env file in the root directory with the following

MONGO_URI your_mongodb_connection_string
JWT_SECRET your_jwt_secret_key

4 Run the server

npm start

The server should now be running on http://localhost:5000

API Routes

1 Auth Routes

Register User
Endpoint POST api auth register
Request Body

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "your_password"
}

Response

{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "profileImg": null
  }
}

Login User
Endpoint POST api auth login
Request Body

{
  "email": "john@example.com",
  "password": "your_password"
}

Response

{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "profileImg": null
  }
}

Logout User
Endpoint POST api auth logout
Response

{
  "message": "User logged out successfully"
}

2 User Profile Routes

Update Profile
Endpoint PUT api users id
Request Body

{
  "name": "John Doe",
  "email": "new_email@example.com",
  "profileImg": "image_url"
}

Response

{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "new_email@example.com",
    "profileImg": "image_url"
  }
}

3 Chat Routes

Get HardCoded Chat Response
Endpoint GET api chat response
Response

{
  "message": "This is a hardcoded response"
}

Database Schema

The backend uses MongoDB to store user data Below are the primary fields in the User schema

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
    default: null
  }
});

name The user's name
email The user's email used for login
password Hashed password
profileImg URL of the user's profile image optional

Conclusion

This backend provides the core functionality needed for a basic chat application Users can register log in update their profiles and simulate a chat experience with predefined responses This project demonstrates a foundational setup for a MERN stack chat app with a focus on backend functionality 

Feel free to enhance or extend this project with more advanced features such as realtime messaging with SocketIO or integrating with a frontend to complete the MERN stack setup
