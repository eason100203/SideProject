var express = require('express');
var router = express.Router();
var cartdb = require("../mysqlConfig");

// router.get('/cartlisthook', (req, res) => {
//     cartdb.query("select * from cartfororder",
//         [],
//         (err, rows) => res.json(rows))
// });




router.get('/cartlisthook/:uid', (req, res) => {
    
    cartdb.query(
      "SELECT * FROM cartfororder WHERE uid=? AND pstate = 'inCart'",
      [req.params.uid],
      (err, rows) => {
        if (err) {
          console.error('Error fetching data:', err);
          res.sendStatus(500);
        } else {
          res.json(rows);
        }
      }
    );
  });

module.exports = router; 


