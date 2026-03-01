const prisma = require('../prisma/prisma')
const { sendEmail } = require('../services/email.service')
exports.create = async (req, res) => {
    try {
        const { prefix, name } = req.body
        if (!name) {
            return res.status(400).json({
                ok: false,
                msg: "name is required"
            })
        }

        const duplicate = await prisma.department.findFirst({
            where: {
                name:{
                    contains: name,
                }
            }
        })

        if (duplicate) {
            return res.status(400).json({
                ok: false,
                msg: "Department is aleary exits"
            })
        }

        const newDept = await prisma.department.create({
            data: {
                prefix,
                name
            }
        })

        if (!newDept) {
            return res.status(400).json({
                ok: false,
                msg: "Something went wrong, please try again"
            })
        }

        // sendEmail(
        //     "highjunesolution@outlook.com",
        //     "New Department Created",
        //     ` <div style="font-family: Arial; background:#f4f6f9; padding:20px;">
        //          <div style="max-width:600px;margin:auto;background:#ffffff;padding:20px;border-radius:10px;">
        //             <h2 style="color:#2c3e50;">New IT Request</h2>
        //             <p><strong>Department ID:</strong> ${newDept.id}</p>
        //             <p><strong>Department Name:</strong> ${newDept.name}</p>
        //             <p><strong>Created :</strong> ${newDept.createdAt}</p>

        //             <div style="margin-top:30px;text-align:center;">
        //                 <a href="#"
        //                 style="background:#27ae60;color:white;padding:12px 20px;
        //                 text-decoration:none;border-radius:6px;margin-right:10px;">
        //                 ✅ Approve
        //                 </a>

        //                 <a href="#"
        //                 style="background:#e74c3c;color:white;padding:12px 20px;
        //                 text-decoration:none;border-radius:6px;">
        //                 ❌ Reject
        //                 </a>
        //             </div>

        //             <p style="margin-top:40px;font-size:12px;color:#999;">
        //                 IT Borrow System
        //             </p>
        //         </div>
        //     </div>`
        // )

        return res.status(201).json({
            ok: true,
            msg: "New department is created",
            data: newDept
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: `Server error : ${err.message}`
        })
    }
}

exports.list = async (req, res) => {
    try {
        const departments = await prisma.department.findMany({
            orderBy: {
                name: 'asc'
            }
        })
        return res.status(200).json({
            ok: true,
            departments: departments
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: `Server error : ${err.message}`
        })
    }
}

exports.update = async (req, res) => {
    try {
        const { prefix, name } = req.body
        const { id } = req.params
        const updateDept = await prisma.department.update({
            where: {
                id: Number(id)
            },
            data: {
                prefix,
                name
            }
        })
        if (!updateDept) {
            return res.status(400).json({
                ok: false,
                msg: "Invalid information, please try again"
            })
        }

        return res.status(200).json({
            ok: true,
            msg: "Department is updated",
            department: updateDept
        })

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: `Server error : ${err.message}`
        })

    }
}

exports.del = async (req, res) => {
    try {
        const { id } = req.params

        const checkId = await prisma.department.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!checkId) {
            return res.status(400).json({
                ok: false,
                msg: "Department ID not found"
            })
        }

        const del = await prisma.department.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json({
            ok: true,
            msg: "Department is deleted",
            department: del
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: `Server error : ${err.message}`
        })
    }
}