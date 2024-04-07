import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './context/AuthProvider'
import './index.css'
import routes from './routes'
import ThemeProvider from './context/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider>
			<AuthProvider>
				<RouterProvider router={routes} />
			</AuthProvider>
		</ThemeProvider>
	</React.StrictMode>
)
