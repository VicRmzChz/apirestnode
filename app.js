/**
 * Created by Vic on 1/3/22.
 */
'use strict';
const express = require('express');
const mysql = require('mysql');
const  cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

// Connection DB info
const conexio = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'articulosdb',
    port: '8889'
});

// Connect to DB
conexio.connect((error)=> {
    if (error){
        throw error;
    } else{
        console.log("Connected to DB!");
    }
});


app.get('/', (req, res) =>{
    res.send('Main Root');
});


// Show all items
app.get('/api/articulos', (req, res)=>{
    conexio.query('SELECT * FROM articulos', (err, results)=>{
        if (err){
            throw err;
        }else{
            res.send(results);
        }
    })
});

// Show only one item
app.get('/api/articulos/:id', (req, res)=>{
    conexio.query('SELECT * FROM articulos WHERE id = ?', [req.params.id], (err, result)=>{
        if (err){
            throw err;
        } else {
            res.send(result);
        }
    })
});

// create a item
app.post('/api/articulos', (req, res)=>{
    let data = {
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock
    };

    let sql = "INSERT INTO articulos SET ?";
    conexio.query(sql, data, (err, results)=> {
        if (err){
            throw err;
        }else{
            res.send(results);
        }
    });
});

//edit item
app.put('/api/articulos/:id', (req, res)=>{
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let stock = req.body.stock;
    let sql = 'UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?';
    conexio.query(sql, [descripcion, precio, stock, id], (err, result)=>{
        if (err){
            throw err;
        } else {
            res.send(result);
        }
    });
});

// delete a item
app.delete('/api/articulos/:id', (req, res)=>{
    conexio.query('DELETE FROM articulos WHERE id = ?', [req.params.id], (err, result)=>{
        if (err){
            throw err;
        } else{
            res.send(result);
        }
    });
});

// Port
app.listen('3000', () =>{
    console.log('Server Running OK');
});