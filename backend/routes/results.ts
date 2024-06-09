import express from 'express';
const router = express.Router();

const { storeResults,getResults } = require('../controllers/resultsController');
const { protect } = require('../middlewares/authMiddleware');


router.post('/storeResults', protect, storeResults);
router.post('/getResults', protect, getResults);
module.exports = router
