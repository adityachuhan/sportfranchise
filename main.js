const express = require('express');
const app = express();
const port = 800;
const path = require('path')
const pug = require('pug')
const mongoose = require('mongoose');
var bodyParser = require('body-parser');


// for pug 
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// static files
app.use('/public', express.static('public'))

// for mongoose

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('connection is strong and readymongo');
}
var nameSchema = new mongoose.Schema({
    Name: String,
    email: String,
    mobile: String,
    gender: String,
    country: String,
    age: String
});

var User = mongoose.model("User", nameSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});
// end points


app.get('/home', (req, res) => {
    res.render('allen')
})

app.get('/home/subscribe', (req, res) => {
    res.render('diggs')
})





app.listen(port,
    console.log(`listening on port ${port}`))