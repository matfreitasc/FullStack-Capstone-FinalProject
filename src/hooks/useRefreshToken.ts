import useAuth from './useAuth' // Add missing import statement
import { axiosPrivate } from '@/utils/api/axios'

const useRefreshToken = () => {
	const { setAuth, setUser } = useAuth()
	const refresh = async () => {
		const res = await axiosPrivate.get('/auth/refresh')
		setUser(res.data)
		setAuth(res.data.access_token)
		return res.data.access_token
	}

	return refresh
}

export default useRefreshToken
