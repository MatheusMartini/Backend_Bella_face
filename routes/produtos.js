const express = require('express');
const { routes } = require('../app');
const router = express.Router();
const mysql = require("../mysql").pool;


// get products 
router.get('/',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})} 
        conn.query(
            "SELECT * FROM produtos;",
            (error, resultado, fields) => {
                if(error){return res.status(500).send({ error: error})} 
                res.status(200).send({
                    resp: resultado});
            }
        )
    });
});

//insert product post 
router.post('/',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})}
        conn.query(
            "INSERT INTO produtos(nome, preco, descricao) VALUES (?,?,?)",
            [req.body.nome, req.body.preco, req.body.descricao],
            (error, resultado, fields) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        error: error, 
                        response: null
                    });
                }
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso!',
                    id_produto: resultado.insertId
                });

            }
        )
    });
});

//get product by id
router.get('/:id_produto',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})} 
        conn.query(
            "SELECT * FROM produtos WHERE id_produto = ?;",
            [req.params.id_produto],
            (error, resultado, fields) => {
                if(error){return res.status(500).send({ error: error})} 
                res.status(200).send({
                    resp: resultado});
            }
        )
    });
});
 
// alter product
router.patch('/',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})}

        conn.query(
            "UPDATE produtos SET nome = ?, preco = ?, descricao = ? WHERE id_produto = ?",
            [req.body.nome, req.body.preco, req.body.descricao, req.body.id_produto],
            (error, resultado, fields) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        error: error, 
                        response: null
                    });
                }
                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso!',
                });
            });
    });
});

//delete product
router.delete('/',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})}

        conn.query(
            "DELETE FROM produtos WHERE id_produto = ?",[req.body.id_produto],
            (error, resultado, fields) => {
                conn.release();
                if(error){
                    return res.status(500).send({
                        error: error, 
                        response: null
                    });
                }
                res.status(202).send({
                    mensagem: 'Produto Deletado com sucesso!',
                });
            });
    });
});


module.exports = router;