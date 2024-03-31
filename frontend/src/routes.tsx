import { createBrowserRouter } from 'react-router-dom'
import {
	Settings,
	Profile,
	AdminDashboard,
	About,
	ProductsDashboard,
	Login,
	SignUp,
	Error,
	Home,
} from '@/pages'

import App from './App'

const routes = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
			{ path: 'home', element: <Home /> },
			{ path: 'product', element: <About /> },
			{ path: 'about', element: <About /> },
			{
				path: 'profile',
				element: <Profile />,
				children: [
					{
						path: 'settings',
						element: <Settings />,
					},
				],
			},
		],
	},
	{
		path: 'login',
		element: <Login />,
	},

	{
		path: 'signup',
		element: <SignUp />,
	},
	{
		path: 'admin',
		element: <AdminDashboard />,
		children: [
			{
				path: 'dashboard',
				children: [
					{
						path: 'products',
						element: <ProductsDashboard />,
					},
				],
			},
		],
	},
])

export default routes
