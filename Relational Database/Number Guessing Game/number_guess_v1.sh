#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=number_guess --tuples-only -c"

SECRET_NUMBER=$((1 + $RANDOM % 1000))

echo -e "\nEnter your username:"
read USERNAME

USER_INFO=$($PSQL "SELECT * FROM users INNER JOIN user_stats USING(user_id) WHERE name = '$USERNAME'")
if [[ -z $USER_INFO ]]
then
  # if first time user
  echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."

  # register user
  STORE_USER_RESULT=$($PSQL "INSERT INTO users(name) VALUES('$USERNAME')")
  USER_ID=$($PSQL "SELECT user_id FROM users WHERE name='$USERNAME'")
  STORE_USER_ID_IN_STATS_RESULT=$($PSQL "INSERT INTO user_stats(user_id) VALUES($USER_ID)")

  # re-get USER_INFO for new user
  USER_INFO=$($PSQL "SELECT * FROM users INNER JOIN user_stats USING(user_id) WHERE name = '$USERNAME'")
else
  echo "$USER_INFO" | while read USER_ID BAR USERNAME BAR GAMES_PLAYED BAR BEST_GAME
  do
    # if user already exists
    echo -e "\nWelcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
  done
fi

# start game
NUMBER_OF_GUESSES=0
GAME_COMPLETE=false

# game helper
CHECK_GUESS() {
  if [[ $1 > $SECRET_NUMBER ]]
  then
    echo -e "\nIt's lower than that, guess again:"
  elif [[ $1 < $SECRET_NUMBER ]]
  then
    echo -e "\nIt's higher than that, guess again:"
  else
    GAME_COMPLETE=true
    echo -e "\nYou guessed it in $NUMBER_OF_GUESSES tries. The secret number was $SECRET_NUMBER. Nice Job!"

    echo "$USER_INFO" | while read USER_ID BAR USERNAME BAR GAMES_PLAYED BAR BEST_GAME
    do
      # check if best game
      if [[ $NUMBER_OF_GUESSES > $BEST_GAME ]]
      then
        # store new best game
        UPDATE_GAME_STATS_RESULT=$($PSQL "UPDATE user_stats SET games_played = $(( GAMES_PLAYED += 1 )), best_game = $NUMBER_OF_GUESSES WHERE user_id = $USER_ID")
      else
        # if not a new best game just increment games played
        UPDATE_GAME_STATS_RESULT=$($PSQL "UPDATE user_stats SET games_played = $(( GAMES_PLAYED += 1 )) WHERE user_id = $USER_ID")
      fi
    done
  fi
}

while [[ $GAME_COMPLETE == false ]]
do
  echo -e "\nGuess the secret number between 1 and 1000:"

  # increment number of guesses
  NUMBER_OF_GUESSES=$(( NUMBER_OF_GUESSES += 1 ))

  # check if guess is a number
  read GUESS
  while [[ ! $GUESS =~ ^[0-9]+$ ]]
  do
    echo -e "\nThat is not an integer, guess again:"
    read GUESS
  done

  # check if higher or lower
  CHECK_GUESS $GUESS
done
