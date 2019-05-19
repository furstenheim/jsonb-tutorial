CREATE EXTENSION jsonb_tutorial;
SELECT jsonb_tutorial('{}', '{}');
SELECT jsonb_tutorial('{"a": 1}', '{}');
SELECT jsonb_tutorial('{"a": ["c", "d"]}', '{}');