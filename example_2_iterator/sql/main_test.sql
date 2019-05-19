CREATE EXTENSION jsonb_tutorial;
SELECT jsonb_tutorial('{}', '{}');
SELECT jsonb_tutorial('{"a": 1, "c": 2}', '{}');
SELECT jsonb_tutorial('{"a": {"b": "p", "d": 5}}', '{}');