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

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

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
-- Name: user_stats; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.user_stats (
    user_id integer NOT NULL,
    games_played integer DEFAULT 0 NOT NULL,
    best_game integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.user_stats OWNER TO freecodecamp;

--
-- Name: users; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(30)
);


ALTER TABLE public.users OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO freecodecamp;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: user_stats; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.user_stats VALUES (126, 1, 8);
INSERT INTO public.user_stats VALUES (128, 2, 565);
INSERT INTO public.user_stats VALUES (127, 5, 509);
INSERT INTO public.user_stats VALUES (130, 2, 814);
INSERT INTO public.user_stats VALUES (129, 5, 668);
INSERT INTO public.user_stats VALUES (132, 2, 455);
INSERT INTO public.user_stats VALUES (131, 5, 580);
INSERT INTO public.user_stats VALUES (134, 2, 727);
INSERT INTO public.user_stats VALUES (133, 5, 994);
INSERT INTO public.user_stats VALUES (136, 2, 843);
INSERT INTO public.user_stats VALUES (135, 5, 907);
INSERT INTO public.user_stats VALUES (138, 2, 730);
INSERT INTO public.user_stats VALUES (137, 5, 934);
INSERT INTO public.user_stats VALUES (140, 2, 689);
INSERT INTO public.user_stats VALUES (139, 5, 930);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users VALUES (126, 'Squibs');
INSERT INTO public.users VALUES (127, 'user_1667440019633');
INSERT INTO public.users VALUES (128, 'user_1667440019632');
INSERT INTO public.users VALUES (129, 'user_1667440078302');
INSERT INTO public.users VALUES (130, 'user_1667440078301');
INSERT INTO public.users VALUES (131, 'user_1667440081910');
INSERT INTO public.users VALUES (132, 'user_1667440081909');
INSERT INTO public.users VALUES (133, 'user_1667440084682');
INSERT INTO public.users VALUES (134, 'user_1667440084681');
INSERT INTO public.users VALUES (135, 'user_1667440092387');
INSERT INTO public.users VALUES (136, 'user_1667440092386');
INSERT INTO public.users VALUES (137, 'user_1667440132781');
INSERT INTO public.users VALUES (138, 'user_1667440132780');
INSERT INTO public.users VALUES (139, 'user_1667440136132');
INSERT INTO public.users VALUES (140, 'user_1667440136131');


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.users_user_id_seq', 140, true);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: user_stats user_stats_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.user_stats
    ADD CONSTRAINT user_stats_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--
