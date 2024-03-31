import axios from 'axios'

const baseUrl = 'http://localhost:3000/api'

// eslint-disable-next-line react-refresh/only-export-components
export default axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-type': 'application/json',
	},
})

export const axiosPrivate = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-type': 'application/json',
		withCredentials: true,
	},
})
