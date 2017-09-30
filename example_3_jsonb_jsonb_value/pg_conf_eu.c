#include "postgres.h"
#include "catalog/pg_type.h"
#include "fmgr.h"
#include "utils/builtins.h"
#include "utils/jsonb.h"
PG_MODULE_MAGIC;

static JsonbValue * get_jbv_from_key (Jsonb * in, const char * key);


PG_FUNCTION_INFO_V1(pg_conf_eu);
Datum
pg_conf_eu(PG_FUNCTION_ARGS)
{
 Jsonb *jb1 = PG_GETARG_JSONB(0);
 Jsonb *jb2 = PG_GETARG_JSONB(1);
 Jsonb *out;
 JsonbValue *v1;
 
 v1 = get_jbv_from_key(jb1, "a");
 if (v1 == NULL) {
    PG_RETURN_NULL();
    return;
 }
 out = JsonbValueToJsonb(v1);
 PG_RETURN_JSONB(out);
}

/*
    Returns palloced jsonbvalue
*/
static JsonbValue * get_jbv_from_key (Jsonb * in, const char * key)
{
    JsonbValue propertyKey;
    JsonbValue * propertyJbv;
    text* keyText;
    propertyKey.type = jbvString;
    keyText = cstring_to_text(key);
    propertyKey.val.string.val = VARDATA_ANY(keyText);
    propertyKey.val.string.len = VARSIZE_ANY_EXHDR(keyText);
    // findJsonbValue returns palloced value
    propertyJbv = findJsonbValueFromContainer(&in->root, JB_FOBJECT, &propertyKey);
    return propertyJbv;
}