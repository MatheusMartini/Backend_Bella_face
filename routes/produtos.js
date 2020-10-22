const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;

const { routes } = require('../app');

// get products 
router.get('/',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
    if(error){return res.status(500).send({ error: error})} 
        conn.query("SELECT * FROM produtos;",
        (error, result, fields) => {
            if(error){return res.status(500).send({ error: error})}
                const response = {
                    quantidade: result.length,
                    produtos: result.map(produto =>{
                        return{
                            id_produto: produto.id_produto,
                            nome: produto.nome,
                            preco: produto.preco,
                            descricao: produto.descricao,
                            request:{
                                tipo: 'GET',
                                descricao:"retorna todos os produtos com o metodo get"
                            }
                        }
                    })
                }
                return res.status(200).send(response);
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
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error})} 
                const response = {
                    mensagem: "Produto inserido com sucesso!",
                    produtoCriado: {
                        id_produto: result.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        descricao: req.body.descricao,
                        request: {
                            tipo: "POST",
                            descricao:"produto criado com metodo POST"
                        }
                    }
                }
                res.status(201).send({response});
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
            (error, result, fields) => {
                if(error){return res.status(500).send({ error: error})} 

                if(result.length == 0){
                    return res.status(404).send({mensagem: "nao foi encontrado o produto com esse id"})
                }
                const response = {
                    produtos: {
                        id_produto: result[0].id_produto,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        descricao: result[0].descricao,
                            request:{
                                tipo: 'GET',
                                descricao: "retorna id especifico com o metodo GET"
                            }
                        }
                    }
                    return res.status(200).send(response);
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
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error})} 
                
                const response = {
                    mensagem: "Produto atualizado com sucesso!",
                    produtoAtualizado: {
                        id_produto: result.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        descricao: req.body.descricao,
                        request: {
                            tipo: "POST",
                            descricao:"produto atualizado com o metodo com POST"
                        }
                    }
                }
                res.status(202).send(response);
            });
    });
});

//delete product
router.delete('/',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})}

        conn.query(
            "DELETE FROM produtos WHERE id_produto = ?",[req.body.id_produto],
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error})} 
                const response = {
                    mensagem: 'Produto Deletado com sucesso!',
                }
                return res.status(202).send(response);
            });
    });
});


module.exports = router;