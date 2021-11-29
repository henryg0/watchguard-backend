var express = require('express');
var cors = require('cors');
var profileRouter = require('./routes/Profiles');
const app = express();
const port = 3001;

// db.run(`CREATE TABLE test (
//   id INTEGER PRIMARY KEY AUTOINCREMENT)`);
// db.run('DROP TABLE IF EXISTS test');
app.use(cors());
app.use(express.json());

app.get('/cors', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send({
    "msg": "This has CORS enabled 🎈"
  })
})

app.get('/', (req, res) => {
  res.json({
    'status': 'success'
  });
})

// routes
app.use('/Profiles', profileRouter);

app.listen(port, () => {
  console.log('listening on port ', port)
})