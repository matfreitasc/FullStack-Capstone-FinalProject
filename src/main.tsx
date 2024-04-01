import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './context/AuthProvider'
import './index.css'
import routes from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={routes} />
		</AuthProvider>
	</React.StrictMode>
)
