require('dotenv').config()
const prisma = require('../prisma/prisma');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const serverErr = (err, res) => {
    return res.status(500).json({
        ok: false,
        msg: `Server error : ${err.message}`
    })
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                msg: "Email and password is required"
            })
        }

        // Step 1 find user from email
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })


        // Step 2 check user and compare password
        const isMatch = user ?  await bcryptjs.compare(password, user.password) : false
        if (!user || !isMatch) {
            return res.status(400).json({
                ok: false,
                msg: "Invalid email or password"
            })
        }

        // Step 3 user is active?
        if(!user.active){
            return res.status(403).json({
                ok: false,
                msg: "Account is disabled, please contact administrator"
            })
        }

        // Step 4 create payload
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        // Step 5 create token
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1d'
        })

        return res.status(200).json({
            ok: true,
            user: payload,
            token: token
        })

    } catch (err) {
        serverErr(err, res)
    }
}