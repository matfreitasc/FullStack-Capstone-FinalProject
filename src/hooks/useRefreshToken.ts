import axios from '@/utils/api/axios'
import useAuth from './useAuth' // Add missing import statement

const useRefreshToken = () => {
	const { setAuth } = useAuth()
	const refresh = async () => {
		const res = await axios.get('/auth/refresh', { withCredentials: true })

		setAuth((prev) => {
			return { ...prev, access_token: res.data.access_token }
		})

		return res.data.access_token
	}

	return refresh
}

export default useRefreshToken
