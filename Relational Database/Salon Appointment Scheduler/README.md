# Salon Appointment Scheduler

<p align="center"><img src="/Images/screenshots/screenshot-salon-scheduler.png" height="500" alt="Screenshot of my Salon Appointment Scheduler project."/></p>

<em>Completed November 1, 2022</em>

I almost feel like this particular project, especially since it is required for the freeCodeCamp *Relational Database Certification*, was a bit too simple or easy. Most of the required logic to complete this project can come from the previous lesson / challenge [Learn Bash and SQL by Building a Bike Rental Shop](../Bike%20Rental%20Shop#learn-bash-and-sql-by-building-a-bike-rental-shop).

I wanted to expand the logic a bit and include checking if an appointment at the entered time already exists, but it seemed to not allow this user story: ``You can create another row in the `appointments` table by running your script and entering `2`, `555-555-5555`, `11am` at each request for input if that phone number is already in the `customers` table. The row should have the `customer_id` for that customer, and the `service_id` for the service entered``, to pass on the tests. I have left the logic inside my [salon script](./salon.sh#L58), that I would have liked to use.

I would have also liked to have looped back into a menu after registering an appointment to see if there was anything else the customer would like to do (register another appointment, or view appointments), but again the user stories: ``...Make sure your script finishes running after completing any of the tasks above, or else the tests won't pass`` seemed to limit some creativity for this particular project.

One thing I can takeaway from this project, is that I didn't need to reference a whole lot to be able to complete it. Most of the logic seemed to sink in from going through all the previous challenges and lessons.

## Database Detail and Some Example SELECTions

<details>
  <summary>Table details</summary>

  ```sql
  salon=> \d services
                                         Table "public.services"
    Column   |         Type          | Collation | Nullable |                   Default                    
  ------------+-----------------------+-----------+----------+----------------------------------------------
  service_id | integer               |           | not null | nextval('services_service_id_seq'::regclass)
  name       | character varying(30) |           |          | 
  Indexes:
      "services_pkey" PRIMARY KEY, btree (service_id)
  Referenced by:
      TABLE "appointments" CONSTRAINT "appointments_service_id_fkey" FOREIGN KEY (service_id) REFERENCES services(service_id)
  ```

  ```sql
  salon=> \d appointments
                                             Table "public.appointments"
      Column     |         Type          | Collation | Nullable |                       Default                        
  ----------------+-----------------------+-----------+----------+------------------------------------------------------
  appointment_id | integer               |           | not null | nextval('appointments_appointment_id_seq'::regclass)
  customer_id    | integer               |           | not null | 
  service_id     | integer               |           | not null | 
  time           | character varying(30) |           |          | 
  Indexes:
      "appointments_pkey" PRIMARY KEY, btree (appointment_id)
  Foreign-key constraints:
      "appointments_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
      "appointments_service_id_fkey" FOREIGN KEY (service_id) REFERENCES services(service_id)
  ```

  ```sql
  salon=> \d customers
                                          Table "public.customers"
    Column    |         Type          | Collation | Nullable |                    Default                     
  -------------+-----------------------+-----------+----------+------------------------------------------------
  customer_id | integer               |           | not null | nextval('customers_customer_id_seq'::regclass)
  phone       | character varying(15) |           |          | 
  name        | character varying(30) |           |          | 
  Indexes:
      "customers_pkey" PRIMARY KEY, btree (customer_id)
      "customers_phone_key" UNIQUE CONSTRAINT, btree (phone)
  Referenced by:
      TABLE "appointments" CONSTRAINT "appointments_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
  ```

</details>

<details>
  <summary>Example SELECTions</summary>

  ```sql
  salon=> SELECT * FROM services;
  service_id |       name        
  ------------+-------------------
            1 | Hair Cut
            2 | Bang / Neck Trims
            3 | Hair Color
  (3 rows)
  ```

  ```sql
  salon=> SELECT * FROM appointments LIMIT 4;
  appointment_id | customer_id | service_id | time 
  ----------------+-------------+------------+------
                1 |          11 |          1 | 6:30
                8 |          17 |          2 | 9
                9 |          17 |          2 | 11am
               10 |          17 |          2 | 12pm
  ```

  ```sql
  salon=> SELECT * FROM customers;
  customer_id |    phone     | name  
  -------------+--------------+-------
            11 | 666-666-6666 | Zack
            17 | 555-555-5555 | Fabio
  (2 rows)
  ```

  ```sql
  salon=> SELECT * FROM appointments INNER JOIN customers USING(customer_id) INNER JOIN services USING(service_id) ORDER BY appointment_id LIMIT 4;
  service_id | customer_id | appointment_id | time |    phone     | name  |       name        
  ------------+-------------+----------------+------+--------------+-------+-------------------
            1 |          11 |              1 | 6:30 | 666-666-6666 | Zack  | Hair Cut
            2 |          17 |              8 | 9    | 555-555-5555 | Fabio | Bang / Neck Trims
            2 |          17 |              9 | 11am | 555-555-5555 | Fabio | Bang / Neck Trims
            2 |          17 |             10 | 12pm | 555-555-5555 | Fabio | Bang / Neck Trims
  (4 rows)
  ```
</details>

## Requirements / Instructions / User Stories

<details>
  <summary>Codeally virtual machine specific instructions</summary>
  <br>
  Follow the instructions and get all the user stories below to pass to finish the project. Create your database by logging in to psql with `psql --username=freecodecamp --dbname=postgres`. You can query the database in your script with `psql --username=freecodecamp --dbname=salon -c "SQL QUERY HERE"`, add more flags if you need to. Be sure to get creative, and have fun!

  **Don't forget to connect to your database to add tables after you create it** :smile:

  **Hints:**
  - Your script needs to finish running after doing any of the tasks described below or the tests won't pass
  - The tests check the script output so don't use `clear` or other commands which might erase it
  - See `examples.txt` for example output of a passing script
  - The tests may add data to your database, feel free to delete it

  **Notes:**
  If you leave your virtual machine, your database may not be saved. You can make a dump of it by entering `pg_dump -cC --inserts -U freecodecamp salon > salon.sql` in a bash terminal (not the psql one). It will save the commands to rebuild your database in `salon.sql`. The file will be located where the command was entered. If it's anything inside the `project` folder, the file will be saved in the VM. You can rebuild the database by entering `psql -U postgres < salon.sql` in a terminal where the `.sql` file is.

  If you are saving your progress on freeCodeCamp.org, after getting all the tests to pass, follow the instructions above to save a dump of your database. Save the `salon.sql` file, as well as the final version of your `salon.sh` file, in a public repository and submit the URL to it on freeCodeCamp.org.
</details>

Tasks required for this project to be considered complete:

- [x] You should create a database named `salon`
- [x] You should connect to your database, then create tables named `customers`, `appointments`, and `services`
- [x] Each table should have a primary key column that automatically increments
- [x] Each primary key column should follow the naming convention, `table_name_id`. For example, the `customers` table should have a `customer_id` key. Note that there’s no `s` at the end of `customer`
- [x] Your `appointments` table should have a `customer_id` foreign key that references the `customer_id` column from the `customers` table
- [x] Your `appointments` table should have a `service_id` foreign key that references the `service_id` column from the `services` table
- [x] Your `customers` table should have `phone` that is a `VARCHAR` and must be unique
- [x] Your `customers` and `services` tables should have a `name` column
- [x] Your `appointments` table should have a `time` column that is a `VARCHAR`
- [x] You should have at least three rows in your `services` table for the different services you offer, one with a `service_id` of `1`
- [x] You should create a script file named `salon.sh` in the `project` folder
- [x] Your script file should have a “shebang” that uses bash when the file is executed (use `#! /bin/bash`)
- [x] Your script file should have executable permissions
- [x] You should not use the `clear` command in your script
- [x] You should display a numbered list of the services you offer before the first prompt for input, each with the format `#) <service>`. For example, `1) cut`, where `1` is the `service_id`
- [x] If you pick a service that doesn't exist, you should be shown the same list of services again
- [x] Your script should prompt users to enter a `service_id`, phone number, a name if they aren’t already a customer, and a time. You should use `read` to read these inputs into variables named `SERVICE_ID_SELECTED`, `CUSTOMER_PHONE`, `CUSTOMER_NAME`, and `SERVICE_TIME`
- [x] If a phone number entered doesn’t exist, you should get the customers name and enter it, and the phone number, into the `customers` table
- [x] You can create a row in the `appointments` table by running your script and entering `1`, `555-555-5555`, `Fabio`, `10:30` at each request for input if that phone number isn’t in the `customers` table. The row should have the `customer_id` for that customer, and the `service_id` for the service entered
- [x] You can create another row in the `appointments` table by running your script and entering `2`, `555-555-5555`, `11am` at each request for input if that phone number is already in the `customers` table. The row should have the `customer_id` for that customer, and the `service_id` for the service entered
- [x] After an appointment is successfully added, you should output the message `I have put you down for a <service> at <time>, <name>.` For example, if the user chooses `cut` as the service, `10:30` is entered for the time, and their name is `Fabio` in the database the output would be `I have put you down for a cut at 10:30, Fabio.` Make sure your script finishes running after completing any of the tasks above, or else the tests won't pass
