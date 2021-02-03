const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

const PORT = 7000;
const HOST = '0.0.0.0';

//
var db_packages = require('./db.js');

app.get("/packages", (req, res, next) => {
    var sql = "select * from package"
    var params = []
    db_packages.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/package/:id", (req, res, next) => {
    var sql = "select * from package where id = ?"
    var params = [req.params.id]
    db_packages.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.post("/package/",  (req, res, next) => {
    var errors = []
    var body = req.body;
    console.log(body)
    if (!req.body.name){
        errors.push("No name specified");
    }
    if (!req.body.url){
        errors.push("No url specified");
    }
    if (!req.body.digest){
        errors.push("No digest specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        url: req.body.url,
        digest:req.body.digest,
        date: new Date()
    }
    var insert = "INSERT INTO package (name, url, digest, date) VALUES (?,?,?,?)";
    var params =[data.name, data.url, data.digest, data.date]
    db_packages.run(insert, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});


app.get('/', (req,res) => {
    console.log("server 2 running");
    res.status(200).end();
})

app.get('/test1', (req, res) =>{
    console.log("server2: test1  connection");
    res.status(200).end();
})

app.listen(PORT, HOST, () => {
    console.log(`server2 running on http://${HOST}:${PORT}`)
  });
  