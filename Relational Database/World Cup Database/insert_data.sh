#! /bin/bash

if [[ $1 == "test" ]]
  then
    PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
  else
    PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

echo $($PSQL "TRUNCATE games, teams")

TEST_FOR_TEAM() {
  TEAM_IN_LIST=$($PSQL "SELECT name FROM teams WHERE name = '$1'")
  if [[ -z $TEAM_IN_LIST ]]
  then
    return $TEAM_IN_LIST
  fi
  return 1
}

cat games.csv | while IFS="," read YEAR ROUND WINNER LOSER W_GOALS L_GOALS
do
  if [[ $YEAR != year || $ROUND != round || $WINNER != winner || $LOSER != opponent || $W_GOALS != winner_goals || $L_GOALS != opponent_goals ]]
  then
    # echo -e "\n'$YEAR' '$ROUND' '$WINNER' '$LOSER' '$W_GOALS' '$L_GOALS'"

    # insert winners to teams if necessary
    if TEST_FOR_TEAM "$WINNER"
    then
      INSERT_TEAM_RESULT=$($PSQL "INSERT INTO teams(name) VALUES('$WINNER')")
      if [[ $INSERT_TEAM_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted team from winners: $WINNER
      fi
    fi

    # insert losers to teams if necessary
    if TEST_FOR_TEAM "$LOSER"
    then
      INSERT_TEAM_RESULT=$($PSQL "INSERT INTO teams(name) VALUES('$LOSER')")
      if [[ $INSERT_TEAM_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted team from losers: $LOSER
      fi
    fi

    # insert game into games
    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$WINNER'")
    LOSER_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$LOSER'")

    INSERT_GAME_RESULT=$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES($YEAR, '$ROUND', $WINNER_ID, $LOSER_ID, $W_GOALS, $L_GOALS)")
    if [[ $INSERT_GAME_RESULT == "INSERT 0 1" ]]
    then
      echo "Inserted game: $WINNER - $LOSER $W_GOALS:$L_GOALS ($ROUND) - $YEAR"
    fi
  fi
done
