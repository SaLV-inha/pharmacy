const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');


var conection = mysql.createConnection({
    host : process.env.host,
    user : process.env.user,
    database : process.env.database,
    password : process.env.password
});
conection.connect(function(err) {
    if (err) throw err;
    console.log("conexion establecida a la tabla transactions");
  });

let transactions = express.Router()

transactions.get('/' , (req, res) => {
    conection.query("SELECT  t.transaction_id , c.name AS Cliente , p.name AS Producto, t.quantity AS Cantidad, p.price AS Precio, p.price*t.quantity AS TOTAL FROM transactions AS t JOIN products AS p ON  p.product_id = t.product_id JOIN clients AS c ON c.client_id = t.client_id " ,(err , rows) =>{
        if (err){
            throw err;
        }else{
        res.send(rows)
        }
    })
})

transactions.get('/:id' , (req, res) => {
    let id =req.params.id;
    conection.query("SELECT c.name AS name, p.name AS pname , t.quantity AS pquantity, p.price AS price, p.price*t.quantity AS total FROM transactions AS t JOIN products AS p ON  p.product_id = t.product_id JOIN clients AS c ON c.client_id = t.client_id  WHERE t.transaction_id = ?",id,(err , rows) =>{
        if (err){
            throw err;
        }else{
            res.send( `CLiente`,rows[0].name , `Producto `,rows[0].pname ,`Cantidad ` , rows[0].pquantity , `Precio` , rows[0].price , `TOTAL A PAGAR`, rows[0].total);
        }
    })
})

transactions.post('/', (req,res)=>{
    let {client_id , product_id , quantity }=req.body;
    conection.query("INSERT INTO transactions SET ?", {client_id , product_id , quantity }, (err,rows)=>{
        if(err){
            throw err;
        }else{
            res.send(rows)
        }
    })
});

transactions.put('/:id' , ( req , res)=>{
    let id = req.params.id;
    let {client_id , product_id , quantity }=req.body;
    conection.query("UPDATE transactions SET client_id = ?, product_id = ?, quantity = ? WHERE transaction_id = ?", [ client_id , product_id , quantity , id] , (err,rows) =>{
        if(err){
            throw err;
        }else{
            res.send(rows)
        }
    })
});

transactions.delete('/:id', ( req , res ) =>{
    let id = req.params.id;
    conection.query("DELETE FROM transactions WHERE transaction_id = ?" , id ,(err,rows)=>{
        if(err){
            throw err;
        }else{
            res.send(rows)
        }
    })    
})



module.exports = transactions
