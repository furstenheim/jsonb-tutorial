\echo Use "Create extension pg_conf_eu to load this file. \quit

CREATE FUNCTION pg_conf_eu (jsonb, jsonb)
RETURNS jsonb
AS '$libdir/pg_conf_eu'
LANGUAGE C IMMUTABLE STRICT;
