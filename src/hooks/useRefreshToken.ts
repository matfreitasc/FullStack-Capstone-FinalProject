// import { refreshToken } from '@api/api'
// import useAuth from './useAuth' // Add missing import statement

// const useRefreshToken = () => {
// 	const { setAuth } = useAuth()
// 	const refresh = async () => {
// 		const token = localStorage.getItem('token')
// 		const res = await refreshToken(token ? JSON.parse(token).token : '')
// 		setAuth((prev) => {
// 			return {
// 				...prev,
// 				user: res.user,
// 				token: res.token,
// 			}
// 		})

// 		return res
// 	}

// 	return refresh
// }

// export default useRefreshToken
