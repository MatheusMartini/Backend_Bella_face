const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//cria usuario
exports.createUser = (req, res, next) =>{
    mysql.getConnection((err, conn) => {
        if(err){return res.status(500).send({ error: error})} 
        conn.query("SELECT * FROM custumer WHERE login = ?",[req.body.login],(error, results) => { 
            if(error){return res.status(500).send({ error: error})} 
            if(results.length > 0){
                res.status(409).send({ message: "user ja cadastrado"})
            }else{
                bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
                    if(errBcrypt) {return res.status(500).send({ error : errBcrypt})}
                    conn.query(
                        `INSERT INTO custumer(id_custumer, name, login, password) VALUES (?,?,?,?)`,
                        [req.body.id_custumer, req.body.name, req.body.login, hash],
                        (error, results)=>{
                            conn.release();
                            if(error){return res.status(500).send({ error : error})}
                            const response = {
                                message: "user created!",
                                user:{
                                    id: req.body.id_custumer,
                                    name: req.body.name,
                                    login: req.body.login,
                                    password: "your pass",
                                }
                            }
                            return res.status(201).send(response);
                        })
                    });
            }
        })
    });
}
//verifica usuario e gera token
exports.verificationUser = (req, res, next) =>{
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({ error: error})} 
        const query = "SELECT * FROM custumer WHERE login = ?";
        conn.query(query,[req.body.login],(error, results, fields) => {
            conn.release();
            if(error) {return res.status(500).send({ error: error})} 
            if(results.length < 1){
                return res.status(401).send({ message: "falha na autenticação"})
            }
            bcrypt.compare(req.body.password, results[0].password, (err, result) => {
                if(err){
                    return res.status(401).send({ message: "falha na autenticação da senha"});
                }
                if(result){
                    const token = jwt.sign({
                        id_custumer: results[0].id_custumer,
                        login:results[0].login
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "2h"
                    });

                    return res.status(200).send({ 
                        message: "autenticado com sucesso",
                        token: token
                    });
                }
                return res.status(401).send({ message: "falha na autenticação"});
            });
        });
    });
}