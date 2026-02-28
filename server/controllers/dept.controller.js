const prisma = require('../prisma/prisma')

exports.create = async (req, res) => {
    try {
        const {prefix, name} = req.body
       const newDept =  await prisma.department.create({
            data: {
                prefix,
                name
            }
        })

        if(!newDept) {
            return res.status(500).json({
                ok: false,
                msg: "Some thing went wrong, please try again!"
            })
        }

        return res.statu(201).json({
            ok: true,
            msg: "New department is created",
            data: newDept
        })
    } catch (err) {
        console.log(err);
    }
}

exports.list = async (req, res) => {
     try {
        res.send("List Department")
    } catch (err) {
        console.log(err);
    }
}

exports.update = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);
        
    }
}

exports.disable = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err);
        
    }
}