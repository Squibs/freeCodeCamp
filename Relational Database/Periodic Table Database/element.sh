#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=periodic_table --tuples-only -c"

if [[ -z $1 ]]
then
  # if no argument $1 is passed
  echo -e "Please provide an element as an argument."
else
  # check if argument is variable
  if [[ $1 =~ ^[0-9]+$ ]]
  then
    # get element info if $1 is number
    ELEMENT_INFO=$($PSQL "SELECT * FROM properties INNER JOIN elements USING(atomic_number) INNER JOIN types USING(type_id) WHERE atomic_number = '$1'")
  else
    # get element info if $1 is words
    ELEMENT_INFO=$($PSQL "SELECT * FROM properties INNER JOIN elements USING(atomic_number) INNER JOIN types USING(type_id) WHERE (symbol = '$1' OR name = '$1')")
  fi

  # if no element info
  if [[ -z $ELEMENT_INFO ]]
  then
    # could not find element info for $1
    echo -e "I could not find that element in the database."
  else
    echo "$ELEMENT_INFO" | while read TYPE_ID BAR ATOMIC_NUMBER BAR ATOMIC_MASS BAR MELTING_POINT_CELSIUS BAR BOILING_POINT_CELSIUS BAR SYMBOL BAR NAME BAR TYPE
    do
      # display element info
      echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT_CELSIUS celsius and a boiling point of $BOILING_POINT_CELSIUS celsius."
    done
  fi
fi
