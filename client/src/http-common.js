import axios from "axios";

export default axios.create({
  baseURL: "https://primal-asset-385412.ue.r.appspot.com/",
  headers: {
    "Content-type": "application/json"
  }
});


// const instance = axios.create({
//   baseURL: "https://8000-kelleneal-alarmsquadbac-yyrhi6kbgi2.ws-us96.gitpod.io/",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

// export default instance;