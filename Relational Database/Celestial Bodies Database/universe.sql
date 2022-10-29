--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: constellation; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.constellation (
    constellation_id integer NOT NULL,
    name character varying(25) NOT NULL,
    abbreviation character varying(3) NOT NULL,
    percentage_of_sky numeric(3,2),
    iau_quadrant character varying(3),
    num_main_stars integer NOT NULL
);


ALTER TABLE public.constellation OWNER TO freecodecamp;

--
-- Name: constellation_constellation_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.constellation_constellation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.constellation_constellation_id_seq OWNER TO freecodecamp;

--
-- Name: constellation_constellation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.constellation_constellation_id_seq OWNED BY public.constellation.constellation_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(25) NOT NULL,
    visible_by_eye boolean NOT NULL,
    distance_m_light_years numeric(5,2),
    apparent_magnitude numeric(4,2),
    constellation_id integer NOT NULL
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(25) NOT NULL,
    radius_km numeric(5,1),
    surface_gravity numeric(4,3),
    discovery text NOT NULL,
    tidal_locked boolean NOT NULL,
    planet_id integer NOT NULL
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(25) NOT NULL,
    orbital_period_days numeric(6,1),
    radius_km numeric(6,1),
    type character varying(15) NOT NULL,
    distance_from_star_au numeric(7,5),
    star_id integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(25) NOT NULL,
    spectral_type character varying(8),
    bolometric_luminosity integer NOT NULL,
    solar_radius numeric(6,3),
    age_m_years integer,
    galaxy_id integer NOT NULL
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: constellation constellation_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.constellation ALTER COLUMN constellation_id SET DEFAULT nextval('public.constellation_constellation_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: constellation; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.constellation VALUES (1, 'Sagittarus', 'Sgr', 2.10, 'SQ4', 12);
INSERT INTO public.constellation VALUES (2, 'Centaurus', 'Cen', 2.57, 'SQ3', 11);
INSERT INTO public.constellation VALUES (3, 'Sculptor', 'Scl', 1.15, 'SQ1', 4);
INSERT INTO public.constellation VALUES (4, 'Coma Berenices', 'Com', 0.94, 'NQ3', 3);
INSERT INTO public.constellation VALUES (5, 'Pavo', 'Pav', 0.92, 'SQ4', 7);
INSERT INTO public.constellation VALUES (6, 'Ursa Major', 'UMa', 3.10, 'NQ2', 20);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', true, 0.00, -6.50, 1);
INSERT INTO public.galaxy VALUES (2, 'Centaurus A', true, 13.05, 6.84, 2);
INSERT INTO public.galaxy VALUES (3, 'Sculptor', true, 11.42, 7.20, 3);
INSERT INTO public.galaxy VALUES (4, 'Needle', false, 38.49, 10.42, 4);
INSERT INTO public.galaxy VALUES (5, 'Condor', false, 212.00, 10.69, 5);
INSERT INTO public.galaxy VALUES (6, 'Pinwheel', false, 20.87, 7.90, 6);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon', 1737.4, 1.622, 'Unknown discovery time / Always known', true, 3);
INSERT INTO public.moon VALUES (2, 'Nix', 22.5, 0.002, 'Discovered by researchers of the Pluto Companion Search Team in 2005', false, 9);
INSERT INTO public.moon VALUES (3, 'Oberon', 761.4, 0.354, 'Discovered by William Herschel in 1787', true, 7);
INSERT INTO public.moon VALUES (4, 'Janus', 0.0, 0.011, 'Discovered by Audouin Dollfus in 1966', true, 6);
INSERT INTO public.moon VALUES (5, 'Europa', 1.3, 1.314, 'Discovered by Galileo Galilei in 1610', true, 5);
INSERT INTO public.moon VALUES (6, 'Pan', 14.1, 0.009, 'Discovered by Mark R. Showalter in 1990', true, 6);
INSERT INTO public.moon VALUES (7, 'Phobos', 11.7, 0.006, 'Discovered by Asaph Hall in 1877', true, 4);
INSERT INTO public.moon VALUES (8, 'Deimos', 6.2, 0.003, 'Discovered by Asaph Hall in 1877', true, 4);
INSERT INTO public.moon VALUES (9, 'Elara', 43.0, NULL, 'Discovered by Charles D. Perrine in 1905', false, 5);
INSERT INTO public.moon VALUES (10, 'Triton', 1353.4, 0.779, 'Discovered by William Lassell in 1846', true, 8);
INSERT INTO public.moon VALUES (11, 'Charon', 606.0, 0.288, 'Discovered by James W. Christy in 1978', true, 9);
INSERT INTO public.moon VALUES (12, 'Io', 1821.6, 1.796, 'Discovered by Galileo Galilei in 1610', true, 5);
INSERT INTO public.moon VALUES (13, 'Callisto', 2410.3, 1.235, 'Discovered by Galileo Galilei in 1610', true, 5);
INSERT INTO public.moon VALUES (14, 'Amalthea', 83.5, 0.020, 'Discovered by E. E. Barnard in 1892', true, 5);
INSERT INTO public.moon VALUES (15, 'Metis', 21.5, NULL, 'Discovered by S. Synnott in 1979', true, 5);
INSERT INTO public.moon VALUES (16, 'Taygete', 2.5, NULL, 'Discovered by Mauna Kea Observatory in 2000', false, 5);
INSERT INTO public.moon VALUES (17, 'Ymir', 9.0, NULL, 'Discovered by Brett J. Gladman in 2000', false, 6);
INSERT INTO public.moon VALUES (18, 'Narvi', 3.5, NULL, 'Discovered by Scott S. Sheppard in 2003', false, 6);
INSERT INTO public.moon VALUES (19, 'Bestla', 3.5, NULL, 'Discovered by Cassini spacecraft in 2015', false, 6);
INSERT INTO public.moon VALUES (20, 'Eggther', 6.0, NULL, 'Discovered by Sheppard et al. in 2019', false, 6);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Mercury', 88.0, 2439.7, 'Terrestrial', 0.46670, 1);
INSERT INTO public.planet VALUES (2, 'Venus', 224.7, 6051.8, 'Terrestrial', 0.72821, 1);
INSERT INTO public.planet VALUES (3, 'Earth', 365.3, 6371.0, 'Terrestrial', 1.00000, 1);
INSERT INTO public.planet VALUES (4, 'Mars', 686.9, 3389.5, 'Terrestrial', 1.66621, 1);
INSERT INTO public.planet VALUES (5, 'Jupiter', 5332.6, 69911.0, 'Gas Giant', 5.45700, 1);
INSERT INTO public.planet VALUES (6, 'Saturn', 10759.2, 58232.0, 'Gas Giant', 10.12380, 1);
INSERT INTO public.planet VALUES (7, 'Uranus', 30688.5, 25362.0, 'Ice Giant', 20.09650, 1);
INSERT INTO public.planet VALUES (8, 'Neptune', 367.5, 24622.0, 'Ice Giant', 30.33000, 1);
INSERT INTO public.planet VALUES (9, 'Pluto', 366.7, 1188.3, 'Dwarf Planet', 49.30500, 1);
INSERT INTO public.planet VALUES (10, 'Kepler-51 b', 45.2, 44253.7, 'Gas Giant', 0.25140, NULL);
INSERT INTO public.planet VALUES (11, 'HATS-16 b', 2.8, 90115.3, 'Gas Giant', 0.04130, NULL);
INSERT INTO public.planet VALUES (12, 'MASCARA-1 b', 2.8, 90115.3, 'Gas Giant', 0.04130, NULL);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sun', 'G2V', 1, 1.000, 4600, 1);
INSERT INTO public.star VALUES (2, 'Vega', 'A0Va', 40, 2.362, 455, 1);
INSERT INTO public.star VALUES (3, 'Achernar', 'B3Vep', 3150, 6.780, 37, 1);
INSERT INTO public.star VALUES (4, 'Betelgeuse', 'M2lab', 126000, 764.000, 8, 1);
INSERT INTO public.star VALUES (5, 'WR 142', 'WO2', 912000, 0.800, NULL, 1);
INSERT INTO public.star VALUES (6, 'Eta Carinae', 'WRpe', 4600000, 240.000, 3, 1);


--
-- Name: constellation_constellation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.constellation_constellation_id_seq', 6, true);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 20, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: constellation constellation_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.constellation
    ADD CONSTRAINT constellation_name_key UNIQUE (name);


--
-- Name: constellation constellation_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.constellation
    ADD CONSTRAINT constellation_pkey PRIMARY KEY (constellation_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: galaxy galaxy_constellation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_constellation_id_fkey FOREIGN KEY (constellation_id) REFERENCES public.constellation(constellation_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--
