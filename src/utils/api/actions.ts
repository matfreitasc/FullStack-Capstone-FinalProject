import axios from './axios'

// all users can access
const getProductsLoader = async () => {
	const { data } = await axios.get('/products')
	console.log(data)
	const products = data
	return products
}

// get single product
const getProductLoader = async () => {}

// user must be admin
const getAllProductsLoader = async () => {}

export { getProductsLoader, getProductLoader, getAllProductsLoader }
