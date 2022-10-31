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
    console.log("conexion establecida a la tabla clients");
});



let clients = express.Router()

clients.get('/' , (req, res) => {
    conection.query("SELECT * FROM clients" ,(err , rows) =>{
        if (err){
            throw err;
        }else{
        res.send(rows)
        }
    })
})

clients.get('/:id' , (req, res) => {
    let id =req.params.id;
    conection.query("SELECT * FROM clients WHERE client_id = ?",id,(err , rows) =>{
        if (err){
            throw err;
        }else{
            res.send( [rows[0].name, rows[0].ci , rows[0].email ,rows[0].phone]);
        }
    })
})

clients.post('/', (req,res)=>{
    let {name , email , phone , ci }=req.body;
    conection.query("INSERT INTO clients SET ?", {name , email , phone , ci}, (err,rows)=>{
        if(err){
            throw err;
        }else{
            Object.assign({ name , email , phone , ci } , {id: rows.insertId} )
            res.send({ name , email , phone , ci })
        }
    })
});

clients.put('/:id' , ( req , res)=>{
    let id = req.params.id;
    let {name , email , phone , ci }=req.body;
    conection.query("UPDATE clients SET name = ?, email = ?, phone = ? , ci = ? WHERE client_id = ?", [ name , email , phone , ci , id] , (err,rows) =>{
        if(err){
            throw err;
        }else{
            res.send(rows)
        }
    })
});

clients.delete('/:id', ( req , res ) =>{
    let id = req.params.id;
    conection.query("DELETE FROM clients WHERE client_id = ?" , id ,(err,rows)=>{
        if(err){
            throw err;
        }else{
            res.send(rows)
        }
    })    
})



module.exports = clients
