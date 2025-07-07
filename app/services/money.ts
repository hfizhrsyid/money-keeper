import axios from "axios";
const baseUrl = 'http://localhost:4000/money';

const getMoney = (): Promise<any> => {
    return axios.get(`${baseUrl}`);
};

const postMoney = (value: number) => {
    return axios.post(`${baseUrl}`, { money: value })
}

export default { getMoney, postMoney };