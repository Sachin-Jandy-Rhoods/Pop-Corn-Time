import axios from "axios";

const Axios = axios.create({
    baseURL: "https://localhost:5000/api",
})
export default Axios;