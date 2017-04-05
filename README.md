# MMedium's Mini-Medium

We are building a simple blog posting web application that allows users to log into their account and input new blogs posts that can be viewed in a newsfeed of most recents posts.

## Installation Instructions
- Clone this repository
- Run ```npm install```
- Create a ```config.env``` filter
- etc ... (To Be Completed once finished)

## User Stories

As a user, I want to be able to:
- [ ] Post new blog posts
- [ ] Log into my account with a password
- [ ] Attach my author name to the posts I write, and view the authors of others
- [ ] Browse a feed of the most recent posts
- [ ] Attach an image to my posts

## Goals
- [ ] Be able to submit new blog posts
- [ ] Create a newsfeed of blog posts, showing image, title, date and time posted, and author
- [ ] Order newsfeed by most recent
- [ ] Click on each item on newsfeed to open the post in a new page
- [ ] Include login page
- [ ] Include home page button that directs to newsfeed
- [ ] BEM

## Stretch Goals
- [ ] Loading Scroll
- [ ] Authentication
- [ ] Add user image to profile
- [ ] Author link for each post goes to GitHub
- [ ] Display avatar of logged in user in top right
- [ ] Search feature
- [ ] Markdown capabilities for blog posts
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

We used the following schema for the database:

### user
Column | Type | Modifiers
--- | --- | ---
id | integer | not null default
username | character varying(100) | not null
password | character varying(100) | not null
avatar_url | character varying(100) | not null

### article
Column | Type | Modifiers
--- | --- | ---
id | integer | not null default
user_id | integer | not null
title | character varying(100) | not null
body_text | character varying(2000) | not null
image_url | character varying(100) | not null

## Learnings

- We made our wireframes using this website: [moqup.com](https://app.moqups.com/edit/page/ad64222d5)
