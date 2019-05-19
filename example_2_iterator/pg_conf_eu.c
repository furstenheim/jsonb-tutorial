#include "postgres.h"
#include "catalog/pg_type.h"
#include "fmgr.h"
#include "utils/builtins.h"
#include "utils/jsonb.h"
PG_MODULE_MAGIC;

void		fmtJsonbValue(JsonbValue v);
void		fmtIteratorToken(JsonbIteratorToken r);

PG_FUNCTION_INFO_V1(pg_conf_eu);
Datum
pg_conf_eu(PG_FUNCTION_ARGS)
{
	JsonbIterator *it1;
	JsonbIteratorToken r1;
	JsonbValue	v1;
	Jsonb	   *jb1 = PG_GETARG_JSONB_P(0);
	bool		isFlatIteration = true;

	it1 = JsonbIteratorInit(&jb1->root);
	r1 = JsonbIteratorNext(&it1, &v1, isFlatIteration);

	while (r1 != WJB_DONE)
	{
		elog(INFO, "Iterating");
		fmtIteratorToken(r1);
		r1 = JsonbIteratorNext(&it1, &v1, isFlatIteration);
	}


	PG_RETURN_NULL();
}

void
fmtJsonbValue(JsonbValue v)
{

	if (v.type == jbvNumeric)
	{
		elog(INFO, "Value is numeric");
	}

	if (v.type == jbvString)
	{
		elog(INFO, "Value is string  %*.*s", v.val.string.len, v.val.string.len, v.val.string.val);
	}

	if (v.type == jbvBinary)
	{
		elog(INFO, "Value is binary");
	}

	if (v.type == jbvObject)
	{
		elog(INFO, "Value is descriptor of object with %d properties", v.val.object.nPairs);
	}
	if (v.type == jbvArray)
	{
		elog(INFO, "Value is array descriptor");
	}

	if (v.type == jbvBool)
	{
		elog(INFO, "Value is boolean");
	}
}

void
fmtIteratorToken(JsonbIteratorToken r)
{
	if (r == WJB_BEGIN_OBJECT)
	{
		elog(INFO, "Start object");
	}
	if (r == WJB_BEGIN_ARRAY)
	{
		elog(INFO, "Start array");
	}
	if (r == WJB_END_ARRAY)
	{
		elog(INFO, "End array");
	}

	if (r == WJB_END_OBJECT)
	{
		elog(INFO, "End object");
	}

	if (r == WJB_VALUE)
	{
		elog(INFO, "Value");
	}

	if (r == WJB_KEY)
	{
		elog(INFO, "Key");
	}

	if (r == WJB_DONE)
	{
		elog(INFO, "Done");
	}

}
