# Learn Relational Databases by Building a Mario Database

[(copy of repo made throughout this challenge)](./Learn%20Relational%20Databases%20by%20Building%20a%20Mario%20Database)
---

List of Sections:

<!-- TOC -->

- [PostgreSQL Introduction](#postgresql-introduction)
- [Create a database](#create-a-database)
- [Connect to a database](#connect-to-a-database)
- [Display tables](#display-tables)
- [Creating a table](#creating-a-table)
- [More table detail](#more-table-detail)
- [Adding columns](#adding-columns)
- [Removing columns](#removing-columns)
- [VARCHAR data type](#varchar-data-type)
- [Rename a column](#rename-a-column)
- [Adding rows](#adding-rows)
- [SELECT command](#select-command)
- [Deleting a row](#deleting-a-row)
- [Removing a table](#removing-a-table)
- [Rename a database / making a mario database](#rename-a-database--making-a-mario-database)
- [DELETE / DROP Database](#delete--drop-database)
- [Starting the Mario database](#starting-the-mario-database)
- [Data type constraints](#data-type-constraints)
- [Change a table value](#change-a-table-value)
- [Ordering a selection](#ordering-a-selection)
- [Primary keys](#primary-keys)
- [Remove a constraint](#remove-a-constraint)
- [Another table](#another-table)
- [NUMERIC data type](#numeric-data-type)
- [Foreign keys](#foreign-keys)
- [UNIQUE constraint one-to-one](#unique-constraint-one-to-one)
- [Start adding character info](#start-adding-character-info)
- [Adjust more_info table](#adjust-more_info-table)
- [sounds table one-to-many](#sounds-table-one-to-many)
- [actions table many-to-many](#actions-table-many-to-many)
- [character_actions junction table](#character_actions-junction-table)
- [character_actions rows](#character_actions-rows)
- [Database complete take a tour JOIN command](#database-complete-take-a-tour-join-command)

<!-- /TOC -->

---

## PostgreSQL Introduction

```console
codeally@69c61b51631b:~/project$ echo hello PostgreSQL
hello PostgreSQL
```

The virtual machine you use throughout this challenge / lesson comes with PostgreSQL installed. You will use the Psql terminal application to interact with it. Login by typing `psql --username=freecodecamp dbname=postgres` into the terminal.

```console
codeally@69c61b51631b:~/project$ psql --username=freecodecamp dbname=postgres
Border style is 2.
Title is " ".
Pager usage is off.
psql (12.9 (Ubuntu 12.9-2.pgdg20.04+1))
Type "help" for help.

postgres=> 
```

You can see the prompt changes to indicate you are now interacting with PostgreSQL. Typing `\l` lists the databases.

```sql
postgres=> \l
                               List of databases
+-----------+----------+----------+---------+---------+-----------------------+
|   Name    |  Owner   | Encoding | Collate |  Ctype  |   Access privileges   |
+-----------+----------+----------+---------+---------+-----------------------+
| postgres  | postgres | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| template0 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|           |          |          |         |         | postgres=CTc/postgres |
| template1 | postgres | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|           |          |          |         |         | postgres=CTc/postgres |
+-----------+----------+----------+---------+---------+-----------------------+
(3 rows)
```

---

## Create a database

You can create your own database like this:

```sql
CREATE DATABASE database_name;
```

Capitalized words are keywords that tell PostgreSQL what to do. The database name being lowercase. **All commands need a semi-colon at the end**.

```sql
postgres=> CREATE DATABASE first_database;
CREATE DATABASE
postgres-> \l
                                   List of databases
+----------------+--------------+----------+---------+---------+-----------------------+
|      Name      |    Owner     | Encoding | Collate |  Ctype  |   Access privileges   |
+----------------+--------------+----------+---------+---------+-----------------------+
| first_database | freecodecamp | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| postgres       | postgres     | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| template0      | postgres     | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|                |              |          |         |         | postgres=CTc/postgres |
| template1      | postgres     | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|                |              |          |         |         | postgres=CTc/postgres |
+----------------+--------------+----------+---------+---------+-----------------------+
(4 rows)
```

*if you forgot to add the semicolon on a previous command you can simply add it on the next line and press enter to finish the command*

```sql
postgres=> CREATE DATABASE second_database;
CREATE DATABASE
postgres=> \l
                                    List of databases
+-----------------+--------------+----------+---------+---------+-----------------------+
|      Name       |    Owner     | Encoding | Collate |  Ctype  |   Access privileges   |
+-----------------+--------------+----------+---------+---------+-----------------------+
| first_database  | freecodecamp | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| postgres        | postgres     | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| second_database | freecodecamp | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| template0       | postgres     | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|                 |              |          |         |         | postgres=CTc/postgres |
| template1       | postgres     | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|                 |              |          |         |         | postgres=CTc/postgres |
+-----------------+--------------+----------+---------+---------+-----------------------+
(5 rows)
```

---

## Connect to a database

You can connect to a database by entering `\c database_name`. `\c` standing for connect.

```sql
postgres=> \c second_database;
You are now connected to database "second_database" as user "freecodecamp".
second_database=> 
```

You get a message saying which database you are connected to and as what user. The prompt changes to reflect what database you are connected to as well. The `postgres=>` prompt before must have meant we were connected to that database previously.

---

## Display tables

You can display tables with the `\d` command. `\d` standing for display.

```sql
second_database=> \d
Did not find any relations.
```

There are not tables in this database yet.

---

## Creating a table

You can create a table with a command similar to this, parenthesis are needed for this one:

```sql
CREATE TABLE table_name();
```

Creating a table.

```sql
second_database=> CREATE TABLE first_table();
CREATE TABLE
second_database=> \d
               List of relations
+--------+-------------+-------+--------------+
| Schema |    Name     | Type  |    Owner     |
+--------+-------------+-------+--------------+
| public | first_table | table | freecodecamp |
+--------+-------------+-------+--------------+
(1 row)
```

Create a second table.

```sql
second_database=> CREATE TABLE second_table();
CREATE TABLE
second_database=> \d
second_database=>                List of relations
+--------+--------------+-------+--------------+
| Schema |     Name     | Type  |    Owner     |
+--------+--------------+-------+--------------+
| public | first_table  | table | freecodecamp |
| public | second_table | table | freecodecamp |
+--------+--------------+-------+--------------+
(2 rows)
```

---

## More table detail

YOu can view more details about a table by adding the table name after the display command `\d table_name;`.

```sql
second_database=> \d second_table;
           Table "public.second_table"
+--------+------+-----------+----------+---------+
| Column | Type | Collation | Nullable | Default |
+--------+------+-----------+----------+---------+
+--------+------+-----------+----------+---------+
```

---

## Adding columns

You can add columns to describe the data in them. Here's an example:

```sql
ALTER TABLE table_name ADD COLUMN column_name DATATYPE;
```

```sql
second_database=> ALTER TABLE second_table ADD COLUMN first_column INT;
ALTER TABLE
second_database=> \d second_table;
second_database=>                 Table "public.second_table"
+--------------+---------+-----------+----------+---------+
|    Column    |  Type   | Collation | Nullable | Default |
+--------------+---------+-----------+----------+---------+
| first_column | integer |           |          |         |
+--------------+---------+-----------+----------+---------+
```

```sql
second_database=> ALTER TABLE second_table ADD COLUMN id INT;
ALTER TABLE
second_database=> ALTER TABLE second_table ADD COLUMN age INT;
ALTER TABLE
second_database=> \d second_table;
second_database=>                 Table "public.second_table"
+--------------+---------+-----------+----------+---------+
|    Column    |  Type   | Collation | Nullable | Default |
+--------------+---------+-----------+----------+---------+
| first_column | integer |           |          |         |
| id           | integer |           |          |         |
| age          | integer |           |          |         |
+--------------+---------+-----------+----------+---------+
```

---

## Removing columns

Columns can be removed in similar way, however we are not REMOVING we are DROPping the column:

```sql
ALTER TABLE table_name DROP COLUMN column_name;
```

```sql
second_database=> ALTER TABLE second_table DROP COLUMN age;
ALTER TABLE
second_database=> \d second_table;
                Table "public.second_table"
+--------------+---------+-----------+----------+---------+
|    Column    |  Type   | Collation | Nullable | Default |
+--------------+---------+-----------+----------+---------+
| first_column | integer |           |          |         |
| id           | integer |           |          |         |
+--------------+---------+-----------+----------+---------+
second_database=> ALTER TABLE second_table DROP COLUMN first_column;
ALTER TABLE
```

---

## VARCHAR data type

A common data type is `VARCHAR`. It's a short string of characters which needs to be given a maximum length.

```sql
second_database=> ALTER TABLE second_table ADD COLUMN name VARCHAR(30);
second_database=> ALTER TABLE
second_database=> \d second_table;
second_database=>                     Table "public.second_table"
+--------+-----------------------+-----------+----------+---------+
| Column |         Type          | Collation | Nullable | Default |
+--------+-----------------------+-----------+----------+---------+
| id     | integer               |           |          |         |
| name   | character varying(30) |           |          |         |
+--------+-----------------------+-----------+----------+---------+
```

---

## Rename a column

You can rename a column in this way:

```sql
ALTER TABLE table_name RENAME COLUMN column_name TO new_name;
```

```sql
second_database=> ALTER TABLE second_table RENAME COLUMN name TO username;
ALTER TABLE
second_database=> \d second_table;
                     Table "public.second_table"
+----------+-----------------------+-----------+----------+---------+
|  Column  |         Type          | Collation | Nullable | Default |
+----------+-----------------------+-----------+----------+---------+
| id       | integer               |           |          |         |
| username | character varying(30) |           |          |         |
+----------+-----------------------+-----------+----------+---------+
```

---

## Adding rows

Rows are the actual data in the table. One can be added like this:

```sql
INSERT INTO table_name(column_1, column_2) VALUES(value1, value2);
```

The `VARCHAR(30)` expects a string/`VARCHAR` so it must be in single quotes.

```sql
second_database=> INSERT INTO second_table(id, username) VALUES(1, 'Samus');
INSERT 0 1
```

## SELECT command

You can view the data in a table by querying it with the `SELECT` statement.

```sql
SELECT columns FROM table_name;
```

An asterisk `*` can be used to denote that you want to see all the columns.

```sql
second_database=> SELECT * FROM second_table;
second_database=>          
+----+----------+
| id | username |
+----+----------+
|  1 | Samus    |
+----+----------+
(1 row)
```

```sql
second_database=> INSERT INTO second_table(id, username) VALUES(2, 'Mario');
INSERT 0 1
second_database=> INSERT INTO second_table(id, username) VALUES(3, 'Luigi');
INSERT 0 1
second_database=> SELECT * FROM second_table;
+----+----------+
| id | username |
+----+----------+
|  1 | Samus    |
|  2 | Mario    |
|  3 | Luigi    |
+----+----------+
(3 rows)
```

---

## Deleting a row

You can delete a row in a table:

```sql
DELETE FROM table_name WHERE condition;
```

```sql
second_database=> DELETE FROM second_table WHERE username='Luigi';
DELETE 1
second_database=> SELECT * FROM second_table;
second_database=>          
+----+----------+
| id | username |
+----+----------+
|  1 | Samus    |
|  2 | Mario    |
+----+----------+
(2 rows)
```

```sql
second_database=> DELETE FROM second_table WHERE username='Mario';
DELETE 1
second_database=> DELETE FROM second_table WHERE username='Samus';
DELETE 1
second_database=> SELECT * FROM second_table;      
+----+----------+
| id | username |
+----+----------+
+----+----------+
(0 rows)

second_database=> \d
               List of relations
+--------+--------------+-------+--------------+
| Schema |     Name     | Type  |    Owner     |
+--------+--------------+-------+--------------+
| public | first_table  | table | freecodecamp |
| public | second_table | table | freecodecamp |
+--------+--------------+-------+--------------+
(2 rows)
second_database=> \d second_table;
                     Table "public.second_table"
+----------+-----------------------+-----------+----------+---------+
|  Column  |         Type          | Collation | Nullable | Default |
+----------+-----------------------+-----------+----------+---------+
| id       | integer               |           |          |         |
| username | character varying(30) |           |          |         |
+----------+-----------------------+-----------+----------+---------+
```

```sql
second_database=> ALTER TABLE second_table DROP COLUMN username;
ALTER TABLE
second_database=> ALTER TABLE second_table DROP COLUMN id;
ALTER TABLE
```

---

## Removing a table

You can remove/DROP a table with the command:

```sql
DROP TABLE table_name;
```

```sql
second_database=> DROP TABLE second_table;
DROP TABLE
second_database=> DROP TABLE first_table;
DROP TABLE
second_database=> \d
Did not find any relations.
second_database=> \l
                                    List of databases
+-----------------+--------------+----------+---------+---------+-----------------------+
|      Name       |    Owner     | Encoding | Collate |  Ctype  |   Access privileges   |
+-----------------+--------------+----------+---------+---------+-----------------------+
| first_database  | freecodecamp | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| postgres        | postgres     | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| second_database | freecodecamp | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| template0       | postgres     | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|                 |              |          |         |         | postgres=CTc/postgres |
| template1       | postgres     | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|                 |              |          |         |         | postgres=CTc/postgres |
+-----------------+--------------+----------+---------+---------+-----------------------+
(5 rows)
```

---

## Rename a database / making a mario database

```sql
ALTER DATABASE database_name RENAME TO new_datbase_name;
```

```sql
second_database=> ALTER DATABASE first_database RENAME TO mario_database;
ALTER DATABASE
second_database=> \l
second_database=>                                     List of databases
+-----------------+--------------+----------+---------+---------+-----------------------+
|      Name       |    Owner     | Encoding | Collate |  Ctype  |   Access privileges   |
+-----------------+--------------+----------+---------+---------+-----------------------+
| mario_database  | freecodecamp | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| postgres        | postgres     | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| second_database | freecodecamp | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| template0       | postgres     | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|                 |              |          |         |         | postgres=CTc/postgres |
| template1       | postgres     | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|                 |              |          |         |         | postgres=CTc/postgres |
+-----------------+--------------+----------+---------+---------+-----------------------+
(5 rows)
```

---

## DELETE / DROP Database

```sql
second_database=> \c mario_database;
You are now connected to database "mario_database" as user "freecodecamp".
```

Now you can drop the `second_database` since we are not connected to it.

```sql
mario_database=> DROP DATABASE second_database;
DROP DATABASE
mario_database=> \l
mario_database=>                                    List of databases
+----------------+--------------+----------+---------+---------+-----------------------+
|      Name      |    Owner     | Encoding | Collate |  Ctype  |   Access privileges   |
+----------------+--------------+----------+---------+---------+-----------------------+
| mario_database | freecodecamp | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| postgres       | postgres     | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| template0      | postgres     | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|                |              |          |         |         | postgres=CTc/postgres |
| template1      | postgres     | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|                |              |          |         |         | postgres=CTc/postgres |
+----------------+--------------+----------+---------+---------+-----------------------+
(4 rows)
```

---

## Starting the Mario database

The `SERIAL` type will make the column an `INT` with a `NOT NULL` constraint. This will also automatically increment the integer when a new row is added.

```sql
mario_database=> CREATE TABLE characters();
CREATE TABLE
mario_database=> ALTER TABLE characters ADD COLUMN character_id SERIAL;
ALTER TABLE
mario_database=> \d characters
                                     Table "public.characters"
+--------------+---------+-----------+----------+--------------------------------------------------+
|    Column    |  Type   | Collation | Nullable |                     Default                      |
+--------------+---------+-----------+----------+--------------------------------------------------+
| character_id | integer |           | not null | nextval('characters_character_id_seq'::regclass) |
+--------------+---------+-----------+----------+--------------------------------------------------+
```

---

## Data type constraints

You can give a data type a constraint of `NOT NULL` by typing it after the `DATATYPE`.

```sql
mario_database=> ALTER TABLE characters ADD COLUMN name VARCHAR(30) NOT NULL;
ALTER TABLE
```

Add some columns:

```sql
mario_database=> ALTER TABLE characters ADD COLUMN homeland VARCHAR(60);
ALTER TABLE
mario_database=> ALTER TABLE characters ADD COLUMN favorite_color VARCHAR(30);
ALTER TABLE
mario_database=> \d characters;
                                             Table "public.characters"
+----------------+-----------------------+-----------+----------+--------------------------------------------------+
|     Column     |         Type          | Collation | Nullable |                     Default                      |
+----------------+-----------------------+-----------+----------+--------------------------------------------------+
| character_id   | integer               |           | not null | nextval('characters_character_id_seq'::regclass) |
| name           | character varying(30) |           | not null |                                                  |
| homeland       | character varying(60) |           |          |                                                  |
| favorite_color | character varying(30) |           |          |                                                  |
+----------------+-----------------------+-----------+----------+--------------------------------------------------+
```

Add some rows:

```sql
mario_database=> INSERT INTO characters(name, homeland, favorite_color) VALUES('Mario', 'Mushroom Kingdom', 'Red');
INSERT 0 1
mario_database=> INSERT INTO characters(name, homeland, favorite_color) VALUES('Luigi', 'Mushroom Kingdom', 'Green');
INSERT 0 1
mario_database=> INSERT INTO characters(name, homeland, favorite_color) VALUES('Peach', 'Mushroom Kingdom', 'Pink');
INSERT 0 1
mario_database=> SELECT * FROM characters;                  
+--------------+-------+------------------+----------------+
| character_id | name  |     homeland     | favorite_color |
+--------------+-------+------------------+----------------+
|            1 | Mario | Mushroom Kingdom | Red            |
|            2 | Luigi | Mushroom Kingdom | Green          |
|            3 | Peach | Mushroom Kingdom | Pink           |
+--------------+-------+------------------+----------------+
(3 rows)
```

Adding rows one at a time can be tedious. Here's an example of how we can add the previously added rows at once:

```sql
INSERT INTO characters(name, homeland, favorite_color)
VALUES('Mario', 'Mushroom Kingdom', 'Red'),
('Luigi', 'Mushroom Kingdom', 'Green'),
('Peach', 'Mushroom Kingdom', 'Pink');
```

Try it out. If you don't get a message after a command it is likely incomplete. This is because you can put in a command over multiple lines.

```sql
mario_database=> INSERT INTO characters(name, homeland, favorite_color)
mario_database-> VALUES('Toadstool', 'Mushroom Kingdom', 'Red'),
mario_database-> ('Bowser', 'Mushroom Kingdom', 'Green');
INSERT 0 2
```

```sql
mario_database=> INSERT INTO characters(name, homeland, favorite_color)
mario_database-> VALUES('Daisy', 'Sarasaland', 'Yellow'),
mario_database-> ('Yoshi', 'Dinosaur Land', 'Green');
INSERT 0 2
mario_database=> SELECT * FROM characters;                
+--------------+-----------+------------------+----------------+
| character_id |   name    |     homeland     | favorite_color |
+--------------+-----------+------------------+----------------+
|            1 | Mario     | Mushroom Kingdom | Red            |
|            2 | Luigi     | Mushroom Kingdom | Green          |
|            3 | Peach     | Mushroom Kingdom | Pink           |
|            4 | Toadstool | Mushroom Kingdom | Red            |
|            5 | Bowser    | Mushroom Kingdom | Green          |
|            6 | Daisy     | Sarasaland       | Yellow         |
|            7 | Yoshi     | Dinosaur Land    | Green          |
+--------------+-----------+------------------+----------------+
(7 rows)
```

---

## Change a table value

You can change a value in a table if you make a mistake.

```sql
UPDATE table_name SET column_name=new_value WHERE condition;
```

```sql
mario_database=> UPDATE characters SET favorite_color='Orange' WHERE name='Daisy';
UPDATE 1
mario_database=> SELECT * FROM characters;                      
+--------------+-----------+------------------+----------------+
| character_id |   name    |     homeland     | favorite_color |
+--------------+-----------+------------------+----------------+
|            1 | Mario     | Mushroom Kingdom | Red            |
|            2 | Luigi     | Mushroom Kingdom | Green          |
|            3 | Peach     | Mushroom Kingdom | Pink           |
|            4 | Toadstool | Mushroom Kingdom | Red            |
|            5 | Bowser    | Mushroom Kingdom | Green          |
|            7 | Yoshi     | Dinosaur Land    | Green          |
|            6 | Daisy     | Sarasaland       | Orange         |
+--------------+-----------+------------------+----------------+
(7 rows)
```

This command found the row where `name` is `Daisy` and then set her `favorite_color` to `Orange`.

Adjust another value.

```sql
mario_database=> UPDATE characters SET name='Toad' WHERE favorite_color='Red';
UPDATE 2
mario_database=> SELECT * FROM characters;                     
+--------------+--------+------------------+----------------+
| character_id |  name  |     homeland     | favorite_color |
+--------------+--------+------------------+----------------+
|            2 | Luigi  | Mushroom Kingdom | Green          |
|            3 | Peach  | Mushroom Kingdom | Pink           |
|            5 | Bowser | Mushroom Kingdom | Green          |
|            7 | Yoshi  | Dinosaur Land    | Green          |
|            6 | Daisy  | Sarasaland       | Orange         |
|            1 | Toad   | Mushroom Kingdom | Red            |
|            4 | Toad   | Mushroom Kingdom | Red            |
+--------------+--------+------------------+----------------+
(7 rows)
```

Looks like a mistake was made. Both `Mario` and `Toad` have a `favorite_color` of `Red`. So both of their names were updated to `Toad`.

```sql
mario_database=> UPDATE characters SET name='Mario' WHERE character_id=1;
UPDATE 1
mario_database=> SELECT * FROM characters;
                               
+--------------+--------+------------------+----------------+
| character_id |  name  |     homeland     | favorite_color |
+--------------+--------+------------------+----------------+
|            2 | Luigi  | Mushroom Kingdom | Green          |
|            3 | Peach  | Mushroom Kingdom | Pink           |
|            5 | Bowser | Mushroom Kingdom | Green          |
|            7 | Yoshi  | Dinosaur Land    | Green          |
|            6 | Daisy  | Sarasaland       | Orange         |
|            4 | Toad   | Mushroom Kingdom | Red            |
|            1 | Mario  | Mushroom Kingdom | Red            |
+--------------+--------+------------------+----------------+
(7 rows)
```

Change some other values.

```sql
mario_database=> UPDATE characters SET favorite_color='Blue' WHERE name='Toad';
UPDATE 1
mario_database=> UPDATE characters SET favorite_color='Yellow' WHERE character_id=5;
UPDATE 1
mario_database=> UPDATE characters SET homeland='Koopa Kingdom' WHERE name='Bowser';
UPDATE 1
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
```

---

## Ordering a selection

You change how a selection is displayed by giving it additional parameters:

```sql
SELECT columns FROM table_name ORDER BY column_name;
```

```sql
mario_database=> SELECT * FROM characters ORDER BY character_id;
mario_database=>                                
+--------------+--------+------------------+----------------+
| character_id |  name  |     homeland     | favorite_color |
+--------------+--------+------------------+----------------+
|            1 | Mario  | Mushroom Kingdom | Red            |
|            2 | Luigi  | Mushroom Kingdom | Green          |
|            3 | Peach  | Mushroom Kingdom | Pink           |
|            4 | Toad   | Mushroom Kingdom | Blue           |
|            5 | Bowser | Koopa Kingdom    | Yellow         |
|            6 | Daisy  | Sarasaland       | Orange         |
|            7 | Yoshi  | Dinosaur Land    | Green          |
+--------------+--------+------------------+----------------+
(7 rows)
```

---

## Primary keys

A **primary key** is a column that uniquely identifies each row in a table. There can only be one **primary key** in a table.

```sql
ALTER TABLE table_name ADD PRIMARY KEY(column_name);
```

The `name` column looks unique let's try making that the **primary key**.

```sql
mario_database=> ALTER TABLE characters ADD PRIMARY KEY(name);
ALTER TABLE
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
    "characters_pkey" PRIMARY KEY, btree (name)
```

---

## Remove a constraint

Here's an example of how to remove a constraint.

```sql
ALTER TABLE table_name DROP CONSTRAINT constraint_name;
```

As you could see before in the table's details `\d characters;`, the **primary key constraint** is named `characters_pkey`. Let's remove it.

```sql
mario_database=> ALTER TABLE characters DROP CONSTRAINT characters_pkey;
ALTER TABLE

```

```sql
mario_database=> \d characters;
mario_database=>                                              Table "public.characters"
+----------------+-----------------------+-----------+----------+--------------------------------------------------+
|     Column     |         Type          | Collation | Nullable |                     Default                      |
+----------------+-----------------------+-----------+----------+--------------------------------------------------+
| character_id   | integer               |           | not null | nextval('characters_character_id_seq'::regclass) |
| name           | character varying(30) |           | not null |                                                  |
| homeland       | character varying(60) |           |          |                                                  |
| favorite_color | character varying(30) |           |          |                                                  |
+----------------+-----------------------+-----------+----------+--------------------------------------------------+
```

You can see the **primary key** constraint is now gone.

Let's set the `character_id` column as the **primary key** for this table as it would be better suited, as characters might have the same name.

```sql
mario_database=> ALTER TABLE characters ADD PRIMARY KEY(character_id);
ALTER TABLE
mario_database=> \d characters;
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
```

---

## Another table

Let's make a table named `more_info`.

```sql
mario_database=> CREATE TABLE more_info();
CREATE TABLE
mario_database=> \d
                        List of relations
+--------+-----------------------------+----------+--------------+
| Schema |            Name             |   Type   |    Owner     |
+--------+-----------------------------+----------+--------------+
| public | characters                  | table    | freecodecamp |
| public | characters_character_id_seq | sequence | freecodecamp |
| public | more_info                   | table    | freecodecamp |
+--------+-----------------------------+----------+--------------+
(3 rows)
```

We should have two tables now, but it appears there are now three

```sql
mario_database=> \d characters;
mario_database=>                                              Table "public.characters"
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
```

This third table named `characters_character_id_seq` is what finds the next value for the `character_id` column.

Let's add onto the `more_info` table.

```sql
mario_database=> ALTER TABLE more_info ADD COLUMN more_info_id SERIAL;
ALTER TABLE
mario_database=> ALTER TABLE more_info ADD PRIMARY KEY(more_info_id);
ALTER TABLE
mario_database=> \d
                        List of relations
+--------+-----------------------------+----------+--------------+
| Schema |            Name             |   Type   |    Owner     |
+--------+-----------------------------+----------+--------------+
| public | characters                  | table    | freecodecamp |
| public | characters_character_id_seq | sequence | freecodecamp |
| public | more_info                   | table    | freecodecamp |
| public | more_info_more_info_id_seq  | sequence | freecodecamp |
+--------+-----------------------------+----------+--------------+
(4 rows)
```

Another table was added when we add the **primary key** constraint to our new table.

Let's keep working on `more_info`.

```sql
mario_database=> ALTER TABLE more_info ADD COLUMN birthday DATE;
ALTER TABLE
mario_database=> ALTER TABLE more_info ADD COLUMN height INT;
ALTER TABLE
```

---

## NUMERIC data type

The data type `NUMERIC(4, 1)` is a data type for decimals. `NUMERIC(4, 1)` has up to four digits and one of them has to be right of the decimal.

```sql
mario_database=> ALTER TABLE more_info ADD COLUMN weight NUMERIC(4, 1);
ALTER TABLE
mario_database=> \d more_info
                                        Table "public.more_info"
+--------------+--------------+-----------+----------+-------------------------------------------------+
|    Column    |     Type     | Collation | Nullable |                     Default                     |
+--------------+--------------+-----------+----------+-------------------------------------------------+
| more_info_id | integer      |           | not null | nextval('more_info_more_info_id_seq'::regclass) |
| birthday     | date         |           |          |                                                 |
| height       | integer      |           |          |                                                 |
| weight       | numeric(4,1) |           |          |                                                 |
+--------------+--------------+-----------+----------+-------------------------------------------------+
Indexes:
    "more_info_pkey" PRIMARY KEY, btree (more_info_id)
```

---

## Foreign keys

To know what row a character is for, you need ot set a **foreign key** so you can relate rows from this table to rows from you `characters` table. Here's an example:

```sql
ALTER TABLE table_name ADD COLUMN column_name DATATYPE REFERENCES referenced_table_name(referenced_column_name);
```

Let's make a `character_id` column that is a **foreign key** for the `character_id` column that is in the `characters` table.

```sql
mario_database=> ALTER TABLE more_info ADD COLUMN character_id INT REFERENCES characters(character_id);
ALTER TABLE
```

In order to set a row in `more_info` for Mario, you need to set the `character_id` (**foreign key**) value to whatever it is in the `characters` table.

```sql
mario_database=> \d more_info
                                        Table "public.more_info"
+--------------+--------------+-----------+----------+-------------------------------------------------+
|    Column    |     Type     | Collation | Nullable |                     Default                     |
+--------------+--------------+-----------+----------+-------------------------------------------------+
| more_info_id | integer      |           | not null | nextval('more_info_more_info_id_seq'::regclass) |
| birthday     | date         |           |          |                                                 |
| height       | integer      |           |          |                                                 |
| weight       | numeric(4,1) |           |          |                                                 |
| character_id | integer      |           |          |                                                 |
+--------------+--------------+-----------+----------+-------------------------------------------------+
Indexes:
    "more_info_pkey" PRIMARY KEY, btree (more_info_id)
Foreign-key constraints:
    "more_info_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
```

We can see the **foreign key** at the bottom.

---

## UNIQUE constraint one-to-one

These tables now have a "one-to-one" relationship. **One** row in the `characters` table will be related to exactly **one** row in `more_info` and vice versa.

We can enforce this by adding the `UNIQUE` constraint to the foreign key.

```sql
ALTER TABLE table_name ADD UNIQUE(column_name);
```

```sql
mario_database=> ALTER TABLE more_info ADD UNIQUE(character_id);
ALTER TABLE
```

The column should also be `NOT NULL` because we do not want to have a row that is for nobody.

```sql
ALTER TABLE table_name ALTER COLUMN column_name SET NOT NULL;
```

```sql
mario_database=> ALTER TABLE more_info ALTER COLUMN character_id SET NOT NULL;
ALTER TABLE
mario_database=> \d more_info
                                        Table "public.more_info"
+--------------+--------------+-----------+----------+-------------------------------------------------+
|    Column    |     Type     | Collation | Nullable |                     Default                     |
+--------------+--------------+-----------+----------+-------------------------------------------------+
| more_info_id | integer      |           | not null | nextval('more_info_more_info_id_seq'::regclass) |
| birthday     | date         |           |          |                                                 |
| height       | integer      |           |          |                                                 |
| weight       | numeric(4,1) |           |          |                                                 |
| character_id | integer      |           | not null |                                                 |
+--------------+--------------+-----------+----------+-------------------------------------------------+
Indexes:
    "more_info_pkey" PRIMARY KEY, btree (more_info_id)
    "more_info_character_id_key" UNIQUE CONSTRAINT, btree (character_id)
Foreign-key constraints:
    "more_info_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
```

---

## Start adding character info

The structure is now set. We need to know what `character_id` we need for the foreign key column. You can pick columns by putting in the column name instead of `*` when using `SELECT`.

```sql
mario_database=> SELECT character_id FROM characters;
        
+--------------+
| character_id |
+--------------+
|            2 |
|            3 |
|            7 |
|            6 |
|            1 |
|            4 |
|            5 |
+--------------+
(7 rows)
```

This isn't very helpful at all since it is all just a bunch of numbers.

Let's select two columns at once.

```sql
mario_database=> SELECT character_id, name FROM characters;
           
+--------------+--------+
| character_id |  name  |
+--------------+--------+
|            2 | Luigi  |
|            3 | Peach  |
|            7 | Yoshi  |
|            6 | Daisy  |
|            1 | Mario  |
|            4 | Toad   |
|            5 | Bowser |
+--------------+--------+
(7 rows)
```

Let's add Mario's information.

Mario
| birthday |height|weight|
|----------|------|------|
|1981-07-09| 155  |	64.5 |

```sql
mario_database=> INSERT INTO more_info(character_id, birthday, height, weight) VALUES(1, '1981-07-09', 155, 64.5);
INSERT 0 1
mario_database=> SELECT * FROM more_info;
                               
+--------------+------------+--------+--------+--------------+
| more_info_id |  birthday  | height | weight | character_id |
+--------------+------------+--------+--------+--------------+
|            1 | 1981-07-09 |    155 |   64.5 |            1 |
+--------------+------------+--------+--------+--------------+
(1 row)
```

Lets add some more character information.

Luigi
|birthday	|height	|weight|
|---|---|---|
|1983-07-14|	175	|48.8|

Peach
|birthday	|height	|weight|
|---|---|---|
|1985-10-18	|173	|52.2|

```sql
mario_database=> SELECT character_id, name FROM characters;
+--------------+--------+
| character_id |  name  |
+--------------+--------+
|            2 | Luigi  |
|            3 | Peach  |
|            7 | Yoshi  |
|            6 | Daisy  |
|            1 | Mario  |
|            4 | Toad   |
|            5 | Bowser |
+--------------+--------+
(7 rows)

mario_database=> INSERT INTO more_info(character_id, birthday, height, weight) VALUES(2, '1983-07-14', 175, 48.8);
INSERT 0 1
mario_database=> INSERT INTO more_info(character_id, birthday, height, weight) VALUES(3, '1985-10-18', 173, 52.2);
INSERT 0 1
mario_database=> SELECT * FROM more_info;
                               
+--------------+------------+--------+--------+--------------+
| more_info_id |  birthday  | height | weight | character_id |
+--------------+------------+--------+--------+--------------+
|            1 | 1981-07-09 |    155 |   64.5 |            1 |
|            2 | 1983-07-14 |    175 |   48.8 |            2 |
|            3 | 1985-10-18 |    173 |   52.2 |            3 |
+--------------+------------+--------+--------+--------------+
```

Toad is next. We can add the `WHERE` condition to get just his `character_id` and `name` instead of having all the characters listed.

Toad
|birthday	|height	|weight|
|---|---|---|
|1950-01-10|	66|	35.6|

```sql
mario_database=> SELECT character_id, name FROM characters WHERE name='Toad';           
+--------------+------+
| character_id | name |
+--------------+------+
|            4 | Toad |
+--------------+------+
(1 row)

mario_database=> INSERT INTO more_info(character_id, birthday, height, weight) VALUES(4, '1950-01-10', 66, 35.6);
INSERT 0 1
mario_database=> SELECT * FROM more_info;
                            
+--------------+------------+--------+--------+--------------+
| more_info_id |  birthday  | height | weight | character_id |
+--------------+------------+--------+--------+--------------+
|            1 | 1981-07-09 |    155 |   64.5 |            1 |
|            2 | 1983-07-14 |    175 |   48.8 |            2 |
|            3 | 1985-10-18 |    173 |   52.2 |            3 |
|            4 | 1950-01-10 |     66 |   35.6 |            4 |
+--------------+------------+--------+--------+--------------+
(4 rows)
```

Bowser
|birthday	|height|	weight|
|---|---|---|
|1990-10-29	|258	|300|

```sql
mario_database=> SELECT character_id, name FROM characters WHERE name='Bowser';
             
+--------------+--------+
| character_id |  name  |
+--------------+--------+
|            5 | Bowser |
+--------------+--------+
(1 row)

mario_database=> INSERT INTO more_info(character_id, birthday, height, weight) VALUES(5, '1990-10-29', 258, 300);
INSERT 0 1
```

Daisy
|birthday	|height	|weight|
|---|---|---|
|1989-07-31|	NULL|	NULL|

`NULL` can be used when there is no value, or you can simply not include the null columns when inserting.

```sql
mario_database=> SELECT character_id, name FROM characters WHERE name='Daisy';
           
+--------------+-------+
| character_id | name  |
+--------------+-------+
|            6 | Daisy |
+--------------+-------+
(1 row)

mario_database=> INSERT INTO more_info(character_id, birthday, height, weight) VALUES(6, '1989-07-31', NULL, NULL);
INSERT 0 1
```

Yoshi
|birthday	|height	|weight|
|---|---|---|
|1990-04-13|	162	|59.1|

```sql
mario_database=> SELECT character_id, name FROM characters WHERE name='Yoshi';           
+--------------+-------+
| character_id | name  |
+--------------+-------+
|            7 | Yoshi |
+--------------+-------+
(1 row)

mario_database=> INSERT INTO more_info(character_id, birthday, height, weight) VALUES(7, '1990-04-13', 162, 59.1);
INSERT 0 1
```

`NULL` values show up as blank.

```sql
mario_database=> SELECT * FROM more_info;
                               
+--------------+------------+--------+--------+--------------+
| more_info_id |  birthday  | height | weight | character_id |
+--------------+------------+--------+--------+--------------+
|            1 | 1981-07-09 |    155 |   64.5 |            1 |
|            2 | 1983-07-14 |    175 |   48.8 |            2 |
|            3 | 1985-10-18 |    173 |   52.2 |            3 |
|            4 | 1950-01-10 |     66 |   35.6 |            4 |
|            5 | 1990-10-29 |    258 |  300.0 |            5 |
|            6 | 1989-07-31 |        |        |            6 |
|            7 | 1990-04-13 |    162 |   59.1 |            7 |
+--------------+------------+--------+--------+--------------+
(7 rows)
```

---

## Adjust more_info table

We don't know the units for the `height` and `weight` columns, let's rename them.

```sql
mario_database=> ALTER TABLE more_info RENAME COLUMN height TO height_in_cm;
ALTER TABLE
mario_database=> ALTER TABLE more_info RENAME COLUMN weight TO weight_in_kg;
ALTER TABLE
mario_database=> SELECT * FROM more_info;
                                     
+--------------+------------+--------------+--------------+--------------+
| more_info_id |  birthday  | height_in_cm | weight_in_kg | character_id |
+--------------+------------+--------------+--------------+--------------+
|            1 | 1981-07-09 |          155 |         64.5 |            1 |
|            2 | 1983-07-14 |          175 |         48.8 |            2 |
|            3 | 1985-10-18 |          173 |         52.2 |            3 |
|            4 | 1950-01-10 |           66 |         35.6 |            4 |
|            5 | 1990-10-29 |          258 |        300.0 |            5 |
|            6 | 1989-07-31 |              |              |            6 |
|            7 | 1990-04-13 |          162 |         59.1 |            7 |
+--------------+------------+--------------+--------------+--------------+
(7 rows)
```

---

## sounds table one-to-many

Let's create a table that will hold the filenames of sounds the characters make. Inside the parenthesis when creating a table you can put columns for a table so you don't need to add them with a separate command.

```sql
CREATE TABLE table_name(column_name DATATYPE CONSTRAINTS);
```

```sql
mario_database=> CREATE TABLE sounds(sound_id SERIAL PRIMARY KEY);
CREATE TABLE
mario_database=> \d
                        List of relations
+--------+-----------------------------+----------+--------------+
| Schema |            Name             |   Type   |    Owner     |
+--------+-----------------------------+----------+--------------+
| public | characters                  | table    | freecodecamp |
| public | characters_character_id_seq | sequence | freecodecamp |
| public | more_info                   | table    | freecodecamp |
| public | more_info_more_info_id_seq  | sequence | freecodecamp |
| public | sounds                      | table    | freecodecamp |
| public | sounds_sound_id_seq         | sequence | freecodecamp |
+--------+-----------------------------+----------+--------------+
(6 rows)
```

```sql
mario_database=> ALTER TABLE sounds ADD COLUMN filename VARCHAR(40) NOT NULL UNIQUE;
ALTER TABLE
```

We want to use the `character_id` as a **foreign key** again. This time it's going to be a "one-to-many" relationship, because **one** character will have **many** sounds, but no sound will have more than one character.

```sql
ALTER TABLE table_name ADD COLUMN column_name DATATYPE CONSTRAINT REFERENCES referenced_table_name(referenced_column_name);
```

```sql
mario_database=> ALTER TABLE sounds ADD COLUMN character_id INT NOT NULL REFERENCES characters(character_id);
ALTER TABLE
mario_database=> \d sounds
                                          Table "public.sounds"
+--------------+-----------------------+-----------+----------+------------------------------------------+
|    Column    |         Type          | Collation | Nullable |                 Default                  |
+--------------+-----------------------+-----------+----------+------------------------------------------+
| sound_id     | integer               |           | not null | nextval('sounds_sound_id_seq'::regclass) |
| filename     | character varying(40) |           | not null |                                          |
| character_id | integer               |           | not null |                                          |
+--------------+-----------------------+-----------+----------+------------------------------------------+
Indexes:
    "sounds_pkey" PRIMARY KEY, btree (sound_id)
    "sounds_filename_key" UNIQUE CONSTRAINT, btree (filename)
Foreign-key constraints:
    "sounds_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
```

Let's add some sound files.

```sql
mario_database=> SELECT * FROM characters ORDER BY character_id;
                               
+--------------+--------+------------------+----------------+
| character_id |  name  |     homeland     | favorite_color |
+--------------+--------+------------------+----------------+
|            1 | Mario  | Mushroom Kingdom | Red            |
|            2 | Luigi  | Mushroom Kingdom | Green          |
|            3 | Peach  | Mushroom Kingdom | Pink           |
|            4 | Toad   | Mushroom Kingdom | Blue           |
|            5 | Bowser | Koopa Kingdom    | Yellow         |
|            6 | Daisy  | Sarasaland       | Orange         |
|            7 | Yoshi  | Dinosaur Land    | Green          |
+--------------+--------+------------------+----------------+
(7 rows)

mario_database=> INSERT INTO sounds(character_id, filename) VALUES(1, 'its-a-me.wav');
INSERT 0 1
mario_database=> INSERT INTO sounds(character_id, filename) VALUES(1, 'yippee.wav');
INSERT 0 1
mario_database=> INSERT INTO sounds(character_id, filename) VALUES(2, 'ha-ha.wav');
INSERT 0 1
mario_database=> INSERT INTO sounds(character_id, filename) VALUES(2, 'oh-yeah.wav');
INSERT 0 1
mario_database=> INSERT INTO sounds(character_id, filename) VALUES(3, 'yay.wav'), (3, 'woo-hoo.wav');
INSERT 0 2
mario_database=> INSERT INTO sounds(character_id, filename) VALUES(3, 'mm-hmm.wav'), (1, 'yahoo.wav');
INSERT 0 2
mario_database=> SELECT * FROM sounds;
                     
+----------+--------------+--------------+
| sound_id |   filename   | character_id |
+----------+--------------+--------------+
|        1 | its-a-me.wav |            1 |
|        2 | yippee.wav   |            1 |
|        3 | ha-ha.wav    |            2 |
|        4 | oh-yeah.wav  |            2 |
|        5 | yay.wav      |            3 |
|        6 | woo-hoo.wav  |            3 |
|        7 | mm-hmm.wav   |            3 |
|        8 | yahoo.wav    |            1 |
+----------+--------------+--------------+
(8 rows)
```

We can see the "one-to-many" relationship now. Each character can have multiple sounds, but they do not share a sound.

---

## actions table many-to-many

Make a new table called `actions`.

```sql
mario_database=> CREATE TABLE actions(action_id SERIAL PRIMARY KEY);
CREATE TABLE
mario_database=> ALTER TABLE actions ADD COLUMN action VARCHAR(20) UNIQUE NOT NULL;
ALTER TABLE
```

This table will not have any **foreign keys** it's going to have a "many-to-many" relationship with the characters table. This is so **man** of the characters can perform **many** actions. We will see why we **do not** need a foreign key later.

```sql
mario_database=> INSERT INTO actions(action) VALUES('run');
INSERT 0 1
mario_database=> INSERT INTO actions(action) VALUES('jump');
INSERT 0 1
mario_database=> INSERT INTO actions(action) VALUES('duck');
INSERT 0 1
mario_database=> SELECT * FROM actions;

+-----------+--------+
| action_id | action |
+-----------+--------+
|         1 | run    |
|         2 | jump   |
|         3 | duck   |
+-----------+--------+
(3 rows)
```

---

## character_actions junction table

"Many-to-many" relationships usually use a **junction** table to link two tables together, which will form two "one-to-many" relationships.

The `characters` and `actions` table will be linked using a junction table.

Create a table `character_actions` which will describe what actions each character can perform.

```sql
mario_database=> CREATE TABLE character_actions();
CREATE TABLE
```

Tables so far:

```sql
mario_database=> \d
mario_database=>                         List of relations
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
```

The junction table will use the primary keys from the `characters` and `actions` tables as foreign keys to create the relationship.

```sql
mario_database=> ALTER TABLE character_actions ADD COLUMN character_id INT NOT NULL;
ALTER TABLE
```

You can set an existing column as a foreign key like this:

```sql
ALTER TABLE table_name ADD FOREIGN KEY(column_name) REFERENCES referenced_table(referenced_column);
```

```sql
mario_database=> ALTER TABLE character_actions ADD FOREIGN KEY(character_id) REFERENCES characters(character_id);
ALTER TABLE
mario_database=> \d character_actions
             Table "public.character_actions"
+--------------+---------+-----------+----------+---------+
|    Column    |  Type   | Collation | Nullable | Default |
+--------------+---------+-----------+----------+---------+
| character_id | integer |           | not null |         |
+--------------+---------+-----------+----------+---------+
Foreign-key constraints:
    "character_actions_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
```

```sql
mario_database=> ALTER TABLE character_actions ADD COLUMN action_id INT NOT NULL;
ALTER TABLE
mario_database=> ALTER TABLE character_actions ADD FOREIGN KEY(action_id) REFERENCES actions(action_id);
ALTER TABLE
mario_database=> \d character_actions
mario_database=>              Table "public.character_actions"
+--------------+---------+-----------+----------+---------+
|    Column    |  Type   | Collation | Nullable | Default |
+--------------+---------+-----------+----------+---------+
| character_id | integer |           | not null |         |
| action_id    | integer |           | not null |         |
+--------------+---------+-----------+----------+---------+
Foreign-key constraints:
    "character_actions_action_id_fkey" FOREIGN KEY (action_id) REFERENCES actions(action_id)
    "character_actions_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
```

Each table should have a **primary key**. Previous tables only had a single column as a **primary key**. This one will be different. You can create a primary key from two columns, known as a **composite** primary key.

```sql
ALTER TABLE table_name ADD PRIMARY KEY(column1, column2);
```

```sql
mario_database=> ALTER TABLE character_actions ADD PRIMARY KEY(character_id, action_id);
ALTER TABLE
mario_database=> \d character_actions
             Table "public.character_actions"
+--------------+---------+-----------+----------+---------+
|    Column    |  Type   | Collation | Nullable | Default |
+--------------+---------+-----------+----------+---------+
| character_id | integer |           | not null |         |
| action_id    | integer |           | not null |         |
+--------------+---------+-----------+----------+---------+
Indexes:
    "character_actions_pkey" PRIMARY KEY, btree (character_id, action_id)
Foreign-key constraints:
    "character_actions_action_id_fkey" FOREIGN KEY (action_id) REFERENCES actions(action_id)
    "character_actions_character_id_fkey" FOREIGN KEY (character_id) REFERENCES characters(character_id)
```

This table will end up having multiple rows with the same `character_id`, and multiple rows with the same `action_id`. This will make neither of them unique. But we will never have the same `character_id` and `action_id` in a single row. So the two columns can be used together to uniquely identify each row.

---

## character_actions rows

Add actions that Yoshi can perform.

```sql
mario_database=> SELECT * FROM characters, actions WHERE name='Yoshi';
mario_database=>                                        
+--------------+-------+---------------+----------------+-----------+--------+
| character_id | name  |   homeland    | favorite_color | action_id | action |
+--------------+-------+---------------+----------------+-----------+--------+
|            7 | Yoshi | Dinosaur Land | Green          |         1 | run    |
|            7 | Yoshi | Dinosaur Land | Green          |         2 | jump   |
|            7 | Yoshi | Dinosaur Land | Green          |         3 | duck   |
+--------------+-------+---------------+----------------+-----------+--------+
(3 rows)


mario_database=> INSERT INTO character_actions(character_id, action_id) VALUES(7, 1), (7, 2), (7, 3);
INSERT 0 3

mario_database=> SELECT * from character_actions;
              
+--------------+-----------+
| character_id | action_id |
+--------------+-----------+
|            7 |         1 |
|            7 |         2 |
|            7 |         3 |
+--------------+-----------+
(3 rows)
```

Add daisy and bowser's actions.

```sql
mario_database=> SELECT * FROM characters, actions WHERE name='Daisy' OR name='Bowser';
                                        
+--------------+--------+---------------+----------------+-----------+--------+
| character_id |  name  |   homeland    | favorite_color | action_id | action |
+--------------+--------+---------------+----------------+-----------+--------+
|            6 | Daisy  | Sarasaland    | Orange         |         1 | run    |
|            5 | Bowser | Koopa Kingdom | Yellow         |         1 | run    |
|            6 | Daisy  | Sarasaland    | Orange         |         2 | jump   |
|            5 | Bowser | Koopa Kingdom | Yellow         |         2 | jump   |
|            6 | Daisy  | Sarasaland    | Orange         |         3 | duck   |
|            5 | Bowser | Koopa Kingdom | Yellow         |         3 | duck   |
+--------------+--------+---------------+----------------+-----------+--------+
(6 rows)

mario_database=> INSERT INTO character_actions(character_id, action_id) VALUES(5, 1), (5, 2), (5, 3), (6, 1), (6, 2), (6, 3);
INSERT 0 6
```

Add Toad.

```sql
mario_database=> SELECT * FROM characters, actions WHERE name='Toad';
mario_database=>                                         
+--------------+------+------------------+----------------+-----------+--------+
| character_id | name |     homeland     | favorite_color | action_id | action |
+--------------+------+------------------+----------------+-----------+--------+
|            4 | Toad | Mushroom Kingdom | Blue           |         1 | run    |
|            4 | Toad | Mushroom Kingdom | Blue           |         2 | jump   |
|            4 | Toad | Mushroom Kingdom | Blue           |         3 | duck   |
+--------------+------+------------------+----------------+-----------+--------+
(3 rows)


mario_database=> INSERT INTO character_actions(character_id, action_id) VALUES(4, 1), (4, 2), (4, 3);
INSERT 0 3
```

Add peach.

```sql
mario_database=> SELECT * FROM characters, actions WHERE name='Peach';
                                         
+--------------+-------+------------------+----------------+-----------+--------+
| character_id | name  |     homeland     | favorite_color | action_id | action |
+--------------+-------+------------------+----------------+-----------+--------+
|            3 | Peach | Mushroom Kingdom | Pink           |         1 | run    |
|            3 | Peach | Mushroom Kingdom | Pink           |         2 | jump   |
|            3 | Peach | Mushroom Kingdom | Pink           |         3 | duck   |
+--------------+-------+------------------+----------------+-----------+--------+
(3 rows)

mario_database=> INSERT INTO character_actions(character_id, action_id) VALUES(3, 1), (3, 2), (3, 3);
INSERT 0 3
```

Add Luigi.

```sql
mario_database=> SELECT * FROM characters, actions WHERE name='Luigi';
mario_database=>                                          
+--------------+-------+------------------+----------------+-----------+--------+
| character_id | name  |     homeland     | favorite_color | action_id | action |
+--------------+-------+------------------+----------------+-----------+--------+
|            2 | Luigi | Mushroom Kingdom | Green          |         1 | run    |
|            2 | Luigi | Mushroom Kingdom | Green          |         2 | jump   |
|            2 | Luigi | Mushroom Kingdom | Green          |         3 | duck   |
+--------------+-------+------------------+----------------+-----------+--------+
(3 rows)

SELECT * FROM chaINSERT INTO character_actions(character_id, action_id) VALUES(2, 1), (2, 2), (2, 3);
mario_database=> INSERT 0 3
```

Add Mario.

```sql
mario_database=> SELECT * FROM characters, actions WHERE name='Mario';
                                         
+--------------+-------+------------------+----------------+-----------+--------+
| character_id | name  |     homeland     | favorite_color | action_id | action |
+--------------+-------+------------------+----------------+-----------+--------+
|            1 | Mario | Mushroom Kingdom | Red            |         1 | run    |
|            1 | Mario | Mushroom Kingdom | Red            |         2 | jump   |
|            1 | Mario | Mushroom Kingdom | Red            |         3 | duck   |
+--------------+-------+------------------+----------------+-----------+--------+
(3 rows)

mario_database=> INSERT INTO character_actions(character_id, action_id) VALUES(1, 1), (1, 2), (1, 3);
INSERT 0 3
```

```sql
mario_database=> SELECT * FROM character_actions;
              
+--------------+-----------+
| character_id | action_id |
+--------------+-----------+
|            7 |         1 |
|            7 |         2 |
|            7 |         3 |
|            6 |         1 |
|            6 |         2 |
|            6 |         3 |
|            5 |         1 |
|            5 |         2 |
|            5 |         3 |
|            4 |         1 |
|            4 |         2 |
|            4 |         3 |
|            3 |         1 |
|            3 |         2 |
|            3 |         3 |
|            2 |         1 |
|            2 |         2 |
|            2 |         3 |
|            1 |         1 |
|            1 |         2 |
|            1 |         3 |
+--------------+-----------+
(21 rows)
```

---

## Database complete take a tour JOIN command

Display all tables

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
```

Look at all the data in the `characters` table.

```sql
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
```

View the data in the `more_info` table

```sql
mario_database=> SELECT * FROM more_info;
mario_database=>                                      
+--------------+------------+--------------+--------------+--------------+
| more_info_id |  birthday  | height_in_cm | weight_in_kg | character_id |
+--------------+------------+--------------+--------------+--------------+
|            1 | 1981-07-09 |          155 |         64.5 |            1 |
|            2 | 1983-07-14 |          175 |         48.8 |            2 |
|            3 | 1985-10-18 |          173 |         52.2 |            3 |
|            4 | 1950-01-10 |           66 |         35.6 |            4 |
|            5 | 1990-10-29 |          258 |        300.0 |            5 |
|            6 | 1989-07-31 |              |              |            6 |
|            7 | 1990-04-13 |          162 |         59.1 |            7 |
+--------------+------------+--------------+--------------+--------------+
(7 rows)
```

You can see the `character_id` there so would just need to find the matching id in the `characters` table to find out who it's for. OR since you added that as a foreign key, you can get all the data from both tables with a `JOIN` command.

```sql
SELECT columns FROM table_1 FULL JOIN table_2 ON table_1.primary_key_column = table_2.foreign_key_column;
```

```sql
mario_database=> SELECT * FROM characters FULL JOIN more_info ON characters.character_id = more_info.character_id;
                                                                   
+--------------+--------+------------------+----------------+--------------+------------+--------------+--------------+--------------+
| character_id |  name  |     homeland     | favorite_color | more_info_id |  birthday  | height_in_cm | weight_in_kg | character_id |
+--------------+--------+------------------+----------------+--------------+------------+--------------+--------------+--------------+
|            1 | Mario  | Mushroom Kingdom | Red            |            1 | 1981-07-09 |          155 |         64.5 |            1 |
|            2 | Luigi  | Mushroom Kingdom | Green          |            2 | 1983-07-14 |          175 |         48.8 |            2 |
|            3 | Peach  | Mushroom Kingdom | Pink           |            3 | 1985-10-18 |          173 |         52.2 |            3 |
|            4 | Toad   | Mushroom Kingdom | Blue           |            4 | 1950-01-10 |           66 |         35.6 |            4 |
|            5 | Bowser | Koopa Kingdom    | Yellow         |            5 | 1990-10-29 |          258 |        300.0 |            5 |
|            6 | Daisy  | Sarasaland       | Orange         |            6 | 1989-07-31 |              |              |            6 |
|            7 | Yoshi  | Dinosaur Land    | Green          |            7 | 1990-04-13 |          162 |         59.1 |            7 |
+--------------+--------+------------------+----------------+--------------+------------+--------------+--------------+--------------+
(7 rows)
```

This was the "one-to-one" relationship.

Use another `JOIN` command to view the `characters` and `sounds` tables together.

```sql
mario_database=> SELECT * FROM characters FULL JOIN sounds ON characters.character_id = sounds.character_id;
                                                   
+--------------+--------+------------------+----------------+----------+--------------+--------------+
| character_id |  name  |     homeland     | favorite_color | sound_id |   filename   | character_id |
+--------------+--------+------------------+----------------+----------+--------------+--------------+
|            1 | Mario  | Mushroom Kingdom | Red            |        1 | its-a-me.wav |            1 |
|            1 | Mario  | Mushroom Kingdom | Red            |        2 | yippee.wav   |            1 |
|            2 | Luigi  | Mushroom Kingdom | Green          |        3 | ha-ha.wav    |            2 |
|            2 | Luigi  | Mushroom Kingdom | Green          |        4 | oh-yeah.wav  |            2 |
|            3 | Peach  | Mushroom Kingdom | Pink           |        5 | yay.wav      |            3 |
|            3 | Peach  | Mushroom Kingdom | Pink           |        6 | woo-hoo.wav  |            3 |
|            3 | Peach  | Mushroom Kingdom | Pink           |        7 | mm-hmm.wav   |            3 |
|            1 | Mario  | Mushroom Kingdom | Red            |        8 | yahoo.wav    |            1 |
|            5 | Bowser | Koopa Kingdom    | Yellow         |          |              |              |
|            6 | Daisy  | Sarasaland       | Orange         |          |              |              |
|            4 | Toad   | Mushroom Kingdom | Blue           |          |              |              |
|            7 | Yoshi  | Dinosaur Land    | Green          |          |              |              |
+--------------+--------+------------------+----------------+----------+--------------+--------------+
(12 rows)
```

This was the "one-to-many" relationship. Some characters have more than one row because they have **many** sounds.

You can join three tables:

```sql
SELECT columns FROM junction_table
FULL JOIN table_1 ON junction_table.foreign_key_column = table_1.primary_key_column
FULL JOIN table_2 ON junction_table.foreign_key_column = table_2.primary_key_column;
```

```sql
mario_database=> SELECT * FROM character_actions
mario_database-> FULL JOIN characters ON characters.character_id = character_actions.character_id
mario_database-> FULL JOIN actions ON actions.action_id = character_actions.action_id;
mario_database=>                                                        
+--------------+-----------+--------------+--------+------------------+----------------+-----------+--------+
| character_id | action_id | character_id |  name  |     homeland     | favorite_color | action_id | action |
+--------------+-----------+--------------+--------+------------------+----------------+-----------+--------+
|            7 |         1 |            7 | Yoshi  | Dinosaur Land    | Green          |         1 | run    |
|            7 |         2 |            7 | Yoshi  | Dinosaur Land    | Green          |         2 | jump   |
|            7 |         3 |            7 | Yoshi  | Dinosaur Land    | Green          |         3 | duck   |
|            6 |         1 |            6 | Daisy  | Sarasaland       | Orange         |         1 | run    |
|            6 |         2 |            6 | Daisy  | Sarasaland       | Orange         |         2 | jump   |
|            6 |         3 |            6 | Daisy  | Sarasaland       | Orange         |         3 | duck   |
|            5 |         1 |            5 | Bowser | Koopa Kingdom    | Yellow         |         1 | run    |
|            5 |         2 |            5 | Bowser | Koopa Kingdom    | Yellow         |         2 | jump   |
|            5 |         3 |            5 | Bowser | Koopa Kingdom    | Yellow         |         3 | duck   |
|            4 |         1 |            4 | Toad   | Mushroom Kingdom | Blue           |         1 | run    |
|            4 |         2 |            4 | Toad   | Mushroom Kingdom | Blue           |         2 | jump   |
|            4 |         3 |            4 | Toad   | Mushroom Kingdom | Blue           |         3 | duck   |
|            3 |         1 |            3 | Peach  | Mushroom Kingdom | Pink           |         1 | run    |
|            3 |         2 |            3 | Peach  | Mushroom Kingdom | Pink           |         2 | jump   |
|            3 |         3 |            3 | Peach  | Mushroom Kingdom | Pink           |         3 | duck   |
|            2 |         1 |            2 | Luigi  | Mushroom Kingdom | Green          |         1 | run    |
|            2 |         2 |            2 | Luigi  | Mushroom Kingdom | Green          |         2 | jump   |
|            2 |         3 |            2 | Luigi  | Mushroom Kingdom | Green          |         3 | duck   |
|            1 |         1 |            1 | Mario  | Mushroom Kingdom | Red            |         1 | run    |
|            1 |         2 |            1 | Mario  | Mushroom Kingdom | Red            |         2 | jump   |
|            1 |         3 |            1 | Mario  | Mushroom Kingdom | Red            |         3 | duck   |
+--------------+-----------+--------------+--------+------------------+----------------+-----------+--------+
(21 rows)
```
