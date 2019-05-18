const express = require('express');
const pool = require('../modules/pool.js');

const router = express.Router();

router.get('/', (req, res) => {
    const sqlQuery = `
        SELECT * FROM "images";
    `
    pool.query(sqlQuery)
    .then((result) => {
        console.log("result from Image GET route:", result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET images route:', error);
        res.sendStatus(500);
    });
})

router.post('/addtag', (req, res) => {
    let sqlQuery = `
        INSERT INTO "images_tags" ("image_id", "tag_id")
        SELECT $1,$2
        WHERE NOT EXISTS (
	    SELECT * from "images_tags"
	    WHERE(
		    "image_id" = $1
		    AND
		    "tag_id" = $2
	    )
    );
    `
    pool.query(sqlQuery, [req.body.image_id, req.body.tag_id])
    .then((result) => {
        console.log("Result from images_tags POST route:", result);
        res.sendStatus(201);
    }).catch((error) => {
        console.log("Error in images_tags POST route:", error);
    });
})

module.exports = router;