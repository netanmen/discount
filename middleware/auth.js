const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.sendStatus(401);
    }
    
    try {
        const { details: affiliateDetails } = jwt.verify(token, config.jwtSecretKey);
        req.affiliateDetails = affiliateDetails;
        
        next();
    } catch (error) {
        res.sendStatus(401);
    }
};