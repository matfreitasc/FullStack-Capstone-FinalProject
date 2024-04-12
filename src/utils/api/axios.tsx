import axios from 'axios'

const baseUrl = 'http://localhost:3000/api' || process.env.API_URL

// eslint-disable-next-line react-refresh/only-export-components
export default axios.create({
	baseURL: baseUrl,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-type': 'application/json',
	},
})

export const axiosPrivate = axios.create({
	baseURL: baseUrl,
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-type': 'application/json',
	},
})

