import { createContext, useState } from 'react'
import type { ReactNode, Dispatch, SetStateAction } from 'react'

type CartItems = {
	id: string
	cart_id: string
	product_id: string
	quantity: number
}[]

type CartContextType = {
	cartItems: CartItems
	setCartItems: Dispatch<SetStateAction<CartItems>>
}

const CartContext = createContext<null | CartContextType>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [cartItems, setCartItems] = useState<CartItems>([])

	return (
		<CartContext.Provider value={{ cartItems, setCartItems }}>
			{children}
		</CartContext.Provider>
	)
}

export default CartContext
