import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://testing.ruscarestudent.com/api/', 
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
  });

  export default axiosInstance;