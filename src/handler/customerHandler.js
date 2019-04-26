const mongoose = require('mongoose');
const User = mongoose.model('User');
const Customer = mongoose.model('Customer');
const Product = mongoose.model('Product');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupCustomer = (req, res, next) => {
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
                        user.roles.push('Customer');
                        user.save()
                            .catch(error => {
                                console.log(error);
                                res.status(500).json({ error:error });
                            });
                        const customer = new Customer({
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

const signupExistingCustomer = (req, res, next) => {
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
                        if (user.roles.includes('Customer'))
                            return res.status(409).json({ message: 'Already signed up'})
                        else {
                            user.roles.push('Customer');
                            const customer = new Customer({
                                userId: user._id
                            });
                            customer.save()
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

const loginCustomer = (req, res, next) => {
		const body = req.body;
    const {input} = body;
    let finder;
    if (
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(input)
    ) finder = User.find({ email: input });
    else finder = User.find({ username: input });

    finder.exec()
        .then(users => {
            if (users.length == 0)
                return res.status(409).json({ message: 'Auth failed' });
            const user = users[0];
            bcrypt.compare(body.password, user.password, (err, result) => {
                if (err)
									return res.status(500).json({ err });
								if (!result)
									return res.status(409).json({ message: 'Auth failed' });
									Customer.find({ userId: user._id })
										.exec()
										.then(customers => {
												if (customers.length > 0) {
														const token = jwt.sign({
															_id: customers[0]._id,
															userId: user._id,
															username: user.username
														},
														'oPrint',
														{
																expiresIn: "2h"
														});
														console.log({															
															message: 'Customer Login successful!',
															username: user.username,
															token: token
														})
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
            });

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error:error });
        });
}

const getCustomer = (req, res, next) => {
	Customer.findById(req.params.customerId)
		.populate('userId')
		.exec()
		.then( customer => {
			return res.status(200).json({ customer });
		})
		.catch(error => {
			if ( error )
				return res.status(500).json({ error });
		})
}

const addToCart = (req, res, next) => {
	const customerId = req.params.customerId;
	const {productId, qty} = req.body;
	Customer.findById(customerId, (err, customer) => {
		if (err) 
			return res.status(500).json({ error: err });
		if (customer == null)
			return res.status(404).json({ message: 'Customer not found'});
		Product.findById(productId, (err, product) => {
			if (err) 
				return res.status(500).json({ error: err });
			if (product == null)
				return res.status(404).json({ message: 'Product not found'});
			const findId = customer.carts.findIndex( doc => ( doc.productId == productId ));
			if (findId != -1)
				customer.carts[findId].qty += parseInt(qty);
			else 
				customer.carts.push({productId, qty});
			customer.save();
			res.status(200).json({ message: 'Added to cart' })
		})
	});
}

module.exports = {
    signupCustomer,
    signupExistingCustomer,
		loginCustomer,
		getCustomer,
		addToCart
}

