import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://medicare-hub-server.onrender.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
