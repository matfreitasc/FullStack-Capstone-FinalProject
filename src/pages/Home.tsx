import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import SampleProduct from '@/assets/Headphones.webp'
import { Link, useLoaderData } from 'react-router-dom'

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

const Home = () => {
	const products = useLoaderData() as ProductType[]
	console.log(products)
	return (
		<main className='flex flex-col justify-center gap-y-10 '>
			<Carousel className='relative w-full group'>
				<CarouselContent className=''>
					{products?.map((product: ProductType) => (
						<CarouselItem key={product.id}>
							<Link to={`/product/${product.id}`}>
								<Card className='relative border-none rounded-none'>
									<CardContent className='relative z-10 flex flex-col items-center justify-center p-6 aspect-video '>
										<span className='px-6 py-2 font-sans text-4xl italic font-semibold bg-white rounded-md bg-opacity-15 text-muted-foreground'>
											{product.name}
										</span>
									</CardContent>
									<img
										src={product.image_url}
										alt='Headphones'
										className='absolute top-0 left-0 z-0 object-cover w-full opacity-95'
									/>
								</Card>
							</Link>
						</CarouselItem>
					))}
				</CarouselContent>

				<CarouselPrevious className='absolute z-10 left-2' />
				<CarouselNext className='absolute z-10 right-2' />
			</Carousel>
			<section className='my-6'>
				<div className='flex flex-col items-center gap-3'>
					<h2 className='text-3xl font-semibold text-center text-foreground'>
						Featured Products
					</h2>
					<span className='max-w-sm mt-2 italic text-center text-md text-muted-foreground'>
						Enjoy our selection of hand-picked products from our team of
						experts.
						<br /> We have something for everyone.
					</span>
					<Link
						to='/products'
						className='px-6 py-4 mt-6 font-semibold text-center transition-all border text-foreground hover:font-bold hover:bg-slate-100'>
						View all products
					</Link>
				</div>
				<div className='grid grid-cols-3 gap-y-4 px-4 mt-20 justify-items-center'>
					{products.map((product: ProductType, index) => (
						<Card
							key={product.id}
							className={`${
								index % 3 === 1 ? 'transform -translate-y-14' : 'translate-y-4'
							} h-[500px] w-[368px] overflow-hidden relative text-black text-center flex flex-col justify-between`}>
							<CardHeader className='relative z-20 bg-slate-700 bg-opacity-50 text-3xl font-semibold p-2'>
								{product.name}
							</CardHeader>

							<Link
								to={`/product/${product.id}`}
								className='absolute inset-0 z-10'
								aria-label={`View ${product.name} product details`}>
								<img
									src={product.image_url}
									alt=''
									className='absolute top-0 left-0 z-0 object-cover w-full h-full'
								/>
							</Link>
						</Card>
					))}
				</div>
			</section>
		</main>
	)
}

export { Home }
