const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { json } = require('express');
const app = express();

const canData = require('./canadastat.json');
const allcountries = require('./allcountries.json');

app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

let testArr = [];
let duckgo;
let canada;
let tesObj;
let formArr =[];

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

            // fs.writeFile('./data.json',JSON.stringify(item.data),(error)=> console.log(error))
        })
        .catch(err => console.log(err))
    
    // res.send(allcountries)
});

app.get('/canada', (req, res) => {
    axios.get('https://api.covid19api.com/live/country/canada')
        .then(item => {
            testArr.push(item.data)
            res.status(200).json(testArr)

            // fs.writeFile('./canada.json',JSON.stringify(item.data),(error)=> console.log(error))
        })
        .catch(err => console.log(err))
   
    // res.send(canData)
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
})

app.post('/userchart', (req, res) => {
    let formRes = {
        id: uuidv4(),
        name: req.body.name,
        weight: req.body.weight,
    }

    formArr.push(formRes)
    console.log(formRes)

    //for offline data storage
    // fs.writeFile('./wordcloud.json',JSON.stringify(formArr),(error)=> console.log(error))

    return res.send(formArr)
})

app.post('/poll', (req, res) => {
    let formRes = {
        id: uuidv4(),
        option: req.body.option,
    }

    formArr.push(formRes)
    console.log(formRes)
    return res.send(formArr)
})


if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("../client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
    });
  }


app.listen(port, () => console.log(`Listening on ${port} `))