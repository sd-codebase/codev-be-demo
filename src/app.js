// app.js
const express = require("express")

const app = express();
app.use(express.json())

const user = {
    "fullname": "Alexey Kornilov",
    "email": "alexey@klaim.ai",
    "password": "lkJlkn8hj",
};

const authors = [
    {
        "authorId": 1,
        "name": "Walt Disney"
    },
    {
        "authorId": 2,
        "name": "Mark Twain"
    },
    {
        "authorId": 3,
        "name": "Albert Einstein"
    }
];

const quotes = [
    {
        "quoteId": 1,
        "authorId": 1,
        "quote": "The more you like yourself, the less you are like anyone else, which makes you unique."
    },
    {
        "quoteId": 2,
        "authorId": 1,
        "quote": "Disneyland is a work of love. We didn't go into Disneyland just with the idea of making money."
    },
    {
        "quoteId": 3,
        "authorId": 1,
        "quote": "I always like to look on the optimistic side of life, but I am realistic enough to know that life is a complex matter."
    },
    {
        "quoteId": 4,
        "authorId": 2,
        "quote": "The secret of getting ahead is getting started."
    },
    {
        "quoteId": 5,
        "authorId": 2,
        "quote": "Part of the secret of a success in life is to eat what you like and let the food fight it out inside."
    },
    {
        "quoteId": 6,
        "authorId": 2,
        "quote": "You can't depend on your eyes when your imagination is out of focus."
    },
    {
        "quoteId": 7,
        "authorId": 3,
        "quote": "Look deep into nature, and then you will understand everything better."
    },
    {
        "quoteId": 8,
        "authorId": 3,
        "quote": "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning."
    },
    {
        "quoteId": 9,
        "authorId": 3,
        "quote": "The only source of knowledge is experience."
    }
];

app.get("/info", (req, res) => {
        res.send(encodeResult(true, {
            "info": "Some information about the <b>company</b>."
        }));
})

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    let token = Math.random().toString(36).substr(2, 32);
    user.token = null;
    let success = false;
    let result = null
    if (user.email === email && user.password === password) {
        user.token = token;
        success = true;
        result = {token};
    }
    res.send(encodeResult(success, result));
})

app.get("/profile", (req, res) => {
    const {token} = req.query;
    let success = false;
    let result = null;
    if (user.token !== null && user.token === token) {
        success = true;
        const {fullname, email} = user;
        result = {fullname, email};
    }
    res.send(encodeResult(success, result));
})

app.delete("/logout", (req, res) => {
    const {token} = req.query;
    let result = {};
    user.token = null;
    res.send(encodeResult(true, result));
})

app.get("/author", (req, res) => {
    const {token} = req.query;
    let success = false;
    let result = null;
    if (user.token !== null && user.token === token) {
        success = true;
        result = authors[Math.floor(Math.random()*authors.length)];
    }
    setTimeout(() => {
        res.send(encodeResult(success, result));
    }, 5000);
})

app.get("/quote", (req, res) => {
    const {token, authorId} = req.query;
    let success = false;
    let result = null;
    if (user.token !== null && user.token === token && authorId.trim()) {
        success = true;
        const quotesList = quotes.filter(quote => quote.authorId === +authorId);
        result = quotesList[Math.floor(Math.random()*quotesList.length)];
    }
    setTimeout(() => {
        res.send(encodeResult(success, result));
    }, 5000);
})

module.exports = app


const encodeResult = (success, data) => {
    if (data == null) {
        data = {message: 'Access denied'};
    }
    return {success, data}
}