CREATE EXTENSION pg_conf_eu;
SELECT pg_conf_eu('{}', '{}');
SELECT pg_conf_eu('{"a": 1}', '{}');
SELECT pg_conf_eu('{"a": ["c", "d"]}', '{}');