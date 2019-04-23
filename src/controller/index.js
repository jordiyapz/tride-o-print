const { userHandler, customerHandler, sellerHandler, productHandler } = require('../handler');
const { listAllUser, addUser, updateUser, getUser, deleteUser, signupUser } = userHandler;
const { signupCustomer, signupExistingCustomer, loginCustomer } = customerHandler;
const { listAllSeller, signupSeller, signupExistingSeller, loginSeller } = sellerHandler;
const { listAllProduct, addProduct, addManyProduct } = productHandler;

module.exports = {
    listAllUser,
    addUser,
    getUser,
    updateUser,
    deleteUser,
    signupUser,
    signupCustomer,
    signupExistingCustomer,
    loginCustomer,
    listAllSeller,
    signupSeller,
    signupExistingSeller,
    loginSeller,
    listAllProduct,
    addProduct,
    addManyProduct
}