var express = require('express');
var bodyParser = require("body-parser");
const products = require('./products');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET ALL
app.get("/products", async function(req, res) {
    const allProducts = await products.getProducts();
    res.send(allProducts);
});

// GET
app.get("/product/:id", async function(req, res) {
    const product = await products.getProductById(req.params.id);
    res.send(product);
});

// POST
app.post("/product", async function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    await products.addproduct(firstName, lastName);
    res.send({"message": "Success"});
});

// PUT
app.put("/product/:id", async function(req, res) {
    const id = req.params.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    await products.editProduct(id,firstName,lastName);
    res.send({"message": "Success"});
});

// DELETE
app.delete("/product/:id", async function(req, res) {
    await products.deleteProduct(req.params.id);
    res.send({"message": "Success"});
});

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server Started!");
});