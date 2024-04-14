import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import axios from './axios'

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
const GetCartLoader = async () => {
	const axiosPrivate = useAxiosPrivate()
	const { data } = await axiosPrivate.get('/cart')
	return data.cart
}

export {
	GetCartLoader,
	getAllProductsLoader,
	getProductLoader,
	getProductsLoader,
}
