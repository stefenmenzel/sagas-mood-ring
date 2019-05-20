CREATE TABLE "images" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(120) NOT NULL,
  "path"  VARCHAR(120) NOT NULL
);

CREATE TABLE "tags" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(80) NOT NULL
);

CREATE TABLE "images_tags" (
	"id" SERIAL PRIMARY KEY,
	"image_id" INT REFERENCES "images",
	"tag_id" INT REFERENCES "tags"
);

INSERT INTO "images" ("title", "path")
VALUES 
('Abstract Shapes', 'images/AbstractShapes.jpg'),
('Chroma Blast', 'images/Chroma.jpg'),
('Color Burst', 'images/ColorBurst.jpg'),
('Flower', 'images/Flower.jpg'),
('Reflection', 'images/Reflection.jpg');

INSERT INTO "tags" ("name")
VALUES 
('Energy'),
('Calming'),
('Inspirational'),
('Frantic'),
('Vertigo');

INSERT INTO "images_tags" ("image_id", "tag_id")
SELECT 1,1
WHERE NOT EXISTS (
	SELECT * from "images_tags"
	WHERE(
		"image_id" = 1
		AND
		"tag_id" = 1
	)
);

SELECT "tags"."id","tags"."name" FROM "tags"
JOIN "images_tags" on "tags"."id" = "images_tags"."tag_id"
WHERE "image_id" = 1;
