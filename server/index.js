const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { default: axios } = require('axios');
const axios = require('axios');
const fs = require('fs');
const { json } = require('express');
const app = express();

app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

let testArr = [];
let duckgo;
let canada;
let tesObj;

app.get('/duckduckgo', (req, res) => {
    axios.get('https://api.duckduckgo.com/?q=covid&format=json&pretty=1')
        .then(item => {
            duckgo = item.data
            res.json(duckgo)
        })
        .catch(err => console.log(err))
});

app.get('/duckduckgo/:query', (req, res) => {
    axios.get(`https://api.duckduckgo.com/?q=${req.params.query}&format=json&pretty=1`)
        .then(item => {
            duckgo = item.data
            res.json(duckgo)
        })
        .catch(err => console.log(err))
});

app.get('/allcountries', (req, res) => {
    axios.get('https://api.covid19api.com/summary')
        .then(item => {
            testObj = item.data
            res.status(200).json(testObj)
        })
        .catch(err => console.log(err))
});

app.get('/canada', (req, res) => {
    axios.get('https://api.covid19api.com/live/country/canada')
        .then(item => {
            testArr.push(item.data)
            res.status(200).json(testArr)
        })
        .catch(err => console.log(err))
});

//'https://api.covid19api.com/live/country/canada'
// 'https://api.covid19tracker.ca/reports?fill_dates=true&stat=&date&after&before'

app.get('/country/:code', (req, res) => {
    axios.get(`https://api.covid19api.com/live/country/${req.params.code}`)
        .then(item => {
            tesObj = item.data
            res.status(200).json(tesObj)
        })
        .catch(err => console.log(err))
});

app.post('/comment', (req, res) => {
    return res.send('posted')
})



app.listen(8080, () => console.log(`Listening on port 8080`))