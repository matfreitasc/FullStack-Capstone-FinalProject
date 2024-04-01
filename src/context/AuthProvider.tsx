import { createContext, useState, ReactNode } from 'react'

type Auth = {
	id: string
	is_admin: boolean
	first_name: string
	last_name: string
	email: string
	password: string
	access_token: string
	address: string
	address2: string
	city: string
	state: string
	zip: string
	country: string
}

export const AuthContext = createContext({})

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [auth, setAuth] = useState<Auth | null>(null)

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthProvider }
