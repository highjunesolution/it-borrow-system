const prisma = require('../prisma/prisma')

const findCateById = async (id) => {
    return prisma.category.findUnique({ where: { id: Number(id) } })
}

const checkDuplicateCateName = async (name, excludeId = null) => {
    return prisma.category.findFirst({
        where: {
            name: name,
            ...(excludeId && { NOT: { id: Number(excludeId) } })
        }
    })
}

const serverErr = (err, res) => {
    return res.status(500).json({
        ok: false,
        msg: `Server error : ${err.message}`
    })
}

exports.create = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).json({
                ok: false,
                msg: "Category name is required"
            })
        }

        const checkCate = await checkDuplicateCateName(name)
        if (checkCate) {
            return res.status(400).json({
                ok: false,
                msg: "Category name is already exists"
            })
        }

        const newCate = await prisma.category.create({
            data: {
                name: name
            }
        })

        return res.status(201).json({
            ok: true,
            newCate: newCate
        })
    } catch (err) {
        serverErr(err, res)
    }
}

exports.update = async (req, res) => {
    try {
        const { categoryId } = req.params
        const { name } = req.body

        const checkCateByID = await findCateById(categoryId)
        if (!checkCateByID) {
            return res.status(400).json({
                ok: false,
                msg: "Category not found, Invalid category ID"
            })
        }

        const checkCateByName = await checkDuplicateCateName(name, categoryId)
        if (checkCateByName) {
            return res.status(400).json({
                ok: false,
                msg: "Category name is already exists"
            })
        }

        const updateCate = await prisma.category.update({
            where: {
                id: Number(categoryId)
            },
            data: {
                name: name
            }
        })

        return res.status(200).json({
            ok: true,
            cateUpdated: updateCate
        })
    } catch (err) {
        serverErr(err, res)
    }
}

exports.remove = async (req, res) => {
    try {
        const { categoryId } = req.params
        if (!(await findCateById(categoryId))) {
            return res.status(400).json({
                ok: false,
                msg: "Category not found, Invalid category ID"
            })
        }

        const assetsCount = await prisma.asset.count({
            where: {
                categoryId: Number(categoryId)
            }
        })
        if (assetsCount > 0) {
            return res.status(400).json({
                ok: false,
                msg: `Cannot delete category, it still has ${assetsCount} asset(s) attached to it`
            })
        }

        const del = await prisma.category.delete({
            where: {
                id: Number(categoryId)
            }
        })

        return res.status(200).json({
            ok: true,
            removedCategory: del
        })
    } catch (err) {
        serverErr(err, res)
    }
}