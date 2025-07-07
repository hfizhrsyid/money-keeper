import axios from "axios"
const baseUrl = `${import.meta.env.VITE_API_URL as string}/money`;

const getMoney = (): Promise<any> => {
    return axios.get(`${baseUrl}`);
};

const postMoney = (value: number) => {
    return axios.post(`${baseUrl}`, { money: value })
}

export default { getMoney, postMoney };