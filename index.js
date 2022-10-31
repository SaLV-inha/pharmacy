const express = require('express');
const morgan = require('morgan');
const clients = require('./clients');
const products = require('./products')
const transactions = require('./transactions')
const cors = require('cors')

const app = express();
const port = process.env.PUERTO || 1109;

app.use(express.json());

app.use(morgan('dev'));
app.use(cors())

//********products********
app.use('/products', products)

//***********clients**********
app.use('/clients', clients)

//********transactions********

app.use('/transactions', transactions)


app.listen(port , (req , res) =>{
    console.log(`Server on port ${port}`)
})