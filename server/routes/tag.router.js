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
        res.sendStatus(500);
    });
})

router.get('/applied', (req, res) => {
    let sqlQuery = `
        SELECT "tags"."name" FROM "tags"
        JOIN "images_tags" ON "tags"."id" = "images_tags"."tag_id"
        WHERE "image_id" = $1;
    `
    pool.query(sqlQuery, [req.query.imageId])
    .then((result) => {
        console.log('Result from GET applied tags route:', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET Applied tags route:', error);
        res.sendStatus(500);
    });
})

module.exports = router;