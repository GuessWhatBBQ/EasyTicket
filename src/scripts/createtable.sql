CREATE TABLE user_account (
    user_id serial PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(50) UNIQUE NOT NULL,
    phone_number varchar(20) NOT NULL,
    password varchar(128) NOT NULL,
    credit smallint
);

CREATE TABLE supervisor (
    supervisor_id serial PRIMARY KEY,
    user_id serial REFERENCES user_account (user_id)
);

CREATE TABLE admin (
    admin_id serial PRIMARY KEY,
    user_id serial REFERENCES user_account (user_id)
);

CREATE TYPE weekday AS ENUM ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');

CREATE TABLE bus (
    bus_id serial PRIMARY KEY,
    pickup varchar(50) NOT NULL,
    destination varchar(50) NOT NULL,
    starting_weekday weekday NOT NULL,
    starting_time time NOT NULL,
    arrival_weekday weekday NOT NULL,
    arrival_time time NOT NULL,
    seat_fare smallint,
    supervisor_id serial REFERENCES supervisor (supervisor_id)
);

CREATE TABLE trip (
    trip_id serial PRIMARY KEY,
    bus_id serial REFERENCES bus (bus_id),
    starting_date date NOT NULL,
    available_seats smallint,
    seating_arrangement jsonb
);

CREATE TABLE booking (
    booking_id serial PRIMARY KEY,
    passenger_id serial REFERENCES user_account (user_id),
    trip_id serial REFERENCES trip (trip_id),
    seat_number varchar(5) NOT NULL
);

CREATE TABLE cancelled_trip (
    bus_id serial REFERENCES bus (bus_id),
    cancelled_trip_date date NOT NULL
);
