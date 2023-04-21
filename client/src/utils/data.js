import axios from "axios";

async function getData(endpoint) {
  let response = await axios.get(`#### DATA LOCATION ####`);
  return response.data;
}