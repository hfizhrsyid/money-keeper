import axios from "axios"
const baseUrl = `${import.meta.env.VITE_BASE_URL}/people`

const getPerson = (): Promise<any> => {
    return axios.get(`${baseUrl}`)
}

const postPerson = (personObject: Record<string, any>) => {
    return axios.post(`${baseUrl}`, personObject)
}

const patchTransaction = (id: string, personObject: Record<string, any>) => {
    return axios.patch(`${baseUrl}/${id}`, personObject)
} 

export default { getPerson, postPerson, patchTransaction }