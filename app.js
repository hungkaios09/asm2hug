const express = require('express');
const engines = require('consolidate');
const app = express();

//Kết nói tới folder public
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

//bang search
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//npm i handlebars consolidate --save
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');


var IndexController = require("./index.js");
app.use('/', IndexController);
var ProductController = require("./Product.js");
app.use('/Product', ProductController);
var StaffController = require("./Staff.js");
app.use('/Staff', StaffController);


var port = process.env.PORT || 9000;

var server=app.listen(PORT,function() {});