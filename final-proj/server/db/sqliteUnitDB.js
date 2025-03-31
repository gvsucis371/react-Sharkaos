var sqlite3 = require('sqlite3').verbose()
let Unit = require('../models/Unit')


//Database name:unitDB
//Table:        Units

class SqliteUnitDB {
    //Create the table if not exists
    //**** make it if not exists
    static initialize() {
        this.db = new sqlite3.Database(__dirname + '/Units.sqlite', (err) => {
            if (err) {
                console.error('Error opening Db', err.message);
            } else {
                console.log("COnnected to sqlite db");
            }
        });
        this.db.serialize(() => {
            this.db.run('CREATE TABLE IF NOT EXISTS Units (id INTEGER PRIMARY KEY AUTOINCREMENT, no INTEGER, name TEXT NOT NULL, element TEXT NOT NULL, sling TEXT NOT NULL);')
            this.db.run('INSERT INTO Units ( no, name, element, sling) VALUES (20,"Nostradamas", "water", "pierce");')
            this.db.run('INSERT INTO Units ( no, name, element, sling) VALUES (2,"Masamune", "fire","pierce");')
            this.db.run('INSERT INTO Units ( no, name, element, sling) VALUES (1,"Kevin", "fire","pierce");')
            this.db.run('INSERT INTO Units ( no, name, element, sling) VALUES (5,"2FA", "dark", "pierce");')
            this.db.run('INSERT INTO Units ( no, name, element, sling) VALUES (700,"Cheshire", "dark","bounce");')
            this.db.run('INSERT INTO Units ( no, name, element, sling) VALUES (90,"Mushroom", "dark", "bounce");')
        });
    }

    static allUnits() {
        return new Promise((resolve, _reject) => {
            // Ensure db is initialized
            if (!this.db) {
                return _reject(new Error('Database not initialized'));
            }

            this.db.all('SELECT * from Units', (err, rows) => {
                if (err) {
                    console.error("Error fetching units:", err);
                    _reject(err);
                } else {
                    resolve(rows.map((item) => new Unit(item)));
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
                    console.erro("Error getting filtered units:", err);

                } else {
                    resolve(rows.map((item) => new Unit(item)));
                }
            });
        });
     



    }
    // Notice that there is *a lot* of error handling missing here.
    static find(id) {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM Units WHERE id = ?", [id], (err, rows) => {
                if (rows.length >= 1) {
                    resolve(new Unit(rows[0]))
                } else {
                    reject(`Id ${id} not found`)
                }
            })
        })
    }
    //Create unit
    static create(d) {
        let newUnit = new Unit(d);
        //check length of errors is not positive
        if (newUnit.isValid().length<=0) {
            return new Promise((resolve, reject) => {
                const sql = `INSERT INTO Units (no, name, element, sling) VALUES (?, ?, ?, ?)`;
                this.db.run(sql, [newUnit.no, newUnit.name, newUnit.element, newUnit.sling], function (err) {
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
            const updateQ = `UPDATE Units SET no = ?, name = ?, element = ? WHERE id= ?`;
            this.db.run(updateQ, [unit.no, unit.name, unit.element, unit.id], function (err) {
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