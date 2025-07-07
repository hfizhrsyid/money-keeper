import axios from "axios"
const baseUrl = '/history'

const getHistory = (): Promise<any> => {
    return axios.get(`${baseUrl}`)
}

const postTransaction = (name: string, money: number) => {
    return axios.post(`${baseUrl}`, {name, money})
}

export default { getHistory, postTransaction }