import useAuth from '@/hooks/useAuth'
import useRefreshToken from '@/hooks/useRefreshToken'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const PersistLogin = () => {
	const { auth } = useAuth()
	const refresh = useRefreshToken()

	const [loading, setLoading] = useState(true)

	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const verifyUser = async () => {
			try {
				await refresh()
			} catch (e) {
				navigate('/login', { state: { from: location.pathname } })
			} finally {
				setLoading(false)
			}
		}

		!auth ? verifyUser() : setLoading(false)
	}, [])

	return <>{loading ? <h1>Loading...</h1> : <Outlet />}</>
}

export default PersistLogin
