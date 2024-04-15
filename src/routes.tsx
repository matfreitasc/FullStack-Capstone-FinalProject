import {
	AdminDashboard,
	Cart,
	Home,
	Login,
	Product,
	Products,
	ProductsDashboard,
	Profile,
	Settings,
	SignUp,
	Success,
} from '@/pages'
import { createBrowserRouter } from 'react-router-dom'

import Layout from './Layout'
import PersistLogin from './components/PersistLogin'
import RequireAuth from './components/RequireAuth'
import { getProductLoader, getProductsLoader } from './utils/api/actions'

const routes = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <Layout />,
		children: [
			{ element: <Home />, loader: getProductsLoader, index: true },
			{
				path: 'products',
				loader: getProductsLoader,
				element: <Products />,
			},
			{
				path: 'product/:id',
				loader: ({ params }) => {
					return getProductLoader(params.id)
				},
				element: <Product />,
			},
			{
				path: 'success',
				element: <Success />,
			},
			{
				element: <RequireAuth />,
				children: [
					{
						path: 'profile',
						element: <Profile />,
						index: true,
					},
					{
						path: 'settings',
						element: <Settings />,
					},
				],
			},
		],
	},

	{
		element: <PersistLogin />,
		children: [
			{
				path: 'cart',
				element: <Cart />,
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
							{
								path: 'products/:id',
								loader: ({ params }) => {
									return getProductLoader(params.id)
								},
								element: <Product />,
							},
						],
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
])

export default routes
