import axios from '@/utils/api/axios'
import useAuth from './useAuth' // Add missing import statement

const useRefreshToken = () => {
	const { setAuth, setUser } = useAuth()
	const refresh = async () => {
		const res = await axios.get('/auth/refresh', { withCredentials: true })
		setUser(res.data.user)
		setAuth(res.data.access_token)
		return res.data.access_token
	}

	return refresh
}

export default useRefreshToken
