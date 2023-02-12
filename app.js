const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongodb = 'mongodb+srv://kavindu:kavindumongo@cluster0.yv6kisc.mongodb.net/?retryWrites=true&w=majority';
app.set('view engine', 'ejs');
mongoose.set('strictQuery', true);
mongoose.connect(mongodb, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true }).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
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