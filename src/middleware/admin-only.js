module.exports = (req, res, next) => {
    if (req.userData.roles.includes('Admin'))
        next();
    else
        return res.status(401).json({message: 'Auth failed'});
}