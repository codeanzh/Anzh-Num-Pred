require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("static"));

app.get("/", function(req, res){
    res.render('first');
});

app.post("/sendData", function(req, res){
    axios.post('https://anzh-num-pred-api.herokuapp.com/sendData', req.body)
    .then((response) => {
        console.log(`Status: ${response.status}`);
        console.log('Body: ', response.data);
        res.send("" + response.data);
    }).catch((err) => {
        console.error(err);
        res.send("Error");
    });
});

app.listen(process.env.PORT, function(){
    console.log("Server has started on port " + process.env.PORT);
});