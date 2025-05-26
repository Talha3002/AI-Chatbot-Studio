# AI-Chatbot-Studio

# QnA Generation and Inference System

This project is a full-stack web application that allows users to input URLs, generate Q&A pairs from the content, and ask questions based on fine-tuned LLaMA3 models. It comprises three main components:

- **Frontend**: React.js
- **Backend Part 1**: Node.js (Express) + MongoDB for authentication and data storage
- **Backend Part 2**: Flask API on Google Colab (via ngrok) for Q&A generation and inference

---

## 🧱 System Architecture

[React Frontend]
|
+--> [Node.js Backend (Auth + DB)]
| |
| +--> User Authentication (Signup/Login)
| +--> MongoDB: User Data, URL Logs, Generated QnA History
|
+--> [ngrok Tunnel] --> [Flask API (Google Colab)]
+--> Scrape Webpage Content
+--> Generate Q&A Pairs using T5
+--> Fine-tune LLaMA3 using LoRA
+--> Serve Inference via "/ask"

yaml
Copy
Edit

---

## 🖥️ Frontend Setup (React)

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Steps

```bash
cd frontend
npm install        # or yarn install
npm start
Features
User signup/login

Form to input URLs

Displays Q&A results

Sends user queries to Flask backend via /ask endpoint

🔧 Backend Setup (Node.js + MongoDB)
Prerequisites
Node.js

MongoDB instance (local or cloud via MongoDB Atlas)

Steps
bash
Copy
Edit
cd backend
npm install
Environment Variables
Create a .env file:

ini
Copy
Edit
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
Start the Server
bash
Copy
Edit
node index.js
API Routes
POST /signup

POST /login

GET /logout

Authenticated routes:

GET /results (Fetch user history)

POST /submit-url (Send URL to Flask API)

🧪 Flask API Setup (Google Colab)
Prerequisites
Google Colab Pro (for GPU)

Python 3.10+

Required libraries: Flask, transformers, PEFT, torch, ngrok

Steps
Open the Colab notebook: flask_api_colab.ipynb

Install dependencies:

python
Copy
Edit
!pip install flask flask_cors transformers peft accelerate torch
Set up ngrok tunnel:

python
Copy
Edit
!pip install pyngrok
from pyngrok import ngrok
public_url = ngrok.connect(5000)
Start the Flask server:

python
Copy
Edit
from flask import Flask, request, jsonify
# [Your Flask code here]
app.run(port=5000)
Copy the public_url from ngrok and update your Node.js .env or config to use this as the Flask API base URL.

