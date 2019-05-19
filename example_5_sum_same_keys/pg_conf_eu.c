#include "postgres.h"
#include "catalog/pg_type.h"
#include "fmgr.h"
#include "utils/builtins.h"
#include "utils/jsonb.h"
PG_MODULE_MAGIC;

PG_FUNCTION_INFO_V1(pg_conf_eu);
/*  Note this code will only work with exactly the same keys */
Datum
pg_conf_eu(PG_FUNCTION_ARGS)
{
	JsonbIterator *it1,
			   *it2;
	JsonbIteratorToken r1,
				r2;
	JsonbValue	v1,
				v2;
	JsonbParseState *state = NULL;
	JsonbValue *result;

	Jsonb	   *jb1 = PG_GETARG_JSONB_P(0);
	Jsonb	   *jb2 = PG_GETARG_JSONB_P(1);
	bool		isFlatIteration = false;

	it1 = JsonbIteratorInit(&jb1->root);
	it2 = JsonbIteratorInit(&jb2->root);

	r1 = JsonbIteratorNext(&it1, &v1, isFlatIteration);
	r2 = JsonbIteratorNext(&it2, &v2, isFlatIteration);

	/* Assuming keys are the same */
	while (r1 != WJB_DONE)
	{
		if (r1 == WJB_BEGIN_OBJECT || r1 == WJB_END_OBJECT)
		{
			result = pushJsonbValue(&state, r1, NULL);
		}
		else if (r1 == WJB_KEY)
		{
			result = pushJsonbValue(&state, r1, &v1);
		}
		else if (r1 == WJB_VALUE)
		{
			JsonbValue	newValue;

			if (v1.type != jbvNumeric)
			{
				ereport(ERROR, (errcode(ERRCODE_INVALID_PARAMETER_VALUE), errmsg("Only numeric values are implemented")));
			}
			newValue.type = jbvNumeric;
			newValue.val.numeric = DatumGetNumeric((DirectFunctionCall2(numeric_add, PointerGetDatum(
																									 v1.val.numeric), PointerGetDatum(v2.val.numeric))));
			result = pushJsonbValue(&state, WJB_VALUE, &newValue);
		}
		else
		{
			ereport(ERROR, (errcode(ERRCODE_INVALID_PARAMETER_VALUE), errmsg("Case not implemented")));
		}
		r1 = JsonbIteratorNext(&it1, &v1, isFlatIteration);
		r2 = JsonbIteratorNext(&it2, &v2, isFlatIteration);

	}
	PG_RETURN_JSONB(JsonbValueToJsonb(result));
}
