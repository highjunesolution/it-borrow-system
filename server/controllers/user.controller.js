const prisma = require('../prisma/prisma');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const serverErr = (err, res) => {
    return res.status(500).json({
        ok: false,
        msg: `Server error : ${err.message}`
    })
}

const select = {
    id: true,
    empCode: true,
    firstName: true,
    lastName: true,
    email: true,
    active: true,
    role: true,
    createdAt: true,
    updatedAt: true,
}

const section = {
    select: {
        id: true,
        name: true,
        department: {
            select: { id: true, name: true }
        }
    }
}

const checkEmail = async (email) => {
    const emailExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    return emailExists
}

const checkSectId = async (sectionId) => {
    const checkSectionId = await prisma.section.findUnique({
        where: {
            id: Number(sectionId)
        }
    })

    return checkSectionId
}

const checUser = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(userId)
        }, select: {
            ...select,
            section: { ...section }
        }
    })

    return user
}

exports.create = async (req, res) => {
    try {
        const { empCode, firstName, lastName, email, password, sectionId } = req.body


        // Validate
        if (!firstName || !lastName || !email || !password || !sectionId) {
            return res.status(400).json({
                ok: false,
                msg: "Something filed is required"
            })
        }
        // Check empCode already exists
        if (empCode) {
            const checkEmpCode = await prisma.user.findUnique({
                where: {
                    empCode: empCode
                }
            })

            if (checkEmpCode) {
                return res.status(400).json({
                    ok: false,
                    msg: "Employee code is already exists"
                })
            }
        }

        const [checkEmail, checkSectionId] = await Promise.all([
            prisma.user.findUnique({
                where: {
                    email: email
                }
            }),
            prisma.section.findUnique({
                where: {
                    id: Number(sectionId)
                }
            })
        ])

        // Check email already exists
        if (checkEmail) {
            return res.status(400).json({
                ok: false,
                msg: "Email is already exists"
            })
        }

        // Check sectionId
        if (!checkSectionId) {
            return res.status(400).json({
                ok: false,
                msg: "Section ID not found, Invalid section ID"
            })
        }


        // Hash Password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt)

        // Record in DB
        const newUser = await prisma.user.create({
            data: {
                empCode: empCode,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashPassword,
                sectionId: Number(sectionId)
            },
            select: {
                ...select,
                section: {
                    select: {
                        id: true,
                        name: true,
                        department: {
                            select: { id: true, name: true }
                        }
                    }
                }
            }
        })

        return res.status(201).json({
            ok: true,
            msg: "User is created",
            user: newUser
        })
    } catch (err) {
        serverErr(err, res)
    }
}

exports.list = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            // where: {
            //     active: true
            // },
            select: {
                ...select,
                section: { ...section }
            }
        })

        return res.status(200).json({
            ok: true,
            count: users.length,
            users: users
        })
    } catch (err) {
        serverErr(err, res)
    }
}

exports.update = async (req, res) => {
    try {
        const { userId } = req.params

        const { empCode, firstName, lastName, email, password, sectionId } = req.body

        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        })
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "User not found, Invalid user ID"
            })
        }

        // Check empCode already exists
        if (empCode) {
            const checkEmpCode = await prisma.user.findUnique({
                where: {
                    empCode: empCode
                }
            })

            if (checkEmpCode) {
                return res.status(400).json({
                    ok: false,
                    msg: "Employee code is already exists"
                })
            }
        }

        if (email) {
            const emailExists = await checkEmail(email)
            if (emailExists) {
                return res.status(400).json({
                    ok: false,
                    msg: "Email is already exists"
                })
            }
        }

        if (sectionId) {
            const checkSect = await checkSectId(sectionId)
            if (!checkSect) {
                return res.status(400).json({
                    ok: false,
                    msg: "Section ID not found, Invalid section ID"
                })
            }
        }

        let hashPassword = undefined
        if (password) {
            // Hash Password
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt)
        }

        const data = {
            ...(empCode && { empCode }),
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(email && { email }),
            ...(hashPassword && { password: hashPassword }),
            ...(sectionId && { sectionId })
        }


        // Record in DB
        const updateUser = await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: data,
            select: {
                ...select,
                section: {
                    select: {
                        id: true,
                        name: true,
                        department: {
                            select: { id: true, name: true }
                        }
                    }
                }
            }
        })

        return res.status(200).json({
            ok: true,
            updatedUser: updateUser,
            data: data
        })
    } catch (err) {
        serverErr(err, res)
    }
}

exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await checUser(userId)
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "User not found, Invalid user ID"
            })
        }

        return res.status(200).json({
            ok: true,
            user: user
        })
    } catch (err) {
        serverErr(err, res)
    }
}

exports.disable = async (req, res) => {
    try {
        const { userId } = req.params
        if (!(await checUser(userId))) {
            return res.status(400).json({
                ok: false,
                msg: "User not found, Invalid user ID"
            })
        }

        const disbled = await prisma.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                active: false
            }, select: {
                ...select,
                section: { ...section }
            },
        })

        return res.status(200).json({
            ok: true,
            msg: "User is disabled",
            user: disbled
        })
    } catch (err) {
        serverErr(err, res)
    }
}