const express = require('express');
const app = express();
const Item = require('./models/items');
DBNAME = 'item-database';
const mongoose = require('mongoose');
const mongodb = 'mongodb+srv://kavindu:kavindumongo@cluster0.b6gjudp.mongodb.net/?retryWrites=true&w=majority';
app.set('view engine', 'ejs');
mongoose.set('strictQuery', true);
mongoose.connect(mongodb, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: DBNAME}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

/*-----------------create item------------------*/
app.get('/create-item', (req, res) => {
    const item = new Item({
        name: "computer",
        price: 2000
    });
    item.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

/*-----------------get items------------------*/
app.get('/get-items', (req, res) => {
    Item.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

/*-----------------get item------------------*/
app.get('/get-item', (req, res) => {
    Item.findById("63e93c19c6a1b237ced95817").then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/', (req, res) => {
    const items = [
        { name: "Mobile phone", price: 1000 },
        { name: "Book", price: 30 },
        { name: "Laptop", price: 2000 },
    ];
    res.render("index", { items });
});

app.get('/add-item', (req, res) => {
    res.render("add-item");
});

app.use((req, res) => {
    res.render("error");
});