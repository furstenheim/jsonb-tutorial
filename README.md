## LESSONS LEARNT WRITING POSTGRESQL EXTENSIONS FOR JSON(B)
This is the presentation for the talk on the conference [PgConf 2017](https://www.postgresql.eu/events/schedule/pgconfeu2017/session/1619-lessons-learnt-writing-postgresql-extensions-for-jsonb/).

The slides can be accessed online at [furstenheim.github.io/jsonb-tutorial](https://furstenheim.github.io/jsonb-tutorial/)

Summing jsons: [jsonb_deep_sum](https://www.github.com/furstenheim/jsonb_deep_sum)

Validate json schema: [is_jsonb_valid](https://www.github.com/furstenheim/is_jsonb_valid)


### Development

#### Slides
To serve the slides on localhost go to the presentation folder

   cd presentation
   yarn install
   yarn start 
   
#### Code set up
Download postgres source code (version 11) from official website `https://www.postgresql.org/ftp/source/v11.3/`
And follow [installation guide](https://www.postgresql.org/docs/current/install-short.html)
For ease of postgres development use [http://big-elephants.com/2015-10/writing-postgres-extensions-part-iii/](http://big-elephants.com/2015-10/writing-postgres-extensions-part-iii/) as well

    /usr/local/pgsql/bin/initdb -D ~/data-dir-presentation
    /usr/local/pgsql/bin/pg_ctl -D ~/data-dir-presentation -l logfile start
    
#### Code execution
Once postgres is all set up. You can install and execute the tests from within an example:

    cd example_1_barebone
    make install ## install
    make installcheck ## run test


    
