require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    pool: true,
    maxConnections: 5,
    // post: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSW
    }
});

const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `"IT System" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    })
}

module.exports = { sendEmail }