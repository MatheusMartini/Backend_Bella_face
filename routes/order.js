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
router.delete("/", orderController.delete);

//conclui pedido conpleto
router.post("/finalizapedido", login.require, orderController.postListOrder);

//cria pedido conpleto
router.post("/criapedido", login.require, orderController.delete);

//altera total da compra
router.put("/alteratotal", orderController.updateTotalOrder);

//altera comentario
router.put("/comentario", orderController.setComment);

router.post("/inpedido", orderController.postProdutoInPedido);

module.exports = router;
