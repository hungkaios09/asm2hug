const express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')

//var url = 'mongodb://localhost:27017';
var url ='mongodb+srv://tienhugg:Sunncuatao952@cluster0.zewfv.mongodb.net/test';

router.get('/',async (req,res)=>  // có async thì phải có await
{
    let client= await MongoClient.connect(url);
    let dbo = client.db("DBAsm");
    let results = await dbo.collection("Product").find({}).toArray();
    res.render('allProduct',{Product:results});
})

//sanpham/search -> browser
router.get('/search',(req,res)=>{
    res.render('searchProduct');
})

//sanpham/search nhưng dùng POST
router.post('/search',async (req,res)=>{ //search
  let searchProduct = req.body.nameProduct;
  let client= await MongoClient.connect(url);
  let dbo = client.db("DBAsm");
  let results = await dbo.collection("Product").find({"nameProduct":searchProduct}).toArray();
    res.render('allProduct',{Product:results});
})

//add san pham
var MongoClient = require('mongodb').MongoClient;
router.post('/insert',async (req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("DBAsm");
    
    let name = req.body.nameProduct; 
    let price = req.body.priceProduct;
    console.log(name,price);
    

    let newProduct = {nameProduct : name, priceProduct : price}; //TenSP, Color, Price là ở trong mongodb
    await dbo.collection("Product").insertOne(newProduct);
   
    let results = await dbo.collection("Product").find({}).toArray();
    res.render('allProduct',{Product:results});
})



    //update SanPham
// router.get('/edit',async(req,res)=>{
//     let id = req.query.id;
//     var ObjectID = require('mongodb').ObjectID;
//     let client= await MongoClient.connect(url);
//     let dbo = client.db("ATNCompany");
//     let results = await dbo.collection("Product").findOne({"_id" : ObjectID(id)});
//     res.render('editSanPham',{SanPham:results});
// })
// router.post('/edit', async(req,res)=>{
//     let id = req.body.id;
//     let name = req.body.name;
//     let color = req.body.color;
//     let price = req.body.price;
//     let newValues ={$set : {TenSP: name, Color : color, Price:price}};
//     var ObjectID = require('mongodb').ObjectID;
//     let condition = {"_id" : ObjectID(id)};
//     let client= await MongoClient.connect(url);
//     let dbo = client.db("ATNCompany");
//     await dbo.collection("Product").updateOne(condition,newValues);
//     let results = await dbo.collection("Product").find({}).toArray();
//     res.render('allSanPham',{SanPham:results});
// })


//delete truc tiep
router.get('/delete', async (req, res) => {
    let client = await MongoClient.connect(url);
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;
    let dbo = client.db("DBAsm");
    let condition = { "_id": ObjectID(id) };
    await dbo.collection("Product").deleteOne(condition);
    let results = await dbo.collection("Product").find({}).toArray();
    res.render('allProduct', { Product:results });
})

   
module.exports = router;