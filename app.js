const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app=express();

app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'BITS@lite',
    database: 'DNS_Server',
    port: 3306
});
connection.connect();

let qArr=[];

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.get('/addRecord',(req,res)=>{
    res.render(`addRecord.ejs`, {added: false, faliure: false});
})

app.get('/query',(req,res)=>{
    qArr=[];
    res.render(`query.ejs`,{qarray:qArr});
})

app.post('/query',(req,res)=>{
    connection.query(`SELECT * FROM DNS_Records WHERE Hostname='${req.body.hostname}' AND RecordType='${req.body.record}';`, function (error, results, fields) {
        if (error) throw error;
        results.forEach((val)=>{
            qArr.push(val);
        });
        res.render(`query.ejs`,{qarray:qArr});
    });
    console.log(req.body);
});
app.post('/addRecord',(req,res)=>{
    connection.query(`INSERT INTO DNS_Records (Hostname, RecordType, PName, Priority, Content,TTL) VALUES ('${req.body.hostname}', '${req.body.record}', '${req.body.name}', '${req.body.priority}','${req.body.content}','${req.body.ttl}');`, function (error, results, fields) {
        if (error) res.render(`addRecord.ejs`, {added: false, faliure: true});
        console.log(results);
        res.render(`addRecord.ejs`, {added: true, faliure: false});
    });
    console.log(req.body);
});
app.listen(3000,()=>{
    console.log("Server Up!")
});