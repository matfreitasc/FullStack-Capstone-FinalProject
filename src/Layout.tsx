import { Outlet } from 'react-router-dom'
import Header from './components/pages/Header'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'


const Layout = () => {
	const error = useRouteError()
	if (isRouteErrorResponse(error)) {
		return (
			<>
				<Header />
				<h1>Oops!</h1>
				<h2>{error.status}</h2>
				<p>{error.statusText}</p>
				{error.data?.message && <p>{error.data.message}</p>}
			</>
		)
	} else {
		return (
			<>
				<Header />
				<Outlet />
			</>
		)
	}
}

export default Layout
