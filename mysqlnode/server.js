const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());
const cors = require('cors');

server.use(cors());

//creat the database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbproduct",
});

// db test 
db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to dbproduct");
    } else {
      console.log("successfully Connected to dbproduct");
    }
});

  
server.listen(2800,function check(error) {
    if (error) 
    {
    console.log("Error....!!!!");
    }
    else 
    {
        console.log("Started....!!!! 2800");
    }
});

//Create product
server.post("/api/product/add", (req, res) => {
    let details = {
      name: req.body.name,
      unitprice: req.body.unitprice,
      quality: req.body.quality,
    };
    let sql = "INSERT INTO product SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "product created Failed" });
      } else {
        res.send({ status: true, message: "product created successfully" });
      }
    });
});

  // find all product
server.get("/api/product", (req, res) => {
    var sql = "SELECT * FROM product";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
});

// find product byId
server.get("/api/product/:id", (req, res) => {
    var productid = req.params.id;
    var sql = "SELECT * FROM product WHERE id=" + productid;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
});

//Update product
server.put("/api/product/update/:id", (req, res) => {
    let sql =
      "UPDATE product SET name='" +
      req.body.name +
      "', unitprice='" +
      req.body.unitprice +
      "',quality='" +
      req.body.quality +
      "'  WHERE id=" +
      req.params.id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "product Updated Failed" });
      } else {
        res.send({ status: true, message: "product Updated successfully" });
      }
    });
  });

  
 //Delete product
server.delete("/api/product/delete/:id", (req, res) => {
    let sql = "DELETE FROM product WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "product Deleted Failed" });
      } else {
        res.send({ status: true, message: "product Deleted successfully" });
      }
    });
});