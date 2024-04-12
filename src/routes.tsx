import { createBrowserRouter } from 'react-router-dom'
import {
	Settings,
	Profile,
	AdminDashboard,
	ProductsDashboard,
	Login,
	SignUp,
	Home,
	Product,
	Products,
	Cart,
} from '@/pages'

import Layout from './Layout'
import {
	getProductsLoader,
	getProductLoader,
	getCartLoader,
} from './utils/api/actions'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin'

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
		path: 'login',
		element: <Login />,
	},

	{
		path: 'signup',
		element: <SignUp />,
	},
	{
		element: <PersistLogin />,
		children: [
			{
				path: 'cart',
				loader: getCartLoader,
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
])

export default routes
