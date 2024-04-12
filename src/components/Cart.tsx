import { useEffect } from 'react'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import { axiosPrivate } from '@/utils/api/axios'
import useAuth from '@/hooks/useAuth'

const Cart = () => {
	const { auth } = useAuth()
	useEffect(() => {
		const token = localStorage.getItem('token')
		console.log(`Bearer ${token}`)
		if (!auth) return
		axiosPrivate
			.post('/cart/', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data)
			})
	}, [])
	return auth ? (
		<div className='ml-auto'>
			<Button variant='secondary' size='icon' className='rounded'>
				<ShoppingCart className='w-5 h-5' />
				<span className='sr-only'>Open Cart</span>
			</Button>
		</div>
	) : (
		<div className='ml-auto'></div>
	)
}

export default Cart
