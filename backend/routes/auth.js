const express=require('express');
const { registerUser, loginUser, logoutUser, getUserProfile, changepassword, updateProfile } = require('../contollers/authController');
const { isAuthenticatedUser } = require('../middlewares/authenticate');
const router=express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/myprofile').get(isAuthenticatedUser,getUserProfile);
router.route('/password/change').put(isAuthenticatedUser,changepassword);
router.route('/update').put(updateProfile);

module.exports=router;