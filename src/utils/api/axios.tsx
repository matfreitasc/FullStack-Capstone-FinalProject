import axios from 'axios'

const baseUrl =
	'https://block-37-unit-4-career-simulation.onrender.com/api' ||
	process.env.API_URL

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
