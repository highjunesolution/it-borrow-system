const prisma = require('../prisma/prisma')

const serverErr = (err, res) => {
    return res.status(500).json({
        ok: false,
        msg: `Server error : ${err.message}`
    })
}

const checkDuplicateSection = async (name, excludeId = null) => {
    const section = await prisma.section.findFirst({
        where: {
            name: { equals: name },
            ...(excludeId && { NOT: { id: excludeId } }) // exclude current record on update
        }
    })
    return !!section // true = duplicate exists
}

const checkSectionId = async (sectionId) => {
    const section = await prisma.section.findUnique({
        where: { id: Number(sectionId) }
    })
    return section // null if not found
}

const checkDepartmentId = async (departmentId) => {
    const department = await prisma.department.findUnique({
        where: { id: Number(departmentId) }
    })
    return department // null if not found
}

exports.create = async (req, res) => {
    try {
        const { prefix, name, departmentId } = req.body
        if (!name || !departmentId) {
            return res.status(400).json({
                ok: false,
                msg: "Section name and department ID is required"
            })
        }

        const checkDept = await prisma.department.findUnique({
            where: {
                id: Number(departmentId)
            }
        })

        if (!checkDept) {
            return res.status(400).json({
                ok: false,
                msg: "Department not found, Invalid Department ID"
            })
        }

        const checkDuplicate = await prisma.section.findFirst({
            where: {
                name: {
                    equals: name.toLowerCase(),
                }
            }
        })
        if (checkDuplicate) {
            return res.status(400).json({
                ok: false,
                msg: "Section name is already exists!"
            })
        }

        const newSect = await prisma.section.create({
            data: {
                prefix: prefix,
                name: name,
                departmentId: Number(departmentId)
            }
        })

        return res.status(201).json({
            ok: true,
            msg: "Section is created",
            section: newSect
        })


    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: `Server error: ${err.message}`
        })

    }
}

exports.list = async (req, res) => {
    try {
        const sections = await prisma.section.findMany({
            include: {
                department: {
                    select: {
                        id: true,
                        name: true
                    }
                }

            },
            orderBy: {
                name: 'asc'
            }
        });

        return res.status(200).json({
            ok: true,
            sections: sections
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: `Server error : ${err.message}`
        })
    }
}

exports.update = async (req, res) => {
    try {
        const { name, prefix, departmentId } = req.body
        const { sectionId } = req.params

        if (!name || !departmentId) {
            return res.status(400).json({
                ok: false,
                msg: "Section name and department ID is required"
            })
        }


        const sectionExists = await checkSectionId(sectionId)
        if (!sectionExists) {
            return res.status(400).json({
                ok: false,
                msg: "Section not found, Invalid section ID"
            })
        }

        const departmentExists = await checkDepartmentId(departmentId)
        if (!departmentExists) {
            return res.status(400).json({
                ok: false,
                msg: "Department not found, Invalid department ID"
            })
        }

        const isDuplicate = await checkDuplicateSection(name, Number(sectionId))
        if (isDuplicate) {
            return res.status(400).json({
                ok: false,
                msg: "Section name already exists!"
            })
        }

        const updateSect = await prisma.section.update({
            where: {
                id: Number(sectionId)
            },
            data: {
                name: name,
                prefix: prefix,
                departmentId: Number(departmentId),
            },
            include: {
                department: {
                    select: { id: true, name: true }
                }
            }
        })

        return res.status(200).json({
            ok: true,
            msg: "Section is updated",
            section: updateSect
        })
    } catch (err) {
        serverErr(err, res)
    }
}

exports.remove = async (req, res) => {
    try {
        const { sectionId } = req.params
        const sectionExists = await checkSectionId(sectionId)
        if (!sectionExists) {
            return res.status(400).json({
                ok: false,
                msg: "Section not found, Invalid section ID"
            })
        }

        const remove = await prisma.section.delete({
            where: {
                id: Number(sectionId)
            }, include: {
                department: {
                    select: { id: true, name: true }
                }
            }
        })

        return res.status(200).json({
            ok: true,
            msg: "Section is deleted",
            removedSection: remove,
        })
    } catch (err) {
        serverErr(err, res)
    }
}