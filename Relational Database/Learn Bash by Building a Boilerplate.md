# Learn Bash by Building a Boilerplate

[(copy of repo made throughout this challenge)](./Learn%20Bash%20by%20Building%20a%20Boilerplate)

---

List of Sections:

<!-- TOC -->

- [Open Terminal](#open-terminal)
- [pwd Command](#pwd-command)
- [ls Command](#ls-command)
- [cd Command](#cd-command)
- [freeCodeCamp Folder](#freecodecamp-folder)
- [Change to test directory](#change-to-test-directory)
- [more Command](#more-command)
- [clear Command](#clear-command)
- [Check out node_modules](#check-out-node_modules)
- [Using Flags](#using-flags)
- [Switch to the has Folder](#switch-to-the-has-folder)
- [Check out the src directory](#check-out-the-src-directory)
- [Making a website boilerplate](#making-a-website-boilerplate)
- [echo Command](#echo-command)
- [touch Command](#touch-command)
- [cp Command](#cp-command)
- [rm Command](#rm-command)
- [mv Command](#mv-command)
- [find Command](#find-command)
- [find a file](#find-a-file)
- [rmdir Command](#rmdir-command)
- [Wrapping up the boilerplate](#wrapping-up-the-boilerplate)
- [exit Command](#exit-command)

<!-- /TOC -->

---

## Open Terminal

In-browser, embedded, [CodeAlly](https://app.codeally.io/) hosted, VSCode IDE for freeCodeCamp tutorials.

Open terminal type `echo hello terminal`.

---

## pwd Command

`pwd` stands for "print working directory". Typing `pwd` into the terminal lists the current / full directory the terminal is in.

```console
codeally@2ba2c617bc8a:~/project$ pwd
/home/codeally/project
```

This is in the `project` folder which is in the `CodeAlly` folder, which is in the `home` folder.

---

## ls Command

`ls` stands for "list". Typing `ls` into the terminal lists everything in the current folder.

```console
codeally@2ba2c617bc8a:~/project$ ls
freeCodeCamp  learn-bash-by-building-a-boilerplate
codeally@2ba2c617bc8a:~/project$ 
```

There is two folders inside this folder (the `project` folder), which are the `freeCodeCamp` and `learn-bash-by-building-a-boilerplate` folders.

---

## cd Command

`cd` stands for "change directory". You can use the `cd` command by typing the name of the folder afterwards in which you wish to go into `cd <folder_name>`.

```console
codeally@2ba2c617bc8a:~/project$ cd freeCodeCamp/
codeally@2ba2c617bc8a:~/project/freeCodeCamp$ pwd
/home/codeally/project/freeCodeCamp
```

We are now in the `freeCodeCamp` folder, which is in the `project` folder that we were in previously.

---

## freeCodeCamp Folder

```console
codeally@2ba2c617bc8a:~/project/freeCodeCamp$ ls
node_modules  package.json  package-lock.json  reset.sh  setup.sh  test
```

We can see there are two folders and three files inside the `freeCodeCamp` folder. Folders are blue and the files include their extension.

---

## Change to test directory

```console
codeally@2ba2c617bc8a:~/project/freeCodeCamp$ cd test/
codeally@2ba2c617bc8a:~/project/freeCodeCamp/test$ pwd
/home/codeally/project/freeCodeCamp/test
codeally@2ba2c617bc8a:~/project/freeCodeCamp/test$ ls
1000.test.js  1070.test.js  1150.test.js  1240.test.js  1315.test.js  1405.test.js  1470.test.js  170.test.js  210.test.js  300.test.js  390.test.js  480.test.js  570.test.js  640.test.js  730.test.js  850.test.js  940.test.js
100.test.js   1080.test.js  1170.test.js  1250.test.js  1320.test.js  140.test.js   1475.test.js  180.test.js  220.test.js  30.test.js   400.test.js  490.test.js  580.test.js  650.test.js  740.test.js  860.test.js  950.test.js
1010.test.js  1090.test.js  1190.test.js  1260.test.js  1330.test.js  1410.test.js  1480.test.js  181.test.js  230.test.js  310.test.js  40.test.js   500.test.js  585.test.js  660.test.js  750.test.js  870.test.js  960.test.js
1020.test.js  10.test.js    1195.test.js  1270.test.js  1340.test.js  1415.test.js  1490.test.js  182.test.js  240.test.js  320.test.js  410.test.js  50.test.js   590.test.js  670.test.js  755.test.js  880.test.js  970.test.js
1030.test.js  1100.test.js  1200.test.js  1275.test.js  1350.test.js  1420.test.js  1500.test.js  183.test.js  250.test.js  330.test.js  420.test.js  510.test.js  5.test.js    680.test.js  760.test.js  890.test.js  980.test.js
1040.test.js  110.test.js   120.test.js   1280.test.js  1360.test.js  1430.test.js  150.test.js   184.test.js  260.test.js  340.test.js  430.test.js  520.test.js  600.test.js  690.test.js  770.test.js  900.test.js  990.test.js
1050.test.js  1110.test.js  1210.test.js  1290.test.js  1370.test.js  1440.test.js  1510.test.js  185.test.js  270.test.js  350.test.js  440.test.js  530.test.js  60.test.js   700.test.js  780.test.js  90.test.js   utils.js
1055.test.js  1120.test.js  1215.test.js  1300.test.js  1380.test.js  1445.test.js  1520.test.js  190.test.js  280.test.js  360.test.js  450.test.js  540.test.js  610.test.js  70.test.js   790.test.js  910.test.js
1060.test.js  1130.test.js  1220.test.js  130.test.js   1390.test.js  1450.test.js  1530.test.js  200.test.js  285.test.js  370.test.js  460.test.js  550.test.js  620.test.js  710.test.js  800.test.js  920.test.js
1065.test.js  1135.test.js  1230.test.js  1310.test.js  1400.test.js  1460.test.js  160.test.js   20.test.js   290.test.js  380.test.js  470.test.js  560.test.js  630.test.js  720.test.js  80.test.js   930.test.js
```

There's no more folders in this directory, just a lot of files. You can use the command `cd ..` to go back one folder level.

```console
codeally@2ba2c617bc8a:~/project/freeCodeCamp/test$ cd ..
codeally@2ba2c617bc8a:~/project/freeCodeCamp$ ls
node_modules  package.json  package-lock.json  reset.sh  setup.sh  test
```

---

## more Command

You can see what is in a file with the `more <filename>` command.

```console
codeally@2ba2c617bc8a:~/project/freeCodeCamp$ more package.json
{
  "name": "freecodecamp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "programmatic-test": "mocha --config .mocharc.json",
    "test": "mocha --config .mocharc.json"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "mocha": "^7.2.0",
    "mocha-tap-reporter": "^0.1.3",
    "shell-quote": "^1.7.2"
  }
}
```

It looks like the `package.json` file is a JSON object.

---

## clear Command

The terminal can be cleared through the use of the `clear` command.

```console
codeally@2ba2c617bc8a:~/project/freeCodeCamp$ ls
node_modules  package.json  package-lock.json  reset.sh  setup.sh  test
codeally@2ba2c617bc8a:~/project/freeCodeCamp$ more package.json
{
  "name": "freecodecamp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "programmatic-test": "mocha --config .mocharc.json",
    "test": "mocha --config .mocharc.json"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "mocha": "^7.2.0",
    "mocha-tap-reporter": "^0.1.3",
    "shell-quote": "^1.7.2"
  }
}
codeally@2ba2c617bc8a:~/project/freeCodeCamp$ clear
```

```console
codeally@2ba2c617bc8a:~/project/freeCodeCamp$ 
```

---

## Check out node_modules

```console
codeally@2ba2c617bc8a:~/project/freeCodeCamp$ cd node_modules/
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules$ ls
ansi-colors        camelcase          diff                  function-bind    inherits                 is-regex     mocha-tap-reporter                path-is-absolute       shell-quote                 which-module
ansi-regex         chalk              emoji-regex           get-caller-file  is-binary-path           is-symbol    ms                                picomatch              sprintf-js                  wide-align
ansi-styles        chokidar           es-abstract           glob             is-buffer                js-yaml      node-environment-flags            p-limit                string.prototype.trimend    wrap-ansi
anymatch           cliui              escape-string-regexp  glob-parent      is-callable              locate-path  normalize-path                    p-locate               string.prototype.trimstart  wrappy
argparse           color-convert      esprima               growl            is-date-object           lodash       object.assign                     p-try                  string-width                y18n
balanced-match     color-name         es-to-primitive       has              isexe                    log-symbols  object.getownpropertydescriptors  readdirp               strip-ansi                  yargs
binary-extensions  concat-map         fill-range            has-flag         is-extglob               minimatch    object-inspect                    require-directory      strip-json-comments         yargs-parser
brace-expansion    debug              find-up               has-symbols      is-fullwidth-code-point  minimist     object-keys                       require-main-filename  supports-color              yargs-unparser
braces             decamelize         flat                  he               is-glob                  mkdirp       once                              semver                 to-regex-range
browser-stdout     define-properties  fs.realpath           inflight         is-number                mocha        path-exists                       set-blocking           which
```

There's a lot of folders inside of the `node_modules` folder.

---

## Using Flags

You can add a **flag** to a command to use it in a different way. The `list` command can accept different flags in the format `ls <flag>`. To list the contents of the `node_modules` folder in "long list format" add the `-l` flag to the `ls` command.

```console
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules$ ls -l
total 408
drwxr-sr-x  3 codeally strove  4096 Oct 25 12:04 ansi-colors
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 ansi-regex
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 ansi-styles
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 anymatch
drwxr-sr-x  3 codeally strove  4096 Oct 25 12:04 argparse
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 balanced-match
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 binary-extensions
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 brace-expansion
drwxr-sr-x  3 codeally strove  4096 Oct 25 12:04 braces
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 browser-stdout
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 camelcase
drwxr-sr-x  4 codeally strove  4096 Oct 25 12:04 chalk
drwxr-sr-x  4 codeally strove  4096 Oct 25 12:04 chokidar
drwxr-sr-x  3 codeally strove  4096 Oct 25 12:04 cliui
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 color-convert
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 color-name
drwxr-sr-x  4 codeally strove  4096 Oct 25 12:04 concat-map
drwxr-sr-x  4 codeally strove  4096 Oct 25 12:04 debug
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 decamelize
drwxr-sr-x  3 codeally strove  4096 Oct 25 12:04 define-properties
drwxr-sr-x  4 codeally strove  4096 Oct 25 12:04 diff
drwxr-sr-x  3 codeally strove  4096 Oct 25 12:04 emoji-regex
drwxr-sr-x 12 codeally strove  4096 Oct 25 12:04 es-abstract
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 escape-string-regexp
drwxr-sr-x  4 codeally strove  4096 Oct 25 12:04 esprima
drwxr-sr-x  5 codeally strove  4096 Oct 25 12:04 es-to-primitive
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 fill-range
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 find-up
drwxr-sr-x  3 codeally strove  4096 Oct 25 12:04 flat
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 fs.realpath
drwxr-sr-x  3 codeally strove  4096 Oct 25 12:04 function-bind
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 get-caller-file
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 glob
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 glob-parent
drwxr-sr-x  3 codeally strove  4096 Oct 25 12:04 growl
drwxr-sr-x  4 codeally strove  4096 Oct 25 12:04 has
drwxr-sr-x  2 codeally strove  4096 Oct 25 12:04 has-flag
drwxr-sr-x  4 codeally strove  4096 Oct 25 12:04 has-symbols
drwxr-sr-x  4 codeally strove  4096 Oct 25 12:04 he
...
```

This is showing more details about each item within the folder.

---

## Switch to the has Folder

````console
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules$ cd has
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules/has$ ls
LICENSE-MIT  package.json  README.md  src  test
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules/has$ more README.md
# has

> Object.prototype.hasOwnProperty.call shortcut

## Installation

```sh
npm install --save has
```

## Usage

```js
var has = require('has');

has({}, 'hasOwnProperty'); // false
has(Object.prototype, 'hasOwnProperty'); // true
```
````

Looks like `README.md` isn't much of interest. Lets check out the "license" file that has not extension.

```console
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules/has$ ls
LICENSE-MIT  package.json  README.md  src  test
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules/has$ more LICENSE-MIT 
Copyright (c) 2013 Thiago de Arruda

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules/has$ clear
```

That's a license alright.

---

## Check out the src directory

```console
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules/has$ ls
LICENSE-MIT  package.json  README.md  src  test
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules/has$ cd src
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules/has/src$ pwd
/home/codeally/project/freeCodeCamp/node_modules/has/src
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules/has/src$ ls
index.js
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules/has/src$ more index.js 
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
```

There's just a bit of JavaScript here. Lets go back to the `has` folder. Then back to the `node_modules` folder.

```console
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules/has/src$ cd ..
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules/has$ cd ..
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules$ 
```

You can go back two folders at once with `cd ../..`. Let's go back to the `project` directory.

```console
codeally@2ba2c617bc8a:~/project/freeCodeCamp/node_modules$ cd ../..
codeally@2ba2c617bc8a:~/project$ 
```

---

## Making a website boilerplate

We will be making a website boilerplate throughout the rest of this challenge. A new folder can be made with the `mkdir <folder_name>` command. `mkdir` stands for "make directory". Make a `website` directory inside the `project` folder. "Directory" and "folder" mean the same thing.


```console
codeally@2ba2c617bc8a:~/project$ mkdir website
codeally@2ba2c617bc8a:~/project$ ls
freeCodeCamp  learn-bash-by-building-a-boilerplate  website
codeally@2ba2c617bc8a:~/project$ cd website
codeally@2ba2c617bc8a:~/project/website$ ls
codeally@2ba2c617bc8a:~/project/website$ 
```

Since this is a new directory with no files or folders inside of it, the `ls` command lists nothing.

---

## echo Command

The `echo` command lets you print anything to the terminal. Print `hello website` to the terminal.

```console
codeally@2ba2c617bc8a:~/project/website$ echo hello website
hello website
```

---

## touch Command

Websites typically have an `index.html` file. The `touch <filename>` command can be used to create a new file.

```console
codeally@2ba2c617bc8a:~/project/website$ touch index.html
codeally@2ba2c617bc8a:~/project/website$ touch styles.css
codeally@2ba2c617bc8a:~/project/website$ ls
index.html  styles.css
```

Make some more files.

```console
codeally@2ba2c617bc8a:~/project/website$ touch index.js
codeally@2ba2c617bc8a:~/project/website$ touch .gitignore
codeally@2ba2c617bc8a:~/project/website$ ls
index.html  index.js  styles.css
```

Where's the `.gitignore` file, it is not listed? It is hidden. Many commands have a `--help` flag to show what the command can do. Display the "help" menu for the `ls command`.

```console
codeally@2ba2c617bc8a:~/project/website$ ls --help
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).
Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.

Mandatory arguments to long options are mandatory for short options too.
  -a, --all                  do not ignore entries starting with .
  -A, --almost-all           do not list implied . and ..
      --author               with -l, print the author of each file
  -b, --escape               print C-style escapes for nongraphic characters
      --block-size=SIZE      with -l, scale sizes by SIZE when printing them;
                               e.g., '--block-size=M'; see SIZE format below
  -B, --ignore-backups       do not list implied entries ending with ~
...
```

Let's list all the files, so we can see the hidden files.

```console
codeally@2ba2c617bc8a:~/project/website$ ls -a
.  ..  .gitignore  index.html  index.js  styles.css
```

There's the missing `.gitignore` file from before. What are these `.` and `..` directories?

```console
codeally@2ba2c617bc8a:~/project/website$ cd .
codeally@2ba2c617bc8a:~/project/website$ 
```

This didn't take you anywhere the `.` stands for the file you are in, and the `..` was used before to go up a directory.

Let's create some more files.

```console
codeally@2ba2c617bc8a:~/project/website$ touch background.jpg
codeally@2ba2c617bc8a:~/project/website$ touch header.png
codeally@2ba2c617bc8a:~/project/website$ touch footer.jpeg
codeally@2ba2c617bc8a:~/project/website$ ls
background.jpg  footer.jpeg  header.png  index.html  index.js  styles.css
```

Looks like images show up in pink. Let's create some fonts.

```console
codeally@2ba2c617bc8a:~/project/website$ touch roboto.font
codeally@2ba2c617bc8a:~/project/website$ touch lato.font
codeally@2ba2c617bc8a:~/project/website$ touch menlo.font
codeally@2ba2c617bc8a:~/project/website$ ls
background.jpg  footer.jpeg  header.png  index.html  index.js  lato.font  menlo.font  roboto.font  styles.css
```

Create some icons.

```console
codeally@2ba2c617bc8a:~/project/website$ touch CodeAlly.svg
codeally@2ba2c617bc8a:~/project/website$ touch CodeRoad.svg
codeally@2ba2c617bc8a:~/project/website$ touch freeCodeCamp.svg
codeally@2ba2c617bc8a:~/project/website$ ls
background.jpg  CodeAlly.svg  CodeRoad.svg  footer.jpeg  freeCodeCamp.svg  header.png  index.html  index.js  lato.font  menlo.font  roboto.font  styles.css
```

The icons are pink as well.

---

## cp Command

Images should go into a different folder. Let's make a new folder for them.

```console
codeally@2ba2c617bc8a:~/project/website$ mkdir images
codeally@2ba2c617bc8a:~/project/website$ ls
background.jpg  CodeAlly.svg  CodeRoad.svg  footer.jpeg  freeCodeCamp.svg  header.png  images  index.html  index.js  lato.font  menlo.font  roboto.font  styles.css
```

The `cp` command stands for "copy". You can copy a file with `cp <file> <destination>`. Copy `background.jpg` to the `images` folder.

```console
codeally@2ba2c617bc8a:~/project/website$ cp background.jpg images/
codeally@2ba2c617bc8a:~/project/website$ cd images/
codeally@2ba2c617bc8a:~/project/website/images$ ls
background.jpg
```

---

## rm Command

You don't need the original `background.jpg` anymore. Remove it with the `rm <filename>` command.

```console
codeally@2ba2c617bc8a:~/project/website/images$ cd ..
codeally@2ba2c617bc8a:~/project/website$ ls
background.jpg  CodeAlly.svg  CodeRoad.svg  footer.jpeg  freeCodeCamp.svg  header.png  images  index.html  index.js  lato.font  menlo.font  roboto.font  styles.css
codeally@2ba2c617bc8a:~/project/website$ rm background.jpg 
codeally@2ba2c617bc8a:~/project/website$ ls
CodeAlly.svg  CodeRoad.svg  footer.jpeg  freeCodeCamp.svg  header.png  images  index.html  index.js  lato.font  menlo.font  roboto.font  styles.css
```

Let's copy the `header.png` to the `images` folder.

```console
codeally@2ba2c617bc8a:~/project/website$ cp header.png images/
codeally@2ba2c617bc8a:~/project/website$ cp footer.jpeg images/
codeally@2ba2c617bc8a:~/project/website$ cd images/
codeally@2ba2c617bc8a:~/project/website/images$ ls
background.jpg  footer.jpeg  header.png
```

Delete the original images.

```console
codeally@2ba2c617bc8a:~/project/website/images$ cd ..
codeally@2ba2c617bc8a:~/project/website$ ls
CodeAlly.svg  CodeRoad.svg  footer.jpeg  freeCodeCamp.svg  header.png  images  index.html  index.js  lato.font  menlo.font  roboto.font  styles.css
codeally@2ba2c617bc8a:~/project/website$ rm header.png 
codeally@2ba2c617bc8a:~/project/website$ rm footer.jpeg 
codeally@2ba2c617bc8a:~/project/website$ ls
CodeAlly.svg  CodeRoad.svg  freeCodeCamp.svg  images  index.html  index.js  lato.font  menlo.font  roboto.font  styles.css
```

---

## mv Command

There was a mistake with the extensions for the font files. You can rename them with the `mv <filename> <new_filename>` command. `mv` stands for "move". This command can be used to move or rename something.

```console
codeally@2ba2c617bc8a:~/project/website$ ls
CodeAlly.svg  CodeRoad.svg  freeCodeCamp.svg  images  index.html  index.js  lato.font  menlo.font  roboto.font  styles.css
codeally@2ba2c617bc8a:~/project/website$ mv roboto.font roboto.woff
codeally@2ba2c617bc8a:~/project/website$ ls
CodeAlly.svg  CodeRoad.svg  freeCodeCamp.svg  images  index.html  index.js  lato.font  menlo.font  roboto.woff  styles.css
```

Rename other fonts.

```console
codeally@2ba2c617bc8a:~/project/website$ mv lato.font lato.ttf
codeally@2ba2c617bc8a:~/project/website$ mv menlo.font menlo.otf
codeally@2ba2c617bc8a:~/project/website$ ls
CodeAlly.svg  CodeRoad.svg  freeCodeCamp.svg  images  index.html  index.js  lato.ttf  menlo.otf  roboto.woff  styles.css
```

Make a fonts directory.

```console
codeally@2ba2c617bc8a:~/project/website$ mkdir fonts
codeally@2ba2c617bc8a:~/project/website$ ls
CodeAlly.svg  CodeRoad.svg  fonts  freeCodeCamp.svg  images  index.html  index.js  lato.ttf  menlo.otf  roboto.woff  styles.css
codeally@2ba2c617bc8a:~/project/website$ mv roboto.woff fonts/
```

---

## find Command

You can use `find` to find things or view a file tree.

```console
codeally@2ba2c617bc8a:~/project/website$ find
.
./fonts
./fonts/roboto.woff
./CodeAlly.svg
./CodeRoad.svg
./styles.css
./freeCodeCamp.svg
./images
./images/header.png
./images/background.jpg
./images/footer.jpeg
./index.js
./index.html
./menlo.otf
./.gitignore
./lato.ttf
```

We can see that the `roboto.woff` font moved to the `./fonts` folder. Move the `lato.ttf` font to the `fonts` folder.


```console
codeally@2ba2c617bc8a:~/project/website$ mv lato.ttf fonts/
codeally@2ba2c617bc8a:~/project/website$ mv menlo.otf fonts/
codeally@2ba2c617bc8a:~/project/website$ find
.
./fonts
./fonts/roboto.woff
./fonts/menlo.otf
./fonts/lato.ttf
./CodeAlly.svg
./CodeRoad.svg
./styles.css
./freeCodeCamp.svg
./images
./images/header.png
./images/background.jpg
./images/footer.jpeg
./index.js
./index.html
./.gitignore
```

Organize these files more by making a `client` directory. You can make another folder within the `client` directory without moving into it by adding it to the path like this `mkdir client/<new_folder_name>`.


```console
codeally@2ba2c617bc8a:~/project/website$ mkdir client
codeally@2ba2c617bc8a:~/project/website$ mkdir client/src
codeally@2ba2c617bc8a:~/project/website$ mv index.html client/src
codeally@2ba2c617bc8a:~/project/website$ find
.
./client
./client/src
./client/src/index.html
./fonts
./fonts/roboto.woff
./fonts/menlo.otf
./fonts/lato.ttf
./CodeAlly.svg
./CodeRoad.svg
./styles.css
./freeCodeCamp.svg
./images
./images/header.png
./images/background.jpg
./images/footer.jpeg
./index.js
./.gitignore
```

Move some more files.

```console
codeally@2ba2c617bc8a:~/project/website$ mv index.js client/src
codeally@2ba2c617bc8a:~/project/website$ mv styles.css client/src
codeally@2ba2c617bc8a:~/project/website$ find
.
./client
./client/src
./client/src/styles.css
./client/src/index.js
./client/src/index.html
./fonts
./fonts/roboto.woff
./fonts/menlo.otf
./fonts/lato.ttf
./CodeAlly.svg
./CodeRoad.svg
./freeCodeCamp.svg
./images
./images/header.png
./images/background.jpg
./images/footer.jpeg
./.gitignore
```

You can use `find <folder_name>` to display the tree of a different folder.

```console
codeally@2ba2c617bc8a:~/project/website$ find client
client
client/src
client/src/styles.css
client/src/index.js
client/src/index.html
```

Find out what else the `find` command can do.

```console
codeally@2ba2c617bc8a:~/project/website$ find --help
Usage: find [-H] [-L] [-P] [-Olevel] [-D debugopts] [path...] [expression]

default path is the current directory; default expression is -print
expression may consist of: operators, options, tests, and actions:
operators (decreasing precedence; -and is implicit where no others are given):
      ( EXPR )   ! EXPR   -not EXPR   EXPR1 -a EXPR2   EXPR1 -and EXPR2
      EXPR1 -o EXPR2   EXPR1 -or EXPR2   EXPR1 , EXPR2
positional options (always true): -daystart -follow -regextype

normal options (always true, specified before other expressions):
      -depth --help -maxdepth LEVELS -mindepth LEVELS -mount -noleaf
      --version -xdev -ignore_readdir_race -noignore_readdir_race
tests (N can be +N or -N or N): -amin N -anewer FILE -atime N -cmin N
      -cnewer FILE -ctime N -empty -false -fstype TYPE -gid N -group NAME
      -ilname PATTERN -iname PATTERN -inum N -iwholename PATTERN -iregex PATTERN
      -links N -lname PATTERN -mmin N -mtime N -name PATTERN -newer FILE
      -nouser -nogroup -path PATTERN -perm [-/]MODE -regex PATTERN
      -readable -writable -executable
      -wholename PATTERN -size N[bcwkMG] -true -type [bcdpflsD] -uid N
      -used N -user NAME -xtype [bcdpfls]      -context CONTEXT

actions: -delete -print0 -printf FORMAT -fprintf FILE FORMAT -print 
      -fprint0 FILE -fprint FILE -ls -fls FILE -prune -quit
      -exec COMMAND ; -exec COMMAND {} + -ok COMMAND ;
      -execdir COMMAND ; -execdir COMMAND {} + -okdir COMMAND ;

Valid arguments for -D:
exec, opt, rates, search, stat, time, tree, all, help
Use '-D help' for a description of the options, or see find(1)

Please see also the documentation at http://www.gnu.org/software/findutils/.
You can report (and track progress on fixing) bugs in the "find"
program via the GNU findutils bug-reporting page at
https://savannah.gnu.org/bugs/?group=findutils or, if
you have no web access, by sending email to <bug-findutils@gnu.org>.
```

## find a file

The use of the `-name` flag on the `find` command lets you search for something with a given name.

```console
codeally@2ba2c617bc8a:~/project/website$ find -name index.html
./client/src/index.html
```

Find `styles.css`.

```console
codeally@2ba2c617bc8a:~/project/website$ find -name styles.css
./client/src/styles.css
```

Folders can also be found with this command.

```console
codeally@2ba2c617bc8a:~/project/website$ find -name src
./client/src
```

Consolidate all assets in one spot.

```console
codeally@2ba2c617bc8a:~/project/website$ cd client
codeally@2ba2c617bc8a:~/project/website/client$ mkdir assets
codeally@2ba2c617bc8a:~/project/website/client$ cd assets
codeally@2ba2c617bc8a:~/project/website/client/assets$ mkdir images
codeally@2ba2c617bc8a:~/project/website/client/assets$ cd images
codeally@2ba2c617bc8a:~/project/website/client/assets/images$ touch background.jpg
```

We can just move the assets here instead of remaking them.

```console
codeally@2ba2c617bc8a:~/project/website/client/assets/images$ cd ../../..
codeally@2ba2c617bc8a:~/project/website$ cd images
codeally@2ba2c617bc8a:~/project/website/images$ ls
background.jpg  footer.jpeg  header.png
```

Move them back to the website folder first.

```console
codeally@2ba2c617bc8a:~/project/website/images$ mv header.png ..
codeally@2ba2c617bc8a:~/project/website/images$ ls
background.jpg  footer.jpeg
codeally@2ba2c617bc8a:~/project/website/images$ cd ..
codeally@2ba2c617bc8a:~/project/website$ ls
client  CodeAlly.svg  CodeRoad.svg  fonts  freeCodeCamp.svg  header.png  images
codeally@2ba2c617bc8a:~/project/website$ find -name images
./client/assets/images
./images
codeally@2ba2c617bc8a:~/project/website$ mv header.png client/assets/images/
codeally@2ba2c617bc8a:~/project/website$ find -name header.png
./client/assets/images/header.png
```

You can move the other images from here.

```console
codeally@2ba2c617bc8a:~/project/website$ mv images/footer.jpeg client/assets/images/
codeally@2ba2c617bc8a:~/project/website$ find
.
./client
./client/src
./client/src/styles.css
./client/src/index.js
./client/src/index.html
./client/assets
./client/assets/images
./client/assets/images/header.png
./client/assets/images/background.jpg
./client/assets/images/footer.jpeg
./fonts
./fonts/roboto.woff
./fonts/menlo.otf
./fonts/lato.ttf
./CodeAlly.svg
./CodeRoad.svg
./freeCodeCamp.svg
./images
./images/background.jpg
./.gitignore
```

---

## rmdir Command

You can use the `rmdir <directory_name>` command to remove a folder. `rmdir` stands for "remove directory."

```console
codeally@2ba2c617bc8a:~/project/website$ rmdir ./images
rmdir: failed to remove './images': Directory not empty
```

`rmdir` did not remove the folder as it is not empty. Remove the image inside it.

```console
codeally@2ba2c617bc8a:~/project/website$ rm images/background.jpg 
codeally@2ba2c617bc8a:~/project/website$ rmdir images/
codeally@2ba2c617bc8a:~/project/website$ ls
client  CodeAlly.svg  CodeRoad.svg  fonts  freeCodeCamp.svg
```

Make a `icons` folder inside the `./client/assets/` folder without moving into it first.

```console
codeally@2ba2c617bc8a:~/project/website$ mkdir client/assets/icons
```

Move some files.

```console
codeally@2ba2c617bc8a:~/project/website$ mv CodeAlly.svg client/assets/icons/
codeally@2ba2c617bc8a:~/project/website$ mv CodeRoad.svg client/assets/icons/
codeally@2ba2c617bc8a:~/project/website$ mv freeCodeCamp.svg client/assets/icons/
codeally@2ba2c617bc8a:~/project/website$ find
.
./client
./client/src
./client/src/styles.css
./client/src/index.js
./client/src/index.html
./client/assets
./client/assets/icons
./client/assets/icons/CodeAlly.svg
./client/assets/icons/CodeRoad.svg
./client/assets/icons/freeCodeCamp.svg
./client/assets/images
./client/assets/images/header.png
./client/assets/images/background.jpg
./client/assets/images/footer.jpeg
./fonts
./fonts/roboto.woff
./fonts/menlo.otf
./fonts/lato.ttf
./icons
./.gitignore
```

Make a fonts folder and create fonts there.

```console
codeally@2ba2c617bc8a:~/project/website$ mkdir client/assets/fonts
codeally@2ba2c617bc8a:~/project/website$ touch client/assets/fonts/roboto-bold.woff
codeally@2ba2c617bc8a:~/project/website$ touch client/assets/fonts/roboto-light.woff
codeally@2ba2c617bc8a:~/project/website$ touch client/assets/fonts/lato-bold.ttf
codeally@2ba2c617bc8a:~/project/website$ touch client/assets/fonts/lato-light.ttf
codeally@2ba2c617bc8a:~/project/website$ find client/assets/fonts/
client/assets/fonts/
client/assets/fonts/roboto-bold.woff
client/assets/fonts/lato-light.ttf
client/assets/fonts/lato-bold.ttf
client/assets/fonts/roboto-light.woff
```

Remove the old fonts. You can remove the fonts directory with the use of the `-r` flag to remove the files inside recursively.

```console
codeally@2ba2c617bc8a:~/project/website$ rm fonts/ -r
codeally@2ba2c617bc8a:~/project/website$ ls
client  icons
```

Removing files in this way removes them permanently so you should be **very careful when recursively removing files**. You could accidentally destroy your operating system.

## Wrapping up the boilerplate

Create a few more files for the boilerplate.

```console
codeally@2ba2c617bc8a:~/project/website$ touch package.json
codeally@2ba2c617bc8a:~/project/website$ touch server.js
codeally@2ba2c617bc8a:~/project/website$ touch README.md
codeally@2ba2c617bc8a:~/project/website$ ls
client  icons  package.json  README.md  server.js
```

You can print to a file instead of the terminal with `echo text >> filename`.

```console
codeally@2ba2c617bc8a:~/project/website$ echo I made this boilerplate >> README.md 
codeally@2ba2c617bc8a:~/project/website$ more README.md 
I made this boilerplate
```

```console
codeally@2ba2c617bc8a:~/project/website$ echo from the command line >> README.md 
codeally@2ba2c617bc8a:~/project/website$ echo for the freeCodeCamp bash lessons >> README.md 
codeally@2ba2c617bc8a:~/project/website$ more README.md 
I made this boilerplate
from the command line
for the freeCodeCamp bash lessons
```

Rename the `website` folder.

```console
codeally@2ba2c617bc8a:~/project/website$ cd ..
codeally@2ba2c617bc8a:~/project$ ls
freeCodeCamp  learn-bash-by-building-a-boilerplate  website
codeally@2ba2c617bc8a:~/project$ mv website website-boilerplate
codeally@2ba2c617bc8a:~/project$ ls
freeCodeCamp  learn-bash-by-building-a-boilerplate  website-boilerplate
```

Copy whole boilerplate.

```console
codeally@2ba2c617bc8a:~/project$ ls
freeCodeCamp  learn-bash-by-building-a-boilerplate  website-boilerplate
codeally@2ba2c617bc8a:~/project$ cp website-boilerplate/ ./toms-website -r
codeally@2ba2c617bc8a:~/project$ ls
freeCodeCamp  learn-bash-by-building-a-boilerplate  toms-website  website-boilerplate
```

## exit Command

The `exit` command can be used to exit the terminal.
