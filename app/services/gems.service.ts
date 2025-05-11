import axios from 'axios'

const URL = 'gems'

export const getGems = async () => {
  try {
    const response = await axios.get(URL)
    const { data } = response
    return data
  } catch (error) {
    return error
  }
}

export const postGem = async (payload: any) => {
  try {
    const response = await axios.post(URL, {
      ...payload,
    })
    const data = response.data
    return data
  } catch (error) {
    return error
  }
}

export const updateGem = async (payload: any) => {
  try {
    const param = payload.id
    const { age, ...spreadParams } = payload
    const response = await axios.patch(`${URL}/${param}`, {
      ...spreadParams,
    })
    const data = response.data
    return data
  } catch (error) {
    return error
  }
}

export const deleteGem = async (payload: any) => {
  try {
    console.log(payload)
    const response = await axios.delete(`${URL}/${payload}`)
    const data = response.data
    console.log(response)
    return data
  } catch (error) {
    return error
  }
}
