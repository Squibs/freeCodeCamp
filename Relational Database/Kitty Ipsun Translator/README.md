# Learn Advanced Bash by Building a Kitty Ipsum Translator

List of Sections:

<!-- TOC -->

- [Redirect Output to File](#redirect-output-to-file)
- [Playing with Inputs](#playing-with-inputs)
- [Kitty Ipsum](#kitty-ipsum)
- [Some more commands](#some-more-commands)
- [Meta info for kitty ipsum files](#meta-info-for-kitty-ipsum-files)
- [grep Command](#grep-command)
- [sed command](#sed-command)
- [Number of times cat, cats, or catnip appears](#number-of-times-cat-cats-or-catnip-appears)
- [kitty_ipsum_2.txt info](#kitty_ipsum_2txt-info)
- [Translate to doggy ipsum](#translate-to-doggy-ipsum)
- [diff command](#diff-command)

<!-- /TOC -->

---

## Redirect Output to File

You can `redirect` out using `>`: `<command> > <filename>`.  `>>` can be used to append to a file.

There are two types of output `stdout` which is standard out, for when a command is successful and `stderr` which is standard error for when it's not. Both of these print ot the terminal by default.

`2>` can be used to redirect `stderr`, while `1>` can be used to redirect `stdout`

`stdin` standard in is a third thing commands can use and is for getting input. It defaults to the keyboard.

In order to redirect `stdin` you use `<`: `<command> < <filename_for_stdin>`. Which can allow you to read values from a file and assign it to a variable for example.

```console
codeally@6c5520c5b625:~/project$ read NAME
Zack
codeally@6c5520c5b625:~/project$ echo $NAME
Zack
codeally@6c5520c5b625:~/project$ echo $NAME 1> stdout.txt
codeally@6c5520c5b625:~/project$ echo freeCodeCamp > name.txt
codeally@6c5520c5b625:~/project$ read NAME < name.txt
codeally@6c5520c5b625:~/project$ echo $NAME
freeCodeCamp
```

`stdin` can also be set by using the pipe `|`. Which will use the output from a command as input for another. Taking the `stdout` from the first command and using it as the `stdin` for the second command: `<command_1> | <command_2>`

```console
codeally@6c5520c5b625:~/project$ echo Zack | read NAME
codeally@6c5520c5b625:~/project$ echo $NAME
freeCodeCamp
```

This worked, but it does not look like it. When you used the pipe `|` to set the input for `read`,  it ran the command ina subshell or subprocess. Basically in another terminal instance within the one you see. The variable was set in there and didn't affect the one you had previously set.

`cat` is another command that takes input. This command prints the contents of a file or input to `stdout`. `cat` can take a filename as an argument.

---

## Playing with Inputs

```sh
#!/bin/bash

read NAME
echo Hello $NAME
bad_command
```

```console
codeally@6c5520c5b625:~/project$ ./script.sh 
Zachary
Hello Zachary
./script.sh: line 5: bad_command: command not found

codeally@6c5520c5b625:~/project$ echo Zack | ./script.sh
Hello Zack
./script.sh: line 5: bad_command: command not found

codeally@6c5520c5b625:~/project$ ./script.sh < name.txt
Hello freeCodeCamp

codeally@6c5520c5b625:~/project$ echo Zack | ./script.sh 2> stderr.txt
Hello Zack

codeally@6c5520c5b625:~/project$ echo Zack | ./script.sh 2> stderr.txt 1> stdout.txt
```

```
<!-- name.txt -->
freeCodeCamp

<!-- stdout.txt -->
Hello Zack

<!-- stderr.txt -->
./script.sh: line 5: bad_command: command not found
```

---

## Kitty Ipsum

We are going to be translating kitty ipsum into doggy ipsum.

```console
codeally@6c5520c5b625:~/project$ cat kitty_ipsum_1.txt 
hide from vacuum cleaner meow for catnip and act crazy steal
raw food off kitchen counter. chew master's slippers hide from
vacuum cleaner. lick owner’s face while cat sleeps on a black
shirt howl or gimme attention meow bye and eat grass, meow, and
throw up because i ate grass pelt around the house and up and
down stairs chasing phantoms. stretch out on bed or show belly.
trip on catnip good morning sunshine. this human feeds me, i
drink from water glass and then spill it everywhere and proceed
to lick the puddle and pushed the mug off the table. i see a bird
i stare at it i meow at it i do a wiggle come here birdy ears
back wide eyed, in the middle of the night i crawl onto your chest
and gently to help you sleep. rub against owner because nose is
wet. food at 4am leave hair on owners clothes. demand to have
some of whatever the human is cooking, then sniff the offering
and walk away you are a captive audience while sitting on the
toilet, pet me. sit by the fire dream about hunting birds chew
foot. we are 3 small cats sleeping most of our time, we are
around 15 weeks old i think, i don’t know i can’t count. suddenly
go on wild-eyed crazy rampage stare at owner accusingly then wink.
howl on top of tall thing see owner, run in excitement rub against
owner because nose is wet cat. leave hair everywhere give me attention
eat sniff catnip meow meowzer. good morning sunshine. lick human chase
the pig around the house meow run in circles. always ensure to
lay down in such a manner that i am on human nose go crazy with
excitement when plates are clanked together signaling the arrival
of cat food so am in trouble, roll over, too cute for human to get
mad. love me! dont wait for the storm to pass, dance in the rain.
```

```console
codeally@6c5520c5b625:~/project$ cat kitty_ipsum_2.txt 
destroy house in 5 seconds hide from vacuum cleaner be
discovered on floor or under the bed. chase the pig around
the house pretend you want to go out but then don't scratch
my head something feels fishy scratch at fleas, meow until
belly rubs, hide behind curtain when vacuum cleaner is on.
stares at human while pushing stuff off a table, go into a
rage and bite own foot, hard so scratch the postman wake up
lick paw wake up owner meow meowzer. eat a rug and hairs
everywhere oh no human coming lie on couch don't get off
couch look out window i must find my catnip. no, you can't
close the door, i haven't decided whether or not i wanna go
out. jump around on couch, meow constantly until given food,
refuse to come home when humans asks stay out all night. that
other cat smells funny you should really give me all the treats
because i smell the best and omg you finally got the right spot
and i love you right now, so spit up on light gray carpet
instead of adjacent linoleum. stretch shed everywhere shed
everywhere stretching attack your ankles chase the red dot,
cat hairball run catnip eat the grass sniff but attack the
cat. meow all night disturbing sleeping humans intently looking
out the window. fight an alligator and win. fight the
hundred-and-twenty-pound rottweiler and steal his spot, crash
against wall but walk away like nothing happened mess up all
the toilet paper meow for human to feed me or eat owner's food.
cats meow or while happily ignoring when being called. stare out
cat door then go back inside run as fast as i can into another
room for no reason, and lie on your feet. leave hair everywhere 
give me attention eat sniff catnip meow meowzer.
```

---

## Some more commands

Word count `wc` it prints some info about a file, it can take an argument of a file. It shows how many lines, word, and bytes are in a file. The `-l` flag can be used to get only the amount of lines. `-w` can be used to get the number of words. `-m` gets the amount of characters a file has. `-c` gets the amount of bytes a file has.

```console
codeally@6c5520c5b625:~/project$ wc kitty_ipsum_1.txt
  27  332 1744 kitty_ipsum_1.txt
```

---

## Meta info for kitty ipsum files

We use the `cat` command and pipe it into the `wc` command as that will remove the filename from the output. Whereas just using the `wc` command by itself would give us the counts along with the file name as output. Also could use the `<` redirection method as well for the same/similar results.

```console
codeally@6c5520c5b625:~/project$ echo "~~ kitty_ipsum_1.txt info ~~" > kitty_info.txt

codeally@6c5520c5b625:~/project$ echo -e "\nNumber of lines:" >> kitty_info.txt
codeally@6c5520c5b625:~/project$ cat kitty_ipsum_1.txt  | wc -l >> kitty_info.txt

codeally@6c5520c5b625:~/project$ echo -e "\nNumber of words:" >> kitty_info.txt
codeally@6c5520c5b625:~/project$ cat kitty_ipsum_1.txt | wc -w >> kitty_info.txt

codeally@6c5520c5b625:~/project$ echo -e "\nNumber of characters:" >> kitty_info.txt 
codeally@6c5520c5b625:~/project$ wc -m < kitty_ipsum_1.txt >> kitty_info.txt
```

---

## grep Command

`grep` is a command for searching for patterns in text.

```console
codeally@6c5520c5b625:~/project$ grep 'meow' kitty_ipsum_1.txt 
hide from vacuum cleaner meow for catnip and act crazy steal
shirt howl or gimme attention meow bye and eat grass, meow, and
i stare at it i meow at it i do a wiggle come here birdy ears
eat sniff catnip meow meowzer. good morning sunshine. lick human chase
the pig around the house meow run in circles. always ensure to
```

This showed all the lines that contained `meow`. The `--color` flag can be used to highlight all the found words for each line. The `-n` command can be used to show the line numbers.

`grep` can also use regular expressions.

```console
codeally@6c5520c5b625:~/project$ grep 'meow[a-z]*' kitty_ipsum_1.txt  --color -n
1:hide from vacuum cleaner meow for catnip and act crazy steal
4:shirt howl or gimme attention meow bye and eat grass, meow, and
10:i stare at it i meow at it i do a wiggle come here birdy ears
22:eat sniff catnip meow meowzer. good morning sunshine. lick human chase
23:the pig around the house meow run in circles. always ensure to
```

This selects all word that start with `meow` which means it matched `meow` and `meowzer` instead of just the `meow`. This is more visible with the `--color` flag enabled.

The `-c` flag for `grep` will give you the line count for matching words.
The `-o` flag will print each found word on it's own line.

```console
codeally@6c5520c5b625:~/project$ grep 'meow[a-z]*' kitty_ipsum_1.txt  -c
5

codeally@6c5520c5b625:~/project$ grep 'meow[a-z]*' kitty_ipsum_1.txt  -o
meow
meow
meow
meow
meow
meowzer
meow
```

Since `-c` is not the count of words, but lines, we can pipe the `-o` flag output into `wc` to get a word count.

```console
codeally@6c5520c5b625:~/project$ grep 'meow[a-z]*' kitty_ipsum_1.txt  -o | wc -l
7
```

```console
codeally@6c5520c5b625:~/project$ echo -e "\nNumber of times meow or meowzer appears:" >> kitty_info.txt 
codeally@6c5520c5b625:~/project$ grep 'meow[a-z]*' kitty_ipsum_1.txt  -o | wc -l >> kitty_info.txt 

codeally@6c5520c5b625:~/project$ echo -e "\nLines that they appear on:" >> kitty_info.txt 
```

`grep` has a `-n` flag to get line numbers. But there doesn't appear to be a way to get JUST the line numbers.

---

## sed command

`sed` is a command for replacing text that might work.

`sed 's/<pattern_to_replace>/<text_to_replace_it_with>/' <filename>`

by default `sed` does not replace the text in the file, but will output it to `stdout`. Stands for stream editor.

```console
codeally@6c5520c5b625:~/project$ sed 's/r/2/' name.txt 
f2eeCodeCamp
codeally@6c5520c5b625:~/project$ sed 's/free/f233/' name.txt 
f233CodeCamp

f233CodeCampcodeally@6c5520c5b625:~/project$ sed 's/freecodecamp/f233C0d3C@mp/' name.txt 
freeCodeCamp

codeally@6c5520c5b625:~/project$ sed 's/freecodecamp/f233C0d3C@mp/i' name.txt 
f233C0d3C@mp
codeally@0d800fd8f005:~/project$ sed 's/freecodecamp/f233C0d3C@mp/i' < name.txt
f233C0d3C@mp
codeally@0d800fd8f005:~/project$ cat name.txt | sed 's/freecodecamp/f233C0d3C@mp/i'
f233C0d3C@mp

codeally@0d800fd8f005:~/project$ grep 'meow[a-z]*' kitty_ipsum_1.txt  -n | sed 's/[0-9]/1/'
1:hide from vacuum cleaner meow for catnip and act crazy steal
1:shirt howl or gimme attention meow bye and eat grass, meow, and
10:i stare at it i meow at it i do a wiggle come here birdy ears
12:eat sniff catnip meow meowzer. good morning sunshine. lick human chase
13:the pig around the house meow run in circles. always ensure to

codeally@0d800fd8f005:~/project$ grep 'meow[a-z]*' kitty_ipsum_1.txt  -n | sed 's/[0-9]+/1/'
1:hide from vacuum cleaner meow for catnip and act crazy steal
4:shirt howl or gimme attention meow bye and eat grass, meow, and
10:i stare at it i meow at it i do a wiggle come here birdy ears
22:eat sniff catnip meow meowzer. good morning sunshine. lick human chase
23:the pig around the house meow run in circles. always ensure to
```

This last command is using regex was supposed to select one or ore with the `+`. This didn't seem to work though. We have to use the `-E` flag in order to extend regular expressions with `sed`.

This is replacing every number with 1:

```console
codeally@0d800fd8f005:~/project$ grep 'meow[a-z]*' kitty_ipsum_1.txt  -n | sed 's/[0-9]+/1/' -E
1:hide from vacuum cleaner meow for catnip and act crazy steal
1:shirt howl or gimme attention meow bye and eat grass, meow, and
1:i stare at it i meow at it i do a wiggle come here birdy ears
1:eat sniff catnip meow meowzer. good morning sunshine. lick human chase
1:the pig around the house meow run in circles. always ensure to
```

Here we are replacing every number with the same number:

```console
codeally@0d800fd8f005:~/project$ grep 'meow[a-z]*' kitty_ipsum_1.txt  -n | sed 's/([0-9]+)/\1/' -E
1:hide from vacuum cleaner meow for catnip and act crazy steal
4:shirt howl or gimme attention meow bye and eat grass, meow, and
10:i stare at it i meow at it i do a wiggle come here birdy ears
22:eat sniff catnip meow meowzer. good morning sunshine. lick human chase
23:the pig around the house meow run in circles. always ensure to
```

Finally here, we are replacing everything with the captured numbers:

```console
codeally@0d800fd8f005:~/project$ grep 'meow[a-z]*' kitty_ipsum_1.txt  -n | sed 's/([0-9]+).*/\1/' -E
1
4
10
22
23
```

```console
codeally@0d800fd8f005:~/project$ grep 'meow[a-z]*' kitty_ipsum_1.txt  -n | sed 's/([0-9]+).*/\1/' -E >> kitty_info.txt 
```

---

## Number of times cat, cats, or catnip appears

```console
codeally@0d800fd8f005:~/project$ echo -e "\nNumber of times cat, cats, or catnip appears:" >> kitty_info.txt 
codeally@0d800fd8f005:~/project$ grep 'cat[a-z]*' kitty_ipsum_1.txt -o | wc -l >> kitty_info.txt 

codeally@0d800fd8f005:~/project$ echo -e "\nLines that they appear on:" >> kitty_info.txt 
codeally@0d800fd8f005:~/project$ grep 'cat[a-z]*' kitty_ipsum_1.txt -n | sed 's/([0-9]+).*/\1/' -E >> kitty_info.txt 
```

---

## kitty_ipsum_2.txt info

Basically just testing what I've learned so far.

Line count (pipe):

```console
codeally@0d800fd8f005:~/project$ echo -e "\n\n~~ kitty_ipsum_2.txt info ~~" >> kitty_info.txt 
codeally@0d800fd8f005:~/project$ cat kitty_ipsum_2.txt | wc -l >> kitty_info.txt 
```

Word count (redirection):

```console
codeally@0d800fd8f005:~/project$ echo -e "\nNumber of words:" >> kitty_info.txt 
codeally@0d800fd8f005:~/project$ wc -w < kitty_ipsum_2.txt >> kitty_info.txt
```

Character count (pipe or redirection):

```console
codeally@0d800fd8f005:~/project$ echo -e "\nNumber of characters:" >> kitty_info.txt
codeally@0d800fd8f005:~/project$ wc -m < kitty_ipsum_2.txt >> kitty_info.txt 
```

Word appearance count (for words that start with 'meow'):

```console
codeally@0d800fd8f005:~/project$ echo -e "\nNumber of times meow or meowzer appears:" >> kitty_info.txt 
codeally@0d800fd8f005:~/project$ grep 'meow[a-z]*' kitty_ipsum_2.txt -o | wc -l >> kitty_info.txt 
```

Lines these words appear on:

```console
codeally@0d800fd8f005:~/project$ echo -e "\nLines that they appear on:" >> kitty_info.txt
codeally@0d800fd8f005:~/project$ grep 'meow[a-z]*' kitty_ipsum_2.txt -n | sed 's/([0-9]+).*/\1/' -E >> kitty_info.txt 
```

Word appearance count (again):

```console
codeally@0d800fd8f005:~/project$ echo -e "\nNumber of times cat, cats, or catnip appears:" >> kitty_info.txt
codeally@0d800fd8f005:~/project$ grep 'cat[a-z]*' kitty_ipsum_2.txt -o | wc -l >> kitty_info.txt 
```

Lines these words appear on (again):

```console
codeally@0d800fd8f005:~/project$ echo -e "\nLines that they appear on:" >> kitty_info.txt 
codeally@0d800fd8f005:~/project$ grep 'cat[a-z]*' kitty_ipsum_2.txt -n | sed 's/([0-9]+).*/\1/' -E >> kitty_info.txt 
```

kitty_info.txt (I've been building throughout all these steps so far):

```
~~ kitty_ipsum_1.txt info ~~

Number of lines:
27

Number of words:
332

Number of characters:
1738

Number of times meow or meowzer appears:
7

Lines that they appear on:
1
4
10
22
23

Number of times cat, cats, or catnip appears:
7

Lines that they appear on:
1
3
7
17
21
22
26


~~ kitty_ipsum_2.txt info ~~

Number of lines:
28

Number of words:
307

Number of characters:
1678

Number of times meow or meowzer appears:
9

Lines that they appear on:
4
8
12
20
24
25
28

Number of times cat, cats, or catnip appears:
8

Lines that they appear on:
10
14
19
20
25
26
28
```

---

## Translate to doggy ipsum

```console
codeally@0d800fd8f005:~/project$ touch translate.sh
codeally@0d800fd8f005:~/project$ chmod +x translate.sh 
```

You can replace many patterns using `sed` by separating them with a semicolon: `sed 's/<pattern_1>/<replacement_1>/; s/<pattern_2>/<replacement_2>/'`

```sh
#!/bin/bash

cat $1 | sed 's/catnip/dogchow/g; s/cat/dog/g; s/meow|meowzer/woof/g' -E
```

```console
codeally@0d800fd8f005:~/project$ ./translate.sh kitty_ipsum_1.txt | grep 'dog[a-z]*|woof[a-z]*' --color -E
hide from vacuum cleaner woof for dogchow and act crazy steal
vacuum cleaner. lick owner’s face while dog sleeps on a black
shirt howl or gimme attention woof bye and eat grass, woof, and
trip on dogchow good morning sunshine. this human feeds me, i
i stare at it i woof at it i do a wiggle come here birdy ears
foot. we are 3 small dogs sleeping most of our time, we are
owner because nose is wet dog. leave hair everywhere give me attention
eat sniff dogchow woof woof. good morning sunshine. lick human chase
the pig around the house woof run in circles. always ensure to
of dog food so am in trouble, roll over, too cute for human to get

codeally@0d800fd8f005:~/project$ ./translate.sh kitty_ipsum_1.txt >> doggy_ipsum_1.txt
```

---

## diff command

`diff` is a command to view the difference between two files. The `--color` flag can make it easier to read.

```console
codeally@0d800fd8f005:~/project$ diff kitty_ipsum_1.txt doggy_ipsum_1.txt 
1c1
< hide from vacuum cleaner meow for catnip and act crazy steal
---
> hide from vacuum cleaner woof for dogchow and act crazy steal
3,4c3,4
< vacuum cleaner. lick owner’s face while cat sleeps on a black
< shirt howl or gimme attention meow bye and eat grass, meow, and
---
> vacuum cleaner. lick owner’s face while dog sleeps on a black
> shirt howl or gimme attention woof bye and eat grass, woof, and
7c7
< trip on catnip good morning sunshine. this human feeds me, i
---
> trip on dogchow good morning sunshine. this human feeds me, i
10c10
< i stare at it i meow at it i do a wiggle come here birdy ears
---
> i stare at it i woof at it i do a wiggle come here birdy ears
17c17
< foot. we are 3 small cats sleeping most of our time, we are
---
> foot. we are 3 small dogs sleeping most of our time, we are
21,23c21,23
< owner because nose is wet cat. leave hair everywhere give me attention
< eat sniff catnip meow meowzer. good morning sunshine. lick human chase
< the pig around the house meow run in circles. always ensure to
---
> owner because nose is wet dog. leave hair everywhere give me attention
> eat sniff dogchow woof woof. good morning sunshine. lick human chase
> the pig around the house woof run in circles. always ensure to
26c26
< of cat food so am in trouble, roll over, too cute for human to get
---
> of dog food so am in trouble, roll over, too cute for human to get
```
