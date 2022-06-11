import axios from 'axios'



export const newProduct = (product) => async () => {
  try {

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `/api/commodity`,
      product,
      config
    )
console.log(data)
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    }
    
}
