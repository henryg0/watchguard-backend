var sqlite3 = require('sqlite3').verbose()
var profileSchema = require('./models/profileSchema');

const DB_FILE_NAME = "watchguard.sqlite"

var db = new sqlite3.Database(DB_FILE_NAME);
// create tables
db.run(`CREATE TABLE IF NOT EXISTS ${profileSchema}`);
console.log('created table', profileSchema);
module.exports = db;