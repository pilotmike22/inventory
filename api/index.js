const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port = 5080;


const knex = require("knex")(
    require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

//CREATE APP

const app = express();

//MIDDLEWARE
app.use(express.json()); //JSON
app.use(cors()); //CORS
app.use(morgan("tiny")); //MORGAN

//ROUTES

app.get("/", (req, res) => {
    res.status(200).send("WORKING");
});

app.get("/users", (req, res) => {
    knex('users').then( data => {
        res.status(200).send(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(301).send("I'm so Broken");
    });
});


app.get("/item", (req, res) => {
    knex('item').then( data => {
        res.status(200).send(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(301).send("I'm so Broken");
    });
});


//LISTEN
app.listen(port, () => {
    console.log("App listening on port:", port);
})




