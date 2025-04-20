const { query } = require('express')
const cors = require("cors")
const express = require('express')
const UnitDB = require('./db/sqliteUnitDB')



//'use strict';
const app = express();
const port = 3003;


//body parsing
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//set cors
app.use(cors({
    origin: 'http://localhost:3000',  // This allows only your React app to make requests
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow the necessary methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow necessary headers
}));

app.use(express.json()); // To handle JSON requests middleware
//app.use(function (req, res, next) {
//    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
//    res.setHeader("Access-Control-Allow-Headers", "content-type")
//    next();
//});

//// Respond to preflight
////
//// (This code isn't necessary. The "use" block above 
//// actually produces all the necessary CORS responses.
//// I include this block here simply to demonstrate 
//// the preflight.
//app.options('/colors', (req, res) => {
//    console.log('Received options from preflight')
//    console.log(req.headers)
//    res.send()
//})


const db = new UnitDB();


//get all
//app.get("/units", (req, res, next) => {

app.get('/basis', async (req, res) => {
    console.log("Db was requested fro units")
    try {
        const units = await UnitDB.allUnits("unitsAll");
        res.status(200).json(units);
    } catch (error) {
        console.error('Error fetching units:', error);
        res.status(500).json({ error: 'Failed to fetch units' });
    }

})

app.get('/units', async (req, res) => {
    console.log("Db was requested fro units")
    try {
        const units = await UnitDB.allUnits("Units");
        res.status(200).json(units);
    } catch (error) {
        console.error('Error fetching units:', error);
        res.status(500).json({ error: 'Failed to fetch units' });
    }
})

//body contains all fields except id in current version
//In final project it will take the id of the unit clicked 
//on from the panel and create an entry in userUnits using data from entry with the id from mainUnits
app.post('/new', async (req, res) => {
    console.log("attempting add")

    try {
        let newUnit = await UnitDB.create(req.body);
        res.status(201).json(newUnit);

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Failed to create entry" });
    }

});

app.put('/update/:id', async (req, res) => {
    console.log("updatefunction")
    //const id = req.params.id
    const unit = req.body
    try {//console.log(unit);
        const thing = await UnitDB.update(unit);
        res.status(200).json(thing);
    } catch (error) {
        console.error("error updating:", error);
        res.status(500).json({ error: 'Failed to update in db ' });

    }
})

app.delete('/delete/:id', async (req, res) => {
    console.log("Attempt delete at express")
    const id = req.params.id;
    UnitDB.remove(id);

    res.status(200).json({ message: `Record with id ${id} deleted successfully` });
});

app.listen(port, () => console.log(`Listening on port ${port}.`))
