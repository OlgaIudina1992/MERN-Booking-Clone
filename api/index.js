const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User.js')
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = 'wamsfivua9ogF*9phtQ78q39i7rhabfu;ILEKHYgPE9)(3jt8';

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test run');
});

app.post('/register', async (req, res) => {    
    const {name, email, password} = req.body;

    try {
        const userData = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
    
        res.json({userData});
    } catch (e) {
        res.status(422).json(e);
    }
    
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userData = await User.findOne({email});
    if (userData) {
        const passOk = bcrypt.compareSync(password, userData.password)
        if (passOk) {
            jwt.sign({email: userData.email, id: userData.id}, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json('pass ok')
            })
            
        }else{
            res.json('password not matching')
        }
    }else{
        res.json('not found');
    }
})

app.listen(5000);
