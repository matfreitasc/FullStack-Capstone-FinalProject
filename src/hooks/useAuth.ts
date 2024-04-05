import { useContext } from 'react'
import AuthContext from '@/context/AuthProvider'

const useAuth = () => {
	const authContext = useContext(AuthContext)
	const auth = authContext?.auth
	const setAuth = authContext?.setAuth
	return { auth, setAuth }
}
export default useAuth
