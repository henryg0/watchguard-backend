var sqlite3 = require('sqlite3').verbose()
var profileSchema = require('./models/profileSchema');

const DB_FILE_NAME = "watchguard.sqlite"

var db = new sqlite3.Database(DB_FILE_NAME);
db.run('DROP TABLE IF EXISTS Profile');

// create tables
db.run(`CREATE TABLE IF NOT EXISTS ${profileSchema}`);
module.exports = db;