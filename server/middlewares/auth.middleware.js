require('dotenv').config()
const jwt = require('jsonwebtoken')
const serverErr = (err, res) => {
    return res.status(500).json({
        ok: false,
        msg: `Server error : ${err.message}`
    })
}

exports.auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({
                ok: false,
                msg: "No token provided"
            })
        }

        // Split token from Bearer
        const token = authorization.split(" ")[1]
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: "Invalid token format"
            })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded
        next();
    } catch (err) {
        // แยก jwt error ออกจาก server error
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                ok: false,
                msg: "Token expired, please login again"
            })
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                ok: false,
                msg: "Invalid token"
            })
        }
        serverErr(err, res)
    }
}

exports.ITAuth = async (req, res, next) => {
    try {
        const { role } = req.user
        if(role !== "IT") {
            return res.status(403).json({
                ok: false,
                msg: "Forbidden : IT only"
            })
        }
        next()
    } catch (err) {
        serverErr(err, res)
    }
}

exports.adminAuth = async (req, res, next) => {
    try {
        const {role} = req.user
        if(role !== "ADMIN") {
            return res.status(403).json({
                ok: false,
                msg: "Forbidden : ADMIN only"
            })
        }
        next()
    } catch (err) {
        serverErr(err, res)
    }
}
