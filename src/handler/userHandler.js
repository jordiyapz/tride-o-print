const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const listAllUser = (req, res, next) => {
    User.find({})
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                users: docs
            })
        })
        .catch(err => {
            if (err) return res.status(500).json({err: err});
        })
}

const addUser = (req, res, next) => {
    User.create(req.body, (err, user) => {
        if (err) return res.send(err);
        res.status(200).json({
            message: "User created!"
        });
    })
}

const getUser = (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) return res.send(err);
        res.status(200).json(user);
    })
}

const updateUser = (req, res, next) => {
    User.findOne({ _id: req.params.userId }, (err, user) => {
        if (err) return res.status(404).json({ message: 'User not found! '});        
        const body = req.body;
        user.username = body.username;
        user.phoneNumber = body.phoneNumber;
        user.birthDate = body.birthDate;
        user.email = body.email;
        bcrypt.hash(body.password, 10, (err, hash) => {
            if (err) return res.status(500).json({ error: err });
            user.password = hash;
            user.save();
            res.status(200).json({ message: 'User updated' });      
        });
        
    })
}

const deleteUser = (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.userId} , (err) => {
        if (err) return res.send(err);
        res.status(200).json({ message: 'Delete successful!'});
    })
}

const signupUser = (req, res, next) => {
    const body = req.body;
    const { username, email } = body;
    // User.find({ $or:[{username, email}] })
    User.find({ username }).exec()
        .then(user => {
            if(user.length > 0) return res.status(409).json({
                message: 'Username already exist!'
            })
            User.find({ email }).exec()
                .then(user => {
                    if (user.length > 0) return res.status(409).json({
                        message: 'Email already used!'
                    })
                                        
                    bcrypt.hash(body.password, parseInt(process.env.SALT) || 10, (err, hash) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ error: err });
                        }
                        
                        const {username, email, phoneNumber} = body;
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            username, 
                            email, 
                            phoneNumber,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({ message: 'User created' });
                            })
                            .catch(error => {
                                console.log(error);
                                res.status(500).json({ error:error });
                            });                        
                    });                    
                })
        });
}

const extractToken = (req, res, next) => {
    const header = req.headers['authorization'];    
    if (header != 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        jwt.verify(token, 'oPrint', (err, decoded) => {
            if (err)
                res.status(500).json({ error: err });
            req.userData = decoded;
            return res.status(200).json({ userData: decoded });
        });
    } 
    else {
        return res.status(404).json({ error: 'Token not found' });
    }
}

module.exports = {
    listAllUser,
    addUser,
    getUser,
    updateUser,
    deleteUser,
    signupUser,
    extractToken
}