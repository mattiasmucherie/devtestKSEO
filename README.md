# Developer Test KSEO

This is a developer test made by Mattias Mucherie for KSEO.
The result has been deployed [here](https://arcane-fjord-86837.herokuapp.com/)

The task was to create a data store that keeps vehicles with their status and their customers.
A GUI was needed to visually see the status of the vehicles.

## Data store
I chose to got with a [MongoDB](https://www.mongodb.com/what-is-mongodb) database.
It has great flexibility regarding queries and I think that a JSON structure makes sense in this senario.


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

Then a REST API endpoints where setup.
One to retreive the complete list of customers and vehicles `/api/` while the other one filter the content `/api/search?status=online`.

There are 3 query that are handled :
 - customer `/api/search?customer=kalles`
 - vehicle `/api/search?vehicle=YS2R4X20005399401`
 - status `/api/search?status=offline`
