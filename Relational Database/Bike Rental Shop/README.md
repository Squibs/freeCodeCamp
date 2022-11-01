# Learn Bash and SQL by Building a Bike Rental Shop

Not a whole lot of notes for this section. Mostly just using what we've learned to create a pseudo bike rental shell/bash script.

List of Sections:

<!-- TOC -->

- [Create bikes Database](#create-bikes-database)
- [bike-shop.sh](#bike-shopsh)
- [case statement](#case-statement)
- [Rent menu](#rent-menu)
- [RETURN_MENU](#return_menu)
- [Final Code](#final-code)

<!-- /TOC -->

---

## Create bikes Database

You can set the default value of a column with `DEFAULT`.

Setup bikes database with tables:

```console
psql --username=freecodecamp --dbname=postgres
```

```sql
postgres=> CREATE DATABASE bikes;
CREATE DATABASE
postgres=> \c bikes;
You are now connected to database "bikes" as user "freecodecamp".

bikes=> CREATE TABLE bikes();
bikes=> ALTER TABLE bikes ADD COLUMN bike_id SERIAL PRIMARY KEY;
bikes=> ALTER TABLE bikes ADD COLUMN type VARCHAR(50) NOT NULL;
bikes=> ALTER TABLE bikes ADD COLUMN size INT NOT NULL;
bikes=> ALTER TABLE bikes ADD COLUMN available BOOLEAN NOT NULL DEFAULT true;
bikes=> \d bikes
bikes=>                                         Table "public.bikes"
+-----------+-----------------------+-----------+----------+----------------------------------------+
|  Column   |         Type          | Collation | Nullable |                Default                 |
+-----------+-----------------------+-----------+----------+----------------------------------------+
| bike_id   | integer               |           | not null | nextval('bikes_bike_id_seq'::regclass) |
| type      | character varying(50) |           | not null |                                        |
| size      | integer               |           | not null |                                        |
| available | boolean               |           | not null | true                                   |
+-----------+-----------------------+-----------+----------+----------------------------------------+
Indexes:
    "bikes_pkey" PRIMARY KEY, btree (bike_id)


bikes=> CREATE TABLE customers();
bikes=> ALTER TABLE customers ADD COLUMN customer_id SERIAL PRIMARY KEY;
bikes=> ALTER TABLE customers ADD COLUMN phone VARCHAR(15) NOT NULL UNIQUE;
bikes=> ALTER TABLE customers ADD COLUMN name VARCHAR(40) NOT NULL;
bikes=> \d customers
bikes=>                                            Table "public.customers"
+-------------+-----------------------+-----------+----------+------------------------------------------------+
|   Column    |         Type          | Collation | Nullable |                    Default                     |
+-------------+-----------------------+-----------+----------+------------------------------------------------+
| customer_id | integer               |           | not null | nextval('customers_customer_id_seq'::regclass) |
| phone       | character varying(15) |           | not null |                                                |
| name        | character varying(40) |           | not null |                                                |
+-------------+-----------------------+-----------+----------+------------------------------------------------+
Indexes:
    "customers_pkey" PRIMARY KEY, btree (customer_id)
    "customers_phone_key" UNIQUE CONSTRAINT, btree (phone)


bikes=> CREATE TABLE rentals();
bikes=> ALTER TABLE rentals ADD COLUMN rental_id SERIAL PRIMARY KEY;
bikes=> ALTER TABLE rentals ADD COLUMN customer_id INT NOT NULL;
bikes=> ALTER TABLE rentals ADD FOREIGN KEY(customer_id) REFERENCES customers(customer_id);
bikes=> ALTER TABLE rentals ADD COLUMN bike_id INT NOT NULL;
bikes=> ALTER TABLE rentals ADD FOREIGN KEY(bike_id) REFERENCES bikes(bike_id);
bikes=> ALTER TABLE rentals ADD COLUMN date_rented DATE NOT NULL DEFAULT NOW();
bikes=> ALTER TABLE rentals ADD COLUMN date_returned DATE;
bikes=> \d rentals
bikes=>                                     Table "public.rentals"
+---------------+---------+-----------+----------+--------------------------------------------+
|    Column     |  Type   | Collation | Nullable |                  Default                   |
+---------------+---------+-----------+----------+--------------------------------------------+
| rental_id     | integer |           | not null | nextval('rentals_rental_id_seq'::regclass) |
| customer_id   | integer |           | not null |                                            |
| bike_id       | integer |           | not null |                                            |
| date_rented   | date    |           | not null | now()                                      |
| date_returned | date    |           |          |                                            |
+---------------+---------+-----------+----------+--------------------------------------------+
Indexes:
    "rentals_pkey" PRIMARY KEY, btree (rental_id)
Foreign-key constraints:
    "rentals_bike_id_fkey" FOREIGN KEY (bike_id) REFERENCES bikes(bike_id)
    "rentals_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(customer_id)


bikes=> \d
bikes=>                        List of relations
+--------+---------------------------+----------+--------------+
| Schema |           Name            |   Type   |    Owner     |
+--------+---------------------------+----------+--------------+
| public | bikes                     | table    | freecodecamp |
| public | bikes_bike_id_seq         | sequence | freecodecamp |
| public | customers                 | table    | freecodecamp |
| public | customers_customer_id_seq | sequence | freecodecamp |
| public | rentals                   | table    | freecodecamp |
| public | rentals_rental_id_seq     | sequence | freecodecamp |
+--------+---------------------------+----------+--------------+
(6 rows)
```

Add bike inventory:

```sql
bikes=> INSERT INTO bikes(type, size) VALUES('Mountain', 27);
bikes=> INSERT INTO bikes(type, size) VALUES('Mountain', 28);
bikes=> INSERT INTO bikes(type, size) VALUES('Mountain', 29);
bikes=> INSERT INTO bikes(type, size) VALUES('Road', 27);
bikes=> INSERT INTO bikes(type, size) VALUES('Road', 28), ('Road', 29);
bikes=> INSERT INTO bikes(type, size) VALUES('BMX', 19), ('BMX', 20), ('BMX', 21);

bikes=> SELECT * FROM bikes;
+---------+----------+------+-----------+
| bike_id |   type   | size | available |
+---------+----------+------+-----------+
|       1 | Mountain |   27 | t         |
|       2 | Mountain |   28 | t         |
|       3 | Mountain |   29 | t         |
|       4 | Road     |   27 | t         |
|       5 | Road     |   28 | t         |
|       6 | Road     |   29 | t         |
|       7 | BMX      |   19 | t         |
|       8 | BMX      |   20 | t         |
|       9 | BMX      |   21 | t         |
+---------+----------+------+-----------+
(9 rows)
```

---

## bike-shop.sh

```console
codeally@d67c91a0fc30:~/project$ touch bike-shop.sh
codeally@d67c91a0fc30:~/project$ chmod +x bike-shop.sh 
```

```sh
#!/bin/bash

echo -e "\n~~~~~ Bike Rental Shop ~~~~~\n"

MAIN_MENU() {
  echo "How may I help you?"
}

MAIN_MENU
```

```console
codeally@d67c91a0fc30:~/project$ ./bike-shop.sh 

~~~~~ Bike Rental Shop ~~~~~

How may I help you?
```

Adding onto the script:

```sh
#!/bin/bash

echo -e "\n~~~~~ Bike Rental Shop ~~~~~\n"

MAIN_MENU() {
  echo "How may I help you?"
  echo -e "\n1. Rent a bike\n2. Return a bike\n3. Exit"
  read MAIN_MENU_SELECTION
}

RENT_MENU() {
  echo "Rent Menu"
}

RETURN_MENU() {
  echo "Return Menu"
}

EXIT() {
  echo -e "\nThank you for stopping in.\n"
}

MAIN_MENU
```

---

## case statement

When the user is prompted to enter an option at the main menu, we can use a `case` statement. Example:

```
case EXPRESSION in
  PATTERN) STATEMENTS ;;
  PATTERN) STATEMENTS ;;
  PATTERN) STATEMENTS ;;
  *) STATEMENTS ;;
esac
```

```sh
#!/bin/bash

echo -e "\n~~~~~ Bike Rental Shop ~~~~~\n"

MAIN_MENU() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi
  
  echo "How may I help you?"
  echo -e "\n1. Rent a bike\n2. Return a bike\n3. Exit"
  read MAIN_MENU_SELECTION
}

RENT_MENU() {
  echo "Rent Menu"
}

RETURN_MENU() {
  echo "Return Menu"
}

EXIT() {
  echo -e "\nThank you for stopping in.\n"
}

MAIN_MENU
case $MAIN_MENU_SELECTION in
  1) RENT_MENU ;;
  2) RETURN_MENU ;;
  3) EXIT ;;
  *) MAIN_MENU "Please enter a valid option." ;;
esac
```

---

## Rent menu

```sh
#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=bikes --tuples-only -c"

echo -e "\n~~~~~ Bike Rental Shop ~~~~~\n"

MAIN_MENU() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  echo "How may I help you?"
  echo -e "\n1. Rent a bike\n2. Return a bike\n3. Exit"
  read MAIN_MENU_SELECTION
}

RENT_MENU() {
  # get available bikes
  AVAILABLE_BIKES=$($PSQL "SELECT bike_id, type, size FROM bikes WHERE available = true ORDER BY bike_id")
  echo "$AVAILABLE_BIKES"

  # if no bikes available
  # send to main menu
}

RETURN_MENU() {
  echo "Return Menu"
}

EXIT() {
  echo -e "\nThank you for stopping in.\n"
}

MAIN_MENU
case $MAIN_MENU_SELECTION in
  1) RENT_MENU ;;
  2) RETURN_MENU ;;
  3) EXIT ;;
  *) MAIN_MENU "Please enter a valid option." ;;
esac
```

```console
codeally@d67c91a0fc30:~/project$ ./bike-shop.sh 

~~~~~ Bike Rental Shop ~~~~~

How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
1
       1 | Mountain |   27
       2 | Mountain |   28
       3 | Mountain |   29
       4 | Road     |   27
       5 | Road     |   28
       6 | Road     |   29
       7 | BMX      |   19
       8 | BMX      |   20
       9 | BMX      |   21
```

```sql
bikes=> UPDATE bikes SET available = false WHERE available = true;
UPDATE 9
```

```console
codeally@d67c91a0fc30:~/project$ ./bike-shop.sh 

~~~~~ Bike Rental Shop ~~~~~

How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
1
```

We should add a message if no bikes are available instead of leaving it blank.

```sh
#!/bin/bash

...

RENT_MENU() {
  # get available bikes
  AVAILABLE_BIKES=$($PSQL "SELECT bike_id, type, size FROM bikes WHERE available = true ORDER BY bike_id")
  echo "$AVAILABLE_BIKES"

  # if no bikes available
  if [[ -z $AVAILABLE_BIKES ]]
  then
    # send to main menu
    MAIN_MENU "Sorry, we don't have any bikes available right now."
  fi
}

...
```

```console
codeally@d67c91a0fc30:~/project$ ./bike-shop.sh 

~~~~~ Bike Rental Shop ~~~~~

How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
1


Sorry, we don't have any bikes available right now.
How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
3
```

Add a message for when there are bikes:

```sh
#!/bin/bash

...

RENT_MENU() {
  # get available bikes
  AVAILABLE_BIKES=$($PSQL "SELECT bike_id, type, size FROM bikes WHERE available = true ORDER BY bike_id")

  # if no bikes available
  if [[ -z $AVAILABLE_BIKES ]]
  then
    # send to main menu
    MAIN_MENU "Sorry, we don't have any bikes available right now."
  else
    # display available bikes
    echo -e "\nHere are the bikes we have available:"
    echo "$AVAILABLE_BIKES"

    # ask for bike to rent
    # if input is not a number
    # send to main menu
  fi
}

...
```

```sql
bikes=> UPDATE bikes SET available = true WHERE available = false AND type != 'BMX';
UPDATE 6
```

```console
codeally@d67c91a0fc30:~/project$ ./bike-shop.sh 

~~~~~ Bike Rental Shop ~~~~~

How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
1

Here are the bikes we have available:
       1 | Mountain |   27
       2 | Mountain |   28
       3 | Mountain |   29
       4 | Road     |   27
       5 | Road     |   28
       6 | Road     |   29
```

We can check if something is not a number using regex. You can use `!` at the front of a comparison to negate the returned value. The `=~` is used to denote that a regular expression is going to be used.

```
An additional binary operator, =~, is available, with the same precedence as == and !=.  When it is used, the string  to  the  right  of  the operator  is considered an extended regular expression and matched accordingly (as in regex(3)).
```

Finish out the rest of the RENT_MENU:

```sh
...

RENT_MENU() {
  # get available bikes
  AVAILABLE_BIKES=$($PSQL "SELECT bike_id, type, size FROM bikes WHERE available = true ORDER BY bike_id")

  # if no bikes available
  if [[ -z $AVAILABLE_BIKES ]]
  then
    # send to main menu
    MAIN_MENU "Sorry, we don't have any bikes available right now."
  else
    # display available bikes
    echo -e "\nHere are the bikes we have available:"
    echo "$AVAILABLE_BIKES" | while read BIKE_ID BAR TYPE BAR SIZE
    do
      echo "$BIKE_ID) $SIZE\" $TYPE Bike"
    done

    # ask for bike to rent
    echo -e "\nWhich one would you like to rent?"
    read BIKE_ID_TO_RENT

    # if input is not a number
    if [[ ! $BIKE_ID_TO_RENT =~ ^[0-9]+$ ]]
    then
      # send to main menu
      MAIN_MENU "That is not a valid bike number."
    else
      # get bike availability
      BIKE_AVAILABILITY=$($PSQL "SELECT available FROM bikes WHERE bike_id = $BIKE_ID_TO_RENT AND available = true")

      # if not available
      if [[ -z $BIKE_AVAILABILITY ]]
      then
        # send to main menu
        MAIN_MENU "That bike is not available."
      else
        # get customer info
        echo -e "\nWhat's your phone number?"
        read PHONE_NUMBER

        CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$PHONE_NUMBER'")

        # if customer doesn't exist
        if [[ -z $CUSTOMER_NAME ]]
        then
          # get new customer name
          echo -e "\nWhat's your name?"
          read CUSTOMER_NAME

          # insert new customer
          INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(name, phone) VALUES('$CUSTOMER_NAME', '$PHONE_NUMBER')")
        fi

        # get customer_id
        CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$PHONE_NUMBER'")

        # insert bike rental
        INSERT_RENTAL_RESULT=$($PSQL "INSERT INTO rentals(customer_id, bike_id) VALUES($CUSTOMER_ID, $BIKE_ID_TO_RENT)")

        # set bike availability to false
        SET_TO_FALSE_RESULT=$($PSQL "UPDATE bikes SET available = false WHERE bike_id = $BIKE_ID_TO_RENT")

        # get bike info
        BIKE_INFO=$($PSQL "SELECT size, type FROM bikes WHERE bike_id = $BIKE_ID_TO_RENT")
        BIKE_INFO_FORMATTED=$(echo $BIKE_INFO | sed 's/ |/"/')

        # send to main menu
        MAIN_MENU "I have put you down for the $BIKE_INFO_FORMATTED Bike, $(echo $CUSTOMER_NAME | sed -E 's/^ *| *$//g')."
      fi
    fi
  fi
}

...
```

```console
codeally@d67c91a0fc30:~/project$ ./bike-shop.sh 
~~~~~ Bike Rental Shop ~~~~~

How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
1

Here are the bikes we have available:
5) 28" Road Bike
6) 29" Road Bike
7) 19" BMX Bike
8) 20" BMX Bike
9) 21" BMX Bike

Which one would you like to rent?
5

What's your phone number?
555-5555

I have put you down for the 28" Road Bike, Me.
How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
3




codeally@d67c91a0fc30:~/project$ ./bike-shop.sh 

~~~~~ Bike Rental Shop ~~~~~

How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
1

Here are the bikes we have available:
6) 29" Road Bike
7) 19" BMX Bike
8) 20" BMX Bike
9) 21" BMX Bike

Which one would you like to rent?
6

What's your phone number?
000-0000

What's your name?
Test

I have put you down for the 29" Road Bike, Test.
How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
3
codeally@d67c91a0fc30:~/project$ 




codeally@d67c91a0fc30:~/project$ ./bike-shop.sh 

~~~~~ Bike Rental Shop ~~~~~

How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
1

Here are the bikes we have available:
7) 19" BMX Bike
8) 20" BMX Bike
9) 21" BMX Bike

Which one would you like to rent?
7

What's your phone number?
000-0000

I have put you down for the 19" BMX Bike, Test.
How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
3
codeally@d67c91a0fc30:~/project$ 
```

```sql
bikes=> SELECT * FROM bikes ORDER BY bike_id;
+---------+----------+------+-----------+
| bike_id |   type   | size | available |
+---------+----------+------+-----------+
|       1 | Mountain |   27 | f         |
|       2 | Mountain |   28 | f         |
|       3 | Mountain |   29 | f         |
|       4 | Road     |   27 | f         |
|       5 | Road     |   28 | f         |
|       6 | Road     |   29 | f         |
|       7 | BMX      |   19 | f         |
|       8 | BMX      |   20 | t         |
|       9 | BMX      |   21 | t         |
+---------+----------+------+-----------+
(9 rows)


bikes=> SELECT * FROM customers;
+-------------+----------+------+
| customer_id |  phone   | name |
+-------------+----------+------+
|           1 | 555-5555 | Me   |
|           2 | 000-0000 | Test |
+-------------+----------+------+
(2 rows)


bikes=> SELECT * FROM rentals;
+-----------+-------------+---------+-------------+---------------+
| rental_id | customer_id | bike_id | date_rented | date_returned |
+-----------+-------------+---------+-------------+---------------+
|         1 |           1 |       1 | 2022-11-01  |               |
|         2 |           1 |       2 | 2022-11-01  |               |
|         3 |           1 |       3 | 2022-11-01  |               |
|         4 |           1 |       4 | 2022-11-01  |               |
|         5 |           1 |       5 | 2022-11-01  |               |
|         6 |           2 |       6 | 2022-11-01  |               |
|         7 |           2 |       7 | 2022-11-01  |               |
+-----------+-------------+---------+-------------+---------------+
(7 rows)
```

---

## RETURN_MENU

```sh
...

RETURN_MENU() {
  # get customer info
  echo -e "\nWhat's your phone number?"
  read PHONE_NUMBER

  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$PHONE_NUMBER'")

  # if not found
  if  [[ -z $CUSTOMER_ID ]]
  then
    # send to main menu
    MAIN_MENU "I could not find a record for that phone number."
  else
    # get customer's rentals
    CUSTOMER_RENTALS=$($PSQL "SELECT bike_id, type, size FROM bikes INNER JOIN rentals USING(bike_id) INNER JOIN customers USING(customer_id) WHERE phone = '$PHONE_NUMBER' AND date_returned IS NULL ORDER BY bike_id")
    

    # if no rentals
    if [[ -z $CUSTOMER_RENTALS ]]
    then
      # send to main menu
      MAIN_MENU "You do not have any bikes rented."
    else
      # display rented bikes
      echo -e "\nHere are your rentals:"
      echo "$CUSTOMER_RENTALS" | while read BIKE_ID BAR TYPE BAR SIZE
      do
        echo "$BIKE_ID) $SIZE\" $TYPE Bike"
      done

      # ask for bike to return
      echo -e "\nWhich one would you like to return?"
      read BIKE_ID_TO_RETURN

      # if not a number
      if [[ ! $BIKE_ID_TO_RETURN =~ ^[0-9]+$ ]]
      then
        # send to main menu
        MAIN_MENU "That is not a valid bike number."
      else
        # check if input is rented
        RENTAL_ID=$($PSQL "SELECT rental_id FROM rentals INNER JOIN customers USING(customer_id) WHERE phone = '$PHONE_NUMBER' AND bike_id = $BIKE_ID_TO_RETURN AND date_returned IS NULL")

        # if input not rented
        if [[ -z $RENTAL_ID ]]
        then
          # send to main menu
          MAIN_MENU "You do not have that bike rented."
        else
          # update date_returned
          RETURN_BIKE_RESULT=$($PSQL "UPDATE rentals SET date_returned = NOW() WHERE rental_id = $RENTAL_ID")

          # set bike availability to true
          SET_TO_TRUE_RESULT=$($PSQL "UPDATE bikes SET available = true WHERE bike_id = $BIKE_ID_TO_RETURN")

          # send to main menu
          MAIN_MENU "Thank you for returning your bike."
        fi
      fi
    fi
  fi
}

...
```

```console
codeally@d67c91a0fc30:~/project$ ./bike-shop.sh 

~~~~~ Bike Rental Shop ~~~~~

How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
2

What's your phone number?
555-5555

Here are your rentals:
1) 27" Mountain Bike
2) 28" Mountain Bike
3) 29" Mountain Bike
4) 27" Road Bike
5) 28" Road Bike

Which one would you like to return?
1

Thank you for returning your bike.
How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
3
codeally@d67c91a0fc30:~/project$ 
```

```sql
bikes=> SELECT * FROM rentals;
bikes=>                                   
+-----------+-------------+---------+-------------+---------------+
| rental_id | customer_id | bike_id | date_rented | date_returned |
+-----------+-------------+---------+-------------+---------------+
|         2 |           1 |       2 | 2022-11-01  |               |
|         3 |           1 |       3 | 2022-11-01  |               |
|         4 |           1 |       4 | 2022-11-01  |               |
|         5 |           1 |       5 | 2022-11-01  |               |
|         6 |           2 |       6 | 2022-11-01  |               |
|         7 |           2 |       7 | 2022-11-01  |               |
|         1 |           1 |       1 | 2022-11-01  | 2022-11-01    |
+-----------+-------------+---------+-------------+---------------+
(7 rows)

bikes=> SELECT * FROM bikes ORDER BY bike_id;
bikes=>                      
+---------+----------+------+-----------+
| bike_id |   type   | size | available |
+---------+----------+------+-----------+
|       1 | Mountain |   27 | t         |
|       2 | Mountain |   28 | f         |
|       3 | Mountain |   29 | f         |
|       4 | Road     |   27 | f         |
|       5 | Road     |   28 | f         |
|       6 | Road     |   29 | f         |
|       7 | BMX      |   19 | f         |
|       8 | BMX      |   20 | t         |
|       9 | BMX      |   21 | t         |
+---------+----------+------+-----------+
(9 rows)

bikes=> SELECT * FROM customers;
bikes=>                  
+-------------+----------+------+
| customer_id |  phone   | name |
+-------------+----------+------+
|           1 | 555-5555 | Me   |
|           2 | 000-0000 | Test |
+-------------+----------+------+
(2 rows)
```

## Final Code

```sh
#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=bikes --tuples-only -c"

echo -e "\n~~~~~ Bike Rental Shop ~~~~~\n"

MAIN_MENU() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  echo "How may I help you?"
  echo -e "\n1. Rent a bike\n2. Return a bike\n3. Exit"
  read MAIN_MENU_SELECTION
}

RENT_MENU() {
  # get available bikes
  AVAILABLE_BIKES=$($PSQL "SELECT bike_id, type, size FROM bikes WHERE available = true ORDER BY bike_id")

  # if no bikes available
  if [[ -z $AVAILABLE_BIKES ]]
  then
    # send to main menu
    MAIN_MENU "Sorry, we don't have any bikes available right now."
  else
    # display available bikes
    echo -e "\nHere are the bikes we have available:"
    echo "$AVAILABLE_BIKES" | while read BIKE_ID BAR TYPE BAR SIZE
    do
      echo "$BIKE_ID) $SIZE\" $TYPE Bike"
    done

    # ask for bike to rent
    echo -e "\nWhich one would you like to rent?"
    read BIKE_ID_TO_RENT

    # if input is not a number
    if [[ ! $BIKE_ID_TO_RENT =~ ^[0-9]+$ ]]
    then
      # send to main menu
      MAIN_MENU "That is not a valid bike number."
    else
      # get bike availability
      BIKE_AVAILABILITY=$($PSQL "SELECT available FROM bikes WHERE bike_id = $BIKE_ID_TO_RENT AND available = true")

      # if not available
      if [[ -z $BIKE_AVAILABILITY ]]
      then
        # send to main menu
        MAIN_MENU "That bike is not available."
      else
        # get customer info
        echo -e "\nWhat's your phone number?"
        read PHONE_NUMBER

        CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$PHONE_NUMBER'")

        # if customer doesn't exist
        if [[ -z $CUSTOMER_NAME ]]
        then
          # get new customer name
          echo -e "\nWhat's your name?"
          read CUSTOMER_NAME

          # insert new customer
          INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(name, phone) VALUES('$CUSTOMER_NAME', '$PHONE_NUMBER')")
        fi

        # get customer_id
        CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$PHONE_NUMBER'")

        # insert bike rental
        INSERT_RENTAL_RESULT=$($PSQL "INSERT INTO rentals(customer_id, bike_id) VALUES($CUSTOMER_ID, $BIKE_ID_TO_RENT)")

        # set bike availability to false
        SET_TO_FALSE_RESULT=$($PSQL "UPDATE bikes SET available = false WHERE bike_id = $BIKE_ID_TO_RENT")

        # get bike info
        BIKE_INFO=$($PSQL "SELECT size, type FROM bikes WHERE bike_id = $BIKE_ID_TO_RENT")
        BIKE_INFO_FORMATTED=$(echo $BIKE_INFO | sed 's/ |/"/')

        # send to main menu
        MAIN_MENU "I have put you down for the $BIKE_INFO_FORMATTED Bike, $(echo $CUSTOMER_NAME | sed -E 's/^ *| *$//g')."
      fi
    fi
  fi
}

RETURN_MENU() {
  # get customer info
  echo -e "\nWhat's your phone number?"
  read PHONE_NUMBER

  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$PHONE_NUMBER'")

  # if not found
  if  [[ -z $CUSTOMER_ID ]]
  then
    # send to main menu
    MAIN_MENU "I could not find a record for that phone number."
  else
    # get customer's rentals
    CUSTOMER_RENTALS=$($PSQL "SELECT bike_id, type, size FROM bikes INNER JOIN rentals USING(bike_id) INNER JOIN customers USING(customer_id) WHERE phone = '$PHONE_NUMBER' AND date_returned IS NULL ORDER BY bike_id")
    

    # if no rentals
    if [[ -z $CUSTOMER_RENTALS ]]
    then
      # send to main menu
      MAIN_MENU "You do not have any bikes rented."
    else
      # display rented bikes
      echo -e "\nHere are your rentals:"
      echo "$CUSTOMER_RENTALS" | while read BIKE_ID BAR TYPE BAR SIZE
      do
        echo "$BIKE_ID) $SIZE\" $TYPE Bike"
      done

      # ask for bike to return
      echo -e "\nWhich one would you like to return?"
      read BIKE_ID_TO_RETURN

      # if not a number
      if [[ ! $BIKE_ID_TO_RETURN =~ ^[0-9]+$ ]]
      then
        # send to main menu
        MAIN_MENU "That is not a valid bike number."
      else
        # check if input is rented
        RENTAL_ID=$($PSQL "SELECT rental_id FROM rentals INNER JOIN customers USING(customer_id) WHERE phone = '$PHONE_NUMBER' AND bike_id = $BIKE_ID_TO_RETURN AND date_returned IS NULL")

        # if input not rented
        if [[ -z $RENTAL_ID ]]
        then
          # send to main menu
          MAIN_MENU "You do not have that bike rented."
        else
          # update date_returned
          RETURN_BIKE_RESULT=$($PSQL "UPDATE rentals SET date_returned = NOW() WHERE rental_id = $RENTAL_ID")

          # set bike availability to true
          SET_TO_TRUE_RESULT=$($PSQL "UPDATE bikes SET available = true WHERE bike_id = $BIKE_ID_TO_RETURN")

          # send to main menu
          MAIN_MENU "Thank you for returning your bike."
        fi
      fi
    fi
  fi
}

EXIT() {
  echo -e "\nThank you for stopping in.\n"
}

MAIN_MENU
case $MAIN_MENU_SELECTION in
  1) RENT_MENU ;;
  2) RETURN_MENU ;;
  3) EXIT ;;
  *) MAIN_MENU "Please enter a valid option." ;;
esac
```

Various other rents and returns followed by returning of all bikes by all customers.

```console
codeally@d67c91a0fc30:~/project$ ./bike-shop.sh 

~~~~~ Bike Rental Shop ~~~~~

How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
1

Here are the bikes we have available:
1) 27" Mountain Bike
8) 20" BMX Bike
9) 21" BMX Bike

Which one would you like to rent?
8

What's your phone number?
666-6666

What's your name?
Zack

I have put you down for the 20" BMX Bike, Zack.
How may I help you?

1. Rent a bike
2. Return a bike
3. Exit
1
```

```sql
bikes=> SELECT * FROM customers;
                 
+-------------+----------+------+
| customer_id |  phone   | name |
+-------------+----------+------+
|           1 | 555-5555 | Me   |
|           2 | 000-0000 | Test |
|           3 | 666-6666 | Zack |
+-------------+----------+------+
(3 rows)

bikes=> SELECT * FROM bikes ORDER BY bike_id;
                     
+---------+----------+------+-----------+
| bike_id |   type   | size | available |
+---------+----------+------+-----------+
|       1 | Mountain |   27 | t         |
|       2 | Mountain |   28 | t         |
|       3 | Mountain |   29 | t         |
|       4 | Road     |   27 | t         |
|       5 | Road     |   28 | t         |
|       6 | Road     |   29 | t         |
|       7 | BMX      |   19 | t         |
|       8 | BMX      |   20 | t         |
|       9 | BMX      |   21 | t         |
+---------+----------+------+-----------+
(9 rows)

bikes=> SELECT * FROM rentals ORDER BY rental_id;
bikes=>                                   
+-----------+-------------+---------+-------------+---------------+
| rental_id | customer_id | bike_id | date_rented | date_returned |
+-----------+-------------+---------+-------------+---------------+
|         1 |           1 |       1 | 2022-11-01  | 2022-11-01    |
|         2 |           1 |       2 | 2022-11-01  | 2022-11-01    |
|         3 |           1 |       3 | 2022-11-01  | 2022-11-01    |
|         4 |           1 |       4 | 2022-11-01  | 2022-11-01    |
|         5 |           1 |       5 | 2022-11-01  | 2022-11-01    |
|         6 |           2 |       6 | 2022-11-01  | 2022-11-01    |
|         7 |           2 |       7 | 2022-11-01  | 2022-11-01    |
|         8 |           3 |       8 | 2022-11-01  | 2022-11-01    |
|         9 |           3 |       1 | 2022-11-01  | 2022-11-01    |
+-----------+-------------+---------+-------------+---------------+
(9 rows)
```
