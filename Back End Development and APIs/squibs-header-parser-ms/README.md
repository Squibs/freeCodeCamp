# Request Header Parser Microservice

<p align="center"><img src="/Images/screenshots/screenshot-header-parser.png" height="400" alt="Screenshot of my Header Parser Microservice project."/></p>

<em>Completed November 4, 2022</em>

## [Request Header Parser Microservice](https://header-parser.sulph.repl.co/) (Click to view functional site)

[Link to files on replit](https://replit.com/@Sulph/header-parser#index.js)


Unfortunately I don't think I'll have much to say about this project.

Like the last project we need to handle a route, this time we are handling `/api/whoami`. This will return JSO with three key value pairs: `ipaddress` which will return the visitor's IP address, `language` which returns the natural language and locale that the client prefers, and finally `software` which returns information recording to the used application, operating system, and a few more details.

All of these can be retrieved using the `req` object. I this project off by simply `console.log`ging the `req` object and searching through the output for my IP. I then returned this information using `req.headers['x-forwarded-for']`. This was the same for the other information using: `req.headers['accept-language']` and `req.headers['user-agent']`.

This quickly ended the project, as this was accepted as solving all the user stories / requirements for this project.

I decided this was too simple and looked at the solutions other's created. Turns out `express` has the `req.get` method, which can generally do what I did above, just in a different format: `req.get('user-agent')`. I decided this is probably the better way to handle getting this information, as it is a built-in function.

Then one last change I made was retrieving the IP address in a different way. `Express` provides the `req.ip` property that contains the remote IP address of the request. However this returns the IP in the format similar to: `::fff:159.20.14.100`. To resolve this I set `app.enable('trust proxy')` so that `express` will attempt to determine the IP address of the client connected through "the front-facing proxy, or a series of proxies."
