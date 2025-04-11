import { JSONSerialized } from '@/helpers'

export const getGems = async () => {
  try {
    const res = await fetch('http://localhost:8080/v1/gems')
    const { data } = await res.json()
    return data
  } catch (error) {
    return error
  }
}

export const postGem = async (payload: any) => {
  try {
    const srlpayld = JSONSerialized(payload)
    const res = await fetch('http://localhost:8080/v1/gems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: srlpayld,
    })
    const { data } = await res.json()
    return data
  } catch (error) {
    return error
  }
}
