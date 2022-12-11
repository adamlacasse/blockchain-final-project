REASSIGN OWNED BY CURRENT_USER to objectowner;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public to readwrite;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public to readonly;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES to readwrite;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON SEQUENCES to readonly;
