const multer = require('multer')
const uploads = require('../middlewares/upload.middleware')
exports.handleMulterError = (req, res, next) => {
    uploads.array('assetImages', 5)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).json({ ok: false, msg: 'Too many files, maximum is 5' })
            }
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ ok: false, msg: 'File too large, maximum is 5MB' })
            }
            return res.status(400).json({ ok: false, msg: err.message })
        } else if (err) {
            return res.status(400).json({ ok: false, msg: err.message })
        }
        next()
    })
}