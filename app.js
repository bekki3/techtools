const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");


app.get("/", (req, res)=> {
    res.render("main");
});

app.get("/black-screen", (req, res)=> {
    res.render("black-screen");
});
app.get("/white-screen", (req, res)=> {
    res.render("white-screen");
});
app.get("/test-screen", (req, res)=> {
    res.render("test-screen");
});
app.listen(3000, ()=> {
    console.log("Listening on 3000");
})