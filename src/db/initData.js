const kalles = {
  name: "Kalles Grustransporter AB",
  nickName: "kalles",
  address: "Cementvägen 8, 111 11 Södertälje",
  vehicles: [
    { vin: "YS2R4X20005399401", reg: "ABC123", status: "online" },
    { vin: "VLUR4X20009093588", reg: "DEF456", status: "offline" },
    { vin: "VLUR4X20009048066", reg: "GHI789", status: "online" }
  ]
};
const johans = {
  name: "Johans Bulk AB",
  nickName: "johans",
  address: "Balkvägen 12, 222 22 Stockholm",
  vehicles: [
    { vin: "YS2R4X20005388011", reg: "JKL012", status: "online" },
    { vin: "YS2R4X20005387949", reg: "MNO345", status: "online" }
  ]
};
const haralds = {
  name: "Haralds Väredtransporter AB",
  nickName: "haralds",
  address: "Budgetvägen 1, 333 33 Uppsala",
  vehicles: [
    { vin: "YS2R4X20005387765", reg: "PQR678", status: "online" },
    { vin: "YS2R4X20005387055", reg: "STU901", status: "online" }
  ]
};

module.exports = { kalles, johans, haralds };
