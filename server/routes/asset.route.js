const express = require('express');
const router = express.Router()
const assetController = require('../controllers/asset.controller');
const { handleMulterError } = require('../middlewares/handleMulter.middleware');
const { auth, adminAuth } = require('../middlewares/auth.middleware');

// # Asset
// GET    /api/assets                  → ดึงรายการ asset ทั้งหมด
router.get('/assets', assetController.list)


// GET    /api/asset/:id              → ดึง asset เดียว + รูป + inventory
router.get('/asset/:assetId', assetController.getAsset)


// POST   /api/asset                  → สร้าง asset ใหม่
router.post('/asset', auth, adminAuth, handleMulterError, assetController.create)


// PUT    /api/asset/:id              → แก้ไข asset
router.put('/asset/:assetId', auth, adminAuth, handleMulterError, assetController.update)


// DELETE /api/asset/:id              → ลบ asset (Cascade ลบทุกอย่าง)
router.delete('/asset/:assetId', auth, adminAuth, assetController.remove)

// # Asset Images
// POST   /api/assets/:id/images       → อัปโหลดรูป (หลายรูปได้)
// DELETE /api/assets/images/:imageId  → ลบรูป

module.exports = router