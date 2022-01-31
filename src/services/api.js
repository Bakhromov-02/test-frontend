import axios from "axios";

let axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/",
});

axiosInstance.interceptors.request.use(
    (request) => {
        request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return request
    },
    (error) => {
        return error
    }
)


export default axiosInstance;
