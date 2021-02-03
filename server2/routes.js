var express = require("express")
var app = express()
var db = require("./db.js")
const {Router} = express.Router

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/

let dbRouter = Router()

.get("/packages", (req, res, next) => {
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
})

.get("/package/:id", (req, res, next) => {
    var sql = "select * from package where id = ?"
    var params = [req.params.id]
    db_packages.all(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
})

.get("/package/:name", (req, res, next) => {
    var sql = "select * from package where name = ?"
    var params = [req.params.id]
    db_packages.all(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
})

.post("/package/", (req, res, next) => {
    var errors = []
    if (!req.body.name){
        errors.push("No name specified");
    }
    if (!req.body.publisher){
        errors.push("No publisher specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        publisher: req.body.publisher,
        binary:req.body.binary,
        version: req.body.version,
        date: new Date()
    }
    var insert = "INSERT INTO package (name, publisher, binary, version, date) VALUES (?,?,?,?,?)";
    var params =[data.name, data.publisher, data.binary, data.version, data.binary]
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
})

