import axios, { axiosPrivate } from './axios'

// all users can access
const getProductsLoader = async () => {
	const { data } = await axiosPrivate.get('/products')
	return data
}

// get single product
const getProductLoader = async (id: string | unknown) => {
	const { data } = await axios.get(`/products/${id}`)
	return data
}

// user must be admin
const getAllProductsLoader = async () => {}

export { getProductsLoader, getProductLoader, getAllProductsLoader }
