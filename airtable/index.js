var Airtable = require("airtable");
import { AIRTABLE_BASEID, AIRTABLE_KEY } from "../config";

var base = new Airtable({ apiKey: "keykHnIoFSSA6H3UK" }).base(
  "appnthZoI6JTN23qD"
); //new Airtable({ apiKey: AIRTABLE_KEY }).base(AIRTABLE_BASEID);
const productsTable = base("products");
const addressesTable = base("addresses");
const usersTable = base("users");

module.exports = {
  productsTable,
  addressesTable,
  usersTable,
};
