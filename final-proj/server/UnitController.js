const unitDB = require('../db/sqliteUnitDB')
const Unit = require("../models/Unit")

class UnitController {

    //get array of all unit objects on 3000/units
    async index(req, res) {
        let unitArray = await unitDB.allUnits()
        //units is the path "/units"
        const range = { from: '', to: '' };
        let element = req.body.element;
        if (!element) {
            element = { fire: false, water: false, wood: false, dark: false, light: false };
        }
        
        res.render('units', { units: unitArray, range: range, element: element }) //units.ejs view file
    }
    async sortIndex(req, res) {
        const fireQ = '(element=="fire" OR element=="Fire")';
        const waterQ = '(element=="water" OR element=="Water")';
        const woodQ = '(element=="wood" OR element=="Wood")';
        const darkQ = '(element=="dark" OR element=="Dark")';
        const lightQ = '(element=="light" OR element=="Light")';
        let element = req.query.element;
        if (!element) {
        
                element = { fire: false, water: false, wood: false, dark: false, light: false };
            
        }
        
      
       
        console.log(req.query,"AAAAAAAAAAAAAAAAAAA")
        let query = "";
        let array = [];
        let range = req.query.range;
        let to = range.to;
        let from = range.from;
        console.log(element)
        //Get query
        if (to && from) {
            query = `(no BETWEEN ${from} AND ${to})`
        }
        else if (from) {
                query = `(no >= ${from})`;
        }
        else if (to) {
                query = `(no <= ${to})`;
        }
        
        if (element.fire) {
            array.push(fireQ)
        }
        if (element.water) {
            array.push(waterQ)
        }
        if (element.wood) {
            array.push(woodQ)
        }
        if (element.dark) {
            array.push(darkQ)
        }
        if (element.light) {
            array.push(lightQ)
        }
        if (array.length >= 1) {
            if (query) {
                query += " AND "
            };
            if (array.length >= 2) {

                query += '(' + array.join(" OR ")+')';
                
            }
            else {
                query += '(' + array[0] + ')';
            }
            console.log(query)
            //query='('+query+')'
        }
        if (query!="") {
            let sortedUnits = await unitDB.filterUnits(query);
            res.render('units', { units: sortedUnits, range: range, element: element }) //units.ejs view file
        }
        else {
            this.index(req,res);
        }

    }
        //sort function
    
    //async sort(req, res) {
    //    const range = { from: '', to: '' };
    //    const element = { fire: true, water: true, wood: true, dark: true, light: true };
    //    res.render('sortUnits', { range: range, element: element })

    //}
    async show(req, res) {
        let id = req.params.id
        let unit = await unitDB.find(id)

        if (!unit) {
            res.send('Unit id:' + id + 'not found')
        }
        else {
            res.render('viewUnit', { unit: unit }) //this is a view file called unitShow.ejs
        }
    }

    newUnitForm(req, res) {
        console.log("Controller::newUnit")
        res.render('createUnit', { unit: new Unit() }) //creates new entry
    }
    //Create function
    async create(req, res) {
        console.log("creating unit entry")
        console.log(req.query)
        try {
            //what is req body????
            let newUnit = await unitDB.create(req.body.unit) //calls create func in the DB // return error so we dont have to call is valid again
            //show route of new unit with redirect
            res.writeHead(302, { "Location": `/units` });
            res.end()
        } catch (error){
            console.error("Error creating unit:", error);
            //reload the unit new page
            res.render('createUnit', { unit: req.body.unit, error: error.message });
        }
    }
    //Update functions
    async edit(req, res) {
        let id = req.params.id
        let unit = await unitDB.find(id) //get unit from the DB
        if (!unit) {
            res.send("Not found id: " + id)
        }
        else {

            res.render("editUnit", { unit: unit }) //render the ejs file unitEdit
        }
    }
    //check this
    async update(req, res) {
        let id = req.params.id
        let unit = await unitDB.find(id)    //find unit to update
        if (!unit) {
            res.send("could not find unit id:" + id)
        }
        console.log("Checking validity of temp")
        let temp = new Unit(req.body.unit)  //create a new unit obj with given
        let test = temp.isValid()
        if (test.length <= 0) {    //NOTE check this
            try {
                temp.id = unit.id;
                await unitDB.update(temp);
                console.log(`unit ${id} updated successfully`);
                res.redirect('/units/' + id);
            } catch (error) {
                console.error("Error updating unit", error);
                res.status(500).send("Error updating");
            }
           
        }
        else {
            // If there are errors, render the form again with error messages
            console.log("Validation errors found:", test);
            res.render('editUnit', {
                unit: req.body.unit,  // Pass the invalid data back to the form
                errors: test       // Pass the validation errors to the view
            });
        }
    }




    //receives id of unit to remove 
    async remove(req, res) {
        let id = req.params.id
        //let unit = await unitDB.find(id)
        //if (!unit) {
        //    res.send("Unit not found" + id)
        //}else {
            unitDB.remove(id)
            .then(() => {
                console.log(`Unit with id ${id} removed`);
                res.redirect('/units') //units.ejs view file                //NOTE do i need to res. here??? rerender mainpage?

            })
            .catch(err => {
                console.error("Error with deletion", err);
                res.status(500).send("Error deleting unit")
            });
       // }
    }

    async rawIndex(req, res) {
        let units = await unitDB.allUnits()
        res.send(units)

    }
}
module.exports=UnitController
