const mysql = require("../mysql").pool;

exports.getOrder = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
      if(error){return res.status(500).send({ error: error})} 
          conn.query("SELECT * FROM order_product",
          (error, result, fields) => {
              if(error){return res.status(500).send({ error: error})}
                  const response = {
                      ordder: result.map(order =>{
                          return{
                              order_id: order.order_id,
                              product_id: order.product_id,
                              quantity: order.quantity,
                              unit_price: order.unit_price,
                              total_price: order.total_price,
                              request:{
                                  tipo: 'GET',
                                  descricao:"retorna detalhes de pedido com o metodo get"
                            }
                        }
                    })
                }
                return res.status(200).send(response);
            }
        )
    });
}

exports.postOrder = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})}
        conn.query(
            "INSERT INTO order_product(order_id, product_id, quantity) VALUES (?,?,?)",
            [req.body.order_id, req.body.product_id, req.body.quantity],
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error})} 
                const response = {
                    mensagem: "Produto inserido com sucesso!",
                    produtoCriado: {
                        order_id: req.body.order_product,
                        product_id: req.body.product_id,
                        quantity: req.body.quantity,
                        request: {
                            tipo: "POST",
                            descricao:"produto criado com metodo POST"
                        }
                    }
                }
                res.status(201).send({response});
            }
        )
    })
}

exports.getOrderById = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
            if(error){return res.status(500).send({ error: error})} 
            conn.query(
                "SELECT * FROM order_product WHERE order_id = ?;",
                [req.params.order_id],
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

exports.alterQuantityById = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
           if(error){return res.status(500).send({ error: error})}
   
           conn.query(
               "UPDATE order_product SET quantity = ? WHERE product_id = ? ",
               [req.body.quantity, req.body.product_id],
               (error, result, fields) => {
                   conn.release();
                   if(error){return res.status(500).send({ error: error})} 
                   
                   const response = {
                       mensagem: "Produto atualizado com sucesso!",
                       produtoAtualizado: {
                           product_id: req.body.product_id,
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

exports.delete = (req, res, next) => {
 mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error})}
        conn.query(
            "DELETE FROM order_product WHERE order_id = ?",[req.body.order_id],
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error})} 
                const response = {
                    mensagem: 'pedido deletado com sucesso!',
                }
            return res.status(202).send(response);
        });
    });
}