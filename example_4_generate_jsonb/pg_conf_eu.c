#include "postgres.h"
#include "catalog/pg_type.h"
#include "fmgr.h"
#include "utils/builtins.h"
#include "utils/jsonb.h"
PG_MODULE_MAGIC;
static JsonbValue generate_string_jsonb_value(const char *key);
static Jsonb *createStaticJsonb();
static Jsonb *copyJsonb(Jsonb *jb);


PG_FUNCTION_INFO_V1(pg_conf_eu);
Datum
pg_conf_eu(PG_FUNCTION_ARGS)
{
	Jsonb	   *jb1 = PG_GETARG_JSONB(0);
	Jsonb	   *jb2 = PG_GETARG_JSONB(1);
	Jsonb	   *result;

	/* result = copyJsonb(jb1); */
	result = createStaticJsonb();
	PG_RETURN_JSONB(result);
}

/*  Returns palloc'd jsonb */
static Jsonb *
createStaticJsonb()
{
	JsonbValue	v1,
				v2;
	JsonbValue *result;

	/* Here we store the new jsonb */
	JsonbParseState *state = NULL;

	pushJsonbValue(&state, WJB_BEGIN_OBJECT, NULL);
	v1 = generate_string_jsonb_value("a");
	pushJsonbValue(&state, WJB_KEY, &v1);
	v2 = generate_string_jsonb_value("d3");
	pushJsonbValue(&state, WJB_VALUE, &v2);
	result = pushJsonbValue(&state, WJB_END_OBJECT, NULL);
	/* JsonbValueToJsonb returns palloc'd value */
	return JsonbValueToJsonb(result);
}

static Jsonb *
copyJsonb(Jsonb *jb)
{
	JsonbIteratorToken r;
	JsonbValue	v;
	JsonbValue *result;
	JsonbParseState *state = NULL;
	JsonbIterator *it;

	it = JsonbIteratorInit(&jb->root);
	r = JsonbIteratorNext(&it, &v, false);

	while (r != WJB_DONE)
	{
		/*
		 * Achtung, if WJB_BEGIN_OBJECT or WJB_END_OBJECT, then *JsonbValue
		 * must be null in push
		 */
		if (r == WJB_BEGIN_OBJECT || r == WJB_END_OBJECT)
		{
			result = pushJsonbValue(&state, r, NULL);
		}
		else
		{
			result = pushJsonbValue(&state, r, &v);
		}
		r = JsonbIteratorNext(&it, &v, false);
	}
	return JsonbValueToJsonb(result);
}

static JsonbValue
generate_string_jsonb_value(const char *key)
{
	JsonbValue	propertyKey;
	text	   *keyText;

	propertyKey.type = jbvString;
	keyText = cstring_to_text(key);
	propertyKey.val.string.val = VARDATA_ANY(keyText);
	propertyKey.val.string.len = VARSIZE_ANY_EXHDR(keyText);
	return propertyKey;
}
