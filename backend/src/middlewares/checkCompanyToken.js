const jwt = require("jsonwebtoken");


// Verify Token from cookies
function verifyCompanyToken(req, res, next) {
    const token = req.cookies.jwt;  // Extract JWT from cookies

    if (token) {
        try {
            const decodedPayLoad = jwt.verify(token, process.env.JWT_SECRET_COMPANY);
            req.user = decodedPayLoad;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token, access denied" });
        }
    } else {
        return res.status(401).json({ message: "No token provided, access denied" });
    }
}


module.exports = verifyCompanyToken;