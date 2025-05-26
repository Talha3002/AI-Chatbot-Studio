const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {checkForAuthenticationCookie } = require('./middlewares/authentication');
const UserRoute = require('./routes/user');
const PORT = 8000;

const app = express();

mongoose
    .connect('mongodb://localhost:27017/AIProject')
    .then(() => console.log('DB Connected'));

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("Token"));
app.use('/user', UserRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

