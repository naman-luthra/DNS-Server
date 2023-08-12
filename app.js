const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const CryptoJS = require("crypto-js");
require('dotenv').config();

const app=express();

app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
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
    res.render(`query.ejs`,{qarray:qArr, error: null});
})

app.post('/query',(req,res)=>{
    const hostname= req.body.hostname;
    if(!/^[a-zA-Z0-9]+([a-zA-Z0-9\-\.]+)?\.[a-zA-Z]{3}$/.test(hostname)){
        res.render(`query.ejs`,{qarray:qArr, error: {
            message: "Invalid Hostname"
        }});
        return;
    }
    const hName = hostname.split('.');
    connection.query(`SELECT TLDServer FROM RootServer WHERE DomainExtension='${hName[2]}';`,(error, resultss)=>{
        if(error){
            res.render(`query.ejs`,{qarray:qArr, error});
            return;
        }
        let TLDServer;
        if(resultss.length>0){
            TLDServer=resultss[0].TLDServer;
            connection.query(`SELECT AuthoritativeServer FROM ${TLDServer} WHERE DomainName='${hName[1]}';`,(err, ress)=>{
                if(err){
                    res.render(`query.ejs`,{qarray:qArr, error:err});
                    return;
                }
                let AuthoritativeServer;
                if(ress.length>0){
                    AuthoritativeServer=ress[0].AuthoritativeServer;
                    connection.query(`SELECT RecordType, PName, Priority, Content, TTL FROM ${AuthoritativeServer} WHERE SubDomain='${hName[0]}' AND RecordType='${req.body.record}';`, function (error, results) {
                        if(error){
                            res.render(`query.ejs`,{qarray:qArr, error});
                            return;
                        }
                        if(results.length===0){
                            res.render(`query.ejs`,{qarray:qArr, error: {
                                message: "No Records Found"
                            }});
                            return;
                        }
                        qArr=[];
                        results.forEach((val)=>{
                            val.Hostname=hostname;
                            qArr.push(val);
                        });
                        res.render(`query.ejs`,{qarray:qArr, error: null});
                    });
                }
                else res.render(`query.ejs`,{qarray:qArr,error: {
                    message: "No Records Found"
                }});
            });
        }
        else res.render(`query.ejs`,{qarray:qArr,error: {
            message: "No Records Found"
        }});
        
    });
});
app.post('/addRecord',(req,res)=>{
    const hostname= req.body.hostname;
    const hName = hostname.split('.');
    connection.query(`SELECT TLDServer FROM RootServer WHERE DomainExtension='${hName[2]}';`,(error, results)=>{
        if(error) console.log(error);
        let TLDServer;
        if(results.length===0){
            connection.query(`INSERT INTO RootServer(DomainExtension,TLDServer) VALUES ('${hName[2]}','${hName[2]}TLDServer');`);
            connection.query(`CREATE TABLE ${hName[2]}TLDServer(
                DomainName varchar(255),
                AuthoritativeServer varchar(255)
            );`);
            TLDServer=`${hName[2]}TLDServer`;
        }
        else TLDServer=results[0].TLDServer;
        connection.query(`SELECT AuthoritativeServer FROM ${TLDServer} WHERE DomainName='${hName[1]}';`,(err, ress)=>{
            let AuthoritativeServer;
            if(ress.length===0){
                const hash=CryptoJS.MD5(`${hName[1]}.${hName[2]}`);
                connection.query(`INSERT INTO ${TLDServer}(DomainName,AuthoritativeServer) VALUES ('${hName[1]}','${hash}');`);
                connection.query(`CREATE TABLE ${hash}(
                    Subdomain varchar(255),
                    RecordType varchar(255),
                    PName varchar(255),
                    Priority int,
                    Content varchar(255),
                    TTL int
                );`);
                AuthoritativeServer=`${hash}`;
            }
            else AuthoritativeServer=ress[0].AuthoritativeServer;
            connection.query(`INSERT INTO ${AuthoritativeServer} (SubDomain, RecordType, PName, Priority, Content,TTL) VALUES ('${hName[0]}', '${req.body.record}', '${req.body.name}', '${req.body.priority}','${req.body.content}','${req.body.ttl}');`, function (error) {
                if (error) res.render(`addRecord.ejs`, {added: false, faliure: true});
                res.render(`addRecord.ejs`, {added: true, faliure: false});
            });
        })
    });
});
app.listen(3000,()=>{
    console.log("Server Up!")
});