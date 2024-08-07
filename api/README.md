Steps to make the app run
- Make a folder to contain PG db via docker volumes:
    - mkdir -p $Home/docker/volume/postgres
-Spin up a postgres DBMS on your local docker environment with a command such as:

-Update the knexfile.js with your PG DBMS connection details