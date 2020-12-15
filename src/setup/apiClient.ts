import axios from 'axios'
import qs from 'qs'

const TIMEOUT = 10000

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: TIMEOUT // this takes cases when the server takes too long to respond
})


export async function makeApiCall (uri, data, configs) {
  let url = uri
  try {
    if (configs.qsParams.length) {
      const qStr = qs.stringify(configs.qsParams)
      url = `${url}/${qStr}`
    }

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    const response = await apiClient({
      url,
      data,
      headers,
      method: configs.method
    })

    return configs.normalizer(response.data)
  } catch (error) {
    const responseError = error.response || {}

    console.log(
      `*********  NETWORK REQUEST FAILED.
      ${`Status - ${responseError.status}`}`
    )

    return { error }
  }
}

export default apiClient
