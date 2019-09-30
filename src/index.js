// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cron = require("node-cron");
const path = require("path");

const { startDatabase } = require("./db/mongo");
const {
  insertCustomer,
  getCustomers,
  getCustomer,
  getVehicle,
  getStatus,
  updateStatus
} = require("./db/customers");
const { kalles, johans, haralds } = require("./db/initData");
const { jwtCheck } = require("./jwtSecret");

//Declare the express app
const app = express();

// Set the port of the application
const port = process.env.PORT || 3001;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "/../client/build")));

// Adding helmet to the app. Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all req
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send({ message: err.message });
    return;
  }
  next();
});

//defing an endpoint to return all customers, secured by jwtCheck
app.get("/api/", jwtCheck, async (req, res) => {
  res.send(await getCustomers());
});

// Filter returns vehicles based on status, vehicles or customer, secured by jwtCheck
app.get("/api/search", jwtCheck, async (req, res) => {
  const queryProperty = Object.keys(req.query)[0];
  switch (queryProperty) {
    case "status":
      res.send(await getStatus(req.query.status));
      break;
    case "vehicle":
      res.send(await getVehicle(req.query.vehicle));
      break;
    case "customer":
      res.send(await getCustomer(req.query.nickName));
      break;
    default:
      res.status(404).send("Not found");
  }
});

// Handles any requests that are not handledd above.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

// Initiate database with initial data
startDatabase().then(async () => {
  await insertCustomer(kalles);
  await insertCustomer(johans);
  await insertCustomer(haralds);
});

// Cron job that runs every 20 seconds and updates random values of the status of a random vehicle
cron.schedule("*/20 * * * * *", function() {
  updateStatus();
});

// TO REMOVE : CLOSE WITH CTRL + C
process.on("SIGINT", function() {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(1);
});

// Starting the server
app.listen(port, async () => {
  console.log(`Application is running on port ${port}`);
});
