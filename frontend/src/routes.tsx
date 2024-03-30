import { createBrowserRouter } from 'react-router-dom'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard'
import About from './pages/About'
import App from './App'
import ProductsDashboard from './pages/admin/products/ProductsDashboard'

const routes = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ path: 'about', element: <About /> },
			{ path: 'dashboard', element: <Dashboard /> },
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
