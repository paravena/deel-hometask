## Decisions

1 - One of my initial ideas was to migrate the project to typescript. At the 
beginning everything was smooth, but the migration of the Sequelize code turned
to be very complex, mostly because I wasn't familiar with this library and there were
some specific settings in the `tsconfig.json` file that were kind of difficult to 
figured out.

2 - There were also a lot of work involving configuration due to my decision of migrating
to `Typescript` I've set up a dev task that transpile `Typescript` code into `Javascript` and 
also watch for any change facilitating development. Apart from that, I set up
environment variables and Testing configuration using `jest` (I only created one dummy test
to verify if my configuration was correct)

3 - I have created Router files to separate the endpoints and prefix them with `/api/`

4 - I have created many middlewares to handle input validations using `express-validator` library

5 - I have created service component files containing the business logic that either query the data 
or persist the data into the database. 

6 - Only the update balance endpoint involve the usage of transactions, since two operation need to be
performed in order to update the balance of the Client and Contractor.

## How to run the app

### Running in dev mode

`npm run dev`

### Running in prod mode

`npm start`

### Running Tests 
Even though, there is only one dummy test. all the configuration necessary 
to run tests was done, for example setting up a test database

`npm run test`

### Seed Database

I did some modifications compare to what was set initially, 
basically I added environment variables

`npm run seed`


