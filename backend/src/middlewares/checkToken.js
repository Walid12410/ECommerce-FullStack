const jwt = require("jsonwebtoken");

// Verify Token from cookies
function verifyToken(req, res, next) {
    const token = req.cookies.jwt;  // Extract JWT from cookies

    if (token) {
        try {
            const decodedPayLoad = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedPayLoad;  // Attach user info to the request object
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token, access denied" });
        }
    } else {
        return res.status(401).json({ message: "No token provided, access denied" });
    }
}


// Verify token and admin
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Not allowed, only admin" });
        }
    });
}

// Verify token and only user himself
function verifyTokenAndOnlyUser(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.userId === parseInt(req.params.id)) {
            next();
        } else {
            return res.status(403).json({ message: "Not allowed, only user himself" });
        }
    });
}

// Verify token and authorization (user or admin)
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.userId || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Not allowed, only user himself or admin" });
        }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization
};
