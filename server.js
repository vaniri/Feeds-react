const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const db = require('./models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
let Parser = require('rss-parser');
let parser = new Parser();

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

app.route('/source/:source')
    .get(async (req, res) => {
        try {
            let news = await db.News.find({ "source": req.params.source }).lean();
            let sourcesNames = await db.News.find().distinct("source").lean();
            let sources = sourcesNames.map(name => ({ name }));
            res.json({ message: "OK", sources: sources, news: news });
        } catch (err) {
            console.log("Error find news", err);
            res.json({ message: "FAIL", reason: err });
        }
    })

app.route('/sources')
    .get(async (req, res) => {
        try {
            let sourcesNames = await db.News.find().distinct("source").lean();
            let sources = sourcesNames.map(name => ({ name }));
            res.json({ message: "OK", sources })
        } catch (err) {
            console.log("Error find source", err);
            res.json({ message: "FAIL", reason: err });
        }
    })


app.route('/news/:id')
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

app.route('/user')
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
            let result = await db.User.create(req.body);
            let UserId = result._id;
            res.json({ message: "OK", result, userId: UserId, token: makeToken(UserId) });
        } catch (err) {
            console.log("Error creating new user", err);
            res.json({ message: "FAIL", reason: err });
        }
    });


const jwtSecret = "yo dawg i herd you like authorization";

function makeToken(userId) {
    return jwt.sign({ userId }, jwtSecret);
}

app.post('/login',
    async (req, res) => {
        try {
            console.log(req.body.email);
            let user = await db.User.findOne({ email: req.body.email});
            console.log(user);
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
            res.json({ message: "OK", userId: user.id, token: makeToken(user.id) });
        } catch (err) {
            console.log("Error logging in:", err);
            res.json({ message: "FAIL", reason: err });
        }
    })

app.route('/comments')
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


async function getFeed() {
    const urls = [
        'http://feeds.foxnews.com/foxnews/latest',
        'http://feeds.bbci.co.uk/news/world/rss.xml',
        'https://news.ycombinator.com/rss',
        'http://www.reddit.com/.rss',
        'https://feeds.npr.org/510298/podcast.xml'
    ];
    urls.forEach(async url => {
        try {
            const news = await parser.parseURL(url);
            insertNews(news);
        } catch (error) {
            console.log("Error updating feed", url, error);
        }
    });
}

getFeed();
setInterval(getFeed, 100 * 1000);

async function insertNews(news) {
    try {
        news.items.forEach(async (item) => {
            try {
                await db.News.create({ "source": news.title, "headline": item.title, "author": item.creator, "pubDate": item.pubDate, "summary": item.contentSnippet, "url": item.link });
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

app.listen(process.env.PORT || 3001, () => {
    console.log('app listening at http://localhost:3000');
});
