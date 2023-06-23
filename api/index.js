const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User.js')
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(12);

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
        res.json('found')
    }else{
        res.json('not found');
    }
})

app.listen(5000);
