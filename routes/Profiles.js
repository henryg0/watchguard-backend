const router = require('express').Router();
const db = require('../db');

const sendJson = (res, err, data, msg) => {
  res.json({
    "status": !err ? 200 : 400,
    "err": err,
    "data": data ? data : "undefined",
    "msg": msg
  })
};
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
          "data": row
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
        sendJson(res, err, row, "undefined", `error fetching profile w. profileId: ${req.params.profileId}`);
      } else {
        sendJson(res, err, row, `fetched profile w. profileId: ${req.params.profileId}`);
      }
    }
  })
})

router.route('/create').post((req, res) => {
  console.log(req.body);
  var query = `
  INSERT INTO Profile (firstName, lastName, emergencyContact)
  VALUES (?, ?, ?)
  `
  var stmt = db.prepare(query);
  stmt.run(req.body.firstName, req.body.lastName, req.body.emergencyContact);
  stmt.finalize();

  query = `
  SELECT * FROM Profile
  WHERE firstName = (?) AND lastName = (?)
  `;

  stmt = db.prepare(query);
  var params = [req.body.firstName, req.body.lastName];
  stmt.get(params, (err, row) => {
    if (err) {
      sendJson(res, err, row, "error fetching data after insertion");
    } else {
      sendJson(res, err, row, `fetched profile w/ firstName: ${req.body.firstName}, lastName: ${req.body.lastName}`);
    }
  })
  stmt.finalize();

});

module.exports = router;