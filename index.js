const express = require('express');
const app = express();
const favicon = require('serve-favicon');

app.use(express.static("public"));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.set('view engine', 'ejs')


//Routes

app.get("/disciplinas", (req, res) => {
    res.render("disciplinas");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/dirconst", (req, res) => {
    res.render("dirconst");
});

app.get("/diradminst", (req, res) => {
    res.render("diradminst");
});

app.get("/dirtrabalho", (req, res) => {
    res.render("dirtrabalho");
});

app.get("/dirproctrabalho", (req, res) => {
    res.render("dirproctrabalho");
});

app.get("/dircivil", (req, res) => {
    res.render("dircivil");
});

app.get("/dirproccivil", (req, res) => {
    res.render("dirproccivil");
});

app.get("/dirpenal", (req, res) => {
    res.render("dirpenal");
});

app.get("/dirtributario", (req, res) => {
    res.render("dirtributario");
});

app.get("/dirprocpenal", (req, res) => {
    res.render("dirprocpenal");
});

app.get("/raciociniolog", (req, res) => {
    res.render("raciociniolog");
});

app.get("/dirprevidenciario.ejs", (req, res) => {
    res.render("dirprevidenciario");
});

app.get("/", (req, res) => {
    res.render("index");
})

app.get("*", (req, res) => {
    res.send("That'a 404");
})

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
});