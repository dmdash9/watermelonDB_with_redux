import axios from 'axios'

// NOTE: REPLACE WITH YOUR OWN IP
// TODO: refactor to get this from .env 
const apiClient = axios.create({
  baseURL: 'http://192.168.31.86:8080/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function makeApiCall (url, data, configs) {
  console.log('sending - ', data)
  try {
    const response = await apiClient({
      url,
      data,
      method: configs.method
    })

    return response.data
  } catch (error) {
    console.log('*********  ERROR:::: ', error)
    return { error }
  }
}

export default apiClient
