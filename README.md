# Developer Test KSEO

This is a developer test made by Mattias Mucherie for KSEO.
The result has been deployed [here](https://arcane-fjord-86837.herokuapp.com/)

The task was to create a data store that keeps vehicles with their status and their customers.
A GUI was needed to visually see the status of the vehicles.

## Data store and server

I chose to go with a [MongoDB](https://www.mongodb.com/what-is-mongodb) database.
It has great flexibility regarding queries and I think that a JSON structure makes sense in this scenario.
Because this is a mock-up I only set up an mongodb memory server.
However a real setup would work in a similar fashion.

An example of a document in the database:

```
{
    "_id": "5d95ca03741c3400169bb852",
    "name": "Kalles Grustransporter AB",
    "nickName": "kalles",
    "address": "Cementvägen 8, 111 11 Södertälje",
    "vehicles": [
      {
        "vin": "YS2R4X20005399401",
        "reg": "ABC123",
        "status": "online"
      },
      {
        "vin": "VLUR4X20009093588",
        "reg": "DEF456",
        "status": "offline"
      },
      {
        "vin": "VLUR4X20009048066",
        "reg": "GHI789",
        "status": "offline"
      }
    ]
  },
```

Then the REST API endpoints where setup.

One to retrieve the complete list of customers and vehicles `/api/` while the other one filter the content `/api/search?status=online`.

There are 3 types of query that can be handled:

- customer `/api/search?customer=kalles`
- vehicle `/api/search?vehicle=YS2R4X20005399401`
- status `/api/search?status=offline`

The API is secured with JSON Web Tokens (JWT) and with the help of Auth0. In the frontend, an access token is fetched from Auth0 and then sent in the header of the API endpoints to retrieve data. The backend then validates this JWT.

The backend is managed by Express.js which is a server framework for Node.js.
The server handle the incoming API requests and also modifies the database.
A cron job was setup that flips the status of a random truck every 20 seconds.

Morgan is used in order to log the incoming HTTP requests. The log is currently only displayed and can be seen when runing the server locally in the console or in heroku when deployed. A log looks something like this:

```
2019-10-08T11:33:27.327141+00:00 app[web.1]: ::ffff:10.13.182.136 - - [08/Oct/2019:11:33:27 +0000] "GET /api/ HTTP/1.1" 200 868 "https://arcane-fjord-86837.herokuapp.com/" "Mozilla/5.0 (Linux; Android 9; ONEPLUS A3003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.92 Mobile Safari/537.36"
```

## Front-end

The front-end is built with React and a simple `create-react-app` setup was used.
There are three different pages:

- Home `/`. On this page all trucks of all customers are loaded and their status is displayed.
- Customers `/customers`. This page will load the different users in the database. When you then click on a name, a table with the status of the truck is displayed.
- `/status`. Here you can click on either "online" or "offline" and it will display the trucks with that status.

I decided to use the Scania Corporate UI. However I found some compatibilities issues which I had to resolve with my own CSS(`header.css`).
Due to the scope of the project I decided only to log the log the errors in the console. A GUI with the different kind of errors when they appear would of course be necessary.

## Deployment

I chose to deploy with the help of [Heroku](http://www.heroku.com) which is a platform as a service which allows me to build, run and operate aplications on the cloud.
I connected it to this GitHub repo and everytime a new commit comes in, the app is built and deployed automaticaly.
The command to deploy is then as simple as `git push`.
Tests can of course be set up so that it only builds and deploys when tests are successful.
