const mongoose = require('mongoose');
const User = mongoose.model('User');
const Seller = mongoose.model('Seller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const listAllSeller = (req, res, next) => {
    Seller.find({})
        .populate('userId products')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                sellers: docs.map(seller => {
                    console.log(seller.products);
                    return {
                        _id: seller._id,
                        userId: seller.userId,
                        status: seller.status,
                        products: seller.products
                    }
                })
            })
        })
        .catch(err => {
                if(err) res.status(500).json({err: err});
            }
        )
}

const signupSeller = (req, res, next) => {
    const body = req.body;
    const { username, email } = body;
   // User.find({ $or:[{username, email}] })
    User.find({ username }).exec()
        .then(users => {
            if(users.length > 0) return res.status(409).json({
                message: 'Username already exist!'
            })
            User.find({ email }).exec()
                .then(users => {
                    if (users.length > 0) return res.status(409).json({
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
                        user.roles.push('Seller');
                        user.save()
                            .catch(error => {
                                console.log(error);
                                res.status(500).json({ error:error });
                            });               
                        const seller = new Seller({
                            userId: user._id
                        }).save().then(result => {
                            console.log(result);
                            res.status(201).json({ message: 'Signup Successful' });
                        }).catch(error => {
                            console.log(error);
                            res.status(500).json({ error:error });
                        });
                    });                    
                })
        });
}

const signupExistingSeller = (req, res, next) => {
    const body = req.body;
    const {input} = body;
    let finder;
    if (
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(input)
    ) finder = User.find({ email: input });
    else finder = User.find({ username: input });
    
    finder.exec()
        .then(users => {
            if (users.length == 0) return res.status(404).json({ message: 'User not found' });
            else {
                const user = users[0];
                bcrypt.compare(body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(500).json({ result, err });
                    }
                    if (result) {
                        if (user.roles.includes('Seller')) 
                            return res.status(409).json({ message: 'Already signed up'})
                        else {
                            user.roles.push('Seller');                           
                            const seller = new Seller({
                                userId: user._id
                            });
                            seller.save()
                                .then(result => {
                                    user.save().catch(error => {
                                        console.log(error);
                                        res.status(500).json({ error:error });
                                    });
                                    console.log(result);
                                    res.status(201).json({ message: 'Signup Successful' });
                                })
                                .catch(error => {
                                    console.log(error);
                                    res.status(500).json({ error:error });
                                }); 
                        }
                    } else
                        return res.status(404).json({ message: 'User not found' })
                })
            }
        }
    ).catch(err => {
        return res.status(500).json({ error: err });
    });
    
}

const loginSeller = (req, res, next) => {
    const body = req.body;
    const {input} = body;
    let finder;
    if (
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(input)
    ) finder = User.find({ email: input });
    else finder = User.find({ username: input });
    
    finder.exec()
        .then(users => {
            if (users.length > 0) {
                const user = users[0];
                Seller.find({ userId: user._id }).exec()
                    .then(sellers => {
                        if (sellers.length > 0) {
                            const token = jwt.sign({
                                userId: user._id,
                                username: user.username,
                                address: user.address,
                                email: user.email,
                                phoneNumber: user.phoneNumber,
                                birthDate: user.birthDate,
                                roles: user.roles
                            }, 
                            'oPrint',
                            {
                                expiresIn: "5m"
                            });
                            return res.status(200).json({
                                message: 'Login successful!',
                                token: token
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({ error:error });
                    });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error:error });
        });
}

module.exports = {
    listAllSeller,
    signupSeller,
    signupExistingSeller,
    loginSeller
}