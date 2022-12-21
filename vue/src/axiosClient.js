import axios from "axios";

const axiosClient = axios.create({
     baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`
});

export default axiosClient;