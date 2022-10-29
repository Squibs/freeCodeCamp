# Learn Bash Scripting by Building Five Programs

List of Sections:

<!-- TOC -->

- [Bash Scripting / Interpreters](#bash-scripting--interpreters)
- [Locate Command Location](#locate-command-location)
- [Fixing File Permissions](#fixing-file-permissions)
- [Bash variables](#bash-variables)
- [User Input](#user-input)
- [Command Help](#command-help)
- [Countdown Timer Script / Arguments](#countdown-timer-script--arguments)
- [if Statements](#if-statements)
- [Comparison Operators](#comparison-operators)
- [View Exit Status of Command](#view-exit-status-of-command)
- [Back to Countdown timer](#back-to-countdown-timer)
- [Loops](#loops)
- [More Commands / Sleep](#more-commands--sleep)
- [Multiline Comments / While loop](#multiline-comments--while-loop)
- [Bingo Script](#bingo-script)
- [Environment variables](#environment-variables)
- [More on double parentheses](#more-on-double-parentheses)
- [Double parentheses in if / else if statement](#double-parentheses-in-if--else-if-statement)
- [Fortune Teller Script](#fortune-teller-script)
- [Arrays](#arrays)
- [Functions](#functions)
- [until Command](#until-command)
- [Matching Pattern](#matching-pattern)
- [Fortune teller arguments](#fortune-teller-arguments)
- [Script Five](#script-five)
- [Command types](#command-types)

<!-- /TOC -->

---

## Bash Scripting / Interpreters

You can run commands in the terminal or put them in a file to be run as a script. The first of the five programs we are making will be a "questionnaire."

```console
codeally@c0d11ac3c363:~/project$ touch questionnaire.sh
```

```sh
# questionnaire.sh
echo hello questionnaire
```

Using `sh` to run your script uses the `shell` interpreter

```console
codeally@c0d11ac3c363:~/project$ sh questionnaire.sh
hello questionnaire
```

Using `bash` to run the script uses the `bash` interpreter.

```console
codeally@c0d11ac3c363:~/project$ bash questionnaire.sh 
hello questionnaire
```

---

## Locate Command Location

You can locate the absolute path of a command by using the `which` command.

```console
codeally@c0d11ac3c363:~/project$ which bash
/usr/bin/bash
```

You can tell your program to use this path by placing a `shebang` at the very top of the file: `#!<path_to_interpreter>`.

```sh
# questionnaire.sh
#!/bin/bash
echo hello questionnaire
```

The file/script can now be run without declaring an interpreter first (`sh` `bash`). It will default to `bash`.

```console
codeally@c0d11ac3c363:~/project$ ./questionnaire.sh
bash: ./questionnaire.sh: Permission denied
```

---

## Fixing File Permissions

List what's in the project folder in long list format with `ls -l` to see file permissions.

```console
codeally@c0d11ac3c363:~/project$ ls -l
total 8
drwxr-sr-x 3 codeally strove 4096 Oct 29 03:27 learn-bash-scripting-by-building-five-programs
-rw-r--r-- 1 codeally strove   36 Oct 29 03:38 questionnaire.sh
```

`-rw-r--r--` describes the permissions different users have with the file, except for the first character `-`. `r` means `read`, `w` means `write`, `x` means `execute`. There is no `x` permission for this file. Enter `chmod +x questionnaire.sh` to give that permission.

```console
codeally@c0d11ac3c363:~/project$ chmod +x questionnaire.sh
codeally@c0d11ac3c363:~/project$ ls -l
total 8
drwxr-sr-x 3 codeally strove 4096 Oct 29 03:27 learn-bash-scripting-by-building-five-programs
-rwxr-xr-x 1 codeally strove   36 Oct 29 03:38 questionnaire.sh
```

The `x` was added by each type of user to denote that anyone can execute the file.

```console
codeally@c0d11ac3c363:~/project$ ./questionnaire.sh
hello questionnaire
```

---

## Bash variables

Variables are declared like this: `VARIABLE_NAME=VALUE` with no spaces around the `=`. If a variable has spaces in it, double quotes must be used around it.

```sh
# questionnaire.sh
#!/bin/bash
QUESTION1="What's your name?"
```

In order to use a variable the `$` symbol must be placed in front of the variable name: `$VARIABLE_NAME`. Shell scripts run from top to bottom.

```sh
# questionnaire.sh
#!/bin/bash
QUESTION1="What's your name?"
echo $QUESTION1
```

```console
codeally@c0d11ac3c363:~/project$ ./questionnaire.sh
What's your name?
```

---

## User Input

You can accept input from a user with `read` example: `read VARIABLE_NAME`.

```sh
# questionnaire.sh
#!/bin/bash
QUESTION1="What's your name?"
echo $QUESTION1
read NAME
echo Hello $NAME.
```

```console
codeally@c0d11ac3c363:~/project$ ./questionnaire.sh
What's your name?
Zack
Hello Zack.
```

Another question.


```sh
# questionnaire.sh
#!/bin/bash
QUESTION1="What's your name?"
echo $QUESTION1
read NAME
echo Hello $NAME.
QUESTION2="Where are you from?"
echo $QUESTION2
read LOCATION
echo Hello $NAME from $LOCATION.
```

```console
codeally@c0d11ac3c363:~/project$ ./questionnaire.sh
What's your name?
Zack
Hello Zack.
Where are you from?
Colorado
Hello Zack from Colorado.
```

---

## Command Help

```console
codeally@c0d11ac3c363:~/project$ echo --help
--help
```

That command didn't work. There's another way to find information about a command, and that is with `man` which stands for `manual`.

```console
codeally@c0d11ac3c363:~/project$ man echo
big manual pops up
```

Instead of surrounding a line with empty `echo`s you can use the `-e` flag on echo to enable interpretation of backslash escapes.

```sh
# shell script
echo
echo ~~ Questionnaire ~~
echo
```

instead you can do the following, but you have to wrap the line in quotes

```sh
# shell script
echo -e  "\n~~ Questionnaire ~~\n"
```

Add onto questionnaire

```sh
# questionnaire.sh
#!/bin/bash
echo -e  "\n~~ Questionnaire ~~\n"
QUESTION1="What's your name?"
echo $QUESTION1
read NAME
echo Hello $NAME.
QUESTION2="Where are you from?"
echo $QUESTION2
read LOCATION
echo Hello $NAME from $LOCATION.
QUESTION3="What's your favorite coding website?"
echo $QUESTION3
read WEBSITE
echo -e "\nHello $NAME from $LOCATION. I learned that your favorite coding website is $WEBSITE!"
```

```console
codeally@c0d11ac3c363:~/project$ ./questionnaire.sh

~~ Questionnaire ~~

What's your name?
Zack
Hello Zack.
Where are you from?
Colorado
Hello Zack from Colorado.
What's your favorite coding website?
freeCodeCamp

Hello Zack from Colorado. I learned that your favorite coding website is freeCodeCamp!
```

---

## Countdown Timer Script / Arguments

```console
codeally@c0d11ac3c363:~/project$ touch countdown.sh
codeally@c0d11ac3c363:~/project$ chmod +x countdown.sh
```

```sh
# countdown.sh
#!/bin/bash
# Program that counts down to zero from a given argument
```

Scripts/programs can take arguments using `echo $*` will print all arguments passed to it

```sh
# countdown.sh
#!/bin/bash
# Program that counts down to zero from a given argument
echo $*
```

```console
codeally@c0d11ac3c363:~/project$ ./countdown.sh arg1 arg2 arg3
arg1 arg2 arg3
```

Individual arguments can be accessed with `$<number>`.

```sh
# countdown.sh
#!/bin/bash
# Program that counts down to zero from a given argument
echo $1
```

```console
codeally@c0d11ac3c363:~/project$ ./countdown.sh arg1 arg2 arg3
arg1
```

---

## if Statements

The `help` command lists out all the available commands and using `help <command>` can give you more detail about a command. Yet another way to get information about commands.

The `if` statement syntax is as follows:

```
if [[ CONDITION ]]
then
  STATEMENTS
fi
```

There must be spaces around the inside of the brackets and around any operators (` == `). With a closing backwards `if` -> `fi`.

```sh
# countdown.sh
#!/bin/bash
# Program that counts down to zero from a given argument
if [[ $1 == arg1 ]]
then
  echo true
fi
```

```console
codeally@c0d11ac3c363:~/project$ ./countdown.sh arg1
true
codeally@c0d11ac3c363:~/project$ ./countdown.sh arg2
codeally@c0d11ac3c363:~/project$ 
```

Else statement:

```sh
# countdown.sh
#!/bin/bash
# Program that counts down to zero from a given argument
if [[ $1 == arg1 ]]
then
  echo true
else
  echo false
fi
```

```console
codeally@c0d11ac3c363:~/project$ ./countdown.sh arg2
false
```

---

## Comparison Operators

- `-eq` (equal)
- `-ne` (not equal)
- `-lt` (less than)
- `-le` (less than or equal)
- `-gt` (greater than)
- `-ge` (greater than or equal)

```sh
# countdown.sh
#!/bin/bash
# Program that counts down to zero from a given argument
if [[ $1 -lt 5 ]]
then
  echo true
else
  echo false
fi
```

```console
codeally@c0d11ac3c363:~/project$ ./countdown.sh 4
true
codeally@c0d11ac3c363:~/project$ ./countdown.sh 5
false
```

You can also use `!`, `&&`, `||`, `==`, `!=`.

More information with `help [[ expression ]]` / `help [[` or in `help test`

---

## View Exit Status of Command

Each command has an exit status that can be access with `$?`. Running `[[ 4 -le 5 ]]` on its own appears to do nothing, but if you use `$?` after you can get the answer.

You can separate commands on a single line with `;`. `-ne` not equal.

`0` can be thought of as true, but it really means the command had zero errors.

```console
codeally@c0d11ac3c363:~/project$ [[ 4 -le 5 ]]
codeally@c0d11ac3c363:~/project$ echo $?
0
codeally@c0d11ac3c363:~/project$ [[ 4 -ge 5 ]]
codeally@c0d11ac3c363:~/project$ echo $?
1
codeally@c0d11ac3c363:~/project$ [[ 4 -ge 5 ]]; echo $?
1
codeally@c0d11ac3c363:~/project$ [[ 10 -ne 5 ]]; echo $?
0
codeally@c0d11ac3c363:~/project$ bad_command; echo $?
bash: bad_command: command not found
127
codeally@c0d11ac3c363:~/project$ ls; echo $?
countdown.sh  learn-bash-scripting-by-building-five-programs  questionnaire.sh
0
codeally@c0d11ac3c363:~/project$ [[ -x countdown.sh && 5 -le 4 ]]; echo $?
1
```

## Back to Countdown timer

```sh
# countdown.sh
#!/bin/bash
# Program that counts down to zero from a given argument
if [[ $1 -gt 0 ]]
then
  echo true
else
  echo Include a positive integer as the first argument.
fi
```

```console
codeally@c0d11ac3c363:~/project$ ./countdown.sh 1
true
codeally@c0d11ac3c363:~/project$ ./countdown.sh 
Include a positive integer as the first argument.
```

---

## Loops

The syntax for the `for` loop, from the `help` menu is

```
for (( i = 10; i > 0; i-- ))
do
  echo $i
done
```

Creates a variable called `i` can be accessed with `$i`. Looks exactly like a javascript `for` loop. Note that you don't need to use `$` inside of double parentheses.

```sh
# countdown.sh
#!/bin/bash
# Program that counts down to zero from a given argument
if [[ $1 -gt 0 ]]
then
  for (( i = $1; i > 0; i-- ))
  do
    echo $i
  done
else
  echo Include a positive integer as the first argument.
fi
```

```console
codeally@c0d11ac3c363:~/project$ ./countdown.sh 10
10
9
8
7
6
5
4
3
2
1
```

---

## More Commands / Sleep

The `help` command isn't listing every command you can take a loot at the `/bin` folder which stands for `binary` for more possible commands.

The `sleep` command can be used to wait an amount of time before the next line is executed.

```sh
# countdown.sh
#!/bin/bash
# Program that counts down to zero from a given argument
echo -e "\n~~ Countdown Timer ~~\n"
if [[ $1 -gt 0 ]]
then
  for (( i = $1; i >= 0; i-- ))
  do
    echo $i
    sleep 1
  done
else
  echo Include a positive integer as the first argument.
fi
```

```console
codeally@c0d11ac3c363:~/project$ ./countdown.sh 3

~~ Countdown Timer ~~

3
2
1
0
```

---

## Multiline Comments / While loop

Multiline comments look like this:

```
: '
  comment here
  more comment here
'
```


```sh
: '
for (( i = $1; i >= 0; i-- ))
do
  echo $i
  sleep 1
done
'
I=$1
```

While loop syntax

```
while [[ CONDITION ]]
do
  STATEMENTS
done
```

You can subtract from a variable with double parenthesis and the `--` operator.

```sh
# countdown.sh
#!/bin/bash
# Program that counts down to zero from a given argument

echo -e "\n~~ Countdown Timer ~~\n"

if [[ $1 -gt 0 ]]
then
  : '
  for (( i = $1; i >= 0; i-- ))
  do
    echo $i
    sleep 1
  done
  '
  I=$1
  while [[ $I -ge 0 ]]
  do
    echo $I
    (( I-- ))
  done
else
  echo Include a positive integer as the first argument.
fi
```

---

## Bingo Script

```console
codeally@c0d11ac3c363:~/project$ touch bingo.sh
codeally@c0d11ac3c363:~/project$ chmod +x countdown.sh
codeally@c0d11ac3c363:~/project$ chmod +x bingo.sh
...
codeally@c0d11ac3c363:~/project$ ./bingo.sh 

~~ Bingo Number Generator ~~

5
```

```sh
# bingo.sh
#!/bin/bash
# Bingo Number Generator
echo -e "\n~~ Bingo Number Generator ~~\n"
NUMBER=5
echo $NUMBER
```

---

## Environment variables

You can view environment variables with the command `printenv`.

```console
codeally@c0d11ac3c363:~/project$ printenv
SHELL=/bin/bash
CODEALLY_INIT_COMMAND=exit
NVM_RC_VERSION=
COLORTERM=truecolor
TERM_PROGRAM_VERSION=1.57.1
CODEROAD_CONTENT_SECURITY_POLICY_EXEMPTIONS=sha256-O6s4HZqHNjMzg0UZUFHy0YEAlG05lWCXf0lBN+GmShk=
HOSTNAME=c0d11ac3c363
CODEALLY_PORT_4000=https://20172.vm-91719ec3c1932e83394d4ed72.silisky.com/
NODE_OPTIONS=--max-old-space-size=2048 
CODEALLY_PHOTO_URL=https://avatars.githubusercontent.com/u/2145187?v=4
PWD=/home/codeally/project
CODEALLY_USER_ID=6357d0989ce93745efb95203
CODEALLY_CURRENT_PROJECT_ID=635c9db31c7fa67208b47127
VSCODE_GIT_ASKPASS_NODE=/usr/local/lib/node
HOME=/home/codeally
LANG=en_US.UTF-8
...
codeally@c0d11ac3c363:~/project$ echo $LANG
en_US.UTF-8
```

You can see all variables in the shell with permissions with `declare -p`. There's one called `RANDOM`.

```console
codeally@c0d11ac3c363:~/project$ echo $RANDOM
31375
```

The `RANDOM` variable generates a random number between 0 and 32767. And can be changed to the range you want with the use of the `%` modulus operator.

```sh
# bingo.sh
#!/bin/bash
# Bingo Number Generator
echo -e "\n~~ Bingo Number Generator ~~\n"
NUMBER=$RANDOM
echo $NUMBER
```

```console
codeally@c0d11ac3c363:~/project$ ./bingo.sh 

~~ Bingo Number Generator ~~

18994
codeally@c0d11ac3c363:~/project$ ./bingo.sh 

~~ Bingo Number Generator ~~

15606
```

Use modulus

```sh
# bingo.sh
#!/bin/bash
# Bingo Number Generator
echo -e "\n~~ Bingo Number Generator ~~\n"
NUMBER=$RANDOM%75
echo $NUMBER
```

```console
codeally@c0d11ac3c363:~/project$ ./bingo.sh

~~ Bingo Number Generator ~~

27387%75
```

Bash sees everything as a string so it just printed the `%75` part literally.

---

## More on double parentheses

Double parentheses are good for changing variable values or making comparisons. It makes the calculation in place and provides no output. If you want to make a calculation and do something with the result you can put a `$` in front of it.

```console
codeally@c0d11ac3c363:~/project$ I=0
codeally@c0d11ac3c363:~/project$ echo $I
0
codeally@c0d11ac3c363:~/project$ (( I++ ))
codeally@c0d11ac3c363:~/project$ echo $I
1
codeally@c0d11ac3c363:~/project$ (( I += 10 ))
codeally@c0d11ac3c363:~/project$ echo $I
11
codeally@c0d11ac3c363:~/project$ echo $(( I + 4 ))
15
codeally@c0d11ac3c363:~/project$ echo $I
11

codeally@c0d11ac3c363:~/project$ J=$(( I - 6 ))
codeally@c0d11ac3c363:~/project$ echo $J
5
codeally@c0d11ac3c363:~/project$ echo $(( J * 5 + 25 ))
50
codeally@c0d11ac3c363:~/project$ echo $J
5
```

`declare` can be used to create variables. But we can use it to view them as well.

```console
codeally@c0d11ac3c363:~/project$ declare -p J
declare -- J="5"
codeally@c0d11ac3c363:~/project$ declare -p RANDOM
declare -i RANDOM="24508"
codeally@c0d11ac3c363:~/project$ echo $(( RANDOM % 75 ))
63
```

```sh
# bingo.sh
#!/bin/bash
# Bingo Number Generator
echo -e "\n~~ Bingo Number Generator ~~\n"
NUMBER=$(( RANDOM % 75 + 1))
echo $NUMBER
```

```console
codeally@c0d11ac3c363:~/project$ ./bingo.sh 

~~ Bingo Number Generator ~~

36
codeally@c0d11ac3c363:~/project$ ./bingo.sh 

~~ Bingo Number Generator ~~

28
```

---

## Double parentheses in if / else if statement

You can use double parentheses in an if statement

```sh
# bingo.sh
#!/bin/bash
# Bingo Number Generator

echo -e "\n~~ Bingo Number Generator ~~\n"

NUMBER=$(( RANDOM % 75 + 1 ))
TEXT="The next number is, "

if (( NUMBER <= 15 ))
then
  echo $TEXT B:$NUMBER
fi
```

Alternate between the two

```sh
# bingo.sh
#!/bin/bash
# Bingo Number Generator

echo -e "\n~~ Bingo Number Generator ~~\n"

NUMBER=$(( RANDOM % 75 + 1 ))
TEXT="The next number is, "

echo $NUMBER
if (( NUMBER <= 15 ))
then
  echo $TEXT B:$NUMBER

elif [[ $NUMBER -le 30 ]]
then
  echo $TEXT I:$NUMBER

elif (( NUMBER < 46 ))
then
  echo $TEXT N:$NUMBER

elif [[ $NUMBER -lt 61 ]]
then
  echo $TEXT G:$NUMBER

else
  echo $TEXT O:$NUMBER
fi
```

```console
codeally@c0d11ac3c363:~/project$ ./bingo.sh 

~~ Bingo Number Generator ~~

40
The next number is, N:40
codeally@c0d11ac3c363:~/project$ ./bingo.sh 

~~ Bingo Number Generator ~~

19
The next number is, I:19
```

---

## Fortune Teller Script

```console
codeally@c0d11ac3c363:~/project$ touch fortune.sh
codeally@c0d11ac3c363:~/project$ chmod +x fortune.sh 
```

```sh
# fortune.sh
#!/bin/bash
# Program to tell a persons fortune
echo -e "\n~~ Fortune Teller ~~\n"
```

---

## Arrays

Arrays can be created like this: `ARR=("a" "b" "c")`. Each variable in an array is like any other variable just combined into one. Arrays are zero-indexed.

```console
codeally@c0d11ac3c363:~/project$ ARR=("a" "b" "c")
codeally@c0d11ac3c363:~/project$ echo ${ARR[1]}
b
```

Previously we used `echo $*` to print out all the arguments that were passed to a script. You can also use `echo $@`. This works for arrays as well.

```console
codeally@c0d11ac3c363:~/project$ echo ${ARR[*]}
a b c
codeally@c0d11ac3c363:~/project$ echo ${ARR[@]}
a b c
codeally@c0d11ac3c363:~/project$ declare -p ARR
declare -a ARR=([0]="a" [1]="b" [2]="c")
```

The `-a` stands for array.

```sh
# fortune.sh
#!/bin/bash
# Program to tell a persons fortune

echo -e "\n~~ Fortune Teller ~~\n"
RESPONSES=("Yes" "No" "Maybe" "Outlook good" "Don't count on it" "Ask again later")
echo ${RESPONSES[5]}
N=$(( RANDOM % 6 ))
echo ${RESPONSES[$N]}
```

```console
codeally@c0d11ac3c363:~/project$ ./fortune.sh 

~~ Fortune Teller ~~

Ask again later
Maybe
codeally@c0d11ac3c363:~/project$ ./fortune.sh 

~~ Fortune Teller ~~

Ask again later
Yes
codeally@c0d11ac3c363:~/project$ 
```

---

## Functions

Functions can be declared like this:

```
FUNCTION_NAME() {
  STATEMENTS
}
```

They can be called by just typing the name of it, if there's no arguments you do not need parentheses.

```sh
# fortune.sh
#!/bin/bash
# Program to tell a persons fortune

echo -e "\n~~ Fortune Teller ~~\n"

RESPONSES=("Yes" "No" "Maybe" "Outlook good" "Don't count on it" "Ask again later")
echo ${RESPONSES[5]}

N=$(( RANDOM % 6 ))
echo ${RESPONSES[$N]}

GET_FORTUNE() {
  echo Ask a yes or no question:
}

GET_FORTUNE
```

```console
codeally@c0d11ac3c363:~/project$ ./fortune.sh 

~~ Fortune Teller ~~

Ask again later
No
Ask a yes or no question:
```

---

## until Command

The `until` loop is similar to the `while` loop

```
until [[ CONDITION ]]
do
  STATEMENTS
done
```

```sh
# fortune.sh
#!/bin/bash
# Program to tell a persons fortune

echo -e "\n~~ Fortune Teller ~~\n"

RESPONSES=("Yes" "No" "Maybe" "Outlook good" "Don't count on it" "Ask again later")
echo ${RESPONSES[5]}

N=$(( RANDOM % 6 ))
echo ${RESPONSES[$N]}

GET_FORTUNE() {
  echo Ask a yes or no question:
  read QUESTION
}

until [[ $QUESTION = test? ]]
do
  GET_FORTUNE
done
```

---

## Matching Pattern

The `~=` can be used to see if a string has part of a pattern. Regex can also be used.

```console
codeally@c0d11ac3c363:~/project$ [[ hello == hello ]]; echo $?
0
codeally@c0d11ac3c363:~/project$ [[ hello == world ]]; echo $?
1
codeally@c0d11ac3c363:~/project$ [[ hello =~ el ]]; echo $?
0
codeally@c0d11ac3c363:~/project$ [[ "hello world" =~ "lo wor" ]]; echo $?
0
codeally@c0d11ac3c363:~/project$ [[ "hello world" =~ ^h ]]; echo $?
0
codeally@c0d11ac3c363:~/project$ [[ "hello world" =~ ^h.+d$ ]]; echo $?
0
codeally@c0d11ac3c363:~/project$ [[ $VAR == "hello world" ]]; echo $?
0

codeally@c0d11ac3c363:~/project$ VAR="hello world"
codeally@c0d11ac3c363:~/project$ echo $VAR
hello world
codeally@c0d11ac3c363:~/project$ [[ $VAR == "hello world" ]]; echo $?
0
codeally@c0d11ac3c363:~/project$ [[ $VAR =~ \?$ ]]; echo $?
1
codeally@c0d11ac3c363:~/project$ [[ "test?" =~ \?$ ]]; echo $?
0
```

```sh
# fortune.sh
#!/bin/bash
# Program to tell a persons fortune

echo -e "\n~~ Fortune Teller ~~\n"

RESPONSES=("Yes" "No" "Maybe" "Outlook good" "Don't count on it" "Ask again later")
echo ${RESPONSES[5]}

N=$(( RANDOM % 6 ))
echo ${RESPONSES[$N]}

GET_FORTUNE() {
  echo Ask a yes or no question:
  read QUESTION
}

until [[ $QUESTION =~ \?$ ]]
do
  GET_FORTUNE
done
```

```console
codeally@c0d11ac3c363:~/project$ ./fortune.sh 

~~ Fortune Teller ~~

Ask again later
Outlook good
Ask a yes or no question:
What is today
Ask a yes or no question:
Is today Friday
Ask a yes or no question:
Will I become a marble block?
codeally@c0d11ac3c363:~/project$ 
```

---

## Fortune teller arguments

```sh
# fortune.sh
#!/bin/bash
# Program to tell a persons fortune

echo -e "\n~~ Fortune Teller ~~\n"

RESPONSES=("Yes" "No" "Maybe" "Outlook good" "Don't count on it" "Ask again later")

GET_FORTUNE() {
  if [[ ! $1 ]]
  then
    echo Ask a yes or no question:
  
  else
    echo Try again. Make sure it ends with a question mark:
  fi
  read QUESTION
}

GET_FORTUNE

until [[ $QUESTION =~ \?$ ]]
do
  GET_FORTUNE again
done

N=$(( RANDOM % 6 ))
echo -e "\n${RESPONSES[$N]}"
```

---

## Script Five

This script will run all the other scripts.

```console
codeally@c0d11ac3c363:~/project$ touch five.sh
codeally@c0d11ac3c363:~/project$ chmod +x five.sh
```

```sh
# five.sh
#!/bin/bash
# Program to run my other four programs

./questionnaire.sh
./countdown.sh 3
./bingo.sh
./fortune.sh
```

```console
codeally@c0d11ac3c363:~/project$ ./five.sh 

~~ Questionnaire ~~

What's your name?
Zack
Where are you from?
Colorado
What's your favorite coding website?
freeCodeCamp

Hello Zack from Colorado. I learned that your favorite coding website is freeCodeCamp!

~~ Countdown Timer ~~

3
2
1
0

~~ Bingo Number Generator ~~

71
The next number is, O:71

~~ Fortune Teller ~~

Ask a yes or no question:
Am I a human?

Don't count on it
```

---

## Command types

You can view the types of commands with `type <command>`


```console
codeally@c0d11ac3c363:~/project$ type echo
echo is a shell builtin
codeally@c0d11ac3c363:~/project$ type read
read is a shell builtin
codeally@c0d11ac3c363:~/project$ type if
if is a shell keyword
codeally@c0d11ac3c363:~/project$ type then
then is a shell keyword
codeally@c0d11ac3c363:~/project$ type bash
bash is /usr/bin/bash
codeally@c0d11ac3c363:~/project$ type psql
psql is /usr/bin/psql
codeally@c0d11ac3c363:~/project$ type ./five.sh
./five.sh is ./five.sh
```
