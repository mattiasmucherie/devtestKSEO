const { getDatabase } = require("./mongo");

// Create a collection
const collectionName = "customers";

// Insert a customer into the store
async function insertCustomer(customer) {
  const database = await getDatabase();
  const { insertedId } = await database
    .collection(collectionName)
    .insertOne(customer);
  return insertedId;
}

// Get all customers from the store
async function getCustomers() {
  const database = await getDatabase();
  return await database
    .collection(collectionName)
    .find({})
    .toArray();
}
// Get data from a specific customer
async function getCustomer(customer) {
  const database = await getDatabase();
  return await database
    .collection(collectionName)
    .find({ nickName: customer })
    .toArray();
}
// Get data from a specific vehicle
async function getVehicle(vehicle) {
  const database = await getDatabase();
  return await database
    .collection(collectionName)
    .aggregate([
      { $match: { "vehicles.vin": vehicle } },
      { $unwind: "$vehicles" },
      {
        $match: {
          "vehicles.vin": vehicle
        }
      }
    ])
    .toArray();
}

// Get data from vehicles with specific status
async function getStatus(status) {
  const database = await getDatabase();
  return await database
    .collection(collectionName)
    .aggregate([
      { $match: { "vehicles.status": status } },
      { $unwind: "$vehicles" },
      {
        $match: {
          "vehicles.status": status
        }
      }
    ])
    .toArray();
}

async function updateStatus() {
  const database = await getDatabase();
  const test = await database
    .collection(collectionName)
    .aggregate([{ $sample: { size: 1 } }])
    .toArray();
  const amountOfTrucks = test[0].vehicles.length;
  const truckIndex = Math.floor(Math.random() * amountOfTrucks);
  const vin = test[0].vehicles[truckIndex].vin;
  const id = test[0]._id;
  const currentStatus = test[0].vehicles[truckIndex].status;
  const newStatus = currentStatus === "online" ? "offline" : "online";
  await database
    .collection(collectionName)
    .updateOne(
      { _id: id, "vehicles.vin": vin },
      { $set: { "vehicles.$.status": newStatus } }
    );
}

module.exports = {
  insertCustomer,
  getCustomers,
  getCustomer,
  getVehicle,
  getStatus,
  updateStatus
};
