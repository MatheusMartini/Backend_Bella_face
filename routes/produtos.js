const express = require('express');
const { routes } = require('../app');
const router = express.Router();

// return products
router.get('/',(req, res, next)=>{
    res.status(200).send({
        mensagem: 'retorna produtos'
    });
});

//insert product post 
router.post('/',(req, res, next)=>{

    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    res.status(200).send({
        mensagem: 'criar produtos',
        produtoCriado: produto
    });
});

//get product by id
router.get('/:id_produto',(req, res, next)=>{
    const id = req.params.id_produto

    if(id == 'especial' ){
        res.status(200).send({
            mensagem: 'detalhes do produto especial',
            id_produto:id
        });
    }else{
        res.status(200).send({
            mensagem: 'detalhes do produto',
        });
    }

});
 
// alter product
router.patch('/',(req, res, next)=>{
    res.status(200).send({
        mensagem: 'alterar produtos'
    });
});

//delete product
router.delete('/',(req, res, next)=>{
    res.status(200).send({
        mensagem: 'deletar produto'
    });
});


module.exports = router;