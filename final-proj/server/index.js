const { query } = require('express')
const express = require('express')
const UnitDB = require('./sqliteUnitDB')

//'use strict';
const express = require('express');
const app = express();
const port = 3001;
//var router = express.Router



//The app calls UnitController to perform operations

app.use(express.json)
//Define routes to unit controller
//mainpage
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.setHeader("Access-Control-Allow-Headers", "content-type")
    next();
});
app.options('/', (req, res) => {
    console.log("Options received from preflight")
    console.log(req.headers)
})

app.get('/units', async (req, res) => {
    console.lg(req.query)
    app.get('/colors', async (req, res) => {
    async () => res.json(await UnitDB.allUnits()), delay)
    })
})


//CREATE A UNIT in DB with createUnit.ejs's form data
app.post('/units', (req, res) => { //This is accessed from createUnit.ejs button
    UnitDB.create(req, res)
})


app.listen(port, () => console.log(`Listening on port ${port}.`))
