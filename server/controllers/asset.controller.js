const prisma = require('../prisma/prisma')
const fs = require('fs')
const path = require('path')
const serverErr = (err, res) => {
    return res.status(500).json({
        ok: false,
        msg: `Server error : ${err.message}`
    })
}

const assetCodeExists = async (assetCode, excludeId = null) => {
    return await prisma.asset.findUnique({
        where: {
            assetCode: assetCode,
            ...(excludeId && { NOT: { id: Number(excludeId) } })
        }
    })
}

const findCateById = async (id) => {
    return prisma.category.findUnique({ where: { id: Number(id) } })
}

const findAssetById = async (id) => {
    return prisma.asset.findUnique({
        where: {
            id: Number(id)
        }, include: {
            category: true,
            assetImages: true,
            inventories: true,
        }
    })
}

exports.list = async (req, res) => {
    try {
        const assets = await prisma.asset.findMany({
            include: {
                category: true,
                assetImages: true,
                inventories: true,
            }
        })
        return res.status(200).json({
            ok: true,
            assets: assets
        })
    } catch (err) {
        serverErr(err, res)
    }
}

exports.getAsset = async (req, res) => {
    try {
        const { assetId } = req.params
        const asset = await findAssetById(assetId)
        if (!asset) {
            return res.status(400).json({
                ok: false,
                msg: "Asset not found, Invalid asset ID"
            })
        }

        return res.status(200).json({
            ok: true,
            asset: asset
        })
    } catch (err) {
        serverErr(err, res)
    }
}

exports.create = async (req, res) => {
    try {
        const { assetCode, name, description, categoryId, status } = req.body
        const inventories = JSON.parse(req.body.inventories || "[]");
        const files = req.files

        if (!assetCode || !name || !categoryId) {
            return res.staus(400).json({
                ok: false,
                msg: "Something filed is required"
            })
        }

        if (inventories.length < 0) {
            return res.status(400).json({
                ok: false,
                msg: "A minimum of 1 item must be in stock"
            })
        }

        const checkAssetCode = await assetCodeExists(assetCode)
        if (checkAssetCode) {
            return res.status(400).json({
                ok: false,
                msg: "Asset code is already exists"
            })
        }

        const category = await findCateById(categoryId);
        if (!category) {
            return res.status(400).json({
                ok: false,
                msg: "Category not found. Invalid category ID"
            });
        }

        const newAsset = await prisma.asset.create({
            data: {
                assetCode: assetCode,
                name: name,
                description: description,
                categoryId: Number(categoryId),
                status: status,
                assetImages: {
                    create: files.map((file, index) => ({
                        imageUrl: file.filename,
                        isPrimary: index === 0
                    }))
                },
                inventories: {
                    create: inventories.map((item) => ({
                        serialNumber: item.serialNumber,
                        location: item.location,
                        isAvailable: item.isAvailable
                    }))
                }
            },
            include: {
                category: true,
                assetImages: true,
                inventories: true,
            }
        })

        return res.status(201).json({
            ok: true,
            msg: "Asset is created",
            asset: newAsset
        })
    } catch (err) {
        serverErr(err, res)
    }
}

exports.update = async (req, res) => {
    try {
        const { assetId } = req.params
        const { name, description, categoryId } = req.body
        const files = req.files

        const asset = await findAssetById(assetId)
        if (!asset) {
            return res.status(400).json({
                ok: false,
                msg: "Asset not found, Invalid asset ID"
            })
        }

        if (!name || !categoryId) {
            return res.status(400).json({
                ok: false,
                msg: "Name and Category is required"
            })
        }

        const category = await findCateById(categoryId)
        if (!category) {
            return res.status(400).json({
                ok: false,
                msg: "Category not found, Invalid category ID"
            })
        }

        if (files?.length > 0) {
            // remove file in uploads/assets/
            asset.assetImages.forEach((image) => {
                const filePath = path.join('uploads/assets', image.imageUrl)
                // console.log(filePath);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                    console.log(`File is removed : ${image.imageUrl}`);
                }
            })

            await prisma.assetImage.deleteMany({
                where: {
                    assetId: Number(assetId)
                }
            })
        }

        const updatedAsset = await prisma.asset.update({
            where: {
                id: Number(assetId)
            },
            data: {
                ...(name && { name }),
                ...(description && { description }),
                ...(categoryId && { categoryId: Number(categoryId) }),
                ...(files?.length > 0 && {
                    assetImages: {
                        create: files.map((file, index) => ({
                            imageUrl: file.filename,
                            isPrimary: index === 0,
                        }))
                    }
                })
            },
            include: {
                category: true,
                assetImages: true,
                inventories: true,
            }
        })

        return res.status(200).json({
            ok: true,
            updatedAsset: updatedAsset
        })

    } catch (err) {
        serverErr(err, res)
    }
}

exports.remove = async (req, res) => {
    try {
        const { assetId } = req.params
        const asset = await findAssetById(assetId)
        if (!asset) {
            return res.status(400).json({
                ok: false,
                msg: "Asset not found, Invalid asset ID"
            })
        }

        asset.assetImages.forEach((image) => {
            const filePath = path.join('uploads/assets', image.imageUrl)
            // console.log(filePath);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
                console.log(`File is removed : ${image.imageUrl}`);
            }
        })

        await prisma.asset.delete({
            where: {
                id: Number(assetId)
            }
        })

        return res.status(200).json({
            ok: true,
            msg: "Asset is deleted"
        })
    } catch (err) {
        serverErr(err, res)
    }
}