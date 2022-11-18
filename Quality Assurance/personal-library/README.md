# Personal Library

<p align="center"><img src="/Images/screenshots/screenshot-personal-library.png" height="400" alt="Screenshot of my Personal Library project."/></p>

<em>Completed November 18, 2022</em>

### [Personal Library](https://personal-library.sulph.repl.co/) (Click to view functional site)

[Link to files on replit](https://replit.com/@Sulph/personal-library#tests/2_functional-tests.js)

This project is very comparable to the previous projects. In this project we have to handle the routes `/api/book` which returns a list of all the books and the comments for that book and the route `api/book/{book_id}` which retrieves a single book and it's comments. There is not a whole lot to say about this project that would be any different from the previous two.

I made use of the `deleteMany` model method in this project. This can find matching database objects with the given parameters, then deletes any that match. This can be used to delete all comments that are specific to one book, if that one book is to be deleted. I also used it for the `delete all books...` button, to remove all books and again all comments when the button is pressed.

Like the previous challenge I had to end up converting the `mongoose` objects into normal JavaScript objects. This time I used `JSON.parse(JSON.stringify(data))` to do the conversion several times, as there are many of the `mongoose` objects returned in an array. `toObject()` or `toJSON()` would be less helpful in this situation, and stringifying and parsing the data seemed like a much better solution compared to iterating over the array and converting each object.
