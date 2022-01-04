/**
 * Created by Vic on 1/3/22.
 */
'use strict';
const express = require('express');
const mysql = require('mysql');


const app = express();

let conexio = mysql.createConnection({
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


app.listen('3000', () =>{
    console.log('Server Running OK');
});