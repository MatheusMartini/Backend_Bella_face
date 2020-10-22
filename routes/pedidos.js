const express = require("express");
const router = express.Router();

// return pedidos
router.get("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "retorna pedidos",
  });
});

//insert pedidos post
router.post("/", (req, res, next) => {
  const pedido = {
    id_pedido: req.body.id,
    quantidade: req.body.quantidade,
  };

  res.status(200).send({
    mensagem: "criar pedidos",
    pedidoCriado: pedido,
  });
});

//get pedidos by id
router.get("/:id_pedido", (req, res, next) => {
  const id = req.params.id_pedido;
  res.status(200).send({
    mensagem: "detalhes do pedido",
    id_pedido: id,
  });
});

// alter pedido
router.patch("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "alterar pedidos",
  });
});

//delete pedido
router.delete("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "excluir pedido",
  });
});

module.exports = router;
