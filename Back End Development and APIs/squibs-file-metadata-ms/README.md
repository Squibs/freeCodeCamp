# File Metadata Microservice

<p align="center"><img src="/Images/screenshots/screenshot-file-metadata.png" height="400" alt="Screenshot of my File Metadata Microservice project."/></p>

<em>Completed November 5, 2022</em>

## [Exercise Tracker](https://file-metadata-ms.sulph.repl.co/) (Click to view functional site)

[Link to files on replit](https://replit.com/@Sulph/file-metadata-ms#index.js)


This project should probably have come before the previous one, or just earlier in general. There was not a whole lot to it. freeCodeCamp recommends using the `multer` package to handle file uploads. `multer` adds a `body` object like `body-parser` does, as well as a `file` or `files` object to the `request` object in `express`.

Everything was already in place for the use of this package, I just had to add it in the `package.json` so `replit` would install it. The `multer` instructions says to not forget to include `multipart/form-data` as an `enctype` on our form. This led me to finding out there are different encryption types for forms. `multipart/form-data` is typically used when there is a file upload as part of a form, and `application/x-www-form-urlencoded` is generally used otherwise. `multer` also requires a name field on the `type="file"` `input` element.

Then getting the file details in `express` is as simple as handling the `POST` request from the form and using the `request` object to access the file's information through the `multer` provided `req.file.property`.

I figured this project was over too quickly so I spent some time looking into limiting the file upload size, as that is probably an important thing to have when dealing with uploaded files. `multer` provides a few options when you declare its `upload` variable. I added `{ limits: { fileSize: 1048576, fieldNameSize: 300 } }`, which limits file size to about `1MB` and the filename `300 bytes`.

It's also important to not include the `dest` / `storage` options for `multer` here, as that will write the files to the sever, and we don't want to do that at the moment, `replit` does limit the size of each virtual machine / project, so technically you could have files be written for a little while if you wanted. I decided this was probably not a good option, and leave out the `dest` / `storage` option so the file just stays in memory.
