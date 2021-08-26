//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const quotes = require("iquotes");
const { toNamespacedPath } = require("path");
const date = require(__dirname + "/date.js");
let imgNumber;

let items = ["Add things you want to get done", "Click to clear the item", "To start, tap \"+\""];
let taskList = ["Youtube", "Grocery", "Coding"];
let start = 0;
let nameList = [];
let name = "";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/list", function(req, res) {
    const day = date.getDate();  

    const quoteData = quotes.random('life');
    const quote = quoteData.quote;
    const author = quoteData.author;  

    if(start === 0)
    items = ["Add things you want to get done", "Click to mark the task done", "To start, tap \"+\""];
    
    res.render("list", {userName: name, newListItems: items, taskList: taskList, listDate: day, quote: quote, quoteAuthor: author, imgURL: imgNumber});
});

app.post("/", function(req, res) {
    name = req.body.name.toUpperCase();
    console.log(name);

    imgNumber = Math.floor(Math.random()*15 + 1);

    start = 0;

    res.redirect("/list");
});

app.post("/list", function(req, res) {
   
    const newItem = req.body.newItem;
    const newList = req.body.newList;

    if(start === 0  && newItem)
    {
        items = ["Add things you want to get done", "Click to clear the item", "To start, tap \"+\""];
        start = 1;
        items.length = 0;
    }

    if(newItem)
    items.push(newItem);
    if(newList)
    taskList.push(newList);

    res.redirect("/list");
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

