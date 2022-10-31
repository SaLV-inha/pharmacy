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
    console.log("conexion establecida a la tabla products");
  });

let products = express.Router()


products.get('/' , (req, res) => {
    conection.query("SELECT * FROM products" ,(err , rows) =>{
        if (err){
            throw err;
        }else{
        res.send(rows)
        }
    })
})

products.get('/:id' , (req, res) => {
    let id =req.params.id;
    conection.query("SELECT * FROM products WHERE product_id = ?",id,(err , rows) =>{
        if (err){
            throw err;
        }if(rows[0].sellable==0){
            res.send( [rows[0].name, rows[0].stock]+' En stock NECESITA PRESCRIPCION MEDICA ');
        }else{
            res.send([rows[0].name, rows[0].stock]+' En stock NO NECESITA PRESCRIPCION MEDICA');
        }
    })
})

products.post('/', (req,res)=>{
    let {name , price , type , stock , sellable}=req.body;
    conection.query("INSERT INTO products SET ?", {name , price , type , stock , sellable}, (err,rows)=>{
        if(err){
            throw err;
        }else{
            Object.assign({name , price , type , stock , sellable} , {id: rows.insertId} )
            res.send({name , price , type , stock , sellable})
        }
    })
});

products.put('/:id' , ( req , res)=>{
    let id = req.params.id;
    let {name , price , type , stock , sellable}=req.body;
    conection.query("UPDATE products SET name = ?, price = ?, type = ? , stock = ? , sellable = ? WHERE product_id = ?", [name , price , type , stock , sellable , id] , (err,rows) =>{
        if(err){
            throw err;
        }else{
            res.send(rows)
        }
    })
});

products.delete('/:id', ( req , res ) =>{
    let id = req.params.id;
    conection.query("DELETE FROM products WHERE product_id = ?" , id ,(err,rows)=>{
        if(err){
            throw err;
        }else{
            res.send(rows)
        }
    })    
})



module.exports = conection
module.exports = products
