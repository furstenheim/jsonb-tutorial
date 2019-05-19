#include "postgres.h"
#include "catalog/pg_type.h"
#include "fmgr.h"
#include "utils/builtins.h"
#include "utils/jsonb.h"
PG_MODULE_MAGIC;

static JsonbValue generate_string_jsonb_value(const char *key);

PG_FUNCTION_INFO_V1(jsonb_tutorial);
Datum
jsonb_tutorial(PG_FUNCTION_ARGS)
{
	Jsonb	   *jb1 = PG_GETARG_JSONB_P(0);
	Jsonb	   *out;
	JsonbValue *v1;

	JsonbValue	propertyKey = generate_string_jsonb_value("a");

	/* findJsonbValue returns palloced value */
	v1 = findJsonbValueFromContainer(&jb1->root, JB_FOBJECT, &propertyKey);

	if (v1 == NULL)
	{
		PG_RETURN_NULL();
	}
	out = JsonbValueToJsonb(v1);
	PG_RETURN_JSONB_P(out);
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
