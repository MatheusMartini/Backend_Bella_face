const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const rotaProdutos = require("./routes/produtos");
const rotaPedidos = require("./routes/pedidos");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); // seta apenas dados simples
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requrested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }
  next();
});

app.use("/produtos", rotaProdutos);
app.use("/pedidos", rotaPedidos);

// rota nao definida
app.use((req, res, next) => {
  const erro = new Error("rota nao encontrada");
  erro.status = 404;
  next(erro);
});
// mensagem de erro de rota nao encontrada
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    mensagem: error.message,
  });
});

module.exports = app;
