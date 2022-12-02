const express = require('express');
const mongoose = require('mongoose');
const registerRoute = require('./routes/register')
const signInRoute = require('./routes/login')
const userRoute = require('./routes/user');
const contactRoute = require('./routes/contact');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const process = require('process');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000;
const secret = process.env.SECRET;
const url = process.env.MONGO;
// const url = "mongodb://localhost:27017/contacts-manager"

mongoose.connect(url) 
    .then(console.log('mongoose atlas is up'))
    .catch(console.error);

const app = express();

app.use(cors());
app.use('/v1/contacts', (req, res, next) => {
    const token = req.headers.authorization;
    // console.log('token', token);

    if(token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(400).json({
                    status:"Failed to decode",
                    message: err.message
                })
            }
            if (decoded) {
                // console.log('req.user', decoded.data)
                req.user = decoded.data;
                next();
            }
        })
    } else {
        return res.status(403).json({
            status: "Failed",
            message: "Invalid Token"
        })
    }
})

app.use('/v1/signup', registerRoute);
app.use('/v1/signin', signInRoute);
app.use('/v1/user', userRoute);
app.use('/v1/contacts', contactRoute);

if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname + '/public')));
}

app.listen(PORT, () => console.log(`Server is up at ${PORT} port`))