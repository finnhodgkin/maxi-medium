BEGIN;

DROP TABLE IF EXISTS users, articles CASCADE;

CREATE TABLE users (
  id          SERIAL        PRIMARY KEY,
  username    VARCHAR(64)   UNIQUE NOT NULL,
  password    VARCHAR(64)  NOT NULL,
  avatar_url  VARCHAR(500)
);

CREATE TABLE articles (
  id          SERIAL          PRIMARY KEY,
  author_id   INTEGER         REFERENCES users(id),
  title       VARCHAR(100)    NOT NULL,
  body_text   VARCHAR(20000)  NOT NULL,
  image_url   VARCHAR(500)
);

INSERT INTO users (username, password, avatar_url)
VALUES ('u1', '$2a$10$z.hMdUW5o1U.W95Vg/u.GOb65q6fRtsQY6mlykvbMZEHST2dASwz.', './images/jessica_headshot.jpg'),
       ('u2', '$2a$10$6.m3YwrAjslzM2nUnwOMG.CSm2aVAfJrJxJOdU19eORVOHqz4UwDW', './images/finn_headshot.jpg');

INSERT INTO articles (author_id, title, body_text, image_url)
VALUES (1, 'Computers are really great', 'Aenean lacinia bibendum nulla sed consectetur.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor.', 'https://images.unsplash.com/photo-1430692032771-aae00435a3ff?dpr=1&auto=format&fit=crop&w=1080&h=NaN&q=80&cs=tinysrgb&crop=&bg='),

        (2, 'I really like the outdoors', 'Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor.', 'https://images.unsplash.com/photo-1477777404980-710a373f2d7e?dpr=1&auto=format&fit=crop&w=1080&h=NaN&q=80&cs=tinysrgb&crop=&bg=');

COMMIT;
