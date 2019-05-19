#include "postgres.h"
#include "catalog/pg_type.h"
#include "fmgr.h"
#include "utils/builtins.h"
#include "utils/jsonb.h"
PG_MODULE_MAGIC;

PG_FUNCTION_INFO_V1(jsonb_tutorial);
Datum
jsonb_tutorial(PG_FUNCTION_ARGS)
{
	Jsonb	   *jb1 = PG_GETARG_JSONB_P(0);

	PG_RETURN_NULL();
}
