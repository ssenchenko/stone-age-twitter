# Crowdlinker Test

## Requirements

* Application should has ​user authentication​ with email and password with sufficient validation.

  - email has email like format (xxx@xxx.xxx)
  - email is unique
  - password mustn't be shorter than 6 symbols
  - password verification (type your passowrd again field) should be equal to password
  - username doesn't have to be unique

* Upon successful authentication user can create a post which consists of

  - article name
  - article description (can be empty)
  - article file to upload (only a pdf or txt file is accepted)

* Authenticated user can see the list of post published before and can like posts
* When a user logs in again they see likes on the posts they liked
* Unauthenticated user can see the list of posts but cannot like them
* Both authenticated and unauthentikated users can click the link to the article
  from the post and open the file
* Posts feed is updated in realtime. A user not only see a post just added themselves,
they see the posts added by other users as soon as they are published

## Assumptions and simplifications

* Only last 12 posts are fetched to the feed when a user opens app or logs in. In real application
 data pagination would be employed together with infinite scroll in UI
* When users start adding posts, they are fetched to the top of the feed and number of posts in the
 feed becomes more then initial 12
* If uploading an article file fails, the post is still created but without a link to the file.
* App code a list of TODO items which would be a right thing to implement if time was endless :)

## Frameworks and tools

* Front-end: React.js, styled-components, javascript
* Back-end: Firebase
* Database: Cloud Firestore (NoSQL)

React-scripts used to setup the application (create-react-app).
 No Flow or Typescript only React PropTypes.

## Run and test application

It's hosted here: <https://crowdlinker-test.firebaseapp.com/> (or maybe not hosted anymore).

The application can be hardly run locally, because it requires connection to Firestore which
 can obtained only if you create and configure your own Firebase project.
