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
       ('u2', '$2a$10$6.m3YwrAjslzM2nUnwOMG.CSm2aVAfJrJxJOdU19eORVOHqz4UwDW', './images/finn_headshot.jpg'),
       ('Jessica', 'fish', './images/jessica_headshot.jpg'),
       ('Finn', 'horse', './images/finn_headshot.jpg'),
       ('Alice', 'cat', './images/alice_headshot.jpg'),
       ('Piotr', 'orange', './images/piotr_headshot.jpg');

INSERT INTO articles (author_id, title, body_text, image_url)
VALUES (1, 'how to feed your fish', 'Aenean lacinia bibendum nulla sed consectetur.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor.

        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

        Maecenas faucibus mollis interdum. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor.', 'http://placehold.it/1000x300'),

        (2, 'how to feed your dog', 'Aenean lacinia bibendum nulla sed consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit tempus porttitor.

        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

        Maecenas faucibus mollis interdum. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor.', 'http://placehold.it/1000x300');

COMMIT;
