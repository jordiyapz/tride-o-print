const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Seller = mongoose.model('Seller');

const listAllProduct = (req, res, next) => {
    Product.find({})
        .populate('seller')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                product: docs
            })
        })
        .catch(err => {
                if(err) res.status(500).json({err: err});
            }
        )
}

const addProduct = (req, res, next) => {
    console.log(req.file);
    console.log({body:req.body});
    const body = req.body;
    const files = req.files;
    const sellerId = body.sellerId;
    Seller.find({_id: sellerId})
        .exec()
        .then(docs => {
            if (docs.length == 0) return res.status(404).json({message: 'Seller not found'});
            const {name, category, description, price} = body;
            let productId = new mongoose.Types.ObjectId();
            const product = new Product({
                _id: productId,
                name: name,
                seller: sellerId,
                category,
                description,
                price,
                rating,
                cost: price
            });
            files.forEach(file => {
                product.images.push({
                    path: file.path
                })
            });
            const seller = docs[0];
            seller.products.push(productId);
            seller.save()
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ error:error });
                });
            product.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({ message: 'Product added!' });
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({ error:error });
                });
        })
        .catch(err => {
            if (err) return res.status(500).json({err:err});
        })
}

const addManyProduct = (req, res, next) => {
    console.log(req.file);
    const body = req.body;
    const files = req.files;
    const sellerId = body.sellerId;
    Seller.find({_id: sellerId})
        .exec()
        .then(docs => {
            if (docs.length < 1) return res.status(404).json({message: 'Seller not found'});
            const {sellerId} = body
            files.forEach((img, idx) => {
                let productId = new mongoose.Types.ObjectId();
                const product = new Product({
                    _id: productId,
                    name: body.names[id],
                    seller: sellerId,
                    category: body.categories[id],
                    description: body.descriptions[id],
                    price: body.prices[id],
                    cost: price
                });
                product.images.push({
                    path: file.path
                });
            })

            const seller = docs[0];
            seller.products.push(productId);
            seller.save()
                .catch(error => {
                    console.log(error);
                    res.status(500).json({ error:error });
                });
            product.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({ message: 'Product added!' });
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({ error:error });
                });
        })
        .catch(err => {
            if (err) return res.status(500).json({err:err});
        })
}

const deleteProduct = (req, res, next) => {
    Product.findById(req.params.productId).exec()
        .then( product => {
            if (product == null)
                return res.status(404).json({ message: 'Not found' });
            Seller.findById(product.seller).exec()
                .then( seller => {
                    if ( seller != null ) {

                        const idx = seller.products.findIndex( prod => product._id.equals(prod) );
                        if ( idx == -1 )
                            console.log(`Product id(${product._id}) is not found in Seller`);
                        seller.products.splice(idx, 1);
                        seller.save();

                    }
                    product.remove()
                    return res.status(200).json({ message: 'Delete succesful '});
                })
                .catch( error => {
                    if ( error )
                        return res.status(500).json({ error: error });
                })
        })
        .catch( error => {
            if (error) {
                return res.status(500).json({ error });
            }
                
        })
}

const deleteAllProduct = (req, res, next) => {
    console.log('delete all');
    Product.find({}).exec()
        .then( docs => {
            if ( docs.length == 0 )
                return res.status(404).json({ message: 'Nothing to delete' });
            docs.forEach( product => {
                Seller.findById(product.seller).exec()
                    .then( seller => {
                        if ( seller != null ) {

                            const idx = seller.products.findIndex( prod => product._id.equals(prod) );
                            if ( idx == -1 )
                                console.log(`Product id(${product._id}) is not found in Seller`);
                            seller.products.splice(idx, 1);
                            seller.save();

                        }
                        product.remove();
                    })
                    .catch( err => {
                        if ( err )
                            return res.status(500).json({ error: err });
                    })
            })
            return res.status(500).json({ message: 'Delete Successful' });
        })
        .catch( err => {
            if ( err )
                return res.status(500).json({ error: err });
        })
}

module.exports = {
    listAllProduct,
    addProduct,
    addManyProduct,
    deleteProduct,
    deleteAllProduct
}