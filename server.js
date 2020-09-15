const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const db = require('./models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
let Parser = require('rss-parser');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/news', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./client/build'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, DELETE, PATCH");
    next();
});

app.route('/api/source/:source')
    .get(async (req, res) => {
        try {
            let source = await db.Source.findById(req.params.source).lean();
            let news = await db.News.find({ source: source._id }).lean();
            // console.log(source)
            // console.log(news)
            res.json({ message: "OK", source: source, news: news });
        } catch (err) {
            console.log("Error find news", err);
            res.json({ message: "FAIL", reason: err });
        }
    })

app.route('/api/sources')
    .get(async (req, res) => {
        try {
            let sources = await db.Source.find().lean();
            res.json({ message: "OK", sources })
        } catch (err) {
            console.log("Error find source", err);
            res.json({ message: "FAIL", reason: err });
        }
    })
    .post(async (req, res) => {
        try {
            await getFeed(req.body);
            res.json({ message: "OK" });
        } catch (err) {
            console.log("FAIL create a source", err);
            res.json({ message: "FAIL", reason: err });
        }
    })

app.route('/api/news/:id')
    .get(async (req, res) => {
        try {
            let news = await db.News.findOne({ "_id": req.params.id }).lean();
            let comments = await db.Comment.find({ newsItem: req.params.id }).populate("author").lean();
            let newsObj = { ...news, comments };
            res.json({ message: "OK", newsObj });
        } catch (err) {
            console.log("Error find news or comments", err);
            res.json({ message: "FAIL", reason: err });
        }
    })

app.route('/api/user')
    .get(async (req, res) => {
        try {
            let result = await db.User.find();
            res.json({ result });
        } catch (err) {
            console.log("Error find user", err);
            res.json({ message: "FAIL", reason: err });
        }
    })
    .post(async (req, res) => {
        try {
            req.body.password = await argon2.hash(req.body.password);
            let user = await db.User.create(req.body);
            res.json({ message: "OK", user, token: makeToken(user._id) });
        } catch (err) {
            console.log("Error creating new user", err);
            res.json({ message: "FAIL", reason: err });
        }
    });


const jwtSecret = "yo dawg i herd you like authorization";

function makeToken(userId) {
    return jwt.sign({ userId }, jwtSecret);
}

app.post('/api/login',
    async (req, res) => {
        try {
            let user = await db.User.findOne({ email: req.body.email });

            if (!user) {
                console.log("No user found!");
                res.json({ message: "FAIL", reason: "No user found" });
                return;
            }

            let passwordMatches = await argon2.verify(user.password, req.body.password);
            if (!passwordMatches) {
                console.log("Wrong password!");
                res.json({ message: "FAIL", reason: "Wrong password!" });
                return;
            }

            console.log("Login Successful!");
            res.json({ message: "OK", username: user.username, userId: user._id, token: makeToken(user._id) });
        } catch (err) {
            console.log("Error logging in:", err);
            res.json({ message: "FAIL", reason: err });
        }
    })

app.route('/api/comments')
    .post(
        expressJwt({ secret: jwtSecret }),
        async (req, res) => {
            try {
                let result = await db.Comment.create({ ...req.body, author: req.user.userId });
                res.json({ message: "OK", result });
            } catch (err) {
                console.log("Error creating comments", err);
                res.json({ message: "FAIL", reason: err });
            }
        });

let getFeed = async (url) => {
    try {
        let parser = new Parser();
        const news = await parser.parseURL(url.url);
        const source = await db.Source.create({ "name": news.title, "img": news.image ? news.image.url : "", "url": url.url });
        insertNews(news, source);
    } catch (err) {
        console.log("Error updating feed", url, err);
        if (err.code !== 11000) { //11000 is the duplicate key error code
            throw err;
        }
    }
}

let updateFeeds = async () => {
    let sources = await db.Source.find().lean();
    sources.forEach(async source => {
        try {
            let parser = new Parser();
            const news = await parser.parseURL(source.url);
            insertNews(news, source);
        } catch (err) {
            console.log("FAIL updating feed", source.url, err);
        }
    });
}

updateFeeds();
setInterval(updateFeeds, 100 * 1000);

async function insertNews(news, source) {
    try {
        news.items.forEach(async (item) => {
            try {
                await db.News.create({ 
                    "headline": item.title, 
                    "author": item.creator, 
                    "pubDate": item.pubDate, 
                    "summary": item.contentSnippet, 
                    "url": item.link,
                    "source": source._id 
                });
            } catch (err) {
                if (err.code !== 11000) { //11000 is the duplicate key error code
                    throw err;
                }
            }
        });

    } catch (err) {
        console.log("Error find comments", err);
    }
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
});
