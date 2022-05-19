# Products API

This repository contains the codebase for an improved Products service and database and represents about 2 weeks of work. 
It is intended for an existing e-commerce front-end which was designed by a separate development team.

## Technologies

The major dependencies of this codebase include [MongoDB](https://www.mongodb.com), [Node.js](https://nodejs.org), 
[Express.js](https://expressjs.com), and [Mongoose](https://mongoosejs.com). The service was deployed via AWS EC2 t2.micros routed through AWS load balancer.

## Specifications

The average latency was 7ms with 0% error rate at 1000 RPS. At an unmanageable load of 5000 RPS, the average latency was ~6400ms with 0% error rate.

Testing was performed using [Jest](https://jestjs.io/), [autocannon](https://www.npmjs.com/package/autocannon), [clinic.js](https://clinicjs.org), [Artillery](https://www.artillery.io), and [Loader.io](https://loader.io).

## More information
If you are interested in the other parts of this back-end project, please visit the parent organization [SpicyCumin](https://www.github.com/SpicyCumin), where you can find the other API services and the forked front-end repository.
