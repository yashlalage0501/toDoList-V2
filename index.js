import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// middlewares
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.use(express.static("public"));

// logic
const date = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let day = days[date.getDay()]; //current day
let month = months[date.getMonth()];  //current month
let getDate = date.getDate();  //today date

let fullDate = month + ", " + day + " " + getDate;

var list = ["oops","CN","OS","DBMS"];
var workList = ["meeting"];


app.get("/", (req, res) => {
    res.render("index.ejs",{listTitle: fullDate,list:list});
});

app.get("/work", (req, res) => {
    res.render("index.ejs",{listTitle: "Work List",list:workList});
});


app.post("/", (req, res) => {
 

    if(req.body.list === "Work List") {
        workList.push(req.body.task);
        res.redirect("/work");
    } else {
        list.push(req.body.task);
        res.redirect("/");
    }
    
});

// below post req not reqired
app.post("/work",(req, res) => {
    workList.push(req.body.task);
    res.redirect("/work");
});

app.listen(port, (req,res) => {
    console.log(`server running on port ${port}`);
});
