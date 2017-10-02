CREATE EXTENSION pg_conf_eu;
SELECT pg_conf_eu('{}', '{}');
SELECT pg_conf_eu('{"a": 1}', '{"a": 3}');
SELECT pg_conf_eu('{"a": 1, "b": 8}', '{"b": 5, "a": 1}');
SELECT pg_conf_eu('{"a": 1, "b": {"c": 4}}', '{"b": {"c": 55}, "a": 1}');
SELECT pg_conf_eu('{"a": 1, "b": {"c": 4}}', '{"b": {"c": "not a number"}, "a": 1}');
SELECT pg_conf_eu('{"a": 1, "b": {"c": 4}, "d": 3}', '{"b": {"c": "not a number"}, "a": 1}');