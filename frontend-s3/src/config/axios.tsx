import axios from "axios";

const BASE_URL = "http://localhost:3000";
const USER_ID = "123";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        // For dev only [TODO: remove this not production code]
        "x-user-id": USER_ID,
    },
});

export default apiClient;