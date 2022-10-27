# Celestial Bodies Database

> Welcome! Are you ready to build a database of the universe?

## 1. Instructions

For this project, you need to log in to PostgreSQL with psql to create your database. Do that by entering `psql --username=freecodecamp --dbname=postgres` in the terminal. Make all the tests below pass to complete the project. Be sure to get creative, and have fun!

**Don't forget to connect to your database after you create it** :smile:

Here's some ideas for other column and table names: `description`, `has_life`, `is_spherical`, `age_in_millions_of_years`, `planet_types`, `galaxy_types`, `distance_from_earth`.

**Notes:**
If you leave your virtual machine, your database may not be saved. You can make a dump of it by entering `pg_dump -cC --inserts -U freecodecamp universe > universe.sql` in a bash terminal (not the psql one). It will save the commands to rebuild your database in `universe.sql`. The file will be located where the command was entered. If it's anything inside the `project` folder, the file will be saved in the VM. You can rebuild the database by entering `psql -U postgres < universe.sql` in a terminal where the `.sql` file is.

If you are saving your progress on freeCodeCamp.org, after getting all the tests to pass, follow the instructions above to save a dump of your database. Save the `universe.sql` file in a public repository and submit the URL to it on freeCodeCamp.org.

<br>

Complete the tasks below:

- [ ] You should create a database named `universe`
- [ ] Be sure to connect to your database with `\c universe`. Then, you should add tables named `galaxy`, `star`, `planet`, and `moon`
- [ ] Each table should have a primary key
- [ ] Each primary key should automatically increment
- [ ] Each table should have a `name` column
- [ ] You should use the `INT` data type for at least two columns that are not a primary or foreign key
- [ ] You should use the `NUMERIC` data type at least once
- [ ] You should use the `TEXT` data type at least once
- [ ] You should use the `BOOLEAN` data type on at least two columns
- [ ] Each "star" should have a foreign key that references one of the rows in `galaxy`
- [ ] Each "planet" should have a foreign key that references one of the rows in `star`
- [ ] Each "moon" should have a foreign key that references one of the rows in `planet`
- [ ] Your database should have at least five tables
- [ ] Each table should have at least three rows
- [ ] The `galaxy` and `star` tables should each have at least six rows
- [ ] The `planet` table should have at least 12 rows
- [ ] The `moon` table should have at least 20 rows
- [ ] Each table should have at least three columns
- [ ] The `galaxy`, `star`, `planet`, and `moon` tables should each have at least five columns
- [ ] At least two columns per table should not accept `NULL` values
- [ ] At least one column from each table should be required to be `UNIQUE`
- [ ] All columns named `name` should be of type `VARCHAR`
- [ ] Each primary key column should follow the naming convention `table_name_id`. For example, the `moon` table should have a primary key column named `moon_id`
- [ ] Each foreign key column should have the same name as the column it is referencing

Example of a table and it's automatically incremented primary key:

```sql
mario_database=> \d
                        List of relations
+--------+-----------------------------+----------+--------------+
| Schema |            Name             |   Type   |    Owner     |
+--------+-----------------------------+----------+--------------+
| public | actions                     | table    | freecodecamp |
| public | actions_action_id_seq       | sequence | freecodecamp |
| public | character_actions           | table    | freecodecamp |
| public | characters                  | table    | freecodecamp |
| public | characters_character_id_seq | sequence | freecodecamp |
| public | more_info                   | table    | freecodecamp |
| public | more_info_more_info_id_seq  | sequence | freecodecamp |
| public | sounds                      | table    | freecodecamp |
| public | sounds_sound_id_seq         | sequence | freecodecamp |
+--------+-----------------------------+----------+--------------+
(9 rows)

mario_database=> \d characters
                                             Table "public.characters"
+----------------+-----------------------+-----------+----------+--------------------------------------------------+
|     Column     |         Type          | Collation | Nullable |                     Default                      |
+----------------+-----------------------+-----------+----------+--------------------------------------------------+
| character_id   | integer               |           | not null | nextval('characters_character_id_seq'::regclass) |
| name           | character varying(30) |           | not null |                                                  |
| homeland       | character varying(60) |           |          |                                                  |
| favorite_color | character varying(30) |           |          |                                                  |
+----------------+-----------------------+-----------+----------+--------------------------------------------------+
Indexes:
    "characters_pkey" PRIMARY KEY, btree (character_id)
Referenced by:
    TABLE "character_actions" CONSTRAINT "character_actions_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
    TABLE "more_info" CONSTRAINT "more_info_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
    TABLE "sounds" CONSTRAINT "sounds_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)

mario_database=> SELECT * FROM characters;
                               
+--------------+--------+------------------+----------------+
| character_id |  name  |     homeland     | favorite_color |
+--------------+--------+------------------+----------------+
|            2 | Luigi  | Mushroom Kingdom | Green          |
|            3 | Peach  | Mushroom Kingdom | Pink           |
|            7 | Yoshi  | Dinosaur Land    | Green          |
|            6 | Daisy  | Sarasaland       | Orange         |
|            1 | Mario  | Mushroom Kingdom | Red            |
|            4 | Toad   | Mushroom Kingdom | Blue           |
|            5 | Bowser | Koopa Kingdom    | Yellow         |
+--------------+--------+------------------+----------------+
(7 rows)

mario_database=> \d characters_character_id_seq;
             Sequence "public.characters_character_id_seq"
+---------+-------+---------+------------+-----------+---------+-------+
|  Type   | Start | Minimum |  Maximum   | Increment | Cycles? | Cache |
+---------+-------+---------+------------+-----------+---------+-------+
| integer |     1 |       1 | 2147483647 |         1 | no      |     1 |
+---------+-------+---------+------------+-----------+---------+-------+
Owned by: public.characters.character_id

mario_database=> SELECT * FROM characters_character_id_seq;
                  
+------------+---------+-----------+
| last_value | log_cnt | is_called |
+------------+---------+-----------+
|          7 |       0 | t         |
+------------+---------+-----------+
(1 row)

mario_database=> 
```
