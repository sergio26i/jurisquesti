const express = require('express');
const app = express();

app.use(express.static("public"));

//Routes

app.get("/login", (req, res) => {
    res.send("Esta é a rota do LOGIN");
});

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("*", (req, res) => {
    res.send("That'a 404");
})

app.listen(3030, () => {
    console.log("App listening on port 3030");
})