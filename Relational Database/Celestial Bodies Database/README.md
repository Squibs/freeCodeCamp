# Celestial Bodies Database

<p align="center"><img src="./Celestial Bodies Database ER Diagram.png" height="500" alt="Screenshot of my Celestial Bodies Database entity relationship diagram."/></p>

<em>Completed October 28, 2022</em>

It has been a long time coming for me to start learning how to build my own database. I've learned a lot through freeCodeCamp, and figured I should continue going through their lessons / challenges for other parts of web development. I've had a small amount of previous experience in working with databases, but none of what I have learned previously really stuck with me.

I wanted to plan out the structure of the database first before I started creating it in PostgreSQL. It made everything easier for myself to visualize.

Next to each database table, I have the console commands needed to create the table written out. I also included some example entries for each table, to help myself get going as well.

I wanted to really make sure I went onto the Codeally virtual machine with as much planned out as I could, for my own ease, and so if anything went wrong with the database not being saved due to the virtual machine going to sleep or anything else, I could recreate what I have with ease.

Overall this project turned out to not be all that hard. Throughout the project I had to constantly check back at my previous lesson notes for the commands/statements as I am still unfamiliar with them. I am looking forward to continue building more databases and eventually finally working with them on a site that I build.

## Database Detail and Some Example SELECTions


<details><summary>Individual table details</summary><ul>
  <li><details><summary>overall table detail</summary>

  ```sql
  universe=> \d
                              List of relations
  +--------+------------------------------------+----------+--------------+
  | Schema |                Name                |   Type   |    Owner     |
  +--------+------------------------------------+----------+--------------+
  | public | constellation                      | table    | freecodecamp |
  | public | constellation_constellation_id_seq | sequence | freecodecamp |
  | public | galaxy                             | table    | freecodecamp |
  | public | galaxy_galaxy_id_seq               | sequence | freecodecamp |
  | public | moon                               | table    | freecodecamp |
  | public | moon_moon_id_seq                   | sequence | freecodecamp |
  | public | planet                             | table    | freecodecamp |
  | public | planet_planet_id_seq               | sequence | freecodecamp |
  | public | star                               | table    | freecodecamp |
  | public | star_star_id_seq                   | sequence | freecodecamp |
  +--------+------------------------------------+----------+--------------+
  (10 rows)
  ```

  </details></li>


  <li><details markdown="1"><summary>moon details</summary>

  ```sql
  universe=> \d moon
                                            Table "public.moon"
  +-----------------+-----------------------+-----------+----------+---------------------------------------+
  |     Column      |         Type          | Collation | Nullable |                Default                |
  +-----------------+-----------------------+-----------+----------+---------------------------------------+
  | moon_id         | integer               |           | not null | nextval('moon_moon_id_seq'::regclass) |
  | name            | character varying(25) |           | not null |                                       |
  | radius_km       | numeric(5,1)          |           |          |                                       |
  | surface_gravity | numeric(4,3)          |           |          |                                       |
  | discovery       | text                  |           | not null |                                       |
  | tidal_locked    | boolean               |           | not null |                                       |
  | planet_id       | integer               |           | not null |                                       |
  +-----------------+-----------------------+-----------+----------+---------------------------------------+
  Indexes:
      "moon_pkey" PRIMARY KEY, btree (moon_id)
      "moon_name_key" UNIQUE CONSTRAINT, btree (name)
  Foreign-key constraints:
      "moon_planet_id_fkey" FOREIGN KEY (planet_id) REFERENCES planet(planet_id)
  ```

  </details></li>


  <li><details markdown="1"><summary>planet details</summary>

  ```sql
  universe=> \d planet
                                                Table "public.planet"
  +-----------------------+-----------------------+-----------+----------+-------------------------------------------+
  |        Column         |         Type          | Collation | Nullable |                  Default                  |
  +-----------------------+-----------------------+-----------+----------+-------------------------------------------+
  | planet_id             | integer               |           | not null | nextval('planet_planet_id_seq'::regclass) |
  | name                  | character varying(25) |           | not null |                                           |
  | orbital_period_days   | numeric(6,1)          |           |          |                                           |
  | radius_km             | numeric(6,1)          |           |          |                                           |
  | type                  | character varying(15) |           | not null |                                           |
  | distance_from_star_au | numeric(7,5)          |           |          |                                           |
  | star_id               | integer               |           |          |                                           |
  +-----------------------+-----------------------+-----------+----------+-------------------------------------------+
  Indexes:
      "planet_pkey" PRIMARY KEY, btree (planet_id)
      "planet_name_key" UNIQUE CONSTRAINT, btree (name)
  Foreign-key constraints:
      "planet_star_id_fkey" FOREIGN KEY (star_id) REFERENCES star(star_id)
  Referenced by:
      TABLE "moon" CONSTRAINT "moon_planet_id_fkey" FOREIGN KEY (planet_id) REFERENCES planet(planet_id)
  ```

  </details></li>


  <li><details markdown="1"><summary>star details</summary>

  ```sql
  universe=> \d star
                                                Table "public.star"
  +-----------------------+-----------------------+-----------+----------+---------------------------------------+
  |        Column         |         Type          | Collation | Nullable |                Default                |
  +-----------------------+-----------------------+-----------+----------+---------------------------------------+
  | star_id               | integer               |           | not null | nextval('star_star_id_seq'::regclass) |
  | name                  | character varying(25) |           | not null |                                       |
  | spectral_type         | character varying(8)  |           |          |                                       |
  | bolometric_luminosity | integer               |           | not null |                                       |
  | solar_radius          | numeric(6,3)          |           |          |                                       |
  | age_m_years           | integer               |           |          |                                       |
  | galaxy_id             | integer               |           | not null |                                       |
  +-----------------------+-----------------------+-----------+----------+---------------------------------------+
  Indexes:
      "star_pkey" PRIMARY KEY, btree (star_id)
      "star_name_key" UNIQUE CONSTRAINT, btree (name)
  Foreign-key constraints:
      "star_galaxy_id_fkey" FOREIGN KEY (galaxy_id) REFERENCES galaxy(galaxy_id)
  Referenced by:
      TABLE "planet" CONSTRAINT "planet_star_id_fkey" FOREIGN KEY (star_id) REFERENCES star(star_id)
  ```

  </details></li>


  <li><details markdown="1"><summary>galaxy details</summary>

  ```sql
  universe=> \d galaxy
                                                  Table "public.galaxy"
  +------------------------+-----------------------+-----------+----------+-------------------------------------------+
  |         Column         |         Type          | Collation | Nullable |                  Default                  |
  +------------------------+-----------------------+-----------+----------+-------------------------------------------+
  | galaxy_id              | integer               |           | not null | nextval('galaxy_galaxy_id_seq'::regclass) |
  | name                   | character varying(25) |           | not null |                                           |
  | visible_by_eye         | boolean               |           | not null |                                           |
  | distance_m_light_years | numeric(5,2)          |           |          |                                           |
  | apparent_magnitude     | numeric(4,2)          |           |          |                                           |
  | constellation_id       | integer               |           | not null |                                           |
  +------------------------+-----------------------+-----------+----------+-------------------------------------------+
  Indexes:
      "galaxy_pkey" PRIMARY KEY, btree (galaxy_id)
      "galaxy_name_key" UNIQUE CONSTRAINT, btree (name)
  Foreign-key constraints:
      "galaxy_constellation_id_fkey" FOREIGN KEY (constellation_id) REFERENCES constellation(constellation_id)
  Referenced by:
      TABLE "star" CONSTRAINT "star_galaxy_id_fkey" FOREIGN KEY (galaxy_id) REFERENCES galaxy(galaxy_id)
  ```

  </details></li>


  <li><details markdown="1"><summary>constellation details</summary>

  ```sql
  universe=> \d constellation
                                                  Table "public.constellation"
  +-------------------+-----------------------+-----------+----------+---------------------------------------------------------+
  |      Column       |         Type          | Collation | Nullable |                         Default                         |
  +-------------------+-----------------------+-----------+----------+---------------------------------------------------------+
  | constellation_id  | integer               |           | not null | nextval('constellation_constellation_id_seq'::regclass) |
  | name              | character varying(25) |           | not null |                                                         |
  | abbreviation      | character varying(3)  |           | not null |                                                         |
  | percentage_of_sky | numeric(3,2)          |           |          |                                                         |
  | iau_quadrant      | character varying(3)  |           |          |                                                         |
  | num_main_stars    | integer               |           | not null |                                                         |
  +-------------------+-----------------------+-----------+----------+---------------------------------------------------------+
  Indexes:
      "constellation_pkey" PRIMARY KEY, btree (constellation_id)
      "constellation_name_key" UNIQUE CONSTRAINT, btree (name)
  Referenced by:
      TABLE "galaxy" CONSTRAINT "galaxy_constellation_id_fkey" FOREIGN KEY (constellation_id) REFERENCES constellation(constellation_id)
  ```

  </details></li>
</ul></details>


<details><summary>Example SELECT queries</summary><ul>
  <li><details><summary>Planets with their moons</summary>

  ```sql
  universe=> SELECT planet.name planet_name, moon.name moon_name FROM planet FULL JOIN moon ON planet.planet_id = moon.planet_id;
  +-------------+-----------+
  | planet_name | moon_name |
  +-------------+-----------+
  | Earth       | Moon      |
  | Pluto       | Nix       |
  | Uranus      | Oberon    |
  | Saturn      | Janus     |
  | Jupiter     | Europa    |
  | Saturn      | Pan       |
  | Mars        | Phobos    |
  | Mars        | Deimos    |
  | Jupiter     | Elara     |
  | Neptune     | Triton    |
  | Pluto       | Charon    |
  | Jupiter     | Io        |
  | Jupiter     | Callisto  |
  | Jupiter     | Amalthea  |
  | Jupiter     | Metis     |
  | Jupiter     | Taygete   |
  | Saturn      | Ymir      |
  | Saturn      | Narvi     |
  | Saturn      | Bestla    |
  | Saturn      | Eggther   |
  | HATS-16 b   |           |
  | MASCARA-1 b |           |
  | Kepler-51 b |           |
  | Venus       |           |
  | Mercury     |           |
  +-------------+-----------+
  (25 rows)
  ```

  </details></li>


  <li><details><summary>Stars with their planets</summary>

  ```sql
  universe=> SELECT star.name star_name, planet.name planet_name FROM star FULL JOIN planet ON star.star_id = planet.star_id;
  +-------------+-------------+
  |  star_name  | planet_name |
  +-------------+-------------+
  | Sun         | Mercury     |
  | Sun         | Venus       |
  | Sun         | Earth       |
  | Sun         | Mars        |
  | Sun         | Jupiter     |
  | Sun         | Saturn      |
  | Sun         | Uranus      |
  | Sun         | Neptune     |
  | Sun         | Pluto       |
  |             | Kepler-51 b |
  |             | HATS-16 b   |
  |             | MASCARA-1 b |
  | Vega        |             |
  | WR 142      |             |
  | Eta Carinae |             |
  | Betelgeuse  |             |
  | Achernar    |             |
  +-------------+-------------+
  (17 rows)
  ```

  </details></li>


  <li><details><summary>Galaxies with their stars</summary>

  ```sql
  universe=> SELECT galaxy.name galaxy_name, star.name star_name FROM galaxy FULL JOIN star ON galaxy.galaxy_id = star.galaxy_id;
  +-------------+-------------+
  | galaxy_name |  star_name  |
  +-------------+-------------+
  | Milky Way   | Sun         |
  | Milky Way   | Vega        |
  | Milky Way   | Achernar    |
  | Milky Way   | Betelgeuse  |
  | Milky Way   | WR 142      |
  | Milky Way   | Eta Carinae |
  | Centaurus A |             |
  | Condor      |             |
  | Pinwheel    |             |
  | Needle      |             |
  | Sculptor    |             |
  +-------------+-------------+
(11 rows)
  ```

  </details></li>


  <li><details><summary>Constellations with their galaxies</summary>

  ```sql
  universe=> SELECT constellation.name constellation_name, galaxy.name galaxy_name FROM constellation FULL JOIN galaxy ON constellation.constellation_id = galaxy.constellation_id;
  +--------------------+-------------+
  | constellation_name | galaxy_name |
  +--------------------+-------------+
  | Sagittarus         | Milky Way   |
  | Centaurus          | Centaurus A |
  | Sculptor           | Sculptor    |
  | Coma Berenices     | Needle      |
  | Pavo               | Condor      |
  | Ursa Major         | Pinwheel    |
  +--------------------+-------------+
  (6 rows)
  ```

  </details></li>
</details>

<details><summary>Table rows</summary><ul>
  <li><details><summary>moon rows</summary>

  ```sql
  universe=> SELECT * FROM moon;
  +---------+----------+-----------+-----------------+----------------------------------------------------------------------+--------------+-----------+
  | moon_id |   name   | radius_km | surface_gravity |                              discovery                               | tidal_locked | planet_id |
  +---------+----------+-----------+-----------------+----------------------------------------------------------------------+--------------+-----------+
  |       1 | Moon     |    1737.4 |           1.622 | Unknown discovery time / Always known                                | t            |         3 |
  |       2 | Nix      |      22.5 |           0.002 | Discovered by researchers of the Pluto Companion Search Team in 2005 | f            |         9 |
  |       3 | Oberon   |     761.4 |           0.354 | Discovered by William Herschel in 1787                               | t            |         7 |
  |       4 | Janus    |       0.0 |           0.011 | Discovered by Audouin Dollfus in 1966                                | t            |         6 |
  |       5 | Europa   |       1.3 |           1.314 | Discovered by Galileo Galilei in 1610                                | t            |         5 |
  |       6 | Pan      |      14.1 |           0.009 | Discovered by Mark R. Showalter in 1990                              | t            |         6 |
  |       7 | Phobos   |      11.7 |           0.006 | Discovered by Asaph Hall in 1877                                     | t            |         4 |
  |       8 | Deimos   |       6.2 |           0.003 | Discovered by Asaph Hall in 1877                                     | t            |         4 |
  |       9 | Elara    |      43.0 |                 | Discovered by Charles D. Perrine in 1905                             | f            |         5 |
  |      10 | Triton   |    1353.4 |           0.779 | Discovered by William Lassell in 1846                                | t            |         8 |
  |      11 | Charon   |     606.0 |           0.288 | Discovered by James W. Christy in 1978                               | t            |         9 |
  |      12 | Io       |    1821.6 |           1.796 | Discovered by Galileo Galilei in 1610                                | t            |         5 |
  |      13 | Callisto |    2410.3 |           1.235 | Discovered by Galileo Galilei in 1610                                | t            |         5 |
  |      14 | Amalthea |      83.5 |           0.020 | Discovered by E. E. Barnard in 1892                                  | t            |         5 |
  |      15 | Metis    |      21.5 |                 | Discovered by S. Synnott in 1979                                     | t            |         5 |
  |      16 | Taygete  |       2.5 |                 | Discovered by Mauna Kea Observatory in 2000                          | f            |         5 |
  |      17 | Ymir     |       9.0 |                 | Discovered by Brett J. Gladman in 2000                               | f            |         6 |
  |      18 | Narvi    |       3.5 |                 | Discovered by Scott S. Sheppard in 2003                              | f            |         6 |
  |      19 | Bestla   |       3.5 |                 | Discovered by Cassini spacecraft in 2015                             | f            |         6 |
  |      20 | Eggther  |       6.0 |                 | Discovered by Sheppard et al. in 2019                                | f            |         6 |
  +---------+----------+-----------+-----------------+----------------------------------------------------------------------+--------------+-----------+
  (20 rows)
  ```

  </details>


  <li><details><summary>planet rows</summary>

  ```sql
  universe=> SELECT * FROM planet;
  +-----------+-------------+---------------------+-----------+--------------+-----------------------+---------+
  | planet_id |    name     | orbital_period_days | radius_km |     type     | distance_from_star_au | star_id |
  +-----------+-------------+---------------------+-----------+--------------+-----------------------+---------+
  |         1 | Mercury     |                88.0 |    2439.7 | Terrestrial  |               0.46670 |       1 |
  |         2 | Venus       |               224.7 |    6051.8 | Terrestrial  |               0.72821 |       1 |
  |         3 | Earth       |               365.3 |    6371.0 | Terrestrial  |               1.00000 |       1 |
  |         4 | Mars        |               686.9 |    3389.5 | Terrestrial  |               1.66621 |       1 |
  |         5 | Jupiter     |              5332.6 |   69911.0 | Gas Giant    |               5.45700 |       1 |
  |         6 | Saturn      |             10759.2 |   58232.0 | Gas Giant    |              10.12380 |       1 |
  |         7 | Uranus      |             30688.5 |   25362.0 | Ice Giant    |              20.09650 |       1 |
  |         8 | Neptune     |               367.5 |   24622.0 | Ice Giant    |              30.33000 |       1 |
  |         9 | Pluto       |               366.7 |    1188.3 | Dwarf Planet |              49.30500 |       1 |
  |        10 | Kepler-51 b |                45.2 |   44253.7 | Gas Giant    |               0.25140 |         |
  |        11 | HATS-16 b   |                 2.8 |   90115.3 | Gas Giant    |               0.04130 |         |
  |        12 | MASCARA-1 b |                 2.8 |   90115.3 | Gas Giant    |               0.04130 |         |
  +-----------+-------------+---------------------+-----------+--------------+-----------------------+---------+
  (12 rows)
  ```
  
  </details>


  <li><details><summary>star rows</summary>

  ```sql
  universe=> SELECT * FROM star;
  +---------+-------------+---------------+-----------------------+--------------+-------------+-----------+
  | star_id |    name     | spectral_type | bolometric_luminosity | solar_radius | age_m_years | galaxy_id |
  +---------+-------------+---------------+-----------------------+--------------+-------------+-----------+
  |       1 | Sun         | G2V           |                     1 |        1.000 |        4600 |         1 |
  |       2 | Vega        | A0Va          |                    40 |        2.362 |         455 |         1 |
  |       3 | Achernar    | B3Vep         |                  3150 |        6.780 |          37 |         1 |
  |       4 | Betelgeuse  | M2lab         |                126000 |      764.000 |           8 |         1 |
  |       5 | WR 142      | WO2           |                912000 |        0.800 |             |         1 |
  |       6 | Eta Carinae | WRpe          |               4600000 |      240.000 |           3 |         1 |
  +---------+-------------+---------------+-----------------------+--------------+-------------+-----------+
  (6 rows)
  ```
  
  </details>


  <li><details><summary>galaxy rows</summary>

  ```sql
  universe=> SELECT * FROM galaxy;
  +-----------+-------------+----------------+------------------------+--------------------+------------------+
  | galaxy_id |    name     | visible_by_eye | distance_m_light_years | apparent_magnitude | constellation_id |
  +-----------+-------------+----------------+------------------------+--------------------+------------------+
  |         1 | Milky Way   | t              |                   0.00 |              -6.50 |                1 |
  |         2 | Centaurus A | t              |                  13.05 |               6.84 |                2 |
  |         3 | Sculptor    | t              |                  11.42 |               7.20 |                3 |
  |         4 | Needle      | f              |                  38.49 |              10.42 |                4 |
  |         5 | Condor      | f              |                 212.00 |              10.69 |                5 |
  |         6 | Pinwheel    | f              |                  20.87 |               7.90 |                6 |
  +-----------+-------------+----------------+------------------------+--------------------+------------------+
  (6 rows)
  ```
  
  </details>


  <li><details><summary>constellation rows</summary>

  ```sql
  universe=> SELECT * FROM constellation;
  +------------------+----------------+--------------+-------------------+--------------+----------------+
  | constellation_id |      name      | abbreviation | percentage_of_sky | iau_quadrant | num_main_stars |
  +------------------+----------------+--------------+-------------------+--------------+----------------+
  |                1 | Sagittarus     | Sgr          |              2.10 | SQ4          |             12 |
  |                2 | Centaurus      | Cen          |              2.57 | SQ3          |             11 |
  |                3 | Sculptor       | Scl          |              1.15 | SQ1          |              4 |
  |                4 | Coma Berenices | Com          |              0.94 | NQ3          |              3 |
  |                5 | Pavo           | Pav          |              0.92 | SQ4          |              7 |
  |                6 | Ursa Major     | UMa          |              3.10 | NQ2          |             20 |
  +------------------+----------------+--------------+-------------------+--------------+----------------+
  (6 rows)
  ```
  
  </details>
</ul></details>

## Requirements / Instructions / User Stories

<details>
  <summary>Codeally virtual machine specific Instructions</summary>
  <br>
  For this project, you need to log in to PostgreSQL with psql to create your database. Do that by entering `psql --username=freecodecamp --dbname=postgres` in the terminal. Make all the tests below pass to complete the project. Be sure to get creative, and have fun!

  **Don't forget to connect to your database after you create it** :smile:

  Here's some ideas for other column and table names: `description`, `has_life`, `is_spherical`, `age_in_millions_of_years`, `planet_types`, `galaxy_types`, `distance_from_earth`.

  **Notes:**
  If you leave your virtual machine, your database may not be saved. You can make a dump of it by entering `pg_dump -cC --inserts -U freecodecamp universe > universe.sql` in a bash terminal (not the psql one). It will save the commands to rebuild your database in `universe.sql`. The file will be located where the command was entered. If it's anything inside the `project` folder, the file will be saved in the VM. You can rebuild the database by entering `psql -U postgres < universe.sql` in a terminal where the `.sql` file is.

  If you are saving your progress on freeCodeCamp.org, after getting all the tests to pass, follow the instructions above to save a dump of your database. Save the `universe.sql` file in a public repository and submit the URL to it on freeCodeCamp.org.
</details>

Tasks required for this database to be considered complete:

- [x] You should create a database named `universe`
- [x] Be sure to connect to your database with `\c universe`. Then, you should add tables named `galaxy`, `star`, `planet`, and `moon`
- [x] Each table should have a primary key
- [x] Each primary key should automatically increment
- [x] Each table should have a `name` column
- [X] You should use the `INT` data type for at least two columns that are not a primary or foreign key
- [X] You should use the `NUMERIC` data type at least once
- [x] You should use the `TEXT` data type at least once
- [x] You should use the `BOOLEAN` data type on at least two columns
- [x] Each "star" should have a foreign key that references one of the rows in `galaxy`
- [x] Each "planet" should have a foreign key that references one of the rows in `star`
- [x] Each "moon" should have a foreign key that references one of the rows in `planet`
- [x] Your database should have at least five tables
- [x] Each table should have at least three rows
- [x] The `galaxy` and `star` tables should each have at least six rows
- [x] The `planet` table should have at least 12 rows
- [x] The `moon` table should have at least 20 rows
- [x] Each table should have at least three columns
- [x] The `galaxy`, `star`, `planet`, and `moon` tables should each have at least five columns
- [X] At least two columns per table should not accept `NULL` values
- [x] At least one column from each table should be required to be `UNIQUE`
- [x] All columns named `name` should be of type `VARCHAR`
- [x] Each primary key column should follow the naming convention `table_name_id`. For example, the `moon` table should have a primary key column named `moon_id`
- [x] Each foreign key column should have the same name as the column it is referencing
