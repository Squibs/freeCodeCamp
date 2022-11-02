#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

echo -e "\n~~~~~ Welcome to THE Salon ~~~~~\n"

# MAIN_MENU() {
#   if [[ $1 ]]
#   then
#     echo -e "\n$1"
#   fi

#   echo "How may I help you?"
#   echo -e "1. Salon Services\n2. View My Appointments\n3. Exit"
#   read MAIN_MENU_SELECTION
# }

SALON_MENU() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  echo -e "These are the services we offer:"

  SALON_SERVICES=$($PSQL "SELECT * FROM services")
  echo "$SALON_SERVICES" | while read SERVICE_ID BAR SERVICE
  do
    echo "$SERVICE_ID) $SERVICE"
  done

  echo "Which service would you like?"
  read SERVICE_ID_SELECTED

  if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]
  then
    SALON_MENU "\e[91mERROR:\e[0m That was not a valid service number."
  else
    SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $SERVICE_ID_SELECTED")
    if [[ -z $SERVICE_NAME ]]
    then
      SALON_MENU "\e[91mERROR:\e[0m Sorry there is not a service tied to the entered number."
    else
      echo -e "\n\e[36mSELECTED:\e[0m $(echo $SERVICE_NAME | sed 's/^ *| *$'//g -E)"
  
      echo -e "What is your phone number?"
      read CUSTOMER_PHONE

      CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")
      if [[ -z $CUSTOMER_NAME ]]
      then
        echo -e "\nI see you are new to this salon, welcome! What is your name?"
        read CUSTOMER_NAME

        INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")
      fi

      # SERVICE_TIME=
      # CHECK_FOR_EXISTING_APPOINTMENT () {
      #   if [[ $1 ]]
      #   then
      #     echo -e "\n$1"
      #   fi

      #   echo -e "At what time would you like your $(echo $SERVICE_NAME | sed 's/^ *| *$'//g -E) appointment, $(echo $CUSTOMER_NAME | sed 's/^ *| *$'//g -E)?"
      #   read SERVICE_TIME

      #   EXISTING_APPOINTMENT=$($PSQL "SELECT time FROM appointments WHERE time = '$SERVICE_TIME'")
      #   if [[ ! -z $EXISTING_APPOINTMENT ]]
      #   then
      #     CHECK_FOR_EXISTING_APPOINTMENT "\e[91mERROR:\e[0m Sorry an appointment at that time already exists."
      #   fi
      # }
      # CHECK_FOR_EXISTING_APPOINTMENT

      echo -e "At what time would you like your $(echo $SERVICE_NAME | sed 's/^ *| *$'//g -E) appointment, $(echo $CUSTOMER_NAME | sed 's/^ *| *$'//g -E)?"
      read SERVICE_TIME

      CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'")

      REGISTER_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")

      echo -e "\nI have put you down for a $(echo $SERVICE_NAME | sed 's/^ *| *$'//g -E) at $(echo $SERVICE_TIME | sed 's/^ *| *$'//g -E), $(echo $CUSTOMER_NAME | sed 's/^ *| *$'//g -E)."
    fi
  fi
}

EXIT() {
  echo -e "\nHope our services were of adequate expectation.\n"
}

SALON_MENU
