# Learn SQL by Building a Student Database Part 2

List of Sections:

<!-- TOC -->

- [Rebuilding Student Database](#rebuilding-student-database)
- [Script to print information about students](#script-to-print-information-about-students)
- [SELECTing data and WHERE](#selecting-data-and-where)
- [Multiple WHERE conditions](#multiple-where-conditions)
- [LIKE condition](#like-condition)
- [Pattern Matching](#pattern-matching)
- [Additional Modifiers](#additional-modifiers)
- [Order SELECTion](#order-selection)
- [LIMIT number of rows in SELECTion](#limit-number-of-rows-in-selection)
- [Math Functions for SELECT](#math-functions-for-select)
- [COUNT](#count)
- [DISTINCT and GROUP BY](#distinct-and-group-by)
- [COLUMN Alias](#column-alias)
- [JOINing Tables](#joining-tables)
- [Table Alias](#table-alias)
- [USING](#using)
- [Final Script](#final-script)

<!-- /TOC -->

---

## Rebuilding Student Database

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

Our database doesn't seem to be here in this new virtual machine environment. Let's recreate the database using the `students.sql` file we created before.

```console
codeally@6c20ff25ca10:~/project$ psql -U postgres < students.sql
```

```sql
postgres=> \l
postgres=>                                  List of databases
+-----------+--------------+----------+---------+---------+-----------------------+
|   Name    |    Owner     | Encoding | Collate |  Ctype  |   Access privileges   |
+-----------+--------------+----------+---------+---------+-----------------------+
| postgres  | postgres     | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| students  | freecodecamp | UTF8     | C.UTF-8 | C.UTF-8 |                       |
| template0 | postgres     | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|           |              |          |         |         | postgres=CTc/postgres |
| template1 | postgres     | UTF8     | C.UTF-8 | C.UTF-8 | =c/postgres          +|
|           |              |          |         |         | postgres=CTc/postgres |
+-----------+--------------+----------+---------+---------+-----------------------+
(4 rows)
```

---

## Script to print information about students

```console
codeally@6c20ff25ca10:~/project$ touch student_info.sh
codeally@6c20ff25ca10:~/project$ chmod +x student_info.sh
```

```sh
#!/bin/bash

# Info about my computer science students from students database

echo -e "\n~~ My Computer Science Students ~~\n"

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

echo -e "\nFirst name, last name, and GPA of students with a 4.0 GPA:"
```

---

## SELECTing data and WHERE

*A lot of repeat information on SELECTing from a database, I'm going to skip rewriting notes/steps on.*

You can use the `<` sign when using the WHERE expression:

`SELECT * FROM students WHERE gpa < 2.5;`

The other similar operators can be used as well `<`, `>`, `<=` `>=`. Then you can also use `=` and `!=`.

Using the `>` symbol on a string can show data that comes after a selection alphabetically:

`SELECT * FROM majors WHERE major > 'Game Design';`

This will list any majors that start with letters after 'g'. You can also shorten the string down to a single letter `'Game Design' > 'G'`.

---

## Multiple WHERE conditions

You use multiple conditions after `WHERE` with `AND` or `OR`.

`SELECT * FROM students WHERE last_name < 'M' OR gpa = 3.9;`

You can group conditions together with parenthesis:

```console
students=> SELECT * FROM students WHERE last_name < 'M' AND gpa = 3.9;
+------------+------------+-----------+----------+-----+
| student_id | first_name | last_name | major_id | gpa |
+------------+------------+-----------+----------+-----+
|         13 | Sterling   | Boss      |       41 | 3.9 |
+------------+------------+-----------+----------+-----+
(1 row)


students=> SELECT * FROM students WHERE last_name < 'M' AND gpa = 3.9 OR gpa < 2.3;
+------------+------------+--------------+----------+-----+
| student_id | first_name |  last_name   | major_id | gpa |
+------------+------------+--------------+----------+-----+
|         13 | Sterling   | Boss         |       41 | 3.9 |
|         16 | Faye       | Conn         |       41 | 2.1 |
|         20 | Larry      | Saunders     |       38 | 2.2 |
|         26 | Gerald     | Osiki        |       38 | 2.2 |
|         30 | Mariana    | Russel       |       37 | 1.8 |
|         32 | Mehdi      | Vandenberghe |       36 | 1.9 |
+------------+------------+--------------+----------+-----+
(6 rows)


students=> SELECT * FROM students WHERE last_name < 'M' AND (gpa = 3.9 OR gpa < 2.3);
+------------+------------+-----------+----------+-----+
| student_id | first_name | last_name | major_id | gpa |
+------------+------------+-----------+----------+-----+
|         13 | Sterling   | Boss      |       41 | 3.9 |
|         16 | Faye       | Conn      |       41 | 2.1 |
+------------+------------+-----------+----------+-----+
(2 rows)
```

The second selection returned students that have a last name that is later in the alphabet than 'M' because the OR statement returned true for those students. Wrapping conditions in parentheses can give you the desired results when combining multiple `WHERE` conditions.

---

## LIKE condition

You can use `LIKE` to find patterns in text like this: `WHERE <column> LIKE '<pattern>'`.

An `_` underscore in a pattern will return rows that have any character in that spot. This will match only rows that have exactly one character followed by `lgorithms`:

```sql
students=> SELECT * FROM courses WHERE course LIKE '_lgorithms';
+-----------+------------+
| course_id |   course   |
+-----------+------------+
|        36 | Algorithms |
+-----------+------------+
(1 row)
```

---

## Pattern Matching

Another pattern character is `%`. It means anything can be there.

```sql
students=> SELECT * FROM courses WHERE course LIKE '%lgorithms';
+-----------+--------------------------------+
| course_id |             course             |
+-----------+--------------------------------+
|        23 | Data Structures and Algorithms |
|        36 | Algorithms                     |
+-----------+--------------------------------+
(2 rows)
```

If you want to find a something that starts with a word you can continue to use `%`:

```sql
students=> SELECT * FROM courses WHERE course LIKE 'Web%';
+-----------+------------------+
| course_id |      course      |
+-----------+------------------+
|        24 | Web Programming  |
|        30 | Web Applications |
+-----------+------------------+
(2 rows)
```

Combination of the two to select courses that have a second letter of 'e':

```sql
students=> SELECT * FROM courses WHERE course LIKE '_e%';
+-----------+-----------------------+
| course_id |        course         |
+-----------+-----------------------+
|        24 | Web Programming       |
|        30 | Web Applications      |
|        38 | Server Administration |
|        39 | Network Security      |
+-----------+-----------------------+
(4 rows)
```

Courses with a space in the name:

```sql
students=> SELECT * FROM courses WHERE course LIKE '% %';
+-----------+--------------------------------+
| course_id |             course             |
+-----------+--------------------------------+
|        23 | Data Structures and Algorithms |
|        24 | Web Programming                |
|        25 | Database Systems               |
|        26 | Computer Networks              |
|        28 | Machine Learning               |
|        29 | Computer Systems               |
|        30 | Web Applications               |
|        31 | Artificial Intelligence        |
|        33 | Object-Oriented Programming    |
|        35 | Game Architecture              |
|        38 | Server Administration          |
|        39 | Network Security               |
+-----------+--------------------------------+
(12 rows)
```

---

## Additional Modifiers

You can also use `NOT LIKE`. `ILIKE` will ignore the case of letters when matching.

Combining multiple:

```sql
students=> SELECT * FROM courses WHERE course NOT ILIKE '%a%' AND course LIKE '% %';     
+-----------+-------------------+
| course_id |      course       |
+-----------+-------------------+
|        26 | Computer Networks |
|        29 | Computer Systems  |
|        39 | Network Security  |
+-----------+-------------------+
(3 rows)
```

This selected courses that do not have a capital or lowercase `A` and have a space.

`IS NULL` and `IS NOT NULL` can also be used as a condition.

---

## Order SELECTion

You can order the results with `ORDER BY <column_name>`.

```sql
students=> SELECT * FROM students ORDER BY gpa;
+------------+------------+--------------+----------+-----+
| student_id | first_name |  last_name   | major_id | gpa |
+------------+------------+--------------+----------+-----+
|         30 | Mariana    | Russel       |       37 | 1.8 |
|         32 | Mehdi      | Vandenberghe |       36 | 1.9 |
|         16 | Faye       | Conn         |       41 | 2.1 |
|         26 | Gerald     | Osiki        |       38 | 2.2 |
|         20 | Larry      | Saunders     |       38 | 2.2 |
|         14 | Brian      | Davis        |          | 2.3 |
|         18 | Danh       | Nhung        |          | 2.4 |
|          6 | Rhea       | Kellems      |       36 | 2.5 |
|         34 | Aliya      | Gulgowski    |       42 | 2.6 |
|         10 | Kyle       | Stimson      |          | 2.8 |
|         19 | Maxine     | Hagenes      |       36 | 2.9 |
|         24 | Peter      | Booysen      |          | 2.9 |
|         31 | Ajit       | Dhungel      |          | 3.0 |
|         35 | Ana        | Tupajic      |       38 | 3.1 |
|         28 | Roxelana   | Florescu     |       36 | 3.2 |
|         25 | Nathan     | Turner       |       36 | 3.3 |
|         29 | Helene     | Parker       |       38 | 3.4 |
|         22 | Lieke      | Hazenveld    |       41 | 3.5 |
|         12 | Noe        | Savage       |          | 3.6 |
|          9 | Jimmy      | Felipe       |       36 | 3.7 |
|         15 | Kaija      | Uronen       |       41 | 3.7 |
|         36 | Hugo       | Duran        |          | 3.8 |
|          8 | Kimberly   | Whitley      |       37 | 3.8 |
|         17 | Efren      | Reilly       |       37 | 3.9 |
|         13 | Sterling   | Boss         |       41 | 3.9 |
|         27 | Vanya      | Hassanah     |       41 | 4.0 |
|         33 | Dejon      | Howell       |       37 | 4.0 |
|         11 | Casares    | Hijo         |       41 | 4.0 |
|         23 | Obie       | Hilpert      |       37 |     |
|         21 | Karl       | Kuhar        |       37 |     |
|          7 | Emma       | Gilbert      |          |     |
+------------+------------+--------------+----------+-----+
(31 rows)
```

`ORDER BY` will be in ascending `ASC` order by default. You can add `DESC` descending at the end of the above query to put the highest GPAs at the top instead of the bottom.

You can add more columns to the order by separating them with a comma: `ORDER BY <column_1>, <column_2>`. Any matching values in the first ordered column will then be ordered by the next.

```sql
students=> SELECT * FROM students ORDER BY gpa DESC;
+------------+------------+--------------+----------+-----+
| student_id | first_name |  last_name   | major_id | gpa |
+------------+------------+--------------+----------+-----+
|         23 | Obie       | Hilpert      |       37 |     |
|         21 | Karl       | Kuhar        |       37 |     |
|          7 | Emma       | Gilbert      |          |     |
|         27 | Vanya      | Hassanah     |       41 | 4.0 |
|         33 | Dejon      | Howell       |       37 | 4.0 |
|         11 | Casares    | Hijo         |       41 | 4.0 |
|         17 | Efren      | Reilly       |       37 | 3.9 |
...

students=> SELECT * FROM students ORDER BY gpa DESC, first_name;
+------------+------------+--------------+----------+-----+
| student_id | first_name |  last_name   | major_id | gpa |
+------------+------------+--------------+----------+-----+
|          7 | Emma       | Gilbert      |          |     |
|         21 | Karl       | Kuhar        |       37 |     |
|         23 | Obie       | Hilpert      |       37 |     |
|         11 | Casares    | Hijo         |       41 | 4.0 |
|         33 | Dejon      | Howell       |       37 | 4.0 |
|         27 | Vanya      | Hassanah     |       41 | 4.0 |
|         17 | Efren      | Reilly       |       37 | 3.9 |
...
```

---

## LIMIT number of rows in SELECTion

You can limit the number of rows by adding `LIMIT <number>` at the end of a query.

```sql
students=> SELECT * FROM students ORDER BY gpa DESC, first_name LIMIT 10;
+------------+------------+-----------+----------+-----+
| student_id | first_name | last_name | major_id | gpa |
+------------+------------+-----------+----------+-----+
|          7 | Emma       | Gilbert   |          |     |
|         21 | Karl       | Kuhar     |       37 |     |
|         23 | Obie       | Hilpert   |       37 |     |
|         11 | Casares    | Hijo      |       41 | 4.0 |
|         33 | Dejon      | Howell    |       37 | 4.0 |
|         27 | Vanya      | Hassanah  |       41 | 4.0 |
|         17 | Efren      | Reilly    |       37 | 3.9 |
|         13 | Sterling   | Boss      |       41 | 3.9 |
|         36 | Hugo       | Duran     |          | 3.8 |
|          8 | Kimberly   | Whitley   |       37 | 3.8 |
+------------+------------+-----------+----------+-----+
(10 rows)
```

The order of the keyword in a query **MATTER**. You can't put `LIMIT` before `ORDER BY` or either of them before `WHERE`.

```sql
students=> SELECT * FROM students WHERE gpa IS NOT NULL ORDER BY gpa DESC, first_name LIMIT 10;
+------------+------------+-----------+----------+-----+
| student_id | first_name | last_name | major_id | gpa |
+------------+------------+-----------+----------+-----+
|         11 | Casares    | Hijo      |       41 | 4.0 |
|         33 | Dejon      | Howell    |       37 | 4.0 |
|         27 | Vanya      | Hassanah  |       41 | 4.0 |
|         17 | Efren      | Reilly    |       37 | 3.9 |
|         13 | Sterling   | Boss      |       41 | 3.9 |
|         36 | Hugo       | Duran     |          | 3.8 |
|          8 | Kimberly   | Whitley   |       37 | 3.8 |
|          9 | Jimmy      | Felipe    |       36 | 3.7 |
|         15 | Kaija      | Uronen    |       41 | 3.7 |
|         12 | Noe        | Savage    |          | 3.6 |
+------------+------------+-----------+----------+-----+
(10 rows)
```

---

## Math Functions for SELECT

You can use `MIN` when selecting like this: `SELECT MIN(<column>) FROM <table>` which will find the lowest value in the column. `MAX` can also be used in the same way.

```sql
students=> SELECT MIN(gpa) FROM students;
+-----+
| min |
+-----+
| 1.8 |
+-----+
```

You can use `SUM` as well, which will add up all the values of a column and return the value. `AVG` will do the same but return the average instead by dividing the total amount of rows.

```sql
students=> SELECT SUM(major_id) FROM students;
+-----+
| sum |
+-----+
| 878 |
+-----+
(1 row)
```

You can round decimals up or down to the nearest whole number with `CEIL` and `FLOOR`. Or round to the nearest whole number with `ROUND`. `ROUND` can take a second argument to round to a specific number of decimal places: `ROUND(<number_to_round>, <decimals_places>)`.

```sql
students=> SELECT CEIL(AVG(major_id)) FROM students;
students=>     
+------+
| ceil |
+------+
|   39 |
+------+
(1 row)

students=> SELECT ROUND(AVG(major_id), 5) FROM students;
+----------+
|  round   |
+----------+
| 38.17391 |
+----------+
(1 row)
```

---

## COUNT

Another function you can use is `COUNT`: `COUNT(<column>)`.

```sql
students=> SELECT * FROM majors;
+----------+-------------------------+
| major_id |          major          |
+----------+-------------------------+
|       36 | Database Administration |
|       37 | Web Development         |
|       38 | Data Science            |
|       39 | Network Engineering     |
|       40 | Computer Programming    |
|       41 | Game Design             |
|       42 | System Administration   |
+----------+-------------------------+
(7 rows)


students=> SELECT COUNT(*) FROM majors;
+-------+
| count |
+-------+
|     7 |
+-------+
(1 row)
```

Using `*` in this way tells you how many total rows are in the table. Specifying a column will only count rows that have a value in that column and will skip `NULL` values.

---

## DISTINCT and GROUP BY

`DISTINCT` is a function that will only show you unique values.

```sql
students=> SELECT DISTINCT(major_id) FROM students;      
+----------+
| major_id |
+----------+
|          |
|       42 |
|       41 |
|       38 |
|       36 |
|       37 |
+----------+
(6 rows)
```

The same thing can be retrieved by using `GROUP BY`.

```sql
students=> SELECT major_id FROM students GROUP BY major_id;
+----------+
| major_id |
+----------+
|          |
|       42 |
|       41 |
|       38 |
|       36 |
|       37 |
+----------+
(6 rows)
```

The difference is you can add any of the aggregate functions (`MIN`, `MAX`, `COUNT`, ect) to `DISTINCT` to find more information, where you cannot do the same by using `GROUP BY`.

When using `GROUP BY` any columns in the `SELECT` area must be included in the `GROUP BY` area. Other columns must be used with any of the aggregate functions.

Another option with `GROUP BY` is `HAVING`: `SELECT <column> FROM <table> GROUP BY <column> HAVING <condition>`. The condition must be an aggregate function with a test: `HAVING COUNT(*) > 0`.

```sql
students=> SELECT major_id, MIN(gpa), MAX(gpa) FROM students GROUP BY major_id;
+----------+-----+-----+
| major_id | min | max |
+----------+-----+-----+
|          | 2.3 | 3.8 |
|       42 | 2.6 | 2.6 |
|       41 | 2.1 | 4.0 |
|       38 | 2.2 | 3.4 |
|       36 | 1.9 | 3.7 |
|       37 | 1.8 | 4.0 |
+----------+-----+-----+
(6 rows)


students=> SELECT major_id, MIN(gpa), MAX(gpa) FROM students GROUP BY major_id HAVING MAX(gpa) = 4.0;
+----------+-----+-----+
| major_id | min | max |
+----------+-----+-----+
|       41 | 2.1 | 4.0 |
|       37 | 1.8 | 4.0 |
+----------+-----+-----+
(2 rows)
```

---

## COLUMN Alias

You can rename a column with `AS`: `SEELCT <column> AS <new_column_name>`.

```sql
students=> SELECT major_id, MIN(gpa) AS min_gpa, MAX(gpa) FROM students GROUP BY major_id HAVING MAX(gpa) = 4.0;
+----------+---------+-----+
| major_id | min_gpa | max |
+----------+---------+-----+
|       41 |     2.1 | 4.0 |
|       37 |     1.8 | 4.0 |
+----------+---------+-----+
(2 rows)


students=> SELECT major_id, MIN(gpa) AS min_gpa, MAX(gpa) AS max_gpa FROM students GROUP BY major_id HAVING MAX(gpa) = 4.0;
+----------+---------+---------+
| major_id | min_gpa | max_gpa |
+----------+---------+---------+
|       41 |     2.1 |     4.0 |
|       37 |     1.8 |     4.0 |
+----------+---------+---------+
(2 rows)


students=> SELECT major_id, COUNT(*) AS number_of_students FROM students GROUP BY major_id;
+----------+--------------------+
| major_id | number_of_students |
+----------+--------------------+
|          |                  8 |
|       42 |                  1 |
|       41 |                  6 |
|       38 |                  4 |
|       36 |                  6 |
|       37 |                  6 |
+----------+--------------------+
(6 rows)


students=> SELECT major_id, COUNT(*) AS number_of_students FROM students GROUP BY major_id HAVING COUNT(*) < 8;
+----------+--------------------+
| major_id | number_of_students |
+----------+--------------------+
|       42 |                  1 |
|       41 |                  6 |
|       38 |                  4 |
|       36 |                  6 |
|       37 |                  6 |
+----------+--------------------+
(5 rows)
```

---

## JOINing Tables

We learned `FULL JOIN` previously:

```sql
students=> SELECT * FROM students FULL JOIN majors ON students.major_id = majors.major_id;
+------------+------------+--------------+----------+-----+----------+-------------------------+
| student_id | first_name |  last_name   | major_id | gpa | major_id |          major          |
+------------+------------+--------------+----------+-----+----------+-------------------------+
|          6 | Rhea       | Kellems      |       36 | 2.5 |       36 | Database Administration |
|          7 | Emma       | Gilbert      |          |     |          |                         |
|          8 | Kimberly   | Whitley      |       37 | 3.8 |       37 | Web Development         |
|          9 | Jimmy      | Felipe       |       36 | 3.7 |       36 | Database Administration |
|         10 | Kyle       | Stimson      |          | 2.8 |          |                         |
|         11 | Casares    | Hijo         |       41 | 4.0 |       41 | Game Design             |
|         12 | Noe        | Savage       |          | 3.6 |          |                         |
|         13 | Sterling   | Boss         |       41 | 3.9 |       41 | Game Design             |
|         14 | Brian      | Davis        |          | 2.3 |          |                         |
|         15 | Kaija      | Uronen       |       41 | 3.7 |       41 | Game Design             |
|         16 | Faye       | Conn         |       41 | 2.1 |       41 | Game Design             |
|         17 | Efren      | Reilly       |       37 | 3.9 |       37 | Web Development         |
|         18 | Danh       | Nhung        |          | 2.4 |          |                         |
|         19 | Maxine     | Hagenes      |       36 | 2.9 |       36 | Database Administration |
|         20 | Larry      | Saunders     |       38 | 2.2 |       38 | Data Science            |
|         21 | Karl       | Kuhar        |       37 |     |       37 | Web Development         |
|         22 | Lieke      | Hazenveld    |       41 | 3.5 |       41 | Game Design             |
|         23 | Obie       | Hilpert      |       37 |     |       37 | Web Development         |
|         24 | Peter      | Booysen      |          | 2.9 |          |                         |
|         25 | Nathan     | Turner       |       36 | 3.3 |       36 | Database Administration |
|         26 | Gerald     | Osiki        |       38 | 2.2 |       38 | Data Science            |
|         27 | Vanya      | Hassanah     |       41 | 4.0 |       41 | Game Design             |
|         28 | Roxelana   | Florescu     |       36 | 3.2 |       36 | Database Administration |
|         29 | Helene     | Parker       |       38 | 3.4 |       38 | Data Science            |
|         30 | Mariana    | Russel       |       37 | 1.8 |       37 | Web Development         |
|         31 | Ajit       | Dhungel      |          | 3.0 |          |                         |
|         32 | Mehdi      | Vandenberghe |       36 | 1.9 |       36 | Database Administration |
|         33 | Dejon      | Howell       |       37 | 4.0 |       37 | Web Development         |
|         34 | Aliya      | Gulgowski    |       42 | 2.6 |       42 | System Administration   |
|         35 | Ana        | Tupajic      |       38 | 3.1 |       38 | Data Science            |
|         36 | Hugo       | Duran        |          | 3.8 |          |                         |
|            |            |              |          |     |       39 | Network Engineering     |
|            |            |              |          |     |       40 | Computer Programming    |
+------------+------------+--------------+----------+-----+----------+-------------------------+
(33 rows)
```

`LEFT JOIN` gets all the rows from the left table, but only rows from the right table that are linked to from the left one. In the following example the left table is `students` and the right table is `majors`.

`RIGHT JOIN` does the same but the opposite way. It will show all the rows from the right table `majors`, but only rows from the left table `students` if they have a major.

```sql
students=> SELECT * FROM students LEFT JOIN majors ON students.major_id = majors.major_id;
+------------+------------+--------------+----------+-----+----------+-------------------------+
| student_id | first_name |  last_name   | major_id | gpa | major_id |          major          |
+------------+------------+--------------+----------+-----+----------+-------------------------+
|          6 | Rhea       | Kellems      |       36 | 2.5 |       36 | Database Administration |
|          7 | Emma       | Gilbert      |          |     |          |                         |
|          8 | Kimberly   | Whitley      |       37 | 3.8 |       37 | Web Development         |
|          9 | Jimmy      | Felipe       |       36 | 3.7 |       36 | Database Administration |
|         10 | Kyle       | Stimson      |          | 2.8 |          |                         |
|         11 | Casares    | Hijo         |       41 | 4.0 |       41 | Game Design             |
|         12 | Noe        | Savage       |          | 3.6 |          |                         |
|         13 | Sterling   | Boss         |       41 | 3.9 |       41 | Game Design             |
|         14 | Brian      | Davis        |          | 2.3 |          |                         |
|         15 | Kaija      | Uronen       |       41 | 3.7 |       41 | Game Design             |
|         16 | Faye       | Conn         |       41 | 2.1 |       41 | Game Design             |
|         17 | Efren      | Reilly       |       37 | 3.9 |       37 | Web Development         |
|         18 | Danh       | Nhung        |          | 2.4 |          |                         |
|         19 | Maxine     | Hagenes      |       36 | 2.9 |       36 | Database Administration |
|         20 | Larry      | Saunders     |       38 | 2.2 |       38 | Data Science            |
|         21 | Karl       | Kuhar        |       37 |     |       37 | Web Development         |
|         22 | Lieke      | Hazenveld    |       41 | 3.5 |       41 | Game Design             |
|         23 | Obie       | Hilpert      |       37 |     |       37 | Web Development         |
|         24 | Peter      | Booysen      |          | 2.9 |          |                         |
|         25 | Nathan     | Turner       |       36 | 3.3 |       36 | Database Administration |
|         26 | Gerald     | Osiki        |       38 | 2.2 |       38 | Data Science            |
|         27 | Vanya      | Hassanah     |       41 | 4.0 |       41 | Game Design             |
|         28 | Roxelana   | Florescu     |       36 | 3.2 |       36 | Database Administration |
|         29 | Helene     | Parker       |       38 | 3.4 |       38 | Data Science            |
|         30 | Mariana    | Russel       |       37 | 1.8 |       37 | Web Development         |
|         31 | Ajit       | Dhungel      |          | 3.0 |          |                         |
|         32 | Mehdi      | Vandenberghe |       36 | 1.9 |       36 | Database Administration |
|         33 | Dejon      | Howell       |       37 | 4.0 |       37 | Web Development         |
|         34 | Aliya      | Gulgowski    |       42 | 2.6 |       42 | System Administration   |
|         35 | Ana        | Tupajic      |       38 | 3.1 |       38 | Data Science            |
|         36 | Hugo       | Duran        |          | 3.8 |          |                         |
+------------+------------+--------------+----------+-----+----------+-------------------------+
(31 rows)


students=> SELECT * FROM students RIGHT JOIN majors ON students.major_id = majors.major_id;
+------------+------------+--------------+----------+-----+----------+-------------------------+
| student_id | first_name |  last_name   | major_id | gpa | major_id |          major          |
+------------+------------+--------------+----------+-----+----------+-------------------------+
|          6 | Rhea       | Kellems      |       36 | 2.5 |       36 | Database Administration |
|          8 | Kimberly   | Whitley      |       37 | 3.8 |       37 | Web Development         |
|          9 | Jimmy      | Felipe       |       36 | 3.7 |       36 | Database Administration |
|         11 | Casares    | Hijo         |       41 | 4.0 |       41 | Game Design             |
|         13 | Sterling   | Boss         |       41 | 3.9 |       41 | Game Design             |
|         15 | Kaija      | Uronen       |       41 | 3.7 |       41 | Game Design             |
|         16 | Faye       | Conn         |       41 | 2.1 |       41 | Game Design             |
|         17 | Efren      | Reilly       |       37 | 3.9 |       37 | Web Development         |
|         19 | Maxine     | Hagenes      |       36 | 2.9 |       36 | Database Administration |
|         20 | Larry      | Saunders     |       38 | 2.2 |       38 | Data Science            |
|         21 | Karl       | Kuhar        |       37 |     |       37 | Web Development         |
|         22 | Lieke      | Hazenveld    |       41 | 3.5 |       41 | Game Design             |
|         23 | Obie       | Hilpert      |       37 |     |       37 | Web Development         |
|         25 | Nathan     | Turner       |       36 | 3.3 |       36 | Database Administration |
|         26 | Gerald     | Osiki        |       38 | 2.2 |       38 | Data Science            |
|         27 | Vanya      | Hassanah     |       41 | 4.0 |       41 | Game Design             |
|         28 | Roxelana   | Florescu     |       36 | 3.2 |       36 | Database Administration |
|         29 | Helene     | Parker       |       38 | 3.4 |       38 | Data Science            |
|         30 | Mariana    | Russel       |       37 | 1.8 |       37 | Web Development         |
|         32 | Mehdi      | Vandenberghe |       36 | 1.9 |       36 | Database Administration |
|         33 | Dejon      | Howell       |       37 | 4.0 |       37 | Web Development         |
|         34 | Aliya      | Gulgowski    |       42 | 2.6 |       42 | System Administration   |
|         35 | Ana        | Tupajic      |       38 | 3.1 |       38 | Data Science            |
|            |            |              |          |     |       39 | Network Engineering     |
|            |            |              |          |     |       40 | Computer Programming    |
+------------+------------+--------------+----------+-----+----------+-------------------------+
(25 rows)
```

One more type of join is a `INNER JOIN`. This will only return the students that have a mAjor and majors that also have a student. It only returned rows if they have a value in the foreign key column `major_id` of the opposite table.

```sql
students=> SELECT * FROM students INNER JOIN majors ON students.major_id = majors.major_id;
+------------+------------+--------------+----------+-----+----------+-------------------------+
| student_id | first_name |  last_name   | major_id | gpa | major_id |          major          |
+------------+------------+--------------+----------+-----+----------+-------------------------+
|          6 | Rhea       | Kellems      |       36 | 2.5 |       36 | Database Administration |
|          8 | Kimberly   | Whitley      |       37 | 3.8 |       37 | Web Development         |
|          9 | Jimmy      | Felipe       |       36 | 3.7 |       36 | Database Administration |
|         11 | Casares    | Hijo         |       41 | 4.0 |       41 | Game Design             |
|         13 | Sterling   | Boss         |       41 | 3.9 |       41 | Game Design             |
|         15 | Kaija      | Uronen       |       41 | 3.7 |       41 | Game Design             |
|         16 | Faye       | Conn         |       41 | 2.1 |       41 | Game Design             |
|         17 | Efren      | Reilly       |       37 | 3.9 |       37 | Web Development         |
|         19 | Maxine     | Hagenes      |       36 | 2.9 |       36 | Database Administration |
|         20 | Larry      | Saunders     |       38 | 2.2 |       38 | Data Science            |
|         21 | Karl       | Kuhar        |       37 |     |       37 | Web Development         |
|         22 | Lieke      | Hazenveld    |       41 | 3.5 |       41 | Game Design             |
|         23 | Obie       | Hilpert      |       37 |     |       37 | Web Development         |
|         25 | Nathan     | Turner       |       36 | 3.3 |       36 | Database Administration |
|         26 | Gerald     | Osiki        |       38 | 2.2 |       38 | Data Science            |
|         27 | Vanya      | Hassanah     |       41 | 4.0 |       41 | Game Design             |
|         28 | Roxelana   | Florescu     |       36 | 3.2 |       36 | Database Administration |
|         29 | Helene     | Parker       |       38 | 3.4 |       38 | Data Science            |
|         30 | Mariana    | Russel       |       37 | 1.8 |       37 | Web Development         |
|         32 | Mehdi      | Vandenberghe |       36 | 1.9 |       36 | Database Administration |
|         33 | Dejon      | Howell       |       37 | 4.0 |       37 | Web Development         |
|         34 | Aliya      | Gulgowski    |       42 | 2.6 |       42 | System Administration   |
|         35 | Ana        | Tupajic      |       38 | 3.1 |       38 | Data Science            |
+------------+------------+--------------+----------+-----+----------+-------------------------+
(23 rows)
```

---

## Table Alias

You can use the `AS` keyword to give a table an alias as well. `SELECT * FROM <table> AS <new_name>`. You will have to use the alias anywhere the table is referenced for the selection.

```sql
students=> SELECT students.major_id FROM students FULL JOIN majors AS m ON students.major_id = m.major_id;
students=>       
+----------+
| major_id |
+----------+
|       36 |
|          |
|       37 |
|       36 |
...
```

---

## USING

There is a shortcut keyword `USING` to join tables if the foreign key column has the same name in both tables. `SELECT * FROM <table_1> FULL JOIN <table_2> USING(<column>)`

```sql
students=> SELECT * FROM students FULL JOIN majors USING(major_id);
+----------+------------+------------+--------------+-----+-------------------------+
| major_id | student_id | first_name |  last_name   | gpa |          major          |
+----------+------------+------------+--------------+-----+-------------------------+
|       36 |          6 | Rhea       | Kellems      | 2.5 | Database Administration |
|          |          7 | Emma       | Gilbert      |     |                         |
|       37 |          8 | Kimberly   | Whitley      | 3.8 | Web Development         |
|       36 |          9 | Jimmy      | Felipe       | 3.7 | Database Administration |
|          |         10 | Kyle       | Stimson      | 2.8 |                         |
|       41 |         11 | Casares    | Hijo         | 4.0 | Game Design             |
|          |         12 | Noe        | Savage       | 3.6 |                         |
|       41 |         13 | Sterling   | Boss         | 3.9 | Game Design             |
|          |         14 | Brian      | Davis        | 2.3 |                         |
...
```

The foreign key columns will be turned into one when using `USING`. So in the above, `major_id` was merged.

In order to see all the courses a student is taking you will have to join all three tables together:

```
SELECT * FROM <table_1> FULL JOIN <table_2> USING(<column>) FULL JOIN <table_3> USING(<column>)
```

This example joins the first two talbes into one, which will be the left table for the second join.

```sql
students=> SELECT * FROM students FULL JOIN majors USING(major_id) FULL JOIN majors_courses USING(major_id);
+----------+------------+------------+--------------+-----+-------------------------+-----------+
| major_id | student_id | first_name |  last_name   | gpa |          major          | course_id |
+----------+------------+------------+--------------+-----+-------------------------+-----------+
|       36 |          6 | Rhea       | Kellems      | 2.5 | Database Administration |        30 |
|       36 |          6 | Rhea       | Kellems      | 2.5 | Database Administration |        27 |
|       36 |          6 | Rhea       | Kellems      | 2.5 | Database Administration |        25 |
|       36 |          6 | Rhea       | Kellems      | 2.5 | Database Administration |        23 |
|          |          7 | Emma       | Gilbert      |     |                         |           |
|       37 |          8 | Kimberly   | Whitley      | 3.8 | Web Development         |        30 |
|       37 |          8 | Kimberly   | Whitley      | 3.8 | Web Development         |        33 |
|       37 |          8 | Kimberly   | Whitley      | 3.8 | Web Development         |        23 |
|       37 |          8 | Kimberly   | Whitley      | 3.8 | Web Development         |        24 |
|       36 |          9 | Jimmy      | Felipe       | 3.7 | Database Administration |        30 |
|       36 |          9 | Jimmy      | Felipe       | 3.7 | Database Administration |        27 |
|       36 |          9 | Jimmy      | Felipe       | 3.7 | Database Administration |        25 |
|       36 |          9 | Jimmy      | Felipe       | 3.7 | Database Administration |        23 |
...
```

This is showing every unique combination of rows in the database. Students with a major are listed multiple times, one for each course included in the major.

You can then also join the course names in as well:

```sql
students=> SELECT * FROM students FULL JOIN majors USING(major_id) FULL JOIN majors_courses USING(major_id) FULL JOIN courses USING(course_id);
+-----------+----------+------------+------------+--------------+-----+-------------------------+--------------------------------+
| course_id | major_id | student_id | first_name |  last_name   | gpa |          major          |             course             |
+-----------+----------+------------+------------+--------------+-----+-------------------------+--------------------------------+
|        30 |       36 |          6 | Rhea       | Kellems      | 2.5 | Database Administration | Web Applications               |
|        27 |       36 |          6 | Rhea       | Kellems      | 2.5 | Database Administration | SQL                            |
|        25 |       36 |          6 | Rhea       | Kellems      | 2.5 | Database Administration | Database Systems               |
|        23 |       36 |          6 | Rhea       | Kellems      | 2.5 | Database Administration | Data Structures and Algorithms |
|           |          |          7 | Emma       | Gilbert      |     |                         |                                |
|        30 |       37 |          8 | Kimberly   | Whitley      | 3.8 | Web Development         | Web Applications               |
|        33 |       37 |          8 | Kimberly   | Whitley      | 3.8 | Web Development         | Object-Oriented Programming    |
|        23 |       37 |          8 | Kimberly   | Whitley      | 3.8 | Web Development         | Data Structures and Algorithms |
|        24 |       37 |          8 | Kimberly   | Whitley      | 3.8 | Web Development         | Web Programming                |
|        30 |       36 |          9 | Jimmy      | Felipe       | 3.7 | Database Administration | Web Applications               |
|        27 |       36 |          9 | Jimmy      | Felipe       | 3.7 | Database Administration | SQL                            |
|        25 |       36 |          9 | Jimmy      | Felipe       | 3.7 | Database Administration | Database Systems               |
|        23 |       36 |          9 | Jimmy      | Felipe       | 3.7 | Database Administration | Data Structures and Algorithms |
|           |          |         10 | Kyle       | Stimson      | 2.8 |                         |                                |
|        36 |       41 |         11 | Casares    | Hijo         | 4.0 | Game Design             | Algorithms                     |
|        35 |       41 |         11 | Casares    | Hijo         | 4.0 | Game Design             | Game Architecture              |
|        34 |       41 |         11 | Casares    | Hijo         | 4.0 | Game Design             | Calculus                       |
|        31 |       41 |         11 | Casares    | Hijo         | 4.0 | Game Design             | Artificial Intelligence        |
|           |          |         12 | Noe        | Savage       | 3.6 |                         |                                |
|        36 |       41 |         13 | Sterling   | Boss         | 3.9 | Game Design             | Algorithms                     |
```

---

## Final Script

Throughout this I was building a script that featured a series of prompts in which I needed to create a selection for.

```sql
#!/bin/bash

# Info about my computer science students from students database

echo -e "\n~~ My Computer Science Students ~~\n"

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

echo -e "\nFirst name, last name, and GPA of students with a 4.0 GPA:"
echo "$($PSQL "SELECT first_name, last_name, gpa FROM students WHERE gpa = 4.0")"

echo -e "\nAll course names whose first letter is before 'D' in the alphabet:"
echo "$($PSQL "SELECT course FROM courses WHERE course < 'D'")"

echo -e "\nFirst name, last name, and GPA of students whose last name begins with an 'R' or after and have a GPA greater than 3.8 or less than 2.0:"
echo "$($PSQL "SELECT first_name, last_name, gpa FROM students WHERE last_name >= 'R' AND (gpa > 3.8 OR gpa < 2.0)")"

echo -e "\nLast name of students whose last name contains a case insensitive 'sa' or have an 'r' as the second to last letter:"
echo "$($PSQL "SELECT last_name FROM students WHERE last_name ILIKE '%sa%' OR last_name LIKE '%r_'")"

echo -e "\nFirst name, last name, and GPA of students who have not selected a major and either their first name begins with 'D' or they have a GPA greater than 3.0:"
echo "$($PSQL "SELECT first_name, last_name, gpa FROM students WHERE major_id IS NULL AND (first_name LIKE 'D%' OR gpa > 3.0)")"

echo -e "\nCourse name of the first five courses, in reverse alphabetical order, that have an 'e' as the second letter or end with an 's':"
echo "$($PSQL "SELECT course FROM courses WHERE course LIKE '_e%' OR course LIKE '%_s' ORDER BY course DESC LIMIT 5")"

echo -e "\nAverage GPA of all students rounded to two decimal places:"
echo "$($PSQL "SELECT ROUND(AVG(gpa), 2) FROM students")"

echo -e "\nMajor ID, total number of students in a column named 'number_of_students', and average GPA rounded to two decimal places in a column name 'average_gpa', for each major ID in the students table having a student count greater than 1:"
echo "$($PSQL "SELECT major_id, COUNT(*) AS number_of_students, ROUND(AVG(gpa), 2) AS average_gpa FROM students GROUP BY major_id HAVING COUNT(*) > 1")"

echo -e "\nList of majors, in alphabetical order, that either no student is taking or has a student whose first name contains a case insensitive 'ma':"
# echo "$($PSQL "SELECT major FROM majors LEFT JOIN students ON majors.major_id = students.major_id WHERE student_name IS NULL OR first_name ILIKE '%ma%' ORDER BY major")"
: ' while there is multiple ways to get this same selection, I feel like this wanted answer was maybe too strict.
    the past several steps on here was going over when to use the different joins and I believe the best join for this one would to be left or right join depending
    on the side the majors table is on, and any of first_name, last_name or student_id could have been used, while the answer wanted student_id randomly
    when we were working with checking if first_name was null on the previous steps as well.'
echo "$($PSQL "SELECT major FROM students FULL JOIN majors ON students.major_id = majors.major_id WHERE major IS NOT NULL AND (student_id IS NULL OR first_name ILIKE '%ma%') ORDER BY major")"

echo -e "\nList of unique courses, in reverse alphabetical order, that no student or 'Obie Hilpert' is taking:"
echo "$($PSQL "SELECT DISTINCT(course) FROM courses FULL JOIN majors_courses USING(course_id) FULL JOIN students USING(major_id) WHERE first_name IS NULL OR (first_name LIKE 'Obie' AND last_name LIKE 'Hilpert') ORDER BY course DESC")"

echo -e "\nList of courses, in alphabetical order, with only one student enrolled:"
echo "$($PSQL "SELECT course FROM courses FULL JOIN majors_courses USING(course_id) FULL JOIN students USING(major_id) GROUP BY course HAVING COUNT(student_id) = 1 ORDER BY course")"
```

Output:

```console
codeally@6c20ff25ca10:~/project$ ./student_info.sh 

~~ My Computer Science Students ~~


First name, last name, and GPA of students with a 4.0 GPA:
Casares|Hijo|4.0
Vanya|Hassanah|4.0
Dejon|Howell|4.0

All course names whose first letter is before 'D' in the alphabet:
Computer Networks
Computer Systems
Artificial Intelligence
Calculus
Algorithms

First name, last name, and GPA of students whose last name begins with an 'R' or after and have a GPA greater than 3.8 or less than 2.0:
Efren|Reilly|3.9
Mariana|Russel|1.8
Mehdi|Vandenberghe|1.9

Last name of students whose last name contains a case insensitive 'sa' or have an 'r' as the second to last letter:
Gilbert
Savage
Saunders
Hilpert
Hassanah

First name, last name, and GPA of students who have not selected a major and either their first name begins with 'D' or they have a GPA greater than 3.0:
Noe|Savage|3.6
Danh|Nhung|2.4
Hugo|Duran|3.8

Course name of the first five courses, in reverse alphabetical order, that have an 'e' as the second letter or end with an 's':
Web Programming
Web Applications
Server Administration
Network Security
Database Systems

Average GPA of all students rounded to two decimal places:
3.09

Major ID, total number of students in a column named 'number_of_students', and average GPA rounded to two decimal places in a column name 'average_gpa', for each major ID in the students table having a student count greater than 1:
|8|2.97
41|6|3.53
38|4|2.73
36|6|2.92
37|6|3.38

List of majors, in alphabetical order, that either no student is taking or has a student whose first name contains a case insensitive 'ma':
Computer Programming
Database Administration
Network Engineering
Web Development

List of unique courses, in reverse alphabetical order, that no student or 'Obie Hilpert' is taking:
Web Programming
Web Applications
Python
Object-Oriented Programming
Network Security
Data Structures and Algorithms
Computer Systems
Computer Networks
Algorithms

List of courses, in alphabetical order, with only one student enrolled:
Computer Networks
Computer Systems
Server Administration
UNIX
```
