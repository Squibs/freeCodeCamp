# Timestamp Microservice

<p align="center"><img src="/Images/screenshots/screenshot-timestamp-microservice.png" height="400" alt="Screenshot of my Timestamp Microservice project."/></p>

<em>Completed November 3, 2022</em>

### [Timestamp Microservice](https://timestamp.sulph.repl.co/) (Click to view functional site)

[Link to files on replit](https://replit.com/@Sulph/timestamp#index.js)

The first *Back End Development and APIs Project* I completed for freeCodeCamp. This entire section of freeCodeCamp seemed to be quite short lesson wise. There was only a total of 34 lessons, before the projects were the only thing left to do.

This project reminded me of how much of a hassle it is to work with `Date` objects. In the future I will more than likely use a JavaScript library to hopefully make working with them a whole lot easier.

For this project we had to handle two different api routes: `/api` and `/api/:date`. Both return the same JSON object of format `{ "unix" : 1451001600000, "utc" : "Fri, 25 Dec 2015 00:00:00 GMT" }`. If no valid date is passed as a parameter we simply return `{ "error": "Invalid Date" }`.

The `/api` route was fairly straight forward, we just return the current time in both `unix` and `utc` formats. Just make a new `Date` and use the `Date.getTime()` method for `unix` and the `Date.toUTCString()` method for `utc`.

The `/api/:date` route was where the project got slightly tricky. We needed to handle any valid date string, which means we need to figure out a way to see if a string can become a valid date. I opted to right-away convert the string to a date object and store it. I then test if the string is just numbers with `regex` and if it is cast the string to a `Number` and overwrite the previously stored date object with a new date object. Finally I test if the date object is valid, and if not return the appropriate error JSON.

### Required *User Stories* for this project

- You should provide your own project, not the example URL.
- A request to `/api/:date?` with a valid date should return a JSON object with a `unix` key that is a Unix timestamp of the input date in milliseconds (as type Number)
- A request to `/api/:date?` with a valid date should return a JSON object with a `utc` key that is a string of the input date in the format: `Thu, 01 Jan 1970 00:00:00 GMT`
- A request to `/api/1451001600000` should return `{ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }`
- Your project can handle dates that can be successfully parsed by `new Date(date_string)`
- If the input date string is invalid, the api returns an object having the structure `{ error : "Invalid Date" }`
- An empty date parameter should return the current time in a JSON object with a `unix` key
- An empty date parameter should return the current time in a JSON object with a `utc` key
