const express = require('express');
const pool = require('../modules/pool.js');

const router = express.Router();

router.get('/', (req, res) => {
    let sqlQuery = `
        SELECT * FROM "tags";
    `
    pool.query(sqlQuery)
    .then((result) => {
        console.log('Result from Tags GET route:', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in Tags GET route:', error);
    });
})

module.exports = router;