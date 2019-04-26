const { userHandler, customerHandler, sellerHandler, productHandler } = require('../handler');
const { listAllUser, addUser, updateUser, getUser, deleteUser, signupUser, extractToken } = userHandler;
const { signupCustomer, signupExistingCustomer, loginCustomer, getCustomer, addToCart} = customerHandler;
const { listAllSeller, signupSeller, signupExistingSeller, loginSeller } = sellerHandler;
const { listAllProduct, addProduct, addManyProduct, deleteProduct, deleteAllProduct } = productHandler;

module.exports = {
    listAllUser,
    addUser,
    getUser,
    updateUser,
    deleteUser,
    signupUser,
    extractToken,
    signupCustomer,
    signupExistingCustomer,
    loginCustomer,
    getCustomer,
    addToCart,
    listAllSeller,
    signupSeller,
    signupExistingSeller,
    loginSeller,
    listAllProduct,
    addProduct,
    addManyProduct,
    deleteProduct,
    deleteAllProduct
}