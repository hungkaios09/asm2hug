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
    let results = await dbo.collection("Staff").find({}).toArray(); //tim all data trong db
    res.render('allStaff',{Staff:results});
})

//sanpham/search nhưng dùng POST
router.post('/searchStaff',async (req,res)=>{ //search
  let searchStaff = req.body.nameStaff;
  let client= await MongoClient.connect(url);
  let dbo = client.db("DBAsm");
  let results = await dbo.collection("Staff").find({"Name":searchStaff}).toArray();
  res.render('allStaff',{Staff:results});
  //let results = await dbo.collection("Staff").find({"Name":searchStaff,'i'}).toArray();
  //res.render('allStaff',{Staff:results});
})

var MongoClient = require('mongodb').MongoClient;
//sanpham/insert -> post luôn
router.post('/addStaff',async (req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("DBAsm");
    let name = req.body.nameStaff;
    let gen = req.body.gen;
    let number = req.body.number;
    let email = req.body.email;

    if(isNaN(number)){
       let numberEror = {numberError:"Must Enter only number!"};
       res.render('allStaff',{number:numberEror});
    }
     else {
    // // if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false){

    // //    let emailEror = {emailError:"Invalid"};
    // //    res.render('insertStaff',{email:emailEror});
    let newStaff = {Name : name, Gen : gen, Number : number, Email : email};
    await dbo.collection("Staff").insertOne(newStaff);
    let results = await dbo.collection("Staff").find({}).toArray();
    res.render('allStaff',{Staff:results});
    }
})


// //update SanPham
// router.get('/editE',async(req,res)=>{
//     let id = req.query.id;
//     var ObjectID = require('mongodb').ObjectID;
//     let client= await MongoClient.connect(url);
//     let dbo = client.db("ATNCompany");
//     let results = await dbo.collection("Employee").findOne({"_id" : ObjectID(id)});
//     res.render('editEmployee',{Employee:results});
// })
// router.post('/editE', async(req,res)=>{
//     let id = req.body.id;
//     let name = req.body.name;
//     let doB = req.body.dob;
//     let number = req.body.number;
//     let email = req.body.email;
//     let newValues ={$set : {Name : name, DoB : doB, Number : number, Email : email}};
//     var ObjectID = require('mongodb').ObjectID;
//     let condition = {"_id" : ObjectID(id)};
//     let client= await MongoClient.connect(url);
//     let dbo = client.db("ATNCompany");
//     await dbo.collection("Employee").updateOne(condition,newValues);
//     let results = await dbo.collection("Employee").find({}).toArray();
//     res.render('allEmployee',{Employee:results});
//})

//delete truc tiep
router.get('/deleteStaff', async (req, res) => {
    let client = await MongoClient.connect(url);
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;
    let dbo = client.db("DBAsm");
    let condition = { "_id": ObjectID(id) };
    await dbo.collection("Staff").deleteOne(condition);
    let results = await dbo.collection("Staff").find({}).toArray();
    res.render('allStaff', { Staff:results });
})


module.exports = router;