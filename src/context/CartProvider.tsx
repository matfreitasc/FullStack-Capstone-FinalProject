import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useState } from 'react'

export type CartData = {
	id: string
	user_id: string
	session_id: string | null
	is_active: boolean
	created_at: string
	updated_at: string
	cartItems: CartItem[]
}

export type CartItem = {
	name: string
	cart_id: string
	product_id: string
	quantity: number
	price: number
	image_url: string
}

type CartContextType = {
	cartItems: CartItem[]
	setCartItems: Dispatch<SetStateAction<CartItem[]>>
}

const CartContext = createContext<null | CartContextType>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([])

	return (
		<CartContext.Provider value={{ cartItems, setCartItems }}>
			{children}
		</CartContext.Provider>
	)
}

export default CartContext
