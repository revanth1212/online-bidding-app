const express=require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../contollers/productContoller');
const router=express.Router();
const { authorizeRoles}=require('../middlewares/authenticate');



router.route('/products').get(getProducts);
router.route('/product/new').post(authorizeRoles('user'), newProduct);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);

module.exports=router