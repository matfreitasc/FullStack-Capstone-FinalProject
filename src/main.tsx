import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './context/AuthProvider'
import './index.css'
import routes from './routes'
import ThemeProvider from '@/context/ThemeProvider'
import { CartProvider } from '@/context/CartProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ThemeProvider>
		<AuthProvider>
			<CartProvider>
				<RouterProvider router={routes} />
			</CartProvider>
		</AuthProvider>
	</ThemeProvider>
)
