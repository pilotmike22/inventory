const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

const verifyUserLogin = async (username, password) => {
    try {
        const user = await knex('users').select('*').where('username', username).first(); // Use .first() to get a single user
        if (!user) {
            return { status: 'error', error: 'User not found' };
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, username: user.username, type: 'user' }, JWT_SECRET, { expiresIn: '1d' });
            return { status: 'ok', data: token };
        }
        return { status: 'error', error: 'Invalid password' };
    } catch (error) {
        console.log(error);
        return { status: 'error', error: 'Internal server error' };
    }
};

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body; // Use 'username' as defined
    const response = await verifyUserLogin(username, password); // Use 'username' instead of 'email'
    if (response.status === 'ok') {
        // Store JWT token as a cookie in the browser
        res.cookie('token', response.data, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }); // Set token from response
        res.redirect('/Manager_inventory');
    } else {
        res.json(response);
    }
});




app.get("/", (req, res) => {
    res.status(200).send("WORKING");
});

app.get("/users", (req, res) => {
    knex('users').then( data => {
        res.status(200).send(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(301).send("Item not found");
    });
});

app.get("/item", (req, res) => {
    knex('item').then( data => {
        res.status(200).send(data);
    })
    .catch((err) => {
        console.log(err);
        res.status(301).send("Item not found");
    });
});

app.get("/item/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const data = await knex('item').where({ user_id, id });
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).send("Item not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
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
            res.status(404).send("Item not found");
        }
    } catch (err) {
        // Handle errors and send a failure response
        console.log(err);
        res.status(500).send("Item not found");
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


app.post("/post/signup", async (req, res) => {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const username = req.body.username;
        const password = req.body.password;

        const hashedPassword = await bcrypt.hash(password, 10);

    
        await knex('users').insert({
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: hashedPassword
        });

        res.status(200).send("Item Added");
    } catch (err) {
        console.log(err);
        res.status(500).send("I'm so Broken");
    }
});


app.post("/post/item", async (req, res) => {
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




