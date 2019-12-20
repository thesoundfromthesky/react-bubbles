import axios from "axios";

// - [ ] Build a `axiosWithAuth` module to create an instance of axios with the authentication header

const axiosWidthAuth = (() => {
  const token = window.localStorage.getItem("token");
  return axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `${token}`
    }
  });
})();

export default axiosWidthAuth;
