import axios from 'axios'

export const getCategories = async () => {
  try {
    const response = await axios.get('gem_categories')
    const { data } = response
    return data
  } catch (error) {
    return error
  }
}
