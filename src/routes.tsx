import { createBrowserRouter } from 'react-router-dom'
import {
	Settings,
	Profile,
	AdminDashboard,
	About,
	ProductsDashboard,
	Login,
	SignUp,
	Home,
} from '@/pages'

import Layout from './Layout'

const routes = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <Layout />,
		children: [
			{ element: <Home />, index: true },
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
		errorElement: <div>Ops there was an error</div>,
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
