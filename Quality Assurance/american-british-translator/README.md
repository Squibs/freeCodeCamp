# American British Translator

<p align="center"><img src="/Images/screenshots/screenshot-american-british-translator.png" height="400" alt="Screenshot of my American British Translator project."/></p>

<em>Completed November 21, 2022</em>

### [American British Translator](https://american-british-translator.sulph.repl.co/) (Click to view functional site)

[Link to files on replit](https://replit.com/@Sulph/american-british-translator#tests/1_unit-tests.js)

Figuring out a way to incorporate all the different *translations* for this project took a bit of time. I initially believed it was going to be pretty straight forward, but then I realized the method I was using to translate was not accounting for two words in sequence to equal another word or vice versa.

Initially I just split the passed string into an array and checked if each word matched the pre-defined translation object keys and replaced the word with the value of the key if it matched the word. Once I figured out there were words that were two words going to one such as "front desk" to "reception", I had to rethink how I was going to do the translations. In the end I decided to use regex along with the string method `replaceAll`. I would just iterate through the pre-defined translation object and insert each key into a new regex object similar to `/\b{wordToTranslate}\b/`. I added word boundaries as there were also similar words such as "trash" and "trashcan". This allowed me to translate words correctly.

The word boundary method wouldn't work for titles, as the period in the american title would throw it off, so I had to leave word boundaries off for those translations. This wasn't much of a problem, because none of the titles would match in the way "trash" and "trashcan" does in the `replaceAll` method. Finally I had to handle times, and that was as simple as going back to breaking the string to translate into an array again and test if each word matches `/\b\d+:\d+\b/` and replacing the `:` with a `.`.

After further testing and making the unit tests. I found out my `/\b{wordToTranslate}\b/` regex test worked for almost everything, but another case of two words in succession kept this from working completely. Translating the word `chippy` to american english `fish-and-chip shop` would trigger another translation of `chip shop` and cause an issue of the word `chippy` to translate to `fish-and-fish-and-chip shop`. I had to find another solution and came up with using a negative lookahead with a negative lookbehind. `(?<![\\w-]){word}(?![\\w-])` finally gave me the results I was looking for. This would work with titles as well, because I am no longer looking for a word boundary and instead making sure there is no connecting word or hyphen behind or ahead of the word I'm translating.

I did have repeated code between the two different translation methods *british to american* and *american to british* and could have used several ternary operators to fix this, however I felt keeping them separate would allow for further modification to translations going one way or another that might be more unique to one another. On-top-of keeping it more readable and easier to debug instead of figuring out where switching between one translation and another went wrong.
