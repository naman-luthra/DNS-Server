const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const CryptoJS = require("crypto-js");

const app=express();

app.set('view engine', 'ejs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'BITS@lite',
    database: 'DNSServer',
    port: 3306
});
connection.connect();

let qArr=[];
let queries=[];

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
    const hostname= req.body.hostname;
    const hName = hostname.split('.');
    connection.query(`SELECT TLDServer FROM RootServer WHERE DomainExtension='${hName[2]}';`,(error, resultss)=>{
        if(error) console.log(error);
        let TLDServer;
        if(resultss.length>0){
            TLDServer=resultss[0].TLDServer;
            connection.query(`SELECT AuthoritativeServer FROM ${TLDServer} WHERE DomainName='${hName[1]}';`,(err, ress)=>{
                let AuthoritativeServer;
                if(ress.length>0){
                    AuthoritativeServer=ress[0].AuthoritativeServer;
                    connection.query(`SELECT RecordType, PName, Priority, Content, TTL FROM ${AuthoritativeServer} WHERE SubDomain='${hName[0]}' AND RecordType='${req.body.record}';`, function (error, results) {
                        if (error) throw error;
                        console.log(results);
                        results.forEach((val)=>{
                            val.Hostname=hostname;
                            qArr.push(val);
                        });
                        res.render(`query.ejs`,{qarray:qArr});
                    });
                }
                else res.render(`query.ejs`,{qarray:qArr});
            });
        }
        else res.render(`query.ejs`,{qarray:qArr});
        
    });
    console.log(req.body);
});
app.get('/getsql',(req,res)=>{
    output="";
    queries.forEach((val)=>{
        output+=val+"<br>";
    })
    res.send("<HTML>"+output+"</HTML>");
})
app.post('/addRecord',(req,res)=>{
    const hostname= req.body.hostname;
    const hName = hostname.split('.');
    connection.query(`SELECT TLDServer FROM RootServer WHERE DomainExtension='${hName[2]}';`,(error, results)=>{
        if(error) console.log(error);
        let TLDServer;
        if(results.length===0){
            queries.push(`INSERT INTO RootServer(DomainExtension,TLDServer) <br>VALUES ('${hName[2]}','${hName[2]}TLDServer');`);
            queries.push(`CREATE TABLE ${hName[2]}TLDServer(
                <br>DomainName varchar(255),
                <br>AuthoritativeServer varchar(255)<br>
            );`)
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
                queries.push(`INSERT INTO ${TLDServer}(DomainName,AuthoritativeServer) <br>VALUES ('${hName[1]}','${hash}');`);
                queries.push(`CREATE TABLE ${hash}(<br>
                    Subdomain varchar(255),<br>
                    RecordType varchar(255),<br>
                    PName varchar(255),<br>
                    Priority int,<br>
                    Content varchar(255),<br>
                    TTL int<br>
                );`);
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
            queries.push(`INSERT INTO ${AuthoritativeServer} (SubDomain, RecordType, PName, Priority, Content,TTL)<br> VALUES ('${hName[0]}', '${req.body.record}', '${req.body.name}', '${req.body.priority}','${req.body.content}','${req.body.ttl}');`);
            connection.query(`INSERT INTO ${AuthoritativeServer} (SubDomain, RecordType, PName, Priority, Content,TTL) VALUES ('${hName[0]}', '${req.body.record}', '${req.body.name}', '${req.body.priority}','${req.body.content}','${req.body.ttl}');`, function (error) {
                if (error) res.render(`addRecord.ejs`, {added: false, faliure: true});
                res.render(`addRecord.ejs`, {added: true, faliure: false});
            });
        })
    });
    console.log(req.body);
});
app.listen(3000,()=>{
    console.log("Server Up!")
});