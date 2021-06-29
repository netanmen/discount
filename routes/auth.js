const express = require('express');
const router = express.Router();
const affiliates = require('../data/affiliates.json');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const config = require('../config/config');

const checkIsPasswordCorrect = async (password, hash) => {
    if (!password || !hash) {
        return false;
    }

    return await bcrypt.compare(password, hash);
};

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const affiliate = affiliates.find(affiliate => affiliate.email === email);

    const isPasswordCorrect = await checkIsPasswordCorrect(password, affiliate?.password);
    if (!affiliate || !isPasswordCorrect) {
        res.sendStatus(401);
    }

    const token = jwt.sign(
        {
            "details": {
                name: affiliate.name,
            }
        },
        config.jwtSecretKey,
        { algorithm: "HS256", subject: affiliate.id, expiresIn: "1d" }
    );

    res.send(token);
});

module.exports = router;
