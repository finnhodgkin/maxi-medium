[![Build Status](https://travis-ci.org/finnhodgkin/maxi-medium.svg?branch=master)](https://travis-ci.org/finnhodgkin/maxi-medium)
[![codecov](https://codecov.io/gh/finnhodgkin/maxi-medium/branch/master/graph/badge.svg)](https://codecov.io/gh/finnhodgkin/maxi-medium)


# MMedium's Maxi-Medium

We are building a simple blog posting web application that allows users to log into their account and input new blogs posts that can be viewed in a newsfeed of most recents posts.

## Installation Instructions
- Clone this repository
- Run `npm install`
- Create a `config.env` file
- Add a DATABASE_URL variable with a link to a local PSQL database on your computer.
- Add a COOKIE_PASSWORD variable of at least 32 random characters (this is used to encrypt cookies from the server).

## Tech to include

- Use Ouath to login user with Github
- Merge Github login with bespoke login and registration
- See GitHub profile picture
- Validate front end input on back end using Joi
- Markdown Preview
- Separate login page if front end javascript disabled


## User Stories

I can click on a button, which allows me to log in via my Github account

Acceptance:
I can click on a button, which allows me to log in via my Github account
The look of the button should make it obvious that it is this form of login
Once I'm logged in, I should see a list of blog posts
I shouldn't be left with a blank loading screen for too long during the authorisation process, otherwise I will lose confidence in your website and leave.
 I can see my username & profile picture on each page that I visit
 I can click on a button next to any of my posts, which takes me to an edit view
I can't see an edit button next to anyone else's posts
Each user has the same experience (but with their own posts)
Clicking "done" / "submit" changes the content for every user to see
Clicking "done" / "submit" takes me to a view of the new, edited version of my blog post






As a user, I want to be able to:
- [x] Post new blog posts
- [x] Log into my account with a password
- [x] Attach my author name to the posts I write, and view the authors of others
- [x] Browse a feed of the most recent posts
- [ ] Attach an image to my posts

## Goals
- [x] Be able to submit new blog posts
- [x] Create a newsfeed of blog posts, showing image, title, date and time posted, and author
- [x] Order newsfeed by most recent
- [ ] Click on each item on newsfeed to open the post in a new page
- [x] Include login page
- [x] Include home page button that directs to newsfeed
- [ ] BEM

## Stretch Goals
- [ ] Loading Scroll
- [x] Authentication
- [x] Add user image to profile
- [ ] Author link for each post goes to GitHub
- [x] Display avatar of logged in user in top right
- [ ] Search feature
- [x] Markdown capabilities for blog posts
- [ ] Markdown preview

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
username | character varying(64) | not null
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

- We made our wireframes using this website: [moqup.com](https://app.moqups.com/edit/page/ad64222d5)

- Setting up a test database:
1. Open Postgres elephant app
2. run ```psql``` in the terminal
3. create a test database: ```CREATE DATABASE testDatabaseName```
4. run ```\c testDatabaseName```
5. run ```\i ./database_build/db_build.sql``` or the path to your sql filter
6. Create a config-test.env and add the test DATABASE_URL to this file (don't forget to add this file to .gitignore)
7. set environmental variable to test, under scripts in package.json add the following: ```"pretest": "ENV=testing node database_build/db_build.js",
"test": "tape tests/tests.js | tap-spec",```
8. Add the following to db_connect.js:

```sh
const environment = require('env2');

if (process.env.ENV === 'testing') {
  environment('config-test.env');
} else {
  environment('config.env');
}
```
