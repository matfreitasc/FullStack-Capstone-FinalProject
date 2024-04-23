import { Card, CardDescription, CardFooter } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { ProductType } from './Home'

const Products = () => {
	document.title = 'Products'
	const products = useLoaderData() as ProductType[]

	const sortBy = [
		{
			name: 'popular',
			value: 'popular',
		},
		{
			name: 'price low to high',
			value: 'priceLowToHigh',
		},
		{
			name: 'price high to low',
			value: 'priceHighToLow',
		},
		{
			name: 'name A to Z',
			value: 'nameAToZ',
		},
		{
			name: 'name Z to A',
			value: 'nameZToA',
		},
	]
	const [selectedSort, setSelectedSort] = useState('popular')

	const sortMethods = {
		popular: () => 0,
		priceLowToHigh: (a: ProductType, b: ProductType) => a.price - b.price,
		priceHighToLow: (a: ProductType, b: ProductType) => b.price - a.price,
		nameAToZ: (a: ProductType, b: ProductType) => a.name.localeCompare(b.name),
		nameZToA: (a: ProductType, b: ProductType) => b.name.localeCompare(a.name),
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

				<Select
					onValueChange={(value) => {
						setSelectedSort(value)
					}}>
					<SelectTrigger className='w-[250px] rounded-none border-black'>
						<p>Sorted By:</p>
						<SelectValue
							placeholder={
								sortBy.find((sort) => sort.value === selectedSort)?.name
							}
						/>
					</SelectTrigger>
					<SelectContent>
						{sortBy.map((sort, index) => (
							<SelectItem
								key={index}
								onClick={() => {
									setSelectedSort(sort.value)
								}}
								value={sort.value}
								className='text-sm'>
								{sort.name.charAt(0).toUpperCase() + sort.name.slice(1)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Separator className='my-6' />
			<section className='flex flex-row w-full '>
				<main className='grid grid-cols-3 gap-4 px-4  w-full'>
					{/* List of all products */}
					{products
						.sort(sortMethods[selectedSort as keyof typeof sortMethods])
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
