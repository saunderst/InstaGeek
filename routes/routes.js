'use strict';

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  /*
  router.get('/', (req, res) => {
    let
    knex
      // .column({user: 'handle'}, 'title', {imageUrl: 'image_url'}, {articleUrl: 'url'}, 'description', )
      .select()
      .from('resources').leftjoin()
      .then((results) => {
        console.log(results);
    });
    select handle as user
  });
*/

//GETS =================================

// Home page
router.get("/", (req, res) => {


  res.render("index");
});


//Route to the "/home" page to hold "link cards" for the user
router.get("/home",  (req, res) => {

  knex.raw('WITH "likesPerResource" AS (SELECT "resources"."id", COUNT( "likes".* ) FROM "public"."likes" "likes" RIGHT OUTER JOIN "public"."resources" "resources" ON "likes"."resource_id" = "resources"."id" GROUP BY "resources"."id"), "avgRatingsPerResource" AS (SELECT "resources"."id", AVG( "ratings"."rating_value" ) "avgRating" FROM "public"."ratings" "ratings", "public"."resources" "resources" WHERE "ratings"."resource_id" = "resources"."id" GROUP BY "resources"."id"), "user7ratings" AS (SELECT * FROM "public"."ratings" "ratings" WHERE "user_id" = 7) SELECT "resources"."id", "rusers"."handle" "user", "resources"."title", "resources"."image_url" "imageUrl", "resources"."url" "articleUrl", "resources"."description", "likesPerResource"."count" "likes", "avgRatingsPerResource"."avgRating", "user7ratings"."rating_value" "userRating" FROM "public"."resources" "resources"   LEFT OUTER JOIN "likesPerResource" ON "resources"."id" = "likesPerResource"."id"   LEFT OUTER JOIN "avgRatingsPerResource" ON "resources"."id" = "avgRatingsPerResource"."id"   LEFT OUTER JOIN "user7ratings" ON "user7ratings"."user_id" = "resources"."id", "public"."rusers" "rusers"   WHERE "rusers"."id" = "resources"."creator_id" ORDER BY "resources"."id" DESC')
  .then((results) => {
    res.json(results.rows);
  });

res.render("home");
});

//topic filter page
router.get("/topic/:topicname", (req, res) => {

});
//Collection of the users posts and liked link cards
router.get("/myresources", (req, res) => {

});

//Gives the user a list of their posts with the option to delete
router.get("/myposts", (req, res) => {

});

//A link to the card on a standalone site to allow people to comment
router.get("/resource/:resid", (req, res) => {

});

//POSTS =================================

router.post("/" , (req, res) => {


  console.log(req.body.username); // I can see the username
  console.log(req.body); // I can see the password

  //just set user and pass to the request body pieces
  let enterUser = req.body.username;
  let enterPass = req.body.password;

  //check to see if password or user blank
  if(!enterUser || !enterPass){
    console.log("Please enter a username or password");
  } else {

    //practice using the seed data in 'rusers'

    knex('rusers').where('name', enterUser)
      .then(rows => rows.forEach(function(person){

  //need to check req with database to see if user is correct
        if(enterUser === person.name || enterPass === person.password){
        res.redirect("/home");
        console.log("you're in!")
        } else {
        console.log("user does not exist");
        }
      }));
    }

  //need to check req with database to see if password is correct
  //if correct then login and render home page

});



//For the User to Register a signup

router.post("/register", (req, res) => {

  let newEmail = req.body.user_email;
  let newUsername = req.body.new_username;
  let newPassword = req.body.new_password;

  if(!newEmail || !newUsername){
    console.log("Invalid Entry");
  }

//add the user email to database
//add the handle (username) to database
//add the password to database

  knex('rusers')
    .insert({password: newPassword, email: newEmail, handle: newUsername});
    console.log("Login created!");

})

//For the user to create link post
router.post("/create", (req, res) => {

});

//For the user to like a post
router.post("/like", (req , res) => {

});

//For the user to comment and view comments on a post
router.post("/comment", (req, res) => {

});

//For the user to rate a post ----- need to discuess
router.post("/rate", (req, res) => {


});

//For the user to view user info --- need to update as well... should be PUT
router.post("/userinfo", (req, res) => {

});

//=================================
return router;
}
