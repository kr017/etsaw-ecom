import axios from "axios";
import { AIRTABLE_BASEID, AIRTABLE_KEY, API_URL } from "../config";

//create a new Airtable object in React
// new Airtable({ apiKey: "keykHnIoFSSA6H3UK" }).base("appnthZoI6JTN23qD");

// axios.defaults.baseURL =
//   "https://api.airtable.com/v0/appnthZoI6JTN23qD/products/";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + AIRTABLE_KEY,
  },
});

export { apiClient };
