const express = require('express');
const router = express.Router();
const affiliates = require('../data/affiliates.json');
const jwt = require("jsonwebtoken");
const config = require('../config/config');

router.post('/login', function (req, res, next) {
    const { email, password } = req.body;
    const affiliate = affiliates.find(affiliate => affiliate.email === email);

    if (!affiliate || affiliate.password !== password) {
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
