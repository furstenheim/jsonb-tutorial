EXTENSION = pg_conf_eu
DATA = pg_conf_eu--0.0.1.sql
REGRESS	 = main_test
MODULES = pg_conf_eu

# postgres stuff
PG_CONFIG = pg_config
PGXS := $(shell $(PG_CONFIG) --pgxs)
include $(PGXS)
