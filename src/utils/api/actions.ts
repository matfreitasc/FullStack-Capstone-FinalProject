import axios, { axiosPrivate } from './axios'

// all users can access
const getProductsLoader = async () => {
	const { data } = await axios.get('/products')
	return data
}

// get single product
const getProductLoader = async (id: string | unknown) => {
	const { data } = await axios.get(`/products/${id}`)
	return data
}

// user must be admin
const getAllProductsLoader = async () => {}

// get cart
const getCartLoader = async () => {
	const token = localStorage.getItem('token')
	const { data } = await axiosPrivate.get(`/cart/`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return data.cart
}

export {
	getProductsLoader,
	getProductLoader,
	getAllProductsLoader,
	getCartLoader,
}
