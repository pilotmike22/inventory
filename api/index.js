const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port = 5080;


const knex = require("knex")(
    require("./knexfile.js")[process.env.NODE_ENV || "development"]
);


const SECRET_KEY = "my_secret_key"; 

//CREATE APP

const app = express();

//MIDDLEWARE
app.use(express.json()); //JSON
app.use(cors()); //CORS
app.use(morgan("tiny")); //MORGAN




//ROUTES

app.post("/verify", async (req, res) => {
    try {
        const { user, pass, type } = req.body;

        if (!user || !pass || !type) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let query = await knex('users').select("*").where("username", user);

        if (type === "login") {
            if (query.length === 1 && await bcrypt.compare(pass, query[0].password)) {
                const token = jwt.sign({ username: user }, SECRET_KEY, { expiresIn: '1d' });

                await knex('users').update({ auth_token: token }).where("username", user);

                res.cookie('auth_token', token, { httpOnly: true, secure: false });
                res.status(200).json({ message: "Logging you in", token });
            } else {
                res.status(404).json({ message: "Incorrect username or password" });
            }
        } else if (type === "create") {
            if (query.length === 0) {
                const hashedPassword = await bcrypt.hash(pass, 10);
                await knex('users').insert({ username: user, password: hashedPassword, auth_token: '' });
                res.status(200).json({ message: "User created" });
            } else {
                res.status(401).json({ message: "User exists with that username already" });
            }
        } else {
            res.status(404).json({ message: "Invalid operation" });
        }
    } catch (error) {
        console.error("Server error:", error); 
        res.status(500).json({ message: "Internal server error" });
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


app.post("/post/users", async (req, res) => {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const username = req.body.username;
        const password = req.body.password;

    
        await knex('users').insert({
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: password
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




