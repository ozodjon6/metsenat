import axios from "axios";
import {getItem} from "@/helpers/persistenStorage";

axios.defaults.baseURL = "https://club.metsenat.uz/api/v1";

axios.interceptors.request.use(config => {
    const token = getItem('token');
    const authorization = token ? `Token ${token}` : '';
    config.headers.Authorization = authorization;

    return config;
})
export default axios;