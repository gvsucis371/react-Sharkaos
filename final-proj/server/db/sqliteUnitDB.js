var sqlite3 = require('sqlite3').verbose();
//const dataset = require('./dataset.js');
//const dataset2 = require('./dataset2.js');
//Database name:unitDB
//Table:        Units
function isValid(unit) {

    const slingTest = ["bounce", "pierce"];
    const eTest = ["fire", "water", "wood", "light", "dark"];
    const biasTest = ["balance", "blast", "speed", "power"];

    const isComplete = Object.values(unit).every(value => value !== null && value !== undefined && value !== "");
    //if (!eTest.includes(unit.element) || (!biasTest.includes(unit.bias)) || (!slingTest.includes(unit.sling)) && !isComplete) {

    if (!eTest.includes(unit.element) && !isComplete) {
        return false;
    }
    else {
        return true;
    }
}

class SqliteUnitDB {
    constructor() {
        this.db = new sqlite3.Database(__dirname + '/Units.sqlite', (err) => {
            if (err) {
                console.error('Error opening Db', err.message);
            } else {
                console.log("COnnected to sqlite db");
            }
        });
        this.db.serialize(() => {
            this.db.run('CREATE TABLE IF NOT EXISTS Units (id INTEGER PRIMARY KEY AUTOINCREMENT, no INTEGER, name TEXT NOT NULL,class TEXT NOT NULL, element TEXT NOT NULL, sling TEXT NOT NULL, bias TEXT NOT NULL);')
            this.db.run('INSERT INTO Units ( no, name, class, element, sling, bias) VALUES (20, "Nostradamas","demihume", "water", "pierce", "balance");')
            this.db.run('INSERT INTO Units ( no, name, class, element, sling, bias) VALUES (2,  "Masamune", "samurai",  "fire", "pierce", "blast");')
            this.db.run('INSERT INTO Units ( no, name, class, element, sling, bias) VALUES (1,  "Kevin",    "demihume", "fire", "pierce", "speed");')
            this.db.run('INSERT INTO Units ( no, name, class, element, sling, bias) VALUES (5,  "2FA",      "demihume", "dark", "pierce", "blast");')
            this.db.run('INSERT INTO Units ( no, name, class, element, sling, bias) VALUES (700,"Cheshire", "majin",    "dark", "bounce", "balance");')
            this.db.run('INSERT INTO Units ( no, name, class, element, sling, bias) VALUES (90, "Mushroom", "fairy",    "dark", "bounce", "power");')
        });


        ////------Run the main db table
        //this.db.run(`CREATE TABLE IF NOT EXISTS unitsAll (
        //        no INTEGER PRIMARY KEY,
        //        name TEXT NOT NULL,
        //        class TEXT NOT NULL,
        //        element TEXT NOT NULL,
        //        sling TEXT NOT NULL,
        //        bias TEXT NOT NULL
        //)`, (err) => {
        //    if (err) {
        //        console.log(err.message)
        //    }
        //});
        ////------Run powerup table
        //const sql = `INSERT INTO unitsAll (no, name, class, element, sling, bias) VALUES (?, ?, ?, ?, ?, ?)`;
        //const query = `SELECT COUNT(*) AS count FROM unitsAll;`;
        ////checkEmpty(unitsAll)
        //this.db.get(query, (err, row) => {
        //    if (err) {
        //        console.log(err)
        //    } else {
        //        if (row === 0) {

        //            console.log("insertnig into table")
        //            dataset.forEach(unit => {
        //                if (isValid(unit)) {
        //                    this.db.run(sql, [unit.no, unit.name, unit.class, unit.element, unit.sling, unit.bias])
        //                    console.log(unit)
        //                }
        //            })
        //        }
        //    };


        //});
        //this.db.run(`CREATE TABLE IF NOT EXISTS berry (
        //        name TEXT PRIMARY KEY,
        //        atk INTEGER,
        //        spd INTEGER,
        //        hp INTEGER
        //)`, (err) => {
        //    if (err) {
        //        console.log(err.message)
        //    }
        //});


        //const query2 = `SELECT COUNT(*) AS count FROM berry;`;
        ////checkEmpty(unitsAll)
        //this.db.get(query, (err, row) => {
        //    if (err) {
        //        console.log(err)
        //    } else {
        //        if (row === 0) {
        //            const bsql = `INSERT INTO berry(name, atk,spd,hp) VALUES(?,?,?,?) `;
        //            console.log("insertnig into table")
        //            dataset2.forEach(b => {

        //                this.db.run(bsql, [unit.no, unit.name, unit.class, unit.element])
        //                console.log(unit)

        //            });
        //        }
        //    }
        //});
    }










    //static allUnits({uid})
    static allUnits(table) {
        console.log(table)
        return new Promise((resolve, _reject) => {
            // Ensure db is initialized
            if (!this.db) {
                return _reject(new Error('Database not initialized'));
            }
            //'SELECT * from Units WHERE uid=${uid}'
            this.db.all(`SELECT * from ${table}`, (err, rows) => {
                if (err) {
                    console.error("Error fetching all units:", err);
                    _reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    //Receives a query based on the 5 element button's values 
    static filterUnits(query) {
        return new Promise((resolve, _reject) => {
            if (!this.db) {
                return _reject(new Error('Database not Initialized'));
            }
            let sql = 'SELECT * FROM Units WHERE';
            sql += query;
            console.log(sql);
            this.db.all(sql, (err, rows) => {
                if (err) {
                    console.error("Error getting filtered units:", err);

                } else {
                    resolve(rows);
                }
            });
        });




    }

    //static find(id) {
    //    return new Promise((resolve, reject) => {
    //        this.db.get("SELECT 1 FROM Units WHERE id = ?", [id], (err, rows) => {
    //            if (rows.length >= 1) {
    //                resolve(rows)
    //            } else {
    //                reject(`Id ${id} not found`)
    //            }
    //        })
    //    })
    //}
    //Receives unit={ no:,name:,element:,class:,bias:,sling:

    //db.run(sql, [name, email, age], function (err) {
    //    if (err) {
    //        console.error("Database Error:", err);
    //        return res.status(500).json({ error: "Failed to create entry" });
    //    }

    //    // Send back the new entry with the generated ID
    //    res.status(201).json({ id: this.lastID, name, email, age });

    static create(newUnit) {
        //check length of errors is not positive
        if (isValid(newUnit)) {
            return new Promise((resolve, reject) => {

                const sql = `INSERT INTO Units (no, name, class, element, sling, bias) VALUES (?, ?, ?, ?, ?, ?)`;
                this.db.run(sql, [newUnit.no, newUnit.name, newUnit.class, newUnit.element, newUnit.sling, newUnit.bias], function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    newUnit.id = this.lastID //this required function to have "this" property (db run callback)
                    resolve(newUnit)
                })
            })
        } else {
            return Promise.reject(new Error("Invalid unit data"));
        }
    }

    static update(unit) {
        return new Promise((resolve, reject) => {
            const updateQ = `UPDATE Units SET no = ?, name = ?, class=?, element = ?, sling = ?,bias = ? WHERE id = ?`;
            this.db.run(updateQ, [unit.no, unit.name, unit.class, unit.element, unit.sling, unit.bias, unit.id], function (err) {
                if (err) {
                    console.error("Error updating unit:", err);
                    reject(err);
                } else {
                    console.log(`Unit with ID ${unit.id} updated successfully.`);
                    resolve();
                }
            });
        })
    }

    static remove(id) {
        return new Promise((resolve, reject) => {
            const delQ = `DELETE FROM Units WHERE id = ?`;
            this.db.run(delQ, [id], function (err) {
                if (err) {
                    console.error("Error deleting unit: ", err);
                    reject(err);
                } else {
                    console.log(`Unit with ID ${id} deleted successfully.`);
                    resolve();
                }
            });

        })
    }

}





/* Parameter will be interpreted with respect to cwd.  Using __dirname will 
   make code run regardless of current working directory. */
SqliteUnitDB.db = new sqlite3.Database(__dirname + '/Units.sqlite')
module.exports = SqliteUnitDB