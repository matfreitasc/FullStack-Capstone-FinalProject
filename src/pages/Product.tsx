import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import useCart from '@/hooks/useCart'
import { axiosPrivate } from '@/utils/api/axios'
import { useLoaderData } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'

interface ProductType {
	id: string
	name: string
	description: string
	category_id: number
	price: number
	quantity: number
	available: boolean
	image_url: string
	created_at: string
	updated_at: string
}

const Product = () => {
	const product = useLoaderData() as ProductType
	const { toast } = useToast()
	const { setCartItems } = useCart()
	const handleAddToCart = async () => {
		axiosPrivate
			.post(
				'/cart',
				{ product_id: product.id, quantity: 1 },
				{
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				}
			)
			.then(
				(response) => {
					setCartItems(response.data.cart.cartItems)
					toast({
						title: 'Product Added to Cart',
					})
				},
				(error) => {
					console.error(error)
				}
			)
	}
	return (
		<main className='flex flex-row h-dvh w-full p-10 '>
			<section className='grid grid-cols-3 gap-y-4 align-middle justify-items-center max-h-[800px] w-[50%] '>
				<img
					src={product.image_url}
					alt={product.name}
					className='aspect-square w-[500px] col-span-3 rounded-xl border bg-card text-card-foreground shadow'
				/>
				<img
					src={product.image_url}
					alt={product.name}
					className='aspect-square w-[100px] rounded-md border bg-card text-card-foreground shadow'
				/>
				<img
					src={product.image_url}
					alt={product.name}
					className='aspect-square w-[100px] rounded-md border bg-card text-card-foreground shadow'
				/>
				<img
					src={product.image_url}
					alt={product.name}
					className='aspect-square w-[100px] rounded-md border bg-card text-card-foreground shadow'
				/>
			</section>
			<section className=' w-[50%] flex flex-col gap-16'>
				<h1 className=' whitespace-nowrap text-3xl font-semibold tracking-tight'>
					{product.name}
				</h1>
				<p className='whitespace-pre-wrap text-md font-light tracking-tight text-start max-w-[500px]'>
					{product.description}
				</p>

				<div className='flex flex-row justify-between'>
					<Button
						variant='outline'
						className='bg-black text-background gap-2'
						onClick={handleAddToCart}>
						Add To Cart:{' '}
						<span aria-label='product price'>${product.price}</span>
					</Button>
				</div>
			</section>
			<Toaster />
		</main>
	)
}

export { Product }
