# Build a Student Database: Part 1

List of Sections:

<!-- TOC -->

- [Project introduction](#project-introduction)
- [Students Table](#students-table)
- [Majors Table](#majors-table)
- [Courses Table & Junction Table (majors_courses)](#courses-table--junction-table-majors_courses)
- [Composite Primary Keys](#composite-primary-keys)
- [Adding Rows](#adding-rows)
- [Script to Enter Data](#script-to-enter-data)
- [Internal Field Separator (IFS)](#internal-field-separator-ifs)
- [Fleshing Out insert_data](#fleshing-out-insert_data)
- [Test Data / copy command](#test-data--copy-command)
- [TRUNCATE command](#truncate-command)
- [Try the script again](#try-the-script-again)
- [Message when data is added](#message-when-data-is-added)
- [Inserting courses](#inserting-courses)
- [Remove data automatically](#remove-data-automatically)
- [Automate Junction Table](#automate-junction-table)
- [Add data from students.csv](#add-data-from-studentscsv)
- [Script Complete, View Inserted Data](#script-complete-view-inserted-data)
- [Dump Database](#dump-database)

<!-- /TOC -->

---

## Project introduction

Data we are working with, two `csv` files. Top row in each file has titles, and the rest is data for those titles.

|courses.csv|students.csv|
|---|---|
|major,course<br>Database Administration,Data Structures and Algorithms<br>Web Development,Web Programming<br>Database Administration,Database Systems<br>Data Science,Data Structures and Algorithms<br>Network Engineering,Computer Networks<br>Database Administration,SQL<br>Data Science,Machine Learning<br>Network Engineering,Computer Systems<br>Computer Programming,Computer Networks<br>Database Administration,Web Applications<br>Game Design,Artificial Intelligence<br>Data Science,Python<br>Computer Programming,Object-Oriented Programming<br>System Administration,Computer Systems<br>Game Design,Calculus<br>Web Development,Data Structures and Algorithms<br>Data Science,Calculus<br>Web Development,Object-Oriented Programming<br>Game Design,Game Architecture<br>System Administration,Computer Networks<br>Game Design,Algorithms<br>System Administration,UNIX<br>System Administration,Server Administration<br>Computer Programming,Computer Systems<br>Computer Programming,Python<br>Network Engineering,Network Security<br>Web Development,Web Applications<br>Network Engineering,Algorithms|first_name,last_name,major,gpa<br>Rhea,Kellems,Database Administration,2.5<br>Emma,Gilbert,null,null<br>Kimberly,Whitley,Web Development,3.8<br>Jimmy,Felipe,Database Administration,3.7<br>Kyle,Stimson,null,2.8<br>Casares,Hijo,Game Design,4.0<br>Noe,Savage,null,3.6<br>Sterling,Boss,Game Design,3.9<br>Brian,Davis,null,2.3<br>Kaija,Uronen,Game Design,3.7<br>Faye,Conn,Game Design,2.1<br>Efren,Reilly,Web Development,3.9<br>Danh,Nhung,null,2.4<br>Maxine,Hagenes,Database Administration,2.9<br>Larry,Saunders,Data Science,2.2<br>Karl,Kuhar,Web Development,null<br>Lieke,Hazenveld,Game Design,3.5<br>Obie,Hilpert,Web Development,null<br>Peter,Booysen,null,2.9<br>Nathan,Turner,Database Administration,3.3<br>Gerald,Osiki,Data Science,2.2<br>Vanya,Hassanah,Game Design,4.0<br>Roxelana,Florescu,Database Administration,3.2<br>Helene,Parker,Data Science,3.4<br>Mariana,Russel,Web Development,1.8<br>Ajit,Dhungel,null,3.0<br>Mehdi,Vandenberghe,Database Administration,1.9<br>Dejon,Howell,Web Development,4.0<br>Aliya,Gulgowski,System Administration,2.6<br>Ana,Tupajic,Data Science,3.1<br>Hugo,Duran,null,3.8<br>|

Create students database:

```console
codeally@01a1e06deea9:~/project$ psql --username=freecodecamp --dbname=postgres
Border style is 2.
Title is " ".
Pager usage is off.
psql (12.9 (Ubuntu 12.9-2.pgdg20.04+1))
Type "help" for help.

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

postgres=> CREATE DATABASE students;
CREATE DATABASE
postgres=> \c students;
You are now connected to database "students" as user "freecodecamp".
students=> 
```

The students database will have four tables. One for students and their info, one for each major, one for each course, and one for showing what courses are included in each major.

Create tables:

```sql
students=> CREATE TABLE students();
CREATE TABLE
students=> CREATE TABLE majors();
CREATE TABLE
students=> CREATE TABLE courses();
CREATE TABLE
students=> CREATE TABLE majors_courses();
CREATE TABLE

students=> \d
students=>                 List of relations
+--------+----------------+-------+--------------+
| Schema |      Name      | Type  |    Owner     |
+--------+----------------+-------+--------------+
| public | courses        | table | freecodecamp |
| public | majors         | table | freecodecamp |
| public | majors_courses | table | freecodecamp |
| public | students       | table | freecodecamp |
+--------+----------------+-------+--------------+
(4 rows)
```

---

## Students Table

Creating columns. `students.csv` has four fields, and the table will have a `ID` column as a `PRIMARY KEY`. Since each major will be in another table the major column in this table will be a `foreign key` and be an id that matches the major.

Create columns:

```sql
students=> ALTER TABLE students ADD COLUMN student_id SERIAL PRIMARY KEY;
ALTER TABLE
students=> ALTER TABLE students ADD COLUMN first_name VARCHAR(50) NOT NULL;
ALTER TABLE
students=> ALTER TABLE students ADD COLUMN last_name VARCHAR(50) NOT NULL;
ALTER TABLE
students=> ALTER TABLE students ADD COLUMN major_id INT;
ALTER TABLE
students=> ALTER TABLE students ADD COLUMN gpa NUMERIC(2,1);
ALTER TABLE
students=> \d students
                                          Table "public.students"
+------------+-----------------------+-----------+----------+----------------------------------------------+
|   Column   |         Type          | Collation | Nullable |                   Default                    |
+------------+-----------------------+-----------+----------+----------------------------------------------+
| student_id | integer               |           | not null | nextval('students_student_id_seq'::regclass) |
| first_name | character varying(50) |           | not null |                                              |
| last_name  | character varying(50) |           | not null |                                              |
| major_id   | integer               |           |          |                                              |
| gpa        | numeric(2,1)          |           |          |                                              |
+------------+-----------------------+-----------+----------+----------------------------------------------+
Indexes:
    "students_pkey" PRIMARY KEY, btree (student_id)
```

The foreign key will be set later once we've setup the majors table.

---

## Majors Table

This table will only have two columns, the `primary key` id column and the name of the major.

Create majors table:

```sql
students=> ALTER TABLE majors ADD COLUMN major_id SERIAL PRIMARY KEY;
students=> ALTER TABLE
students=> ALTER TABLE majors ADD COLUMN major VARCHAR(50) NOT NULL;
ALTER TABLE
students=> \d majors
                                        Table "public.majors"
+----------+-----------------------+-----------+----------+------------------------------------------+
|  Column  |         Type          | Collation | Nullable |                 Default                  |
+----------+-----------------------+-----------+----------+------------------------------------------+
| major_id | integer               |           | not null | nextval('majors_major_id_seq'::regclass) |
| major    | character varying(50) |           | not null |                                          |
+----------+-----------------------+-----------+----------+------------------------------------------+
Indexes:
    "majors_pkey" PRIMARY KEY, btree (major_id)
```

Add `foreign key` to students table:

```sql
students=> ALTER TABLE students ADD FOREIGN KEY(major_id) REFERENCES majors(major_id);
ALTER TABLE
students=> \d students
                                          Table "public.students"
+------------+-----------------------+-----------+----------+----------------------------------------------+
|   Column   |         Type          | Collation | Nullable |                   Default                    |
+------------+-----------------------+-----------+----------+----------------------------------------------+
| student_id | integer               |           | not null | nextval('students_student_id_seq'::regclass) |
| first_name | character varying(50) |           | not null |                                              |
| last_name  | character varying(50) |           | not null |                                              |
| major_id   | integer               |           |          |                                              |
| gpa        | numeric(2,1)          |           |          |                                              |
+------------+-----------------------+-----------+----------+----------------------------------------------+
Indexes:
    "students_pkey" PRIMARY KEY, btree (student_id)
Foreign-key constraints:
    "students_major_id_fkey" FOREIGN KEY (major_id) REFERENCES majors(major_id)
```

---

## Courses Table & Junction Table (majors_courses)

Setup courses columns:

```sql
students=> ALTER TABLE courses ADD COLUMN course_id SERIAL PRIMARY KEY;
ALTER TABLE
students=> ALTER TABLE courses ADD COLUMN course VARCHAR(100) NOT NULL;
ALTER TABLE
students=> \d courses
students=>                                           Table "public.courses"
+-----------+------------------------+-----------+----------+--------------------------------------------+
|  Column   |          Type          | Collation | Nullable |                  Default                   |
+-----------+------------------------+-----------+----------+--------------------------------------------+
| course_id | integer                |           | not null | nextval('courses_course_id_seq'::regclass) |
| course    | character varying(100) |           | not null |                                            |
+-----------+------------------------+-----------+----------+--------------------------------------------+
Indexes:
    "courses_pkey" PRIMARY KEY, btree (course_id)
```

Setup junction table:

```sql
students=> ALTER TABLE majors_courses ADD COLUMN major_id INT;
ALTER TABLE
students=> ALTER TABLE majors_courses ADD FOREIGN KEY(major_id) REFERENCES majors(major_id);
ALTER TABLE
students=> ALTER TABLE majors_courses ADD COLUMN course_id INT;
ALTER TABLE
students=> ALTER TABLE majors_courses ADD FOREIGN KEY(course_id) REFERENCES courses(course_id);
ALTER TABLE
students=> \d majors_courses
             Table "public.majors_courses"
+-----------+---------+-----------+----------+---------+
|  Column   |  Type   | Collation | Nullable | Default |
+-----------+---------+-----------+----------+---------+
| major_id  | integer |           |          |         |
| course_id | integer |           |          |         |
+-----------+---------+-----------+----------+---------+
Foreign-key constraints:
    "majors_courses_course_id_fkey" FOREIGN KEY (course_id) REFERENCES courses(course_id)
    "majors_courses_major_id_fkey" FOREIGN KEY (major_id) REFERENCES majors(major_id)
```

---

## Composite Primary Keys

The `majors_courses` table does not have a `primary key`. Majors and courses will be listed multiple times in this `junction table`. But there won't be a row with the same two values as another row. So these two columns together are unique. You can use a `composite primary key` here.

`ALTER TABLE <talbe_name> ADD PRIMARY KEY(<column_name>, <column_name>);`

```sql
students=> ALTER TABLE majors_courses ADD PRIMARY KEY(major_id, course_id);
ALTER TABLE
students=> \d majors_courses
             Table "public.majors_courses"
+-----------+---------+-----------+----------+---------+
|  Column   |  Type   | Collation | Nullable | Default |
+-----------+---------+-----------+----------+---------+
| major_id  | integer |           | not null |         |
| course_id | integer |           | not null |         |
+-----------+---------+-----------+----------+---------+
Indexes:
    "majors_courses_pkey" PRIMARY KEY, btree (major_id, course_id)
Foreign-key constraints:
    "majors_courses_course_id_fkey" FOREIGN KEY (course_id) REFERENCES courses(course_id)
    "majors_courses_major_id_fkey" FOREIGN KEY (major_id) REFERENCES majors(major_id)
```

---

## Adding Rows

The `majors` table only needs the name of the major as the id will be generated automatically.

One row to each table:

```sql
students=> INSERT INTO majors(major) VALUES('Database Administration');
INSERT 0 1
students=> SELECT * FROM majors;               
+----------+-------------------------+
| major_id |          major          |
+----------+-------------------------+
|        1 | Database Administration |
+----------+-------------------------+
(1 row)


students=> INSERT INTO courses(course) VALUES('Data Structures and Algorithms');
INSERT 0 1
students=> SELECT * FROM courses;                      
+-----------+--------------------------------+
| course_id |             course             |
+-----------+--------------------------------+
|         1 | Data Structures and Algorithms |
+-----------+--------------------------------+
(1 row)


students=> INSERT INTO majors_courses(major_id, course_id) VALUES(1, 1);
INSERT 0 1
students=> SELECT * FROM majors_courses;    
+----------+-----------+
| major_id | course_id |
+----------+-----------+
|        1 |         1 |
+----------+-----------+
(1 row)


students=> INSERT INTO students(first_name, last_name, major_id, gpa) VALUES('Rhea', 'Kellems', 1, 2.5);
INSERT 0 1
students=> SELECT * FROM students;              
+------------+------------+-----------+----------+-----+
| student_id | first_name | last_name | major_id | gpa |
+------------+------------+-----------+----------+-----+
|          1 | Rhea       | Kellems   |        1 | 2.5 |
+------------+------------+-----------+----------+-----+
(1 row)
```

---

## Script to Enter Data

Entering data in one at a time would be tedious. Let's make a script to do that.

```console
codeally@01a1e06deea9:~/project$ touch insert_data.sh
codeally@01a1e06deea9:~/project$ chmod +x insert_data.sh
```

`cat` is a command for printing the contents of a file. `cat <filename>` 

```sh
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

cat courses.csv
```

```console
codeally@01a1e06deea9:~/project$ ./insert_data.sh 
major,course
Database Administration,Data Structures and Algorithms
Web Development,Web Programming
Database Administration,Database Systems
Data Science,Data Structures and Algorithms
Network Engineering,Computer Networks
Database Administration,SQL
Data Science,Machine Learning
Network Engineering,Computer Systems
Computer Programming,Computer Networks
...
```

We can pipe this output into a while loop so we can go through one row at a time.

```
cat courses.csv | while read MAJOR COURSE
do
  <STATEMENTS>
done
```

Each new line will be read into the defined variables `MAJOR` and `COURSE`.

```sh
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

cat courses.csv | while read MAJOR COURSE
do
  echo $MAJOR
done
```

```console
codeally@01a1e06deea9:~/project$ ./insert_data.sh 
major,course
Database
Web
Database
Data
Network
Database
Data
...
```

---

## Internal Field Separator (IFS)

This is working, however it's only grabbing the first word. There is a default "Internal Field Separator" (`IFS`) variable in bash.

```console
codeally@01a1e06deea9:~/project$ declare -p IFS
declare -- IFS=" 
"
```

This variable is used to determine word boundaries, it defaults to a space/tab/newline. This can be changed/declared between the `while` and `read`

```sh
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

cat courses.csv | while IFS="," read MAJOR COURSE
do
  echo $MAJOR
done
```

```console
codeally@01a1e06deea9:~/project$ ./insert_data.sh 
major
Database Administration
Web Development
Database Administration
Data Science
Network Engineering
Database Administration
Data Science
...
```

---

## Fleshing Out insert_data

the `psql` command can be used to run a single command and exit.

`psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c`

The important parts are the `username`, `dbname` and the `-c` flag which is used for running a single command and exiting. The rest of the flags are for formatting.

Assigning this to a variable will allow you to query the database using that variable for example: `$($PSQL "<query_here>")`

We want to make a query that gets the `major_id` of the current `MAJOR` in the loop.

```sh
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

cat courses.csv | while IFS="," read MAJOR COURSE
do
  # get major_id
  MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")
  echo $MAJOR_ID

  # if not found
  # insert major
  # get new major_id
  # get course_id
  # if not found
  # insert course
  # get new course_id
  # insert into majors_courses
done
```

```console
codeally@01a1e06deea9:~/project$ ./insert_data.sh 

1

1


1

...
```

It looks like something is wrong, but it's working. This is because we only have one row entered in the table at the moment so only the id of `1` exists right now.

We can add an `if` statement to handle an id that is not found. We want to insert the major into the majors table row if it does not exist.

```sh
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

cat courses.csv | while IFS="," read MAJOR COURSE
do
  # get major_id
  MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")
  echo $MAJOR_ID

  # if not found
  if [[ -z $MAJOR_ID ]]
  then
    # insert major
    INSERT_MAJOR_RESULT=$($PSQL "INSERT INTO majors(major) VALUES('$MAJOR')")
    echo $INSERT_MAJOR_RESULT
    
    # get new major_id
  fi

  # get course_id
  # if not found
  # insert course
  # get new course_id
  # insert into majors_courses
done
```

---

## Test Data / copy command

Instead of running through all the data in the CSV `comma separated values` file we can make some test data in the terminal.

```console
codeally@01a1e06deea9:~/project$ cp courses.csv courses_test.csv
```

```
<!-- courses_test.csv -->

major,course
Database Administration,Data Structures and Algorithms
Web Development,Web Programming
Database Administration,Database Systems
Data Science,Data Structures and Algorithms

<!-- delete all but the first 5 lines -->
```

We will change our script to loop through this file instead of the full one.

```sh
cat courses_test.csv | while IFS="," read MAJOR COURSE
```

```console
codeally@01a1e06deea9:~/project$ ./insert_data.sh 

INSERT 0 1
1

INSERT 0 1
1

INSERT 0 1
```

It found an ID that was already in the database twice, and inserted three new ones.

```sql
students=> SELECT * FROM majors;
                   
+----------+-------------------------+
| major_id |          major          |
+----------+-------------------------+
|        1 | Database Administration |
|        2 | major                   |
|        3 | Web Development         |
|        4 | Data Science            |
+----------+-------------------------+
(4 rows)
```

---

## TRUNCATE command

The script added "major" from the top line of the file and added the other two that weren't there already. The `TRUNCATE` command can be used to delete all data from a table.

```sql
students=> TRUNCATE majors;
ERROR:  cannot truncate a table referenced in a foreign key constraint
DETAIL:  Table "students" references "majors".
HINT:  Truncate table "students" at the same time, or use TRUNCATE ... CASCADE.
```

The table can't be truncated because it is referenced in a foreign key constraint. The `students` and `majors_courses` tables use the `major_id` from `majors` as a foreign key. So to delete all data from `majors` we need to delete the data from those two tables at the same time.

```sql
students=> TRUNCATE majors, students, majors_courses;
TRUNCATE TABLE
students=> SELECT * FROM majors;
          
+----------+-------+
| major_id | major |
+----------+-------+
+----------+-------+
(0 rows)

students=> SELECT * FROM majors_courses;
            
+----------+-----------+
| major_id | course_id |
+----------+-----------+
+----------+-----------+
(0 rows)

students=> SELECT * FROM students;
                            
+------------+------------+-----------+----------+-----+
| student_id | first_name | last_name | major_id | gpa |
+------------+------------+-----------+----------+-----+
+------------+------------+-----------+----------+-----+
(0 rows)
```

Let's remove all data from the database.

```sql
students=> SELECT * FROM courses;
                       
+-----------+--------------------------------+
| course_id |             course             |
+-----------+--------------------------------+
|         1 | Data Structures and Algorithms |
+-----------+--------------------------------+
(1 row)

students=> TRUNCATE courses;
ERROR:  cannot truncate a table referenced in a foreign key constraint
DETAIL:  Table "majors_courses" references "courses".
HINT:  Truncate table "majors_courses" at the same time, or use TRUNCATE ... CASCADE.

students=> TRUNCATE courses, majors_courses;
TRUNCATE TABLE
students=> SELECT * FROM courses;
           
+-----------+--------+
| course_id | course |
+-----------+--------+
+-----------+--------+
(0 rows)
```

---

## Try the script again

```console
codeally@01a1e06deea9:~/project$ ./insert_data.sh 
INSERT 0 1
INSERT 0 1
INSERT 0 1
INSERT 0 1
```

```sql
students=> SELECT * FROM majors;
                   
+----------+-------------------------+
| major_id |          major          |
+----------+-------------------------+
|        5 | major                   |
|        6 | Database Administration |
|        7 | Web Development         |
|        8 | Data Science            |
+----------+-------------------------+
(4 rows)
```

'major' was added again.

We don't want the first line from the CSV file as those are just titles. Wrap the loop in an if statement to filter out this title.

```sh
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

cat courses_test.csv | while IFS="," read MAJOR COURSE
do
  if [[ $MAJOR != major ]]
  then
    # get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    # if not found
    if [[ -z $MAJOR_ID ]]
    then
      # insert major
      INSERT_MAJOR_RESULT=$($PSQL "INSERT INTO majors(major) VALUES('$MAJOR')")
      echo $INSERT_MAJOR_RESULT

      # get new major_id
    fi

    # get course_id
    # if not found
    # insert course
    # get new course_id
    # insert into majors_courses
  fi
done
```

```sql
students=> TRUNCATE majors, students, majors_courses;
TRUNCATE TABLE
students=> SELECT * FROM majors;
          
+----------+-------+
| major_id | major |
+----------+-------+
+----------+-------+
(0 rows)
```

```console
codeally@01a1e06deea9:~/project$ ./insert_data.sh 
INSERT 0 1
INSERT 0 1
INSERT 0 1
```

```sql
students=> SELECT * FROM majors;
                   
+----------+-------------------------+
| major_id |          major          |
+----------+-------------------------+
|        9 | Database Administration |
|       10 | Web Development         |
|       11 | Data Science            |
+----------+-------------------------+
(3 rows)
```

Looks like it is now working, the 'major' title is no longer being added.

---

## Message when data is added

We want to display a nicer message when something get's inserted. Test if `INSERT_MAJOR_RESULT` is equal to `INSERT 0 1`.

```sh
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

cat courses_test.csv | while IFS="," read MAJOR COURSE
do
  if [[ $MAJOR != major ]]
  then
    # get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    # if not found
    if [[ -z $MAJOR_ID ]]
    then
      # insert major
      INSERT_MAJOR_RESULT=$($PSQL "INSERT INTO majors(major) VALUES('$MAJOR')")
      if [[ $INSERT_MAJOR_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted into majors, $MAJOR
      fi

      # get new major_id
    fi

    # get course_id
    # if not found
    # insert course
    # get new course_id
    # insert into majors_courses
  fi
done
```

```sql
students=> TRUNCATE majors, students, majors_courses;
TRUNCATE TABLE
```

```console
codeally@01a1e06deea9:~/project$ ./insert_data.sh 
Inserted into majors, Database Administration
Inserted into majors, Web Development
Inserted into majors, Data Science
```

We then want to `# get new major_id`

```sh
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

cat courses_test.csv | while IFS="," read MAJOR COURSE
do
  if [[ $MAJOR != major ]]
  then
    # get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    # if not found
    if [[ -z $MAJOR_ID ]]
    then
      # insert major
      INSERT_MAJOR_RESULT=$($PSQL "INSERT INTO majors(major) VALUES('$MAJOR')")
      if [[ $INSERT_MAJOR_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted into majors, $MAJOR
      fi

      # get new major_id
      MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")
    fi

    # get course_id
    # if not found
    # insert course
    # get new course_id
    # insert into majors_courses
  fi
done
```

---

## Inserting courses

We can set this up similar to the majors

```sh
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

cat courses_test.csv | while IFS="," read MAJOR COURSE
do
  if [[ $MAJOR != major ]]
  then
    # get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    # if not found
    if [[ -z $MAJOR_ID ]]
    then
      # insert major
      INSERT_MAJOR_RESULT=$($PSQL "INSERT INTO majors(major) VALUES('$MAJOR')")
      if [[ $INSERT_MAJOR_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted into majors, $MAJOR
      fi

      # get new major_id
      MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")
    fi

    # get course_id
    COURSE_ID=$($PSQL "SELECT course_id FROM courses WHERE course='$COURSE'")

    # if not found
    if [[ -z $COURSE_ID ]]
    then
      # insert course
      INSERT_COURSE_RESULT=$($PSQL "INSERT INTO courses(course) VALUES('$COURSE')")
      if [[ $INSERT_COURSE_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted into courses, $COURSE
      fi

      # get new course_id
      COURSE_ID=$($PSQL "SELECT course_id FROM courses WHEre course='$COURSE'")

    fi

    # insert into majors_courses

  fi
done
```

```sql
students=> TRUNCATE majors, students, majors_courses;
TRUNCATE TABLE
```

```console
codeally@01a1e06deea9:~/project$ ./insert_data.sh 
Inserted into majors, Database Administration
Inserted into courses, Data Structures and Algorithms
Inserted into majors, Web Development
Inserted into courses, Web Programming
Inserted into courses, Database Systems
Inserted into majors, Data Science
```

```sql
students=> SELECT * FROM courses;
                       
+-----------+--------------------------------+
| course_id |             course             |
+-----------+--------------------------------+
|         2 | Data Structures and Algorithms |
|         3 | Web Programming                |
|         4 | Database Systems               |
+-----------+--------------------------------+
(3 rows)
```

---

## Remove data automatically

Instead of removing data manually, we can make the script do it for us.

```sh
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

echo $($PSQL "TRUNCATE students, majors, courses, majors_courses")
...
```

```console
codeally@01a1e06deea9:~/project$ ./insert_data.sh 
TRUNCATE TABLE
Inserted into majors, Database Administration
Inserted into courses, Data Structures and Algorithms
Inserted into majors, Web Development
Inserted into courses, Web Programming
Inserted into courses, Database Systems
Inserted into majors, Data Science
```

---

## Automate Junction Table

We can now again use the `PSQL` variable to insert the rows for the junction table.

```sh
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

echo $($PSQL "TRUNCATE students, majors, courses, majors_courses")

cat courses_test.csv | while IFS="," read MAJOR COURSE
do
  if [[ $MAJOR != major ]]
  then
    # get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    # if not found
    if [[ -z $MAJOR_ID ]]
    then
      # insert major
      INSERT_MAJOR_RESULT=$($PSQL "INSERT INTO majors(major) VALUES('$MAJOR')")
      if [[ $INSERT_MAJOR_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted into majors, $MAJOR
      fi

      # get new major_id
      MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")
    fi

    # get course_id
    COURSE_ID=$($PSQL "SELECT course_id FROM courses WHERE course='$COURSE'")

    # if not found
    if [[ -z $COURSE_ID ]]
    then
      # insert course
      INSERT_COURSE_RESULT=$($PSQL "INSERT INTO courses(course) VALUES('$COURSE')")
      if [[ $INSERT_COURSE_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted into courses, $COURSE
      fi

      # get new course_id
      COURSE_ID=$($PSQL "SELECT course_id FROM courses WHERE course='$COURSE'")
    fi

    # insert into majors_courses
    INSERT_MAJORS_COURSES_RESULT=$($PSQL "INSERT INTO majors_courses(major_id, course_id) VALUES('$MAJOR_ID', '$COURSE_ID')")
    if [[ $INSERT_MAJORS_COURSES_RESULT == "INSERT 0 1" ]]
    then
      echo Inserted into majors_courses, $MAJOR : $COURSE
    fi
  fi
done
```

```console
codeally@01a1e06deea9:~/project$ ./insert_data.sh 
TRUNCATE TABLE
Inserted into majors, Database Administration
Inserted into courses, Data Structures and Algorithms
Inserted into majors_courses, Database Administration : Data Structures and Algorithms
Inserted into majors, Web Development
Inserted into courses, Web Programming
Inserted into majors_courses, Web Development : Web Programming
Inserted into courses, Database Systems
Inserted into majors_courses, Database Administration : Database Systems
Inserted into majors, Data Science
Inserted into majors_courses, Data Science : Data Structures and Algorithms
```

```sql
students=> SELECT * FROM majors;
students=>                    
+----------+-------------------------+
| major_id |          major          |
+----------+-------------------------+
|       21 | Database Administration |
|       22 | Web Development         |
|       23 | Data Science            |
+----------+-------------------------+
(3 rows)


students=> SELECT * FROM courses;
students=>                        
+-----------+--------------------------------+
| course_id |             course             |
+-----------+--------------------------------+
|         8 | Data Structures and Algorithms |
|         9 | Web Programming                |
|        10 | Database Systems               |
+-----------+--------------------------------+
(3 rows)


students=> SELECT * FROM majors_courses;
students=>             
+----------+-----------+
| major_id | course_id |
+----------+-----------+
|       21 |         8 |
|       22 |         9 |
|       21 |        10 |
|       23 |         8 |
+----------+-----------+
(4 rows)
```

---

## Add data from students.csv

That part of the script is done. Now we need to add everything from the `students.csv` file.

```console
codeally@01a1e06deea9:~/project$ cp students.csv students_test.csv
```

```
<!-- students_test.csv -->

first_name,last_name,major,gpa
Rhea,Kellems,Database Administration,2.5
Emma,Gilbert,null,null
Kimberly,Whitley,Web Development,3.8
Jimmy,Felipe,Database Administration,3.7

<!-- delete all but first 5 rows -->
```

We want to loop through all this info like we did for the `courses_test.csv`. Except there are some `null` values. If the result from getting the `major_id` comes up empty, then we want to set the `MAJOR_ID` to null instead of that empty value.

```sh
...
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

echo $($PSQL "TRUNCATE students, majors, courses, majors_courses")

cat courses_test.csv | while IFS="," read MAJOR COURSE
do
  if [[ $MAJOR != major ]]
  then
    # get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    # if not found
    if [[ -z $MAJOR_ID ]]
    then
      # insert major
      INSERT_MAJOR_RESULT=$($PSQL "INSERT INTO majors(major) VALUES('$MAJOR')")
      if [[ $INSERT_MAJOR_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted into majors, $MAJOR
      fi

      # get new major_id
      MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")
    fi

    # get course_id
    COURSE_ID=$($PSQL "SELECT course_id FROM courses WHERE course='$COURSE'")

    # if not found
    if [[ -z $COURSE_ID ]]
    then
      # insert course
      INSERT_COURSE_RESULT=$($PSQL "INSERT INTO courses(course) VALUES('$COURSE')")
      if [[ $INSERT_COURSE_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted into courses, $COURSE
      fi

      # get new course_id
      COURSE_ID=$($PSQL "SELECT course_id FROM courses WHERE course='$COURSE'")
    fi

    # insert into majors_courses
    INSERT_MAJORS_COURSES_RESULT=$($PSQL "INSERT INTO majors_courses(major_id, course_id) VALUES('$MAJOR_ID', '$COURSE_ID')")
    if [[ $INSERT_MAJORS_COURSES_RESULT == "INSERT 0 1" ]]
    then
      echo Inserted into majors_courses, $MAJOR : $COURSE
    fi
  fi
done

cat students_test.csv | while IFS="," read FIRST LAST MAJOR GPA
do
  if [[ $FIRST != first_name ]]
  then
    # get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    # if not found
    if [[ -z $MAJOR_ID ]]
    then
      # set to null
      MAJOR_ID=null
    fi

    # insert student
    INSERT_STUDENT_RESULT=$($PSQL "INSERT INTO students(first_name, last_name, major_id, gpa) VALUES('$FIRST', '$LAST', $MAJOR_ID, $GPA)")
    if [[ $INSERT_STUDENT_RESULT == "INSERT 0 1" ]]
    then
      echo Inserted into students, $FIRST $LAST
    fi
  fi
done
```

```console
codeally@01a1e06deea9:~/project$ ./insert_data.sh 
TRUNCATE TABLE
Inserted into majors, Database Administration
Inserted into courses, Data Structures and Algorithms
Inserted into majors_courses, Database Administration : Data Structures and Algorithms
Inserted into majors, Web Development
Inserted into courses, Web Programming
Inserted into majors_courses, Web Development : Web Programming
Inserted into courses, Database Systems
Inserted into majors_courses, Database Administration : Database Systems
Inserted into majors, Data Science
Inserted into majors_courses, Data Science : Data Structures and Algorithms
Inserted into students, Rhea Kellems
Inserted into students, Emma Gilbert
Inserted into students, Kimberly Whitley
Inserted into students, Jimmy Felipe
```

```sql
students=> SELECT * FROM students;
students=>                             
+------------+------------+-----------+----------+-----+
| student_id | first_name | last_name | major_id | gpa |
+------------+------------+-----------+----------+-----+
|          2 | Rhea       | Kellems   |       33 | 2.5 |
|          3 | Emma       | Gilbert   |          |     |
|          4 | Kimberly   | Whitley   |       34 | 3.8 |
|          5 | Jimmy      | Felipe    |       33 | 3.7 |
+------------+------------+-----------+----------+-----+
(4 rows)
```

---

## Script Complete, View Inserted Data

Final script

```sh
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

echo $($PSQL "TRUNCATE students, majors, courses, majors_courses")

cat courses.csv | while IFS="," read MAJOR COURSE
do
  if [[ $MAJOR != major ]]
  then
    # get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    # if not found
    if [[ -z $MAJOR_ID ]]
    then
      # insert major
      INSERT_MAJOR_RESULT=$($PSQL "INSERT INTO majors(major) VALUES('$MAJOR')")
      if [[ $INSERT_MAJOR_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted into majors, $MAJOR
      fi

      # get new major_id
      MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")
    fi

    # get course_id
    COURSE_ID=$($PSQL "SELECT course_id FROM courses WHERE course='$COURSE'")

    # if not found
    if [[ -z $COURSE_ID ]]
    then
      # insert course
      INSERT_COURSE_RESULT=$($PSQL "INSERT INTO courses(course) VALUES('$COURSE')")
      if [[ $INSERT_COURSE_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted into courses, $COURSE
      fi

      # get new course_id
      COURSE_ID=$($PSQL "SELECT course_id FROM courses WHERE course='$COURSE'")
    fi

    # insert into majors_courses
    INSERT_MAJORS_COURSES_RESULT=$($PSQL "INSERT INTO majors_courses(major_id, course_id) VALUES('$MAJOR_ID', '$COURSE_ID')")
    if [[ $INSERT_MAJORS_COURSES_RESULT == "INSERT 0 1" ]]
    then
      echo Inserted into majors_courses, $MAJOR : $COURSE
    fi
  fi
done

cat students.csv | while IFS="," read FIRST LAST MAJOR GPA
do
  if [[ $FIRST != first_name ]]
  then
    # get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    # if not found
    if [[ -z $MAJOR_ID ]]
    then
      # set to null
      MAJOR_ID=null
    fi

    # insert student
    INSERT_STUDENT_RESULT=$($PSQL "INSERT INTO students(first_name, last_name, major_id, gpa) VALUES('$FIRST', '$LAST', $MAJOR_ID, $GPA)")
    if [[ $INSERT_STUDENT_RESULT == "INSERT 0 1" ]]
    then
      echo Inserted into students, $FIRST $LAST
    fi
  fi
done
```

```console
codeally@01a1e06deea9:~/project$ ./insert_data.sh 
TRUNCATE TABLE
Inserted into majors, Database Administration
Inserted into courses, Data Structures and Algorithms
Inserted into majors_courses, Database Administration : Data Structures and Algorithms
Inserted into majors, Web Development
Inserted into courses, Web Programming
Inserted into majors_courses, Web Development : Web Programming
Inserted into courses, Database Systems
Inserted into majors_courses, Database Administration : Database Systems
Inserted into majors, Data Science
Inserted into majors_courses, Data Science : Data Structures and Algorithms
Inserted into majors, Network Engineering
Inserted into courses, Computer Networks
Inserted into majors_courses, Network Engineering : Computer Networks
Inserted into courses, SQL
Inserted into majors_courses, Database Administration : SQL
Inserted into courses, Machine Learning
Inserted into majors_courses, Data Science : Machine Learning
Inserted into courses, Computer Systems
Inserted into majors_courses, Network Engineering : Computer Systems
Inserted into majors, Computer Programming
Inserted into majors_courses, Computer Programming : Computer Networks
Inserted into courses, Web Applications
Inserted into majors_courses, Database Administration : Web Applications
Inserted into majors, Game Design
Inserted into courses, Artificial Intelligence
Inserted into majors_courses, Game Design : Artificial Intelligence
Inserted into courses, Python
Inserted into majors_courses, Data Science : Python
Inserted into courses, Object-Oriented Programming
Inserted into majors_courses, Computer Programming : Object-Oriented Programming
Inserted into majors, System Administration
Inserted into majors_courses, System Administration : Computer Systems
Inserted into courses, Calculus
Inserted into majors_courses, Game Design : Calculus
Inserted into majors_courses, Web Development : Data Structures and Algorithms
Inserted into majors_courses, Data Science : Calculus
Inserted into majors_courses, Web Development : Object-Oriented Programming
Inserted into courses, Game Architecture
Inserted into majors_courses, Game Design : Game Architecture
Inserted into majors_courses, System Administration : Computer Networks
Inserted into courses, Algorithms
Inserted into majors_courses, Game Design : Algorithms
Inserted into courses, UNIX
Inserted into majors_courses, System Administration : UNIX
Inserted into courses, Server Administration
Inserted into majors_courses, System Administration : Server Administration
Inserted into majors_courses, Computer Programming : Computer Systems
Inserted into majors_courses, Computer Programming : Python
Inserted into courses, Network Security
Inserted into majors_courses, Network Engineering : Network Security
Inserted into majors_courses, Web Development : Web Applications
Inserted into majors_courses, Network Engineering : Algorithms
Inserted into students, Rhea Kellems
Inserted into students, Emma Gilbert
Inserted into students, Kimberly Whitley
Inserted into students, Jimmy Felipe
Inserted into students, Kyle Stimson
Inserted into students, Casares Hijo
Inserted into students, Noe Savage
Inserted into students, Sterling Boss
Inserted into students, Brian Davis
Inserted into students, Kaija Uronen
Inserted into students, Faye Conn
Inserted into students, Efren Reilly
Inserted into students, Danh Nhung
Inserted into students, Maxine Hagenes
Inserted into students, Larry Saunders
Inserted into students, Karl Kuhar
Inserted into students, Lieke Hazenveld
Inserted into students, Obie Hilpert
Inserted into students, Peter Booysen
Inserted into students, Nathan Turner
Inserted into students, Gerald Osiki
Inserted into students, Vanya Hassanah
Inserted into students, Roxelana Florescu
Inserted into students, Helene Parker
Inserted into students, Mariana Russel
Inserted into students, Ajit Dhungel
Inserted into students, Mehdi Vandenberghe
Inserted into students, Dejon Howell
Inserted into students, Aliya Gulgowski
Inserted into students, Ana Tupajic
Inserted into students, Hugo Duran
```

```sql
students=> SELECT * FROM students;                             
+------------+------------+--------------+----------+-----+
| student_id | first_name |  last_name   | major_id | gpa |
+------------+------------+--------------+----------+-----+
|          6 | Rhea       | Kellems      |       36 | 2.5 |
|          7 | Emma       | Gilbert      |          |     |
|          8 | Kimberly   | Whitley      |       37 | 3.8 |
|          9 | Jimmy      | Felipe       |       36 | 3.7 |
|         10 | Kyle       | Stimson      |          | 2.8 |
|         11 | Casares    | Hijo         |       41 | 4.0 |
|         12 | Noe        | Savage       |          | 3.6 |
|         13 | Sterling   | Boss         |       41 | 3.9 |
|         14 | Brian      | Davis        |          | 2.3 |
|         15 | Kaija      | Uronen       |       41 | 3.7 |
|         16 | Faye       | Conn         |       41 | 2.1 |
|         17 | Efren      | Reilly       |       37 | 3.9 |
|         18 | Danh       | Nhung        |          | 2.4 |
|         19 | Maxine     | Hagenes      |       36 | 2.9 |
|         20 | Larry      | Saunders     |       38 | 2.2 |
|         21 | Karl       | Kuhar        |       37 |     |
|         22 | Lieke      | Hazenveld    |       41 | 3.5 |
|         23 | Obie       | Hilpert      |       37 |     |
|         24 | Peter      | Booysen      |          | 2.9 |
|         25 | Nathan     | Turner       |       36 | 3.3 |
|         26 | Gerald     | Osiki        |       38 | 2.2 |
|         27 | Vanya      | Hassanah     |       41 | 4.0 |
|         28 | Roxelana   | Florescu     |       36 | 3.2 |
|         29 | Helene     | Parker       |       38 | 3.4 |
|         30 | Mariana    | Russel       |       37 | 1.8 |
|         31 | Ajit       | Dhungel      |          | 3.0 |
|         32 | Mehdi      | Vandenberghe |       36 | 1.9 |
|         33 | Dejon      | Howell       |       37 | 4.0 |
|         34 | Aliya      | Gulgowski    |       42 | 2.6 |
|         35 | Ana        | Tupajic      |       38 | 3.1 |
|         36 | Hugo       | Duran        |          | 3.8 |
+------------+------------+--------------+----------+-----+
(31 rows)

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

students=> SELECT * FROM courses;    
+-----------+--------------------------------+
| course_id |             course             |
+-----------+--------------------------------+
|        23 | Data Structures and Algorithms |
|        24 | Web Programming                |
|        25 | Database Systems               |
|        26 | Computer Networks              |
|        27 | SQL                            |
|        28 | Machine Learning               |
|        29 | Computer Systems               |
|        30 | Web Applications               |
|        31 | Artificial Intelligence        |
|        32 | Python                         |
|        33 | Object-Oriented Programming    |
|        34 | Calculus                       |
|        35 | Game Architecture              |
|        36 | Algorithms                     |
|        37 | UNIX                           |
|        38 | Server Administration          |
|        39 | Network Security               |
+-----------+--------------------------------+
(17 rows)

students=> SELECT * FROM majors_courses;     
+----------+-----------+
| major_id | course_id |
+----------+-----------+
|       36 |        23 |
|       37 |        24 |
|       36 |        25 |
|       38 |        23 |
|       39 |        26 |
|       36 |        27 |
|       38 |        28 |
|       39 |        29 |
|       40 |        26 |
|       36 |        30 |
|       41 |        31 |
|       38 |        32 |
|       40 |        33 |
|       42 |        29 |
|       41 |        34 |
|       37 |        23 |
|       38 |        34 |
|       37 |        33 |
|       41 |        35 |
|       42 |        26 |
|       41 |        36 |
|       42 |        37 |
|       42 |        38 |
|       40 |        29 |
|       40 |        32 |
|       39 |        39 |
|       37 |        30 |
|       39 |        36 |
+----------+-----------+
(28 rows)
```

---

## Dump Database

We are going to dump the database into a `sql` file so that it can be recreated later if needed.

`pg_dump` can be used to do this, the command will save al the commands needed to rebuild it. The `--clean` flag cleans database objects before recreating, the `--create` flag includes commands to create a database in dump, the `--inserts` flag will dump data as INSERT commands, rather than COPY.

```console
codeally@01a1e06deea9:~/project$ pg_dump --clean --create --inserts --username=freecodecamp students > students.sql
```
