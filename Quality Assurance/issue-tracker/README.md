# Issue Tracker

<p align="center"><img src="/Images/screenshots/screenshot-issue-tracker.png" height="400" alt="Screenshot of my Issue Tracker project."/></p>

<em>Completed November 16, 2022</em>

### [Issue Tracker](https://issue-tracker.sulph.repl.co/) (Click to view functional site)

[Link to files on replit](https://replit.com/@Sulph/issue-tracker#tests/2_functional-tests.js)

We had to handle one route for this project. On this route there was a `get`, `post`, `put` and `delete` to handle records of `issues` for a project where the route had a `parameter` which was the project this `issue` would be assigned to. Initially I was going to create two different `collections` for this project: a `issues` collection and a `projects` collection. However I decided to keep it simple and only have one. If this project was going to go any further I would definitely separate them and add a `project_id` on each issue to relate them.

`Mongoose` does not return a normal JavaScript object. So when I make a `post` request the object the `create` method returns cannot be modified using the `delete` keyword. I have to convert this object using the `toObject` method in-order to then use the `delete` keyword to return an object that only has the properties I want. This was mainly to remove the auto generated `__v` field. There are other ways to accomplish this same thing. I could have created a new object and just assigned what I wanted in that, but I was stuck on the idea of using the `delete` keyword to learn something new. [This post](https://stackoverflow.com/questions/23342558/why-cant-i-delete-a-mongoose-models-object-properties/23372028#23372028) is what led me to the solution I was looking for.
