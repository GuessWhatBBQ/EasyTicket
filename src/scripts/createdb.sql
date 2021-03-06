CREATE DATABASE EasyTicketDB WITH ENCODING 'UTF8';

CREATE USER dbarchitect WITH PASSWORD 'dbarchitect';

GRANT TEMP ON DATABASE easyticketdb TO dbarchitect;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO dbarchitect;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO dbarchitect;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO dbarchitect;
\c easyticketdb dbarchitect
