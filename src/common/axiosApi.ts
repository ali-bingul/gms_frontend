import axios from "axios";

export default axios.create({
    baseURL: `http://<host>:<port>`,
    headers: {
        "Content-type": "application/json"
    }
});