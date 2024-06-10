// @ts-nocheck
import express from 'express';
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');
const { handleQuery } = require('../controllers/queryController');

router.post('/query', protect, handleQuery);

module.exports = router
