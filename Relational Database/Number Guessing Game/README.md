# Number Guessing Game

<p align="center"><img src="/Images/screenshots/screenshot-number-guessing-game.png" height="500" alt="Screenshot of my Number Guessing Game project."/></p>

<em>Completed November 2, 2022</em>

While this project started like the rest of the *Relational Database* projects. It took a quick turn at the end and became a slight struggle to get the user stories / requirements to pass.

This particular set of courses were still in beta when I completed them, and I could slightly feel the effects of that on this final project. I had to refactor my code several times in order to finally get all the user stories to pass to complete this project.

For some reason or another various user stories would be complete on one run then then next they would no longer be complete. Changing simple echos of lines would cause some to stay complete and others to no longer be completed. In the end I'm not entirely sure what I did to actually fix the issue. If I had to take a guess at what it was, it would be wrapping all my logic inside functions. Maybe a variable was getting changed on me, or something else was happening from the tests being ran. After doing this, and applying some other random test changes to my code, it eventually allowed all the user stories to pass.

In the end I am quite alright with what happened, it let me experiment even more with bash and figure out a few new ways to accomplish what I was doing before.

## Database Detail and Some Example SELECTions

<details>
  <summary>Data Table Details</summary>

  ```sql
  number_guess=> \d users
                                        Table "public.users"
  Column  |         Type          | Collation | Nullable |                Default                 
  ---------+-----------------------+-----------+----------+----------------------------------------
  user_id | integer               |           | not null | nextval('users_user_id_seq'::regclass)
  name    | character varying(30) |           |          | 
  Indexes:
      "users_pkey" PRIMARY KEY, btree (user_id)
  Referenced by:
      TABLE "user_stats" CONSTRAINT "user_stats_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id)
  ```

  ```sql
  number_guess=> \d user_stats
                  Table "public.user_stats"
      Column    |  Type   | Collation | Nullable | Default 
  --------------+---------+-----------+----------+---------
  user_id      | integer |           | not null | 
  games_played | integer |           | not null | 0
  best_game    | integer |           | not null | 0
  Foreign-key constraints:
      "user_stats_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(user_id)
  ```

</details>

<details>
  <summary>Example SELECTions</summary>
  
  ```sql
  number_guess=> SELECT * FROM users;
  user_id |        name        
  ---------+--------------------
      126 | Squibs
      127 | user_1667440019633
      128 | user_1667440019632
      129 | user_1667440078302
      130 | user_1667440078301
      131 | user_1667440081910
      132 | user_1667440081909
      133 | user_1667440084682
      134 | user_1667440084681
      135 | user_1667440092387
      136 | user_1667440092386
      137 | user_1667440132781
      138 | user_1667440132780
      139 | user_1667440136132
      140 | user_1667440136131
  (15 rows)
  ```

  ```sql
  number_guess=> SELECT * FROM user_stats;
  user_id | games_played | best_game 
  ---------+--------------+-----------
      126 |            1 |         8
      128 |            2 |       565
      127 |            5 |       509
      130 |            2 |       814
      129 |            5 |       668
      132 |            2 |       455
      131 |            5 |       580
      134 |            2 |       727
      133 |            5 |       994
      136 |            2 |       843
      135 |            5 |       907
      138 |            2 |       730
      137 |            5 |       934
      140 |            2 |       689
      139 |            5 |       930
  (15 rows)
  ```
  
  ```sql
  number_guess=> SELECT * FROM users INNER JOIN user_stats USING(user_id);
  user_id |        name        | games_played | best_game 
  ---------+--------------------+--------------+-----------
      126 | Squibs             |            1 |         8
      127 | user_1667440019633 |            5 |       509
      128 | user_1667440019632 |            2 |       565
      129 | user_1667440078302 |            5 |       668
      130 | user_1667440078301 |            2 |       814
      131 | user_1667440081910 |            5 |       580
      132 | user_1667440081909 |            2 |       455
      133 | user_1667440084682 |            5 |       994
      134 | user_1667440084681 |            2 |       727
      135 | user_1667440092387 |            5 |       907
      136 | user_1667440092386 |            2 |       843
      137 | user_1667440132781 |            5 |       934
      138 | user_1667440132780 |            2 |       730
      139 | user_1667440136132 |            5 |       930
      140 | user_1667440136131 |            2 |       689
  (15 rows)
  ```

</details>

<details>
  <summary>Git commits - as this was technically part of this project</summary>

  ```console
  codeally@d41cac83c283:~/project/number_guessing_game$ git log --oneline
  7e7daaf (HEAD -> main) refactor:Reworked several times to get user stories to pass
  679ee70 feat:Store user stats
  ab6c6a8 feat:Count number of guesses
  5caf778 fix:Logic working for existing and new users.
  4a721a8 fix:Variables without apostrophies
  72491d3 feat:Remaining logic complete
  3d1dcae feat:Game logic in place.
  a09c65e feat:Logic for getting user info
  3737225 feat:Generating secret random number in range.
  74a1f56 Initial commit
  ```

</details>

## Requirements / Instructions / User Stories

<details>
  <summary>Codeally virtual machine specific instructions</summary>

  To complete this project, you need to write a script that generates a random number between 1 and 1000 for users to guess. Create a `number_guess` database to hold the information suggested in the user stories. Connect to the interactive psql shell with `psql --username=freecodecamp --dbname=postgres` to create the database. In your script, you can create a `PSQL` variable for querying the database like this: `PSQL="psql --username=freecodecamp --dbname=<database_name> -t --no-align -c"`. Your script should only ask for input from the user to get the username and to take guesses. The tests will add users to your database when the script has that ability, feel free to delete those. Some script related user stories may not pass until the script is completely working. Don't forget to commit your work frequently.

  **Notes:**
  If you leave your virtual machine, your database may not be saved. You can make a dump of it by entering `pg_dump -cC --inserts -U freecodecamp number_guess > number_guess.sql` in a bash terminal (not the psql one). It will save the commands to rebuild your database in `number_guess.sql`. The file will be located where the command was entered. If it's anything inside the `project` folder, the file will be saved in the VM. You can rebuild the database by entering `psql -U postgres < number_guess.sql` in a terminal where the `.sql` file is.

  If you are saving your progress on freeCodeCamp.org, after getting all the tests to pass, follow the instructions above to save a dump of your database. Save the `number_guess.sql` file, as well as the final version of your `number_guess.sh` file, in a public repository and submit the URL to it on freeCodeCamp.org.
</details>

Tasks required for this project to be considered complete:

- [x] Create a `number_guessing_game` folder in the `project` folder for your program
- [x] Create `number_guess.sh` in your `number_guessing_game` folder and give it executable permissions
- [x] Your script should have a shebang at the top of the file that uses `#!/bin/bash`
- [x] Turn the `number_guessing_game` folder into a git repository
- [x] Your git repository should have at least five commits
- [x] Your script should randomly generate a number that users have to guess
- [x] When you run your script, you should prompt the user for a username with `Enter your username:`, and take a username as input. Your database should allow usernames of at least 22 characters
- [x] If that username has been used before, it should print `Welcome back, <username>! You have played <games_played> games, and your best game took <best_game> guesses.`, with `<username>` being a users name from the database, `<games_played>` being the total number of games that user has played, and `<best_game>` being the fewest number of guesses it took that user to win the game
- [x] If the username has not been used before, you should print `Welcome, <username>! It looks like this is your first time here.`
- [x] The next line printed should be `Guess the secret number between 1 and 1000:` and input from the user should be read
- [x] Until they guess the secret number, it should print `It's lower than that, guess again:` if the previous input was higher than the secret number, and `It's higher than that, guess again:` if the previous input was lower than the secret number. Asking for input each time until they input the secret number.
- [x] If anything other than an integer is input as a guess, it should print `That is not an integer, guess again:`
- [x] When the secret number is guessed, your script should print `You guessed it in <number_of_guesses> tries. The secret number was <secret_number>. Nice job!`
- [x] The message for the first commit should be `Initial commit`
- [x] The rest of the commit messages should start with `fix:`, `feat:`, `refactor:`, `chore:`, or `test:`
- [x] You should finish your project while on the `main` branch, your working tree should be clean, and you should not have any uncommitted changes
