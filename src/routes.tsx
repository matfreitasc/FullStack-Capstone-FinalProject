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
	Product,
} from '@/pages'

import Layout from './Layout'
import { getProductsLoader, getProductLoader } from './utils/api/actions'
const routes = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <Layout />,

		children: [
			{ element: <Home />, loader: getProductsLoader, index: true },
			{
				path: 'product/:id',
				loader: ({ params }) => {
					return getProductLoader(params.id)
				},
				element: <Product />,
			},
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
