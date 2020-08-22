const express = require('express');
const app = express();

app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP 
        res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
    else //Se a requisição já é HTTPS 
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
});

const favicon = require('serve-favicon');

app.use(express.static("public"));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

//Routes

app.get("/disciplinas.ejs", (req, res) => {
    res.render("disciplinas.ejs");
});

app.get("/index.ejs", (req, res) => {
    res.render("index.ejs");
});

app.get("/dirconst.ejs", (req, res) => {
    res.render("dirconst.ejs");
});

app.get("/diradminst.ejs", (req, res) => {
    res.render("diradminst.ejs");
});

app.get("/dirtrabalho.ejs", (req, res) => {
    res.render("dirtrabalho.ejs");
});

app.get("/dirproctrabalho.ejs", (req, res) => {
    res.render("dirproctrabalho.ejs");
});

app.get("/dircivil.ejs", (req, res) => {
    res.render("dircivil.ejs");
});

app.get("/dirproccivil.ejs", (req, res) => {
    res.render("dirproccivil.ejs");
});

app.get("/dirpenal.ejs", (req, res) => {
    res.render("dirpenal.ejs");
});

app.get("/dirtributario.ejs", (req, res) => {
    res.render("dirtributario.ejs");
});

app.get("/dirprocpenal.ejs", (req, res) => {
    res.render("dirprocpenal.ejs");
});

app.get("/raciociniolog.ejs", (req, res) => {
    res.render("raciociniolog.ejs");
});

app.get("/dirprevidenciario.ejs", (req, res) => {
    res.render("dirprevidenciario.ejs");
});

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("*", (req, res) => {
    res.send("That'a 404");
})

app.listen(process.env.PORT || 3000, () => console.log("Escutando!"));