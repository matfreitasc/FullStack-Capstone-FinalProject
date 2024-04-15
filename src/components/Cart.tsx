import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useCart from '@/hooks/useCart'
import { ShoppingCart } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Cart = () => {
	const { cartItems, setCartItems } = useCart()
	const axiosPrivate = useAxiosPrivate()

	useEffect(() => {
		const fetchData = async () => {
			await axiosPrivate
				.get(`/cart/`)
				.then((response) => {
					setCartItems(response.data.cart.cartItems)
				})
				.catch((e) => {
					console.error(e)
				})
		}
		fetchData()
	}, [])
	return (
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
	)
}

export default Cart
