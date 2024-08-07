const jwt = require('jsonwebtoken');
const { response } = require('./Response');
const client = require('../server');

require('dotenv').config();

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_SECRET, { expiresIn: '2d' });
};

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_SECRET, { expiresIn: '5m'});
};

exports.accessTokenOptions = {
    maxAge: 10 * 60 * 1000,
    httpOnly: true,
    secure : true,
    sameSite : 'Lax'
};

exports.refreshTokenOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure : true,
    sameSite : 'Lax'
};

exports.sendToken = async (res, user, message, statusCode) => {
    let accessToken = generateAccessToken(user._id);
    let refreshToken = generateRefreshToken(user._id);

    user.password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;

    try {
        await client.set(user._id.toString(), JSON.stringify(user), 'EX', 2 * 24 * 60 * 60); // Set expiry of 2 days
        res.cookie("access_token", accessToken, exports.accessTokenOptions);
        res.cookie("refresh_token", refreshToken, exports.refreshTokenOptions);

        response(res, message, { accessToken, refreshToken, user }, statusCode);
    } catch (err) {
        console.error('Error setting value in Redis:', err);
        response(res, 'Login failed', null, 500);
    }
};

exports.clearToken = async (res, message, statusCode) => {
    try {
        res.cookie("access_token", '', {
            maxAge: 1,
            httpOnly: true,
            secure : true,
            sameSite : 'Lax'
        });

        res.cookie("refresh_token", '', {
            maxAge: 1,
            httpOnly: true,
            secure : true,
            sameSite : 'Lax'
        });

        response(res, message, {}, statusCode);
    } catch (error) {
        response(res, error.message, error, statusCode);
    }
};


