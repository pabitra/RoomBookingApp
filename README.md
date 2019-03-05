Clone the repository
Run docker-compose up --build (this will create two service one database and other one with app service)
Once run successfully browse http://localhost:3000/api/v1/customers 


To run one locally 
Run npm install on the clone folder command line
Change the database connection string for development section to any postgres database installed on your machine in knexfile.js
Create a database roombooking on the postgres database
Run npm install knex -g
Run following commands from the commandline on the extarcted folder location

  1. knex migrate:latest --env development
  2. knex seed:run --env development
  3. npm start 
