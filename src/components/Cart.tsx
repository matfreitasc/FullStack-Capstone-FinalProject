import { useEffect } from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'

const Cart = () => {
	useEffect(() => {
		console.log('Cart component mounted')
		return () => {
			console.log('Cart component unmounted')
		}
	}, [])
	return (
		<div className='ml-auto'>
			<Button variant='secondary' size='icon' className='rounded'>
				<ShoppingCart className='w-5 h-5' />
				<span className='sr-only'>Toggle user menu</span>
			</Button>
		</div>
	)
}

export default Cart
