import axios from "axios"
const baseUrl = `${import.meta.env.VITE_BASE_URL}/people`

const getPerson = (): Promise<any> => {
    return axios.get(`${baseUrl}`)
}

const postPerson = (personObject: Record<string, any>) => {
    return axios.post(`${baseUrl}`, personObject)
}

const putTransaction = (id: string, personObject: Record<string, any>) => {
    return axios.put(`${baseUrl}/id`, personObject)
} 

export default { getPerson, postPerson }