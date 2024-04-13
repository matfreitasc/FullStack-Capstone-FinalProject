import { useLoaderData } from 'react-router-dom'
import { ProductType } from './Home'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Card, CardDescription, CardFooter } from '@/components/ui/card'
import { Link } from 'react-router-dom'
// import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

const Products = () => {
	document.title = 'Products'
	const products = useLoaderData() as ProductType[]
	const listProducts = products

	const sortBy = ['popular', 'price', 'name']
	const [selectedSort, setSelectedSort] = useState('popular')

	const sortMethods = {
		popular: {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			method: (_a: ProductType, _b: ProductType) => 0,
			price: {
				method: (a: ProductType, b: ProductType) => a.price - b.price,
			},
			name: {
				method: (a: ProductType, b: ProductType) =>
					a.name.localeCompare(b.name),
			},
		},
	}

	return (
		<main className='flex flex-col justify-center md:px-32 md:py-6 '>
			<section className='min-h-44'>
				<h1 className='text-3xl font-semibold text-start text-foreground'>
					Products
				</h1>
				<p className='text-muted-foreground'>
					Enjoy our vast selection of products
				</p>
			</section>
			<div className='w-full py-2 flex flex-row justify-between'>
				<h2 className='text-foreground text-2xl'>Filters</h2>

				<Select>
					<SelectTrigger className='w-[180px] rounded-none border-black'>
						<p>Sorted By:</p>
						<SelectValue
							placeholder={
								sortBy[0].split('')[0].toUpperCase() + sortBy[0].slice(1)
							}
							defaultValue={sortBy[0]}
						/>
					</SelectTrigger>
					<SelectContent>
						{sortBy.map((sort, index) => (
							<SelectItem
								key={index}
								onClick={() => {
									setSelectedSort(sort)
								}}
								value={sort}
								className='text-sm'>
								{sort.split('')[0].toUpperCase() + sort.slice(1)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Separator className='my-6' />
			<section className='flex flex-row w-full '>
				{/* <aside className='w-[20%] h-full space-y-4'>
					<h3 className='text-xl text-foreground'>Categories</h3>

					<div className='flex items-center space-x-2'>
						<Checkbox id='electronics' className='rounded-none' />
						<label
							htmlFor='electronics'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							Electronics
						</label>
					</div>
					<Separator className='my-1' />
					<div className='flex items-center space-x-2'>
						<Checkbox id='services' className='rounded-none' />
						<label
							htmlFor='services'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							Services
						</label>
					</div>
					<Separator className='my-1' />
					<div className='flex items-center space-x-2'>
						<Checkbox id='Laptops' className='rounded-none' />
						<label
							htmlFor='Laptops'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							Laptops
						</label>
					</div>
					<Separator className='my-1' />
				</aside> */}
				<main className='grid grid-cols-3 gap-4 px-4  w-full'>
					{/* List of all products */}
					{listProducts
						.sort(sortMethods[selectedSort as keyof typeof sortMethods].method)
						.map((product: ProductType) => (
							<Card
								key={product.id}
								className={`flex flex-col justify-between lg:w-[250px] xl:w-[300px] overflow-hidden rounded-sm`}>
								<Link
									to={`/product/${product.id}`}
									className=''
									aria-label={`View ${product.name} product details`}>
									<img
										src={product.image_url}
										alt=''
										className='object-cover h-[250px] w-full'
									/>
								</Link>
								<CardFooter className='text-base font-semibold px-2'>
									{product.name}
								</CardFooter>
								<CardDescription className='text-font-semibold px-2 text-secondary-foreground'>
									${product.price}
								</CardDescription>
							</Card>
						))}
				</main>
			</section>
		</main>
	)
}

export { Products }
