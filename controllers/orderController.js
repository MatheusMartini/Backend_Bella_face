const mysql = require("../mysql").pool;

//get lista de pedidos
exports.getOrder = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
      if(error){return res.status(500).send({ error: error})} 
          conn.query("SELECT * FROM order_has_product",
          (error, result, fields) => {
              if(error){return res.status(500).send({ error: error})}
                  const response = {
                      ordder: result.map(order =>{
                          return{
                            order_order_id: order.order_order_id,
                              product_id_product: order.product_id_product,
                              quantity: order.quantity,
                              unit_price: order.unit_price,
                              total_price: order.total_price,
                        }
                    })
                }
                return res.status(200).send(response);
            }
        )
    });
}
//get lista de pedidos by id
exports.getOrderById = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
            if(error){return res.status(500).send({ error: error})} 
            conn.query(
                "SELECT * FROM order_has_product WHERE order_order_id = ?;",
                [req.params.order_order_id],
                (error, result, fields) => {
                    if(error){return res.status(500).send({ error: error})} 
                    if(result.length == 0){
                        return res.status(404).send({mensagem: "nao foi encontrado o pedido com esse id"})
                    }
                        const response = {
                        listProduct: result.length,
                        order: result.map(order =>{
                            return{
                                product_id: order.product_id,
                                quantity: order.quantity,
                                unit_price: order.unit_price,
                                total_price: order.total_price,
                                request:{
                                    tipo: 'GET',
                                    descricao:"retorna todos os pedido pelo id"
                                }
                            }
                        })
                    }
                    return res.status(200).send(response);
                }
        )
    });
}

//altera quantidade buscando pelo id
exports.alterQuantityById = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
           if(error){return res.status(500).send({ error: error})}
   
           conn.query(
               "UPDATE order_has_product SET quantity = ? WHERE product_id_product = ? ",
               [req.body.quantity, req.body.product_id],
               (error, result, fields) => {
                   conn.release();
                   if(error){return res.status(500).send({ error: error})} 
                   
                   const response = {
                       mensagem: "Produto atualizado com sucesso!",
                       produtoAtualizado: {
                        product_id_product: req.body.product_id_product,
                           quantity: req.body.quantity,
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

//deletar produto pedido
exports.delete = (req, res, next) => {
 mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})}
        conn.query(
            "DELETE FROM order_has_product WHERE product_id_product = ?",[req.body.product_id_product],
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error})} 
                const response = {
                    mensagem: 'produto do pedido deletado com sucesso!',
                }
            return res.status(202).send(response);
        });
    });
}

//update total_order na tabela order
exports.updateTotalOrder = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})}
        conn.query(
            "UPDATE `order` SET `total_order` = ? WHERE `order`.`order_id` = 1",
            [req.body.total_order],
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error})} 
                const response = {
                    mensagem: "total alterado com sucesso!",
                    pedido: {
                        total_order: req.body.total_order,
                    }
                }
                res.status(201).send(response);
            }
        )
    })
}

//seta comentario na tabela order
exports.setComment = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})}
        conn.query(
            "UPDATE `order` SET `comments` = ? WHERE `order`.`order_id` = 1",
            [req.body.comments],
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error})} 
                const response = {
                    mensagem: "comentario guardado",
                    comentario: {
                        comments: req.body.comments,
                    }
                }
                res.status(201).send(response);
            }
        )
    })
}

// post pedido passando atributos do pedido
exports.postPedido = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})}
        conn.query(
            "INSERT INTO `order_has_product` (`order_order_id`, `product_id_product`, `quantity`, `unit_price`, `total_price`, `creat_data`) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)",
            [req.body.order_order_id, req.body.product_id_product, req.body.quantity, req.body.unit_price, req.body.total_price],
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error})} 
                const response = {
                    mensagem: "Pedido concluido com sucesso!",
                    pedido: {
                        order_order_id: req.body.order_order_id,
                        product_id_product: req.body.product_id_product,
                        quantity: result.quantity,
                        unit_price: req.body.unit_price,
                        total_price:req.body.total_price,
                    }
                }
                res.status(201).send(response);
            }
        )
    })
}
