CREATE EXTENSION pg_conf_eu;
SELECT pg_conf_eu('{}', '{}');
SELECT pg_conf_eu('{"a": 1, "c": 2}', '{}');
SELECT pg_conf_eu('{"a": {"b": 4, "d": 5}}', '{}');