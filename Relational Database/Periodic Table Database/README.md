# Periodic Table Database

<p align="center"><img src="./Images/screenshots/screenshot-periodic-table.png" height="500" alt="Screenshot of my Periodic Table Database project."/></p>

<em>Completed November 2, 2022</em>

This project was more about using git, which you could forsee from the previous lesson [Learn Git by Building an SQL Reference Object](../Learn%20Git%20by%20Building%20an%20SQL%20Reference%20Object#learn-git-by-building-an-sql-reference-object), and from the previous pattern of lessons leading into similar required projects for the freeCodeCamp *Relational Database Certificate*.

I was tasked with fixing a pre-existing database on periodic elements, and given several user-stories or requirements for doing so.

I did have to go out and learn some things on my own for this challenge, as I could not think of a way on my own to accomplish a few of the user stories:

```sql
periodic_table=> UPDATE elements SET symbol = initcap(symbol);
UPDATE 9
```

`initcap()` is a PostgreSQL function that can be used to convert the first letter of each word to upper case and the remaining to lower case. This was useful to fix the element symbols that were not already capitalized correctly. Using the above command I fixed the rest of the element symbols.

```sql
periodic_table=> ALTER TABLE properties ALTER COLUMN atomic_mass TYPE DECIMAL;
ALTER TABLE
periodic_table=> UPDATE properties SET atomic_mass=TRIM(TRAILING '0' FROM CAST(atomic_mass AS TEXT))::DECIMAL;
```

This command was for trimming trailing zeros from the atomic mass of elements. I did come across another function `trim_scale()` which was introduced in PostgreSQL 13, however the version in the virtual machine was using 12.9, so this was not an option. Which led me to the above command.

Overall I think this project was a good initial step at looking at a pre-existing database and figuring out what is going on and fixing it, even though it was a quite simple database (and semi-specific instructions were given to do so).

## Database Detail and Some Example SELECTions

<details>
  <summary>periodic_table Database table details</summary>

  ```sql
  periodic_table=> \d elements
                          Table "public.elements"
      Column     |         Type          | Collation | Nullable | Default 
  ---------------+-----------------------+-----------+----------+---------
  atomic_number | integer               |           | not null | 
  symbol        | character varying(2)  |           | not null | 
  name          | character varying(40) |           | not null | 
  Indexes:
      "elements_pkey" PRIMARY KEY, btree (atomic_number)
      "elements_atomic_number_key" UNIQUE CONSTRAINT, btree (atomic_number)
      "elements_name_key" UNIQUE CONSTRAINT, btree (name)
      "elements_symbol_key" UNIQUE CONSTRAINT, btree (symbol)
  Referenced by:
      TABLE "properties" CONSTRAINT "elements_atomic_number_fk" FOREIGN KEY (atomic_number) REFERENCES elements(atomic_number)
  ```

  ```sql
  periodic_table=> \d properties
                      Table "public.properties"
          Column         |  Type   | Collation | Nullable | Default 
  -----------------------+---------+-----------+----------+---------
  atomic_number         | integer |           | not null | 
  atomic_mass           | numeric |           | not null | 
  melting_point_celsius | numeric |           | not null | 
  boiling_point_celsius | numeric |           | not null | 
  type_id               | integer |           | not null | 
  Indexes:
      "properties_pkey" PRIMARY KEY, btree (atomic_number)
      "properties_atomic_number_key" UNIQUE CONSTRAINT, btree (atomic_number)
  Foreign-key constraints:
      "elements_atomic_number_fk" FOREIGN KEY (atomic_number) REFERENCES elements(atomic_number)
      "properties_type_id_fkey" FOREIGN KEY (type_id) REFERENCES types(type_id)
  ```

  ```sql
  periodic_table=> \d types
                                        Table "public.types"
  Column  |         Type          | Collation | Nullable |                Default                 
  ---------+-----------------------+-----------+----------+----------------------------------------
  type_id | integer               |           | not null | nextval('types_type_id_seq'::regclass)
  type    | character varying(30) |           | not null | 
  Indexes:
      "types_pkey" PRIMARY KEY, btree (type_id)
  Referenced by:
      TABLE "properties" CONSTRAINT "properties_type_id_fkey" FOREIGN KEY (type_id) REFERENCES types(type_id)
  ```

</details>

<details>
  <summary>Example SELECTions</summary>

  ```sql
  periodic_table=> SELECT * FROM elements;
  atomic_number | symbol |   name    
  ---------------+--------+-----------
              1 | H      | Hydrogen
              2 | He     | Helium
              3 | Li     | Lithium
              4 | Be     | Beryllium
              5 | B      | Boron
              6 | C      | Carbon
              7 | N      | Nitrogen
              8 | O      | Oxygen
              9 | F      | Fluorine
              10 | Ne     | Neon
  (10 rows)
  ```

  ```sql
  periodic_table=> SELECT * FROM properties;
  atomic_number | atomic_mass | melting_point_celsius | boiling_point_celsius | type_id 
  ---------------+-------------+-----------------------+-----------------------+---------
              1 |       1.008 |                -259.1 |                -252.9 |       1
              2 |      4.0026 |                -272.2 |                  -269 |       1
              6 |      12.011 |                  3550 |                  4027 |       1
              7 |      14.007 |                -210.1 |                -195.8 |       1
              8 |      15.999 |                  -218 |                  -183 |       1
              3 |        6.94 |                180.54 |                  1342 |       2
              4 |      9.0122 |                  1287 |                  2470 |       2
              5 |       10.81 |                  2075 |                  4000 |       3
              9 |      18.998 |                  -220 |                -188.1 |       1
              10 |       20.18 |                -248.6 |                -246.1 |       1
  (10 rows)
  ```

  ```sql
  periodic_table=> SELECT * FROM types;
  type_id |   type    
  ---------+-----------
        1 | nonmetal
        2 | metal
        3 | metalloid
  (3 rows)
  ```

  ```sql
  periodic_table=> SELECT * FROM properties INNER JOIN elements USING(atomic_number) INNER JOIN types USING(type_id);
  type_id | atomic_number | atomic_mass | melting_point_celsius | boiling_point_celsius | symbol |   name    |   type    
  ---------+---------------+-------------+-----------------------+-----------------------+--------+-----------+-----------
        1 |            10 |       20.18 |                -248.6 |                -246.1 | Ne     | Neon      | nonmetal
        1 |             9 |      18.998 |                  -220 |                -188.1 | F      | Fluorine  | nonmetal
        1 |             8 |      15.999 |                  -218 |                  -183 | O      | Oxygen    | nonmetal
        1 |             7 |      14.007 |                -210.1 |                -195.8 | N      | Nitrogen  | nonmetal
        1 |             6 |      12.011 |                  3550 |                  4027 | C      | Carbon    | nonmetal
        1 |             2 |      4.0026 |                -272.2 |                  -269 | He     | Helium    | nonmetal
        1 |             1 |       1.008 |                -259.1 |                -252.9 | H      | Hydrogen  | nonmetal
        2 |             4 |      9.0122 |                  1287 |                  2470 | Be     | Beryllium | metal
        2 |             3 |        6.94 |                180.54 |                  1342 | Li     | Lithium   | metal
        3 |             5 |       10.81 |                  2075 |                  4000 | B      | Boron     | metalloid
  (10 rows)
  ```

</details>

## Requirements / Instructions / User Stories

<details>
  <summary>Codeally virtual machine specific instructions</summary>

  You are started with a `periodic_table` database that has information about some chemical elements. You can connect to it by entering `psql --username=freecodecamp --dbname=periodic_table` in the terminal. You may want to get a little familiar with the existing tables, columns, and rows. Read the instructions below and complete user stories to finish the project. Certain tests may not pass until other user stories are complete. Good luck!

  Part 1: Fix the database

  There are some mistakes in the database that need to be fixed or changed. See the user stories below for what to change.

  Part 2: Create your git repository

  You need to make a small bash program. The code needs to be version controlled with `git`, so you will need to turn the suggested folder into a git repository.

  Part 3: Create the script

  Lastly, you need to make a script that accepts an argument in the form of an `atomic number`, `symbol`, or `name` of an element and outputs some information about the given element.

  **Notes:**
  If you leave your virtual machine, your database may not be saved. You can make a dump of it by entering `pg_dump -cC --inserts -U freecodecamp periodic_table > periodic_table.sql` in a bash terminal (not the psql one). It will save the commands to rebuild your database in `periodic_table.sql`. The file will be located where the command was entered. If it's anything inside the `project` folder, the file will be saved in the VM. You can rebuild the database by entering `psql -U postgres < periodic_table.sql` in a terminal where the `.sql` file is.

  If you are saving your progress on freeCodeCamp.org, after getting all the tests to pass, follow the instructions above to save a dump of your database. Save the `periodic_table.sql` file, as well as the final version of your `element.sh` file, in a public repository and submit the URL to it on freeCodeCamp.org.
</details>

Tasks required for this project to be considered complete:

- [x] You should rename the `weight` column to `atomic_mass`
- [x] You should rename the `melting_point` column to `melting_point_celsius` and the `boiling_point` column to `boiling_point_celsius`
- [x] Your `melting_point_celsius` and `boiling_point_celsius` columns should not accept null values
- [x] You should add the `UNIQUE` constraint to the `symbol` and `name` columns from the `elements` table
- [x] Your `symbol` and `name` columns should have the `NOT NULL` constraint
- [x] You should set the `atomic_number` column from the `properties` table as a foreign key that references the column of the same name in the `elements` table
- [x] You should create a `types` table that will store the three types of elements
- [x] Your `types` table should have a `type_id` column that is an integer and the primary key
- [x] Your `types` table should have a `type` column that's a `VARCHAR` and cannot be `null`. It will store the different types from the `type` column in the `properties` table
- [x] You should add three rows to your `types` table whose values are the three different types from the `properties` table
- [x] Your `properties` table should have a `type_id` foreign key column that references the `type_id` column from the `types` table. It should be an `INT` with the `NOT NULL` constraint
- [x] Each row in your `properties` table should have a `type_id` value that links to the correct type from the `types` table
- [x] You should capitalize the first letter of all the `symbol` values in the `elements` table. Be careful to only capitalize the letter and not change any others
- [x] You should remove all the trailing zeros after the decimals from each row of the `atomic_mass` column. You may need to adjust a data type to `DECIMAL` for this. Be careful not to change the value
- [x] You should add the element with atomic number `9` to your database. Its name is `Fluorine`, symbol is `F`, mass is `18.998`, melting point is `-220`, boiling point is `-188.1`, and it's a `nonmetal`
- [x] You should add the element with atomic number `10` to your database. Its name is `Neon`, symbol is `Ne`, mass is `20.18`, melting point is `-248.6`, boiling point is `-246.1`, and it's a `nonmetal`
- [x] You should create a `periodic_table` folder in the `project` folder and turn it into a git repository with `git init`
- [x] Your repository should have a `main` branch with all your commits
- [x] Your `periodic_table` repo should have at least five commits
- [x] You should create an `element.sh` file in your repo folder for the program I want you to make
- [x] Your script (`.sh`) file should have executable permissions
- [x] If you run `./element.sh`, it should output `Please provide an element as an argument.` and finish running.
- [x] If you run `./element.sh 1`, `./element.sh H`, or `./element.sh Hydrogen`, it should output `The element with atomic number 1 is Hydrogen (H). It's a nonmetal, with a mass of 1.008 amu. Hydrogen has a melting point of -259.1 celsius and a boiling point of -252.9 celsius.`
- [x] If you run `./element.sh` script with another element as input, you should get the same output but with information associated with the given element.
- [x] If the argument input to your `element.sh` script doesn't exist as an `atomic_number`, `symbol`, or `name` in the database, the output should be `I could not find that element in the database.`
- [x] The message for the first commit in your repo should be `Initial commit`
- [x] The rest of the commit messages should start with `fix:`, `feat:`, `refactor:`, `chore:`, or `test:`
- [x] You should delete the non existent element, whose `atomic_number` is `1000`, from the two tables
- [x] Your `properties` table should not have a `type` column
- [x] You should finish your project while on the `main` branch. Your working tree should be clean and you should not have any uncommitted changes
