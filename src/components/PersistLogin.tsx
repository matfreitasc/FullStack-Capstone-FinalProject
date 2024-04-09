import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useRefreshToken from '@hooks/useRefreshToken'
import useAuth from '@hooks/useAuth'

const PersistLogin = () => {
	const { auth } = useAuth()
	const refresh = useRefreshToken()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const verifyUser = async () => {
			try {
				await refresh()
			} catch (e) {
				console.log(e)
			} finally {
				setLoading(false)
			}
		}
		!auth?.access_token ? verifyUser() : setLoading(false)
	}, [])

	return <>{loading ? <h1>Loading...</h1> : <Outlet />}</>
}

export default PersistLogin
