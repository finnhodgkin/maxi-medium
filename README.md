[![Build Status](https://travis-ci.org/finnhodgkin/maxi-medium.svg?branch=master)](https://travis-ci.org/finnhodgkin/maxi-medium)
[![codecov](https://codecov.io/gh/finnhodgkin/maxi-medium/branch/master/graph/badge.svg)](https://codecov.io/gh/finnhodgkin/maxi-medium)


# MMedium's Maxi-Medium

We are building a simple blog posting web application that allows users to log into their account and input new blogs posts that can be viewed in a newsfeed of most recents posts.

## Installation Instructions
- Clone this repository
- Run `npm install`
- Create a `config.env` file with the following content:
```sh
export DATABASE_URL={heroku postgres database}
export COOKIE_PASSWORD={variable of at least 32 random characters (this is used to encrypt cookies from the server}
export CLIENT_ID={Get this from GitHub after registering new OAuth app}
export CLIENT_SECRET={As above}
```

- Tests in this app involve database so you need to create a local postgres database and run it using for example the Postgres elephant app, the process is explained below so in order to run the tests create a `config-test.env` file with the following content:
```sh
export DATABASE_URL=postgres://{  user name here, e.g. mike  }:@localhost:5432/maxi_medium_tests
export COOKIE_PASSWORD={variable of at least 32 random characters (this is used to encrypt cookies from the server}
export CLIENT_ID={Get this from GitHub after registering new OAuth app}
export CLIENT_SECRET={As above}
```


## Tech to include

- [x] Use Ouath to login user with Github
- [x] Merge Github login with bespoke login and registration
- [x] See GitHub profile picture
- [x] Validate front end input on back end using Joi
- [ ] Markdown Preview
- [ ] Separate login page if front end javascript disabled



## User Stories

-[x] I can click on a button, which allows me to log in via my Github account

  Acceptance:
  - The look of the button should make it obvious that it is this form of login
  - Once I'm logged in, I should see a list of blog posts
  - I shouldn't be left with a blank loading screen for too long during the authorisation process, otherwise I will lose confidence in your website and leave.
  - I can see my profile picture on each page that I visit

As a user, I want to be able to:
- [x] Post new blog posts
- [x] Log into my account with a password
- [x] Attach my author name to the posts I write, and view the authors of others
- [x] Browse a feed of the most recent posts
- [x] Attach an image to my posts


## Goals

- [x] Be able to submit new blog posts
- [x] Create a newsfeed of blog posts, showing image, title, date and time posted, and author
- [x] Order newsfeed by most recent
- [ ] Click on each item on newsfeed to open the post in a new page
- [x] Include login page
- [x] Include home page button that directs to newsfeed
- [x] BEM

## Stretch Goals

- [ ] Loading Scroll
- [x] Authentication
- [x] Add user image to profile
- [ ] Author link for each post goes to GitHub
- [ ] Search feature

## Wireframe

We mapped out the following wireframes for our site, that included three different pages:

#### Home
![homepage](https://cloud.githubusercontent.com/assets/16895125/24709073/aa6007bc-1a10-11e7-9360-5faf82a654a7.png)

#### Submit new post
![submit](https://cloud.githubusercontent.com/assets/16895125/24709069/a645173a-1a10-11e7-8377-6372c70744b0.png)

#### View Post
![viewblog](https://cloud.githubusercontent.com/assets/16895125/24709065/a37ee33c-1a10-11e7-95c7-6ea8f7b7c7e4.png)

## Architecture

## Schema Diagrams

### users
Column | Type | Modifiers
--- | --- | ---
id | integer | not null default
github_id | integer | not null default
username | character varying(20) | not null
display_name | character varying(64) | not null
password | character varying(64) | not null
avatar_url | character varying(500) | not null

### stories
Column | Type | Modifiers
--- | --- | ---
id | integer | not null default
author_id | integer | REFERENCES users(id)
title | character varying(100) | not null
body_text | character varying(20000) | not null
image_url | character varying(500) | not null
date_posted | character varying(50) | not null

## Learnings

### PostgresSQL - connection idling

You can specify how long a client is allowed to remain idle before being closed:

```javascript
idleTimeoutMillis: 1000
```

### Heroku env variables

```
DATABASE_URL={url of heroku postgres database}
COOKIE_PASSWORD={ random cookie password minimum 32 characters}
```

### Travis setup

make sure that the name of the database (at the end) matches the name of the database created in `.travis.yml` file - see below for further info.
```
DATABASE_URL=postgres://postgres@localhost:5432/hapi_handlebars_articles_test
COOKIE_PASSWORD={ random cookie password minimum 32 characters}
```

### Setup PostgreSQL database on Heroku

1. create heroku app and push it to Heroku
```
heroku create app-name-here --region eu
git push heroku master
```

1. create database in heroku dashboard or use heroku cli
```
heroku addons:create heroku-postgresql:hobby-dev
```
https://elements.heroku.com/addons/heroku-postgresql

https://devcenter.heroku.com/articles/heroku-postgresql#create-a-new-database

1. try accessing database from command line using psql
```
psql databaseUrlhere (can be found in app settings on heroku)
```
https://devcenter.heroku.com/articles/heroku-postgresql#pg-psql

1. Set up back end to connect to Heroku database (this is done in the `db_connect.js` file in this project)
https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js

### Setting up local postgreSQL database for testing

- Setting up a test database:
1. Open Postgres elephant app
1. run `psql` in the terminal
1. create a test database: `CREATE DATABASE hapi_handlebars_articles_test;`
1. connect to database `\c hapi_handlebars_articles_test`
1. run build script `\i ./database_build/db_build.sql`
1. Create a config-test.env and add the test DATABASE_URL to this file (don't forget to add this file to .gitignore)
1. set environmental variable to test, under scripts in package.json add the following:

Note: postgres elephant app needs to be running to run the tests, but you don't need to be connected to database using the psql module.

```
"pretest": "NODE_ENV=test node database-build/db-build.js",
"test": "NODE_ENV=test tape test/index.test.js | tap-spec",
```

1. Setup config-test.env file:
```
DATABASE_URL=postgres://piotr:@localhost:5432/hapi_handlebars_articles_test

1. Add the following to db_connect.js:

```javascript
const environment = require('env2');

if (process.env.NODE_ENV === 'test') {
  environment('config-test.env');
} else {
  environment('config.env');
}
```



### Setting up travis with its own local postgreSQL database for testing

* Instruct travis to set up local database on its servers

```
before_script:
  - "psql -c 'create database hapi_handlebars_articles_test;' -U postgres"
  - "psql -U postgres -d hapi_handlebars_articles_test -a -f database-build/db-build.sql"
```

* Go to repo settings on travis and add environmental variable
```
DATABASE_URL=postgres://postgres@localhost:5432/hapi_handlebars_articles_test
```

### Setting up travis with bcrypt

- Normally you would just type `npm install bcrypt`. However, people on Linux (especially Ubuntu and Debian) might get an error because bcrypt needs to be compiled and the compiler and the relative utilities are missing. To fix this on a linux machine, type `sudo apt-get install build-essential`. Only after that type `npm install bcrypt`. Now it should work.

Travis is also a linux machine and requires a C++ compiler for using bcrypt, so make sure to include this in your travis.yml file.

```
language: node_js
node_js:
  - '6.9.5'
script:
  -  "npm run coverage"
env:
  - CXX=g++-4.8
addons:
  apt:
    sources:
    - ubuntu-toolchain-r-test
    packages:
    - gcc-4.8
    - g++-4.8
  # postgres: "9.4"

after_success:
  - ./node_modules/.bin/codecov -e TRAVIS_NODE_VERSION -f coverage/coverage.json
```


### psql commands
```
# list tables / relations
\d
```


### Wireframes tool
[moqup.com](https://app.moqups.com/edit/page/ad64222d5)
