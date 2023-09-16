import axios from "axios"

export const getStatuses = async () => {
    const response = await axios.get('http://localhost:3000/statuses');
    return response.data;
}
