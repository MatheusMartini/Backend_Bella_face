const express = require("express");
const router = express.Router();

const login = require("../middleware/login");
const orderController = require("../controllers/orderController")

// return get pedidos
router.get("/", login.require, orderController.getOrder );
//insert pedidos post
router.post("/", login.require, orderController.postOrder);
//get pedidos by id
router.get("/:order_id", login.require, orderController.getOrderById);
// alter quantidade by id
router.patch("/", login.require, orderController.alterQuantityById );
//delete pedido
router.delete("/", login.require, orderController.delete);

module.exports = router;
