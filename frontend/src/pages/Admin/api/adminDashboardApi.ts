import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/admin";


export const getAdminDashboard = async () => {

    const response = await axios.get(
        `${BASE_URL}/dashboard`
    );

    return response.data;

};