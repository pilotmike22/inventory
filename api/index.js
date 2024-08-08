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


app.put("/put/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.item_name;
        const description = req.body.item_description;
        const username = req.body.username;
        const quantity = req.body.quantity;

     
        const updatedRows = await knex('item')
            .where({ id })
            .update({
                item_name: name,
                item_description: description,
                quantity: quantity,
                user_id: username
            });

        if (updatedRows > 0) {
            res.status(200).send("Item Updated");
        } else {
            res.status(404).send("Item Not Found");
        }
    } catch (err) {
        // Handle errors and send a failure response
        console.log(err);
        res.status(500).send("I'm so Broken");
    }
});


app.patch("/patch/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.item_name;
        const description = req.body.item_description;
        const username = req.body.username;
        const quantity = req.body.quantity;

     
        const updatedRows = await knex('item')
            .where({ id })
            .update({
                item_name: name,
                item_description: description,
                quantity: quantity,
                user_id: username
            });

        if (updatedRows > 0) {
            res.status(200).send("Item Updated");
        } else {
            res.status(404).send("Item Not Found");
        }
    } catch (err) {
        // Handle errors and send a failure response
        console.log(err);
        res.status(500).send("I'm so Broken");
    }
});


app.post("/post", async (req, res) => {
    try {
        const name = req.body.item_name;
        const description = req.body.item_description;
        const username = req.body.username;
        const quantity = req.body.quantity;

    
        await knex('item').insert({
            item_name: name,
            item_description: description,
            quantity: quantity,
            user_id: username
        });

        res.status(200).send("Item Added");
    } catch (err) {
        console.log(err);
        res.status(500).send("I'm so Broken");
    }
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

app.get("/item/:username", async (req, res) => {
    try {
        const { username } = req.params; 
        const data = await knex('item').where({ username });
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).send("Item Not Found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await knex('item').where({ id }).del();
        res.status(200).send("Deleted!");

    } catch (err) {
        console.log(err);
        res.status(500).send("I'm so Broken");
    }
});


//LISTEN
app.listen(port, () => {
    console.log("App listening on port:", port);
})




