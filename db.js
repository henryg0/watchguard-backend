var sqlite3 = require('sqlite3').verbose()
const DB_FILE_NAME = "watchguard.sqlite"
var db = new sqlite3.Database(DB_FILE_NAME);

module.exports = db;