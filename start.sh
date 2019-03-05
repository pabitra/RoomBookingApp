#!/bin/bash

# Immediately exits if any error occurs during the script
# execution. If not set, an error could occur and the
# script would continue its execution.
set -o errexit


# Creating an array that defines the environment variables
# that must be set. This can be consumed later via arrray
# variable expansion ${REQUIRED_ENV_VARS[@]}.



# Main execution:
# - verifies if all environment variables are set
# - runs the SQL code to create user and database
main() {

  init_user_and_db
  knex migrate:rollback --env production
  knex migrate:latest --env production
  knex seed:run --env production
  npm start

}

# Performs the initialization in the already-started PostgreSQL
# using the preconfigured POSTGRE_USER user.
init_user_and_db() {
  psql -v ON_ERROR_STOP=1 -h $DB_HOST --username "$DB_USER" <<-EOSQL
    DROP DATABASE IF EXISTS $DB_NAME;
    DROP USER IF EXISTS $FILLA_DB_USER;
    CREATE USER $FILLA_DB_USER WITH PASSWORD '$FILLA_DB_PASSWORD';
    CREATE DATABASE $DB_NAME;
    GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $FILLA_DB_USER;
EOSQL
}

# Executes the main routine with environment variables
# passed through the command line. We don't use them in
# this script but now you know 🤓
main