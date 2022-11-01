# World Cup Database

<p align="center"><img src="/Images/screenshots/screenshot-world-cup-database.png" height="500" alt="Screenshot of my World Cup Database project."/></p>

<em>Completed October 31, 2022</em>

I felt more sure about myself on this project than the previous one ([Celestial Bodies Database](../Celestial%20Bodies%20Database#celestial-bodies-database)). This project was more about using bash to insert data into database more than it was building the database.

freeCodeCamp provided all the necessary details to build the database, then left it up to you to figure out how to insert the data into the database using a bash script. Then there was a follow up script to retrieve data / make selections based on pre-defined descriptions.

I didn't particularly find any part of this hard. I struggled more with working with bash than anything relating to the database as I have not worked with bash much at all yet. One particular spot that I struggled with was trying to call a function as part of an if statement condition, and trying just how to do that in a bash script. Another struggle I had was trying to define arguments in the parentheses like you do in JavaScript. One final area I struggled with is how a lot of things you do in bash, it ends up echoing the exit status of many things.

## Database Detail and Some Example SELECTions

<details>
  <summary>Teams Table</summary>

  ```sql
  worldcup=> \d teams
                                        Table "public.teams"
  Column  |         Type          | Collation | Nullable |                Default                 
  ---------+-----------------------+-----------+----------+----------------------------------------
  team_id | integer               |           | not null | nextval('teams_team_id_seq'::regclass)
  name    | character varying(50) |           | not null | 
  Indexes:
      "teams_pkey" PRIMARY KEY, btree (team_id)
      "teams_name_key" UNIQUE CONSTRAINT, btree (name)
  Referenced by:
      TABLE "games" CONSTRAINT "games_opponent_id_fkey" FOREIGN KEY (opponent_id) REFERENCES teams(team_id)
      TABLE "games" CONSTRAINT "games_winner_id_fkey" FOREIGN KEY (winner_id) REFERENCES teams(team_id)
  ```

  ```sql
  worldcup=> SELECT * FROM teams;
  team_id |     name      
  ---------+---------------
      661 | France
      662 | Croatia
      663 | Belgium
      664 | England
      665 | Russia
      666 | Sweden
      667 | Brazil
      668 | Uruguay
      669 | Colombia
      670 | Switzerland
      671 | Japan
      672 | Mexico
      673 | Denmark
      674 | Spain
      675 | Portugal
      676 | Argentina
      677 | Germany
      678 | Netherlands
      679 | Costa Rica
      680 | Chile
      681 | Nigeria
      682 | Algeria
      683 | Greece
      684 | United States
  (24 rows)
  ```

</details>

<details>
  <summary>Games Table</summary>

  ```sql
  worldcup=> \d games
                                            Table "public.games"
      Column     |         Type          | Collation | Nullable |                Default                 
  ----------------+-----------------------+-----------+----------+----------------------------------------
  game_id        | integer               |           | not null | nextval('games_game_id_seq'::regclass)
  year           | integer               |           | not null | 
  round          | character varying(50) |           | not null | 
  winner_id      | integer               |           | not null | 
  opponent_id    | integer               |           | not null | 
  winner_goals   | integer               |           | not null | 
  opponent_goals | integer               |           | not null | 
  Indexes:
      "games_pkey" PRIMARY KEY, btree (game_id)
  Foreign-key constraints:
      "games_opponent_id_fkey" FOREIGN KEY (opponent_id) REFERENCES teams(team_id)
      "games_winner_id_fkey" FOREIGN KEY (winner_id) REFERENCES teams(team_id)
  ```

  ```sql
  worldcup=> SELECT * FROM games;
  game_id | year |     round     | winner_id | opponent_id | winner_goals | opponent_goals 
  ---------+------+---------------+-----------+-------------+--------------+----------------
      226 | 2018 | Final         |       661 |         662 |            4 |              2
      227 | 2018 | Third Place   |       663 |         664 |            2 |              0
      228 | 2018 | Semi-Final    |       662 |         664 |            2 |              1
      229 | 2018 | Semi-Final    |       661 |         663 |            1 |              0
      230 | 2018 | Quarter-Final |       662 |         665 |            3 |              2
      231 | 2018 | Quarter-Final |       664 |         666 |            2 |              0
      232 | 2018 | Quarter-Final |       663 |         667 |            2 |              1
      233 | 2018 | Quarter-Final |       661 |         668 |            2 |              0
      234 | 2018 | Eighth-Final  |       664 |         669 |            2 |              1
      235 | 2018 | Eighth-Final  |       666 |         670 |            1 |              0
      236 | 2018 | Eighth-Final  |       663 |         671 |            3 |              2
      237 | 2018 | Eighth-Final  |       667 |         672 |            2 |              0
      238 | 2018 | Eighth-Final  |       662 |         673 |            2 |              1
      239 | 2018 | Eighth-Final  |       665 |         674 |            2 |              1
      240 | 2018 | Eighth-Final  |       668 |         675 |            2 |              1
      241 | 2018 | Eighth-Final  |       661 |         676 |            4 |              3
      242 | 2014 | Final         |       677 |         676 |            1 |              0
      243 | 2014 | Third Place   |       678 |         667 |            3 |              0
      244 | 2014 | Semi-Final    |       676 |         678 |            1 |              0
      245 | 2014 | Semi-Final    |       677 |         667 |            7 |              1
      246 | 2014 | Quarter-Final |       678 |         679 |            1 |              0
      247 | 2014 | Quarter-Final |       676 |         663 |            1 |              0
      248 | 2014 | Quarter-Final |       667 |         669 |            2 |              1
      249 | 2014 | Quarter-Final |       677 |         661 |            1 |              0
      250 | 2014 | Eighth-Final  |       667 |         680 |            2 |              1
      251 | 2014 | Eighth-Final  |       669 |         668 |            2 |              0
      252 | 2014 | Eighth-Final  |       661 |         681 |            2 |              0
      253 | 2014 | Eighth-Final  |       677 |         682 |            2 |              1
      254 | 2014 | Eighth-Final  |       678 |         672 |            2 |              1
      255 | 2014 | Eighth-Final  |       679 |         683 |            2 |              1
      256 | 2014 | Eighth-Final  |       676 |         670 |            1 |              0
      257 | 2014 | Eighth-Final  |       663 |         684 |            2 |              1
  (32 rows)
  ```

</details>

<details>
  <summary>SELECTions</summary>

  Total number of goals in all games from winning teams:
  ```sql
  worldcup=> SELECT SUM(winner_goals) FROM games;
  sum 
  -----
    68
  (1 row)
  ```

  Total number of goals in all games from both teams combined:
  ```sql
  worldcup=> SELECT SUM(winner_goals + opponent_goals) FROM games;
  sum 
  -----
    90
  (1 row)
  ```

  Average number of goals in all games from the winning teams:
  ```sql
  worldcup=> SELECT AVG(winner_goals) FROM games;
          avg         
  --------------------
  2.1250000000000000
  (1 row)
  ```

  Average number of goals in all games from the winning teams rounded to two decimal places:
  ```sql
  worldcup=> SELECT ROUND(AVG(winner_goals), 2) FROM games;
  round 
  -------
    2.13
  (1 row)
  ```

  Average number of goals in all games from both teams:
  ```sql
  worldcup=> SELECT AVG(winner_goals + opponent_goals) FROM games;
          avg         
  --------------------
  2.8125000000000000
  (1 row)
  ```

  Most goals scored in a single game by one team:
  ```sql
  worldcup=> SELECT MAX(winner_goals) FROM games;
  max 
  -----
    7
  (1 row)
  ```

  Number of games where the winning team scored more than two goals:
  ```sql
  worldcup=> SELECT COUNT(*) FROM games WHERE winner_goals > 2;
  count 
  -------
      6
  (1 row)
  ```

  Winner of the 2018 tournament team name:
  ```sql
  worldcup=> SELECT name FROM games FULL JOIN teams ON games.winner_id = teams.team_id WHERE year = 2018 AND round = 'Final';
    name  
  --------
  France
  (1 row)
  ```

  List of teams who played in the 2014 'Eighth-Final' round:
  ```sql
  worldcup=> SELECT name FROM games g1 FULL JOIN teams ON g1.winner_id = teams.team_id FULL JOIN games g2 ON teams.team_id = g2.opponent_id WHERE (g1.year = 2014 or g2.year = 2014) AND (g1.round = 'Eighth-Final' OR g2.round = 'Eighth-Final') GROUP BY name ORDER BY name;
      name      
  ---------------
  Algeria
  Argentina
  Belgium
  Brazil
  Chile
  Colombia
  Costa Rica
  France
  Germany
  Greece
  Mexico
  Netherlands
  Nigeria
  Switzerland
  United States
  Uruguay
  (16 rows)
  ```

  List of unique winning team names in the whole data set:
  ```sql
  worldcup=> SELECT DISTINCT(name) FROM teams FULL JOIN games ON teams.team_id = games.winner_id WHERE games.winner_id IS NOT NULL ORDER BY name;
      name     
  -------------
  Argentina
  Belgium
  Brazil
  Colombia
  Costa Rica
  Croatia
  England
  France
  Germany
  Netherlands
  Russia
  Sweden
  Uruguay
  (13 rows)
  ```

  Year and team name of all the champions:
  ```sql
  worldcup=> SELECT games.year, teams.name FROM games FULL JOIN teams ON games.winner_id = teams.team_id WHERE round = 'Final' ORDER BY year;
  year |  name   
  ------+---------
  2014 | Germany
  2018 | France
  (2 rows)
  ```

  List of teams that start with 'Co':
  ```sql
  worldcup=> SELECT name FROM teams WHERE name LIKE 'Co%';
      name    
  ------------
  Colombia
  Costa Rica
  (2 rows)
  ```
  
</details>

## Requirements / Instructions / User Stories

<details>
  <summary>Codeally virtual machine specific instructions</summary>
  <br>
  Follow the instructions and get all the user stories below to pass to finish the project.

  You start with several files, one of them is `games.csv`. It contains a comma-separated list of all games of the final three rounds of the World Cup tournament since 2014; the titles are at the top. It includes the year of each game, the round of the game, the winner, their opponent, and the number of goals each team scored. You need to do three things for this project:

  Part 1: Create the database

  Log into the psql interactive terminal with `psql --username=freecodecamp --dbname=postgres` and create your database structure according to the user stories below.

  **Don't forget to connect to the database after you create it**.

  Part 2: Insert the data

  Complete the `insert_data.sh` script to correctly insert all the data from `games.csv` into the database. The file is started for you. Do not modify any of the code you start with. Using the `PSQL` variable defined, you can make database queries like this: `$($PSQL "<query_here>")`. The tests have a 20 second limit, so try to make your script efficient. The less you have to query the database, the faster it will be. You can empty the rows in the tables of your database with `TRUNCATE TABLE games, teams;`

  Part 3: Query the database

  Complete the empty `echo` commands in the `queries.sh` file to produce output that matches the `expected_output.txt` file. The file has some starter code, and the first query is completed for you. Use the `PSQL` variable defined to complete rest of the queries. Note that you need to have your database filled with the correct data from the script to get the correct results from your queries. Hint: Test your queries in the psql prompt first and then add them to the script file.

  **Notes:**
  If you leave your virtual machine, your database may not be saved. You can make a dump of it by entering `pg_dump -cC --inserts -U freecodecamp worldcup > worldcup.sql` in a bash terminal (not the psql one). It will save the commands to rebuild your database in `worldcup.sql`. The file will be located where the command was entered. If it's anything inside the `project` folder, the file will be saved in the VM. You can rebuild the database by entering `psql -U postgres < worldcup.sql` in a terminal where the `.sql` file is.

  If you are saving your progress on freeCodeCamp.org, after getting all the tests to pass, follow the instructions above to save a dump of your database. Save the `worldcup.sql` file, as well as the final version of your `insert_data.sh` and `queries.sh` files, in a public repository and submit the URL to it on freeCodeCamp.org.
</details>


Tasks required for this project to be considered complete:

- [x] You should create a database named `worldcup`

- [x] You should **connect to your worldcup database** and then create `teams` and `games` tables

- [x] Your `teams` table should have a `team_id` column that is a type of `SERIAL` and is the primary key, and a `name` column that has to be `UNIQUE`

- [x] Your `games` table should have a `game_id` column that is a type of `SERIAL` and is the primary key, a `year` column of type `INT`, and a `round` column of type `VARCHAR`

- [x] Your `games` table should have `winner_id` and `opponent_id` foreign key columns that each reference `team_id` from the `teams` table

- [x] Your `games` table should have `winner_goals` and `opponent_goals` columns that are type `INT`

- [x] All of your columns should have the `NOT NULL` constraint

- [x] Your two script (`.sh`) files should have executable permissions. Other tests involving these two files will fail until permissions are correct. When these permissions are enabled, the tests will take significantly longer to run

- [x] When you run your `insert_data.sh` script, it should add each unique team to the `teams` table. There should be 24 rows

- [x] When you run your `insert_data.sh` script, it should insert a row for each line in the `games.csv` file (other than the top line of the file). There should be 32 rows. Each row should have every column filled in with the appropriate info. Make sure to add the correct ID's from the teams table (you cannot hard-code the values)

- [x] You should correctly complete the queries in the `queries.sh` file. Fill in each empty `echo` command to get the output of what is suggested with the command above it. Only use a single line like the first query. The output should match what is in the `expected_output.txt` file
