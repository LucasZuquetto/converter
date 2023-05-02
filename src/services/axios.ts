import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest",
});

export default axiosApi;