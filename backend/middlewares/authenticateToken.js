const BlacklistedToken = require("../models/blacklistedToken");
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Check if the 'token' cookie is set in the request

    const token = req.cookies.token;

    if (token == null) return res.sendStatus(401);

    // Check if the token is in the blacklist
    BlacklistedToken.findOne({ where: { token } }).then((blacklistedToken) => {
        if (blacklistedToken) {
            return res.sendStatus(403); // Forbidden if token is blacklisted
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) return res.sendStatus(403);
            // Extract userId from the decoded token
            const userId = decodedToken.id;

            // Set userId in the response object
            res.locals.userId = userId;
            next();
        });
    });
}

module.exports = authenticateToken;
