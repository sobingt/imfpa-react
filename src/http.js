import axios from "axios";

const axiosFn = () => {
  const userData = sessionStorage.getItem("userData");
  const token = JSON.parse(userData) ? JSON.parse(userData).token : '' ;
   return axios.create({
    baseURL: "https://imfpa.org/wp-json/wc/v3/",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

}

export default axiosFn;
