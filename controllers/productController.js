const mysql = require("../mysql")

exports.getProduct = async (req, res, next) =>{
    try {
        const result = await mysql.execute("SELECT * FROM product;")
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
    } catch (error) {
        return res.status(500).send({error : error});
    }
}

exports.postProduct = async (req, res, next) =>{
    try {
        const query = "INSERT INTO product(name, price, description) VALUES (?,?,?);";
        const result = await mysql.execute(query,[
            req.body.name,
            req.body.price,
            req.body.description])
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
    } catch (error) {
        return res.status(500).send({error : error});
    }
}

exports.getProductById = async (req, res, next)=>{
    try {
        const query = "SELECT * FROM product WHERE id_product = ?;"
        const result = await mysql.execute(query,[req.params.id_product])
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
    } catch (error) {
        return res.status(500).send({error : error});
    }
}

exports.alterProduct = async (req, res, next)=>{
    try {
        const query = "UPDATE product SET name = ?, price = ?, description = ? WHERE id_product = ?";
        await mysql.execute(query,[
            req.body.name, 
            req.body.price, 
            req.body.description, 
            req.body.id_product
        ])
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
    } catch (error) {
        return res.status(500).send({error : error});  
    }
}

exports.delete = async (req, res, next)=>{
    try {
        const query = "DELETE FROM product WHERE id_product = ?" ;
        await mysql.execute(query,[req.body.id_product])
        const response = {
            mensagem: 'Produto Deletado com sucesso!',
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({error : error});
    }
}