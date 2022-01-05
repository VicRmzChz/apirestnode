/**
 * Created by Vic on 1/3/22.
 */
'use strict';
const express = require('express');
const mysql = require('mysql');


const app = express();

// Conexio a la DB
const conexio = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'articulosdb',
    port: '8889'
});

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


// Show all articuls
app.get('/api/articulos', (req, res)=>{
    conexio.query('SELECT * FROM articulos', (err, results)=>{
        if (err){
            throw err;
        }else{
            res.send(results);
        }
    })
});

// Show only one articul
app.get('/api/articulos/:id', (req, res)=>{
    conexio.query('SELECT * FROM articulos WHERE id = ?', [req.params.id], (err, result)=>{
        if (err){
            throw err;
        } else {
            res.send(result);
        }
    })
});

app.listen('3000', () =>{
    console.log('Server Running OK');
});