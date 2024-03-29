# Metric-Imperial Converter

<p align="center"><img src="/Images/screenshots/screenshot-unit-converter.png" height="400" alt="Screenshot of my Metric-Imperial Converter project."/></p>

<em>Completed November 15, 2022</em>

### [Metric-Imperial Converter](https://unit-converter.sulph.repl.co/) (Click to view functional site)

[Link to files on replit](https://replit.com/@Sulph/unit-converter#tests/1_unit-tests.js)

This project took me a while to figure out how to get started. Only some of the [Quality Assurance and Testing with Chai](../1.%20Quality%20Assurance%20and%20Testing%20with%20Chai.md#quality-assurance-and-testing-with-chai) section stuck with me. As I looked up information on unit testing in JavaScript I was met with a lot of different information. `Mocha` is our test framework, and `chai` is a assertion library that can run in a number of different test frameworks, although `chai` prefers `mocha`. As I went through various parts of documentation for both `mocha` and `chai` I learned there are different methods to how you can create these tests.

The moment I started to understand was when I found this post: [The Difference Between TDD and BDD](https://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/). Basically there are different ways you can write tests. `TDD` is more of a programmatic way of doing tests, while `BDD` is more verbose or human sentence way of doing tests. The previous freeCodeCamp section, linked in the last paragraph, focused on this `TDD` method.

Both `mocha` and `chai` have different syntax you can use, which I imagine is to match these different ways of doing unit testing. `Mocha` has `describe`/`it` vs `suite`/`test`, for these `BDD`/`TDD` [interfaces](https://mochajs.org/#interfaces). Meanwhile `chai` has `expect`/`should` vs `assert` [assertion styles](https://www.chaijs.com/guide/styles/#assertion-styles).

I learned more about `regex`, as that was used several times throughout this project. I thought I was pretty capable when it came to `regex`, but I did make some mistakes here that cost me a bit of time when I tried to use some new `regex` tokens. I usually use [Regex101](https://regex101.com/) to test out my `regex`. I forgot to switch to the `JavaScript` *flavor* here and was confused when I kept getting weird results in `JavaScript`. I was trying to use `subroutines` where *Regex101* was telling me that `?n` would basically repeat the expression for the `n` capture group. In `JavaScript` I would get an error that my expression was invalid. I thought, alright, and after a bit I found that there as `\n`, which sounded similar enough to me. This was incorrect, as this only repeats the capture if it is the exact same words or numbers that were captured in the first group. So `axaxa` would match but `axbxc` would not match with the `regex` of `([a-c])x\1x\1`. It turns out `JavaScript` is missing some parts of `regex` [Using Regular Expressions with JavaScript](https://www.rexegg.com/regex-javascript.html) --- [Cannot make backreferences work as subroutines](https://stackoverflow.com/questions/50552573/reuse-capturing-group-pattern-in-js-regex/50553431#50553431).

At the end, finishing this project, I feel more comfortable writing these unit tests. I am still uncertain in how I would work this in for my own projects, or just the mindset in general of how to go about implementing unit testing. I can see three ways of doing so. Adding unit testing after you have created a function, before you create a function, or as you are creating a function. I can see some challenges with that could come up at any stage of implementation, but I do see the benefits in doing so.
