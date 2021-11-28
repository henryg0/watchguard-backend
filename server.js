var express = require('express');
var cors = require('cors');
var db = require('./db');
const app = express();
const port = 3001;

db.run(`CREATE TABLE test (
  id INTEGER PRIMARY KEY AUTOINCREMENT)`);
app.use(cors());

app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send({ "msg": "This has CORS enabled 🎈" })
})

app.get('/', (req, res) => {
  res.send("yoyoyo");
})

app.listen(port, () => {
  console.log('listening on port ', port)
})
