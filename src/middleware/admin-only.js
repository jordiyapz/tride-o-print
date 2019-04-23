const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'oPrint');
        if (decoded.roles.includes('Admin'))
            next();
        else
            return res.status(401).json({message: 'Auth failed'});
    } catch (err) {
        return res.status(401).json({ message: 'Auth failed' })
    }
}