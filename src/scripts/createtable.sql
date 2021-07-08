CREATE TABLE useraccounts (
    user_id serial PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(50) UNIQUE NOT NULL,
    phone_number varchar(20) NOT NULL,
    password varchar(128) NOT NULL,
    credit smallint
);

CREATE TABLE bus (
    bus_id serial PRIMARY KEY,
    pickup varchar(50) NOT NULL,
    destination varchar(50) NOT NULL,
    starting_date date NOT NULL,
    starting_time time NOT NULL,
    arrival_date date NOT NULL,
    arrival_time time NOT NULL,
    total_seat smallint,
    available_seat smallint,
    seat_fare smallint
);

CREATE TABLE booking (
    booking_id serial PRIMARY KEY,
    passenger_id serial REFERENCES useraccounts (user_id),
    bus_id serial REFERENCES bus (bus_id)
);