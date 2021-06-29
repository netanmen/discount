require('dotenv').config();

const config = {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
};

module.exports = config;

