import { useEffect } from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import { axiosPrivate } from '@/utils/api/axios'
import useAuth from '@/hooks/useAuth'

import useCart from '@/hooks/useCart'
import { Link } from 'react-router-dom'

const Cart = () => {
	const { auth } = useAuth()
	const { cartItems, setCartItems } = useCart()
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!auth) return
		const fetchData = async () => {
			await axiosPrivate
				.get(`/cart/`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setCartItems(response.data.cart.cartItems)
				})
				.catch((e) => {
					console.error(e)
				})
		}
		fetchData()
	}, [])
	return auth ? (
		<div className='ml-auto'>
			<Button
				variant='secondary'
				size='icon'
				className='rounded relative'
				asChild>
				<Link to='/cart'>
					<ShoppingCart className='w-5 h-5' />
					<span className='absolute -top-2 -right-2 font-thin bg-primary p-2 text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center'>
						{cartItems?.length || 0}
					</span>
					<span className='sr-only'>Open Cart</span>
				</Link>
			</Button>
		</div>
	) : (
		<div className='ml-auto'></div>
	)
}

export default Cart
