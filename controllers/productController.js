const mysql = require("../mysql").pool;

exports.getProduct = (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
    if(error){return res.status(500).send({ error: error})} 
        conn.query("SELECT * FROM product;",
        (error, result, fields) => {
            if(error){return res.status(500).send({ error: error})}
                const response = {
                    quantity: result.length,
                    product: result.map(product =>{
                        return{
                            id_product: product.id_product,
                            name: product.name,
                            price: product.price,
                            description: product.description,
                            created_at: product.created_at,
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
}

exports.postProduct = (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})}
        conn.query(
            "INSERT INTO product(name, price, description) VALUES (?,?,?)",
            [req.body.name, req.body.price, req.body.description],
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error})} 
                const response = {
                    message: "Produto inserido com sucesso!",
                    created_product: {
                        id_product: result.id_product,
                        name: req.body.name,
                        price: req.body.price,
                        description: req.body.description,
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
}

exports.getProductById = (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})} 
        conn.query(
            "SELECT * FROM product WHERE id_product = ?;",
            [req.params.id_product],
            (error, result, fields) => {
                if(error){return res.status(500).send({ error: error})} 

                if(result.length == 0){
                    return res.status(404).send({message: "nao foi encontrado o produto com esse id"})
                }
                const response = {
                    product: {
                        id_product: result[0].id_product,
                        name: result[0].name,
                        price: result[0].price,
                        description: result[0].description,
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
}

exports.alterProduct = (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})}

        conn.query(
            "UPDATE product SET name = ?, price = ?, description = ? WHERE id_product = ?",
            [req.body.name, req.body.price, req.body.description, req.body.id_product],
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error})} 
                
                const response = {
                    message: "Produto atualizado com sucesso!",
                    updated_product: {
                        id_product: result.id_product,
                        name: req.body.name,
                        price: req.body.price,
                        description: req.body.description,
                        request: {
                            tipo: "POST",
                            descricao:"produto atualizado com o metodo com POST"
                        }
                    }
                }
                res.status(202).send(response);
            });
    });
}

exports.delete = (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})}

        conn.query(
            "DELETE FROM product WHERE id_product = ?",[req.body.id_product],
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error})} 
                const response = {
                    mensagem: 'Produto Deletado com sucesso!',
                }
                return res.status(202).send(response);
            });
    });
}