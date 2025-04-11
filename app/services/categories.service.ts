export const getCategories = async () => {
  try {
    const res = await fetch(`http://localhost:8080/v1/gem_categories`)
    const { data } = await res.json()
    return data
  } catch (error) {
    return error
  }
}
