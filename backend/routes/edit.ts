// @ts-nocheck

import express from 'express';
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');
const {editBio} = require('../controllers/editUserDetailsController');
const {editBackgroundPic} = require('../controllers/editUserDetailsController');
const {editProfilePic} = require('../controllers/editUserDetailsController');
const {enterDetails} = require('../controllers/editUserDetailsController');

router.post('/editBio', protect, editBio);
router.post('/editBackgroundPic', protect, editBackgroundPic);
router.post('/editProfilePic', protect, editProfilePic);
router.post('/enterDetails', enterDetails);

module.exports = router
