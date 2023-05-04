// imports
const express = require("express");
const uninformed = require("./uninformedProlog");
const informed = require("./informedProlog");
const app = express();
const port = 3000;

// Static Files
app.use(express.static("public"));
app.use("/css", express(__dirname + "public/css"));
app.use("/js", express(__dirname + "public/js"));
app.use("/img", express(__dirname + "public/img"));

// Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

// decode JSON
app.use(express.json());

app.get("", (req, res) => {
    res.render("index");
});
app.get("/uninformed", (req, res) => {
    res.render("uninformed");

});
app.post("/uninformed/solution", (req, res) => {
    const input = req.body;
    const solutions = uninformed.queryProlog(input);
    res.send(solutions);
});
app.get("/informed", (req, res) => {
    res.render("informed");
});
app.post("/informed/solution", (req, res) => {
    const input = req.body;
    const solutions = informed.queryProlog(input);
    res.send(solutions);
});
// Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));
