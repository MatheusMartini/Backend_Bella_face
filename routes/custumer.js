const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const { response } = require("express");

router.post("/cadastro",(req, res, next) =>{
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
})

module.exports = router;