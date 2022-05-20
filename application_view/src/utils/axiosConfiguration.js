import axios from "axios";

export const setAxiosHeaderAuthorization = (token) => {
    axios.defaults.headers.common['Authorization'] = token;
}
