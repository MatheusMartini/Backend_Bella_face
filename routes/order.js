const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

const orderController = require("../controllers/order.controller")

// return get pedidos
router.get("/",orderController.getOrder );

//insert pedidos post
router.post("/",orderController.postOrder);

//get pedidos by id
router.get("/:order_id", orderController.getOrderById);

// alter quantidade by id
router.patch("/",orderController.alterQuantityById );

//delete pedido
router.delete("/", orderController.delete);

module.exports = router;
