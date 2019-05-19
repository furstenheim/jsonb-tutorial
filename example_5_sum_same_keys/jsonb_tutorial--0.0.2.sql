\echo Use "Create extension jsonb_tutorial to load this file. \quit

CREATE FUNCTION jsonb_tutorial (jsonb, jsonb)
RETURNS jsonb
AS '$libdir/jsonb_tutorial'
LANGUAGE C IMMUTABLE STRICT;
