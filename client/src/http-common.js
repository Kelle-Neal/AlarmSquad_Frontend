import axios from "axios";

export default axios.create({
  baseURL: "https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us95.gitpod.io/",
  headers: {
    "Content-type": "application/json"
  }
});