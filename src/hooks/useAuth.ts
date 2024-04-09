import { useContext } from 'react'
import AuthContext from '@/context/AuthProvider'

const useAuth = () => {
	const authContext = useContext(AuthContext)
	if (!authContext) {
		throw new Error(`useAuthContext must be used within an AuthContext`)
	}
	return authContext
}
export default useAuth
