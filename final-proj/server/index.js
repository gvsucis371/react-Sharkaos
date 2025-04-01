const { query } = require('express')
const cors=require("cors")
const express = require('express')
const UnitDB = require('./db/sqliteUnitDB')

//'use strict';
const app = express();
const port = 3001;
//var router = express.Router

//set cors
app.use(cors({
    origin: 'http://localhost:3000', // React frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));


app.use(express.json()); // To handle JSON requests middleware

const db = UnitDb.initialize(); //initialize database

//get all
app.get("/units", (req, res, next) => {
    

})

//The app calls UnitController to perform operations

////Define routes to unit controller
////mainpage
//app.use(function (req, res, next) {
//    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
//    res.setHeader("Access-Control-Allow-Headers", "content-type")
//    next();
//});
//app.options('/', (req, res) => {
//    console.log("Options received from preflight")
//    console.log(req.headers)
//})

app.get('/units', async (req, res) => {
    console.lg(req.query)
    app.get('/units', async (req, res) => {
    async () => res.json(await UnitDB.allUnits()), delay)
    })
})


//CREATE A UNIT in DB with createUnit.ejs's form data
app.post('/units', (req, res) => { //This is accessed from createUnit.ejs button
    UnitDB.create(req, res)
})


app.listen(port, () => console.log(`Listening on port ${port}.`))
