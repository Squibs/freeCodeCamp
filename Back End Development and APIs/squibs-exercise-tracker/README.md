# Exercise Tracker

<p align="center"><img src="/Images/screenshots/screenshot-exercise-tracker.png" height="400" alt="Screenshot of my Exercise Tracker project."/></p>

<em>Completed November 5, 2022</em>

### [Exercise Tracker](https://exercise-tracker.sulph.repl.co/) (Click to view functional site)

[Link to files on replit](https://replit.com/@Sulph/exercise-tracker#index.js)

This was the first of these *Back End Development and APIs* projects that I felt challenged, and had to learn more about `Mongoose` and `MongoDB` rather than using what I learned in the short lessons before these projects.

This provided boilerplate for this project was slightly more bare-bones than the previous, this time the `body-parser` package was not included. So the only packages I included this time were: `body-parser` and `mongoose`.

I quickly setup a `userSchema` as well as an `exerciseSchema`, that will be related through a field on `exerciseSchema` called `user_id` that is a reference to the `_id` that will be auto-generated on `users` (as well as all objects stored in mongo), but stored as a string on my `exercises` (rather than a `ObjectId`). This lets me relate `exercises` to `users`.

There were several routes we had to handle for this project: `GET /api/users` `POST /api/users`, `POST /api/users/:_id/exercises`, and `GET /api/users:id/logs`. Posting and getting a `user` was the more simple part of this project. Posting a `user` simply requires seeing if a username exists and if it does not, then submit the new user. There was no user story for duplicate `usernames`, so I could have skipped checking. Getting the list of all users, is a matter of simply using the `Model.find` on the `User` model created from the schema and returning the list.

Creating `exercises` and displaying the log of `exercises` for a `user` was more involved. I included validation for the information submitted when an exercise is being created. This was not part of the requirements for this project, but I felt it should be done. This meant checking if the required information was submitted, and in the correct format.

For submitting an `exercise` after checking if all submitted data is valid, I would then submit the `exercise` and return an object that was a combination of the `user` the `exercise` was for and the submitted `exercise` data.

Getting a log of exercises for a user had the requirements of accepting a `from`, `to`, and/or `limit` queries. These took a bit to figure out how to implement with `mongoose`/`mongodb`. Finally I figured out that I should have been storing my `dates` on `exercises` as actual `dates` and not `strings`. This would allow me to use `$gte` and `lte` as parameters on the `Model.find` method.
