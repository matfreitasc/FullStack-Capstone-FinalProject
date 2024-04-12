import { useContext } from 'react'
import CartContext from '@/context/CartProvider'

const useCart = () => {
	const cartContext = useContext(CartContext)
	if (!cartContext) {
		throw new Error(`useCartContext must be used within an CartContext`)
	}
	return cartContext
}
export default useCart
