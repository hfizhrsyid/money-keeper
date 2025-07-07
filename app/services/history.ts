import axios from "axios"
const baseUrl = 'https://money-keeper-be.onrender.com/history'

const getHistory = (): Promise<any> => {
    return axios.get(`${baseUrl}`)
}

const postTransaction = (name: string, money: number) => {
    return axios.post(`${baseUrl}`, {name, money})
}

export default { getHistory, postTransaction }