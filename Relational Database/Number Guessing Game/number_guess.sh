#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=number_guess --tuples-only -c"

GAME() {
  echo -e "\nGuess the secret number between 1 and 1000:"
  # game controls
  SECRET_NUMBER=$((1 + $RANDOM % 1000))
  CORRECT_GUESS=false
  GUESS_COUNT=0
  
  while [[ $CORRECT_GUESS == false ]]
  do
    read GUESS
    if [[ ! $GUESS =~ ^[0-9]+$ ]]
    then
      # something besides a number was entered
      echo -e "\nThat is not an integer, guess again:"
    elif [[ $GUESS < $SECRET_NUMBER ]]
    then
      # guess was less than number
      GUESS_COUNT=$((GUESS_COUNT += 1))
      echo -e "\nIt's higher than that, guess again:"
    elif [[ $GUESS > $SECRET_NUMBER ]]
    then
      # guess was greater than number
      GUESS_COUNT=$((GUESS_COUNT += 1))
      echo -e "\nIt's lower than that, guess again:"
    else
      # guess was correct
      CORRECT_GUESS=true
      GUESS_COUNT=$((GUESS_COUNT += 1))
      echo -e "\nYou guessed it in $GUESS_COUNT tries. The secret number was $SECRET_NUMBER. Nice job!"

      # store stats
      USER_CURRENT_STATS=$($PSQL "SELECT * FROM users INNER JOIN user_stats USING(user_id) WHERE user_id = $USER_ID")
      echo "$USER_CURRENT_STATS" | while read USER_ID BAR USERNAME BAR GAMES_PLAYED BAR BEST_GAME
      do
        if [[ $GUESS_COUNT > $BEST_GAME ]]
        then
          # if new best game store that
          UPDATE_GAME_STATS_RESULT=$($PSQL "UPDATE user_stats SET games_played = $(( GAMES_PLAYED += 1)), best_game = $GUESS_COUNT WHERE user_id = $USER_ID")
        else
          # otherwise increment just number of games played
          UPDATE_GAME_STATS_RESULT=$($PSQL "UPDATE user_stats SET games_played = $(( GAMES_PLAYED += 1)) WHERE user_id = $USER_ID")
        fi
      done
    fi
  done
}

DISPLAY() {
  # get username
  echo -e "\nEnter your username:"
  read USERNAME

  USER_ID=$($PSQL "SELECT user_id FROM users WHERE name = '$USERNAME'")
  if [[ -z $USER_ID ]]
  then
    # if new user
    echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."
    STORE_USER_RESULTS=$($PSQL "INSERT INTO users(name) VALUES('$USERNAME')")
    USER_ID=$($PSQL "SELECT user_id FROM users WHERE name = '$USERNAME'")
    LINK_STATS_TO_USER_RESULTS=$($PSQL "INSERT INTO user_stats(user_id) VALUES($USER_ID)")
  else
    # if existing user
    GAMES_PLAYED=$($PSQL "SELECT games_played FROM user_stats WHERE user_id = $USER_ID")
    BEST_GAME=$($PSQL "SELECT best_game FROM user_stats WHERE user_id = $USER_ID")
    echo -e "\nWelcome back, $(echo $USERNAME | sed -E 's/^ *| *$//g')! You have played $(echo $GAMES_PLAYED | sed -E 's/^ *| *$//g') games, and your best game took $(echo $BEST_GAME | sed -E 's/^ *| *$//g') guesses."
  fi

  # run game
  GAME
}

DISPLAY
