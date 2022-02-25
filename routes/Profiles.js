const router = require('express').Router();
const db = require('../db');
const SerialPort = require('serialport').SerialPort;
const portName = "COM6"
var dataJSON = {};

router.route('/').get((req, res) => {
  var query = `
  SELECT * from Profile
  `
  var stmt = db.prepare(query);
  stmt.all((err, row) => {
    if (err) {
      res.send("err" + err);
    } else {
      if (!row) {
        res.json({
          "status": 400,
          "row": "undefined"
        })
      } else {
        res.json({
          "status": 200,
          "profiles": row
        })
      }
    }
  });
});

router.route('/:profileId/get').get((req, res) => {
  var query = `
  SELECT firstName fName, lastName lName, emergencyContact ec
  FROM Profile
  WHERE profileId = (?)
  `
  var stmt = db.prepare(query);

  stmt.get(req.params.profileId, (err, row) => {
    if (err) {
      res.send("err" + err);
    } else {
      if (!row) {
        res.status(400).send(`error fetching profile w. profileId: ${req.params.profileId}`);
      } else {
        res.status(200).send(`fetched profile w. profileId: ${req.params.profileId}`);
      }
    }
  })
})

router.route('/create').post((req, res) => {
  var query = `
  INSERT INTO Profile (firstName, lastName, emergencyContact, bloodPressure, carbonMonoxide, temperature, healthConditions)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  `
  var stmt = db.prepare(query);
  stmt.run(req.body.firstName, req.body.lastName, req.body.emergencyContact, 10, 5, 90, req.body.healthConditions);
  stmt.finalize();

  query = `
  SELECT * FROM Profile
  WHERE firstName = (?) AND lastName = (?)
  `;

  stmt = db.prepare(query);
  var params = [req.body.firstName, req.body.lastName];
  stmt.get(params, (err, row) => {
    if (err) {
      res.status(400).send("error fetching data after insertion");
    } else {
      res.status(200).send(`fetched profile w/ firstName: ${req.body.firstName}, lastName: ${req.body.lastName}`);
    }
  })
  stmt.finalize();

});

router.route('/createDummyProfiles').post((req, res) => {
  for (let i = 0; i < 20; i++) {
    var query = `
    INSERT INTO Profile (firstName, lastName, emergencyContact, bloodPressure, carbonMonoxide, temperature)
    VALUES (?, ?, ?, ?, ?, ?)
    `
    var stmt = db.prepare(query);
    stmt.run(`f${i}`, `l${i}`, `ec${i}`, `bp${i}`, `cm${i}`, `t${i}`);
    stmt.finalize();
  }
  console.log('hit');
  res.status(200).send('successfully created dummy profiles');

});

router.route('/readRFModule').get((req, res) => {
  try {
    var dataString = '';
    const port = new SerialPort({
      path: portName,
      baudRate: 9600,
    });
    const regex = '{(.*?)}'

    port.on('data', (data) => {
      dataString += data.toString();
      if (dataString.endsWith('>')) {
        const regexMatch = dataString.match(regex);
        dataJSON = JSON.parse(regexMatch[0] || {});
        port.close();
        return;
      }
    })
    port.on('error', (err) => {
      return;
    })
    res.status(200).send(dataJSON);

  } catch (e) {
    console.log('here');
    res.status(400).send('err:', e);
    return;
  }
});
module.exports = router;