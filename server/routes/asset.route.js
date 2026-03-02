const express = require('express');
const router = express.Router()
const assetController = require('../controllers/asset.controller');
const { handleMulterError } = require('../middlewares/handleMulter.middleware');

// # Asset
// GET    /api/assets                  → ดึงรายการ asset ทั้งหมด
router.get('/assets', assetController.list)


// GET    /api/asset/:id              → ดึง asset เดียว + รูป + inventory
router.get('/asset/:assetId', assetController.getAsset)


// POST   /api/asset                  → สร้าง asset ใหม่
router.post('/asset', handleMulterError, assetController.create)


// PUT    /api/asset/:id              → แก้ไข asset
router.put('/asset/:assetId', handleMulterError, assetController.update)


// DELETE /api/asset/:id              → ลบ asset (Cascade ลบทุกอย่าง)
router.delete('/asset/:assetId', assetController.remove)

// # Asset Images
// POST   /api/assets/:id/images       → อัปโหลดรูป (หลายรูปได้)
// DELETE /api/assets/images/:imageId  → ลบรูป

module.exports = router