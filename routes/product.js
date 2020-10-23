const express = require('express');
const router = express.Router();

const login = require("../middleware/login");

const productController = require("../controllers/productController");

// get products 
router.get('/', productController.getProduct);

//insert product post 
router.post('/',login.require, productController.postProduct);

//get product by id
router.get('/:id_product', productController.getProductById);
 
// alter product
router.patch('/',login.require, productController.alterProduct);

//delete product
router.delete('/',login.require, productController.delete);

module.exports = router;