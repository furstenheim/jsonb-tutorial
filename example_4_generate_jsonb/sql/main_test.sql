CREATE EXTENSION pg_conf_eu;
SELECT pg_conf_eu('{}', '{}');
SELECT pg_conf_eu('{"a": 2}', '{}');
SELECT pg_conf_eu('{"a": {"b": "c"}, "e": 4}', '{}');