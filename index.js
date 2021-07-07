const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", function(req, res){
    res.render("index");
});

app.get("/chat", function(req, res){
    res.render("chat");
});

app.get("/translate", function(req, response){
    let options = {
        method: 'POST',
        baseUrl: 'https://api.cognitive.microsofttranslator.com/',
        url: 'translate',
        qs: {
            'api-version': '3.0',
            'to': req.query.lang_to,
            'from': req.query.lang_from
        },
        headers: {
            'Ocp-Apim-Subscription-Key': '7a4742b517794a3888700a6bbe3a8bda',
            'Ocp-Apim-Subscription-Region': 'eastus',
            'Content-type': 'application/json',
        },
        body: [{
            text: req.query.user_in
        }],
        json: true
    };

    request(options, function(err, res, body){
        response.json(body);
    });
});

app.listen(3000, function(req, res){
    console.log("Server started on port 3000...");
});