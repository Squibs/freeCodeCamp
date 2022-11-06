# URL Shortener Microservice

<p align="center"><img src="/Images/screenshots/screenshot-url-shortener.png" height="400" alt="Screenshot of my URL Shortener Microservice project."/></p>

<em>Completed November 4, 2022</em>

## [URL Shortener Microservice](https://url-shortener.sulph.repl.co/) (Click to view functional site)

[Link to files on replit](https://replit.com/@Sulph/url-shortener#index.js)

This project was more like how I thought the rest of these project might have been, so it was slightly rough to get started. The previous projects provided everything you needed to get going, and this one only provided some of it.

To start off I added `Mongoose` and `MongoDB` to the included `package.json` so these packages would be included. Probably didn't need to include `MongoDB`, as `Mongoose` would have that as a dependency, but that's okay.

For this project we need to handle two different routes. `/api/shorturl/:short` which handles redirecting to a website that has already been submitted, and `/api/shortul/` which handles `POST` requests from the form submission. Redirecting is no problem, I just used the `Model.findOne` method, and if a result is found then redirect to the site. If no site is found then respond with an error JSON object instead. Handling the POST request was where the real challenge of this project started.

The first thing to do is verify the submitted link is valid. There was a hint to use `dns.lookup(host, cb)` from the `dns` core node module. However, this is not what I did. Looking through the documentation for node's `url.parse` method, I noticed it was deprecated, which led me to finding out there is a `URL` object that you can use instead. Which eventually led me back to freeCodeCamp with the article [How to Check if a JavaScript String is a Valid URL](https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/), after I messed around with the `URL` object for a little while. I ended up using the solution of trying to store the string into a new `URL` object, and catching any errors. If there are errors, it's not a valid `URL` object, and I was able to move on from there.

The next step is determining if the submitted link already exists in the database, which I already did for the other route, so this was simple. After that if the link does not yet exist, I needed to find out how make a sequence type value on these objects I'm storing in the database, so they won't end up with the same `short_url`, and how to get that value so I can increment it for the next stored `URL`. I found the `Model.estimatedDocumentCount` method, which I feel like isn't an actual proper choice for this, but it ended up working in the end. Once I get the count, I can create and store this new `URL` object in my database with an attached `short_url` number and finally redirect the user to the response object which is their submitted `URL` and it's `short_url`.
