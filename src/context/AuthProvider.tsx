import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useState } from 'react'

export type User = {
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

type AuthCtx = {
	auth: string | null
	user: User | null
	setAuth: Dispatch<SetStateAction<string | null>>
	setUser: Dispatch<SetStateAction<User | null>>
}

const AuthContext = createContext<null | AuthCtx>(null)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [auth, setAuth] = useState<string | null>(null)
	const [user, setUser] = useState<User | null>(null)
	return (
		<AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
