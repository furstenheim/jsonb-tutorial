CREATE EXTENSION jsonb_tutorial;
SELECT jsonb_tutorial('{}', '{}');
SELECT jsonb_tutorial('{"a": 2}', '{}');
SELECT jsonb_tutorial('{"a": {"b": "c"}, "e": 4}', '{}');