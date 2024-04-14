import axios from 'axios'

// const baseUrl =
// 	'https://block-37-unit-4-career-simulation.onrender.com/api' ||
// 	process.env.API_URL
const baseUrl = 'http://localhost:3000/api'

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

