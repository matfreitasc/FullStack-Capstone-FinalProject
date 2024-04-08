import useAuth from '@/hooks/useAuth'
import { Outlet, useLocation, Navigate } from 'react-router-dom'

const RequireAuth = () => {
	const { auth } = useAuth()
	const location = useLocation()
	return !auth ? (
		<Navigate to='/login' state={{ from: location }} replace />
	) : (
		<Outlet />
	)
}

export default RequireAuth
