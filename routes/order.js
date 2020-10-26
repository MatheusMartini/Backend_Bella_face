const express = require("express");
const router = express.Router();

const login = require("../middleware/login");
const orderController = require("../controllers/orderController")

// return get pedidos
router.get("/", login.require, orderController.getOrder );

//get pedidos by id
router.get("/:order_order_id", login.require, orderController.getOrderById);

// alter quantidade by id
router.patch("/", login.require, orderController.alterQuantityById );

//delete pedido
router.delete("/", orderController.delete);

//altera total da compra
router.put("/alteratotal", orderController.updateTotalOrder);

//altera comentario
router.put("/comentario", orderController.setComment);

//insert pedido conpleto
router.post("/insertpedido", orderController.postPedido);


module.exports = router;
