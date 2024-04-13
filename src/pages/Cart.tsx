import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { getProductLoader } from '@/utils/api/actions'
import { CartData, CartItem } from '@/context/CartProvider'
import { ProductType } from './Home'
import { axiosPrivate } from '@/utils/api/axios'
import useAuth from '@/hooks/useAuth'

const CheckoutSchema = z.object({
	email: z.string().email(),
})

type LoginType = z.infer<typeof CheckoutSchema>

const USDollar = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
})

const Cart = () => {
	const cart = useLoaderData() as CartData
	const { user } = useAuth()
	const [products, setProducts] = useState<ProductType[]>()
	const [total, setTotal] = useState(0)

	const navigate = useNavigate()

	useEffect(() => {
		// we will fetch each product details from the server and store it in the state
		const fetchProducts = async () => {
			const products = await Promise.all(
				cart.cartItems.map(async (item: CartItem) => {
					const response = await getProductLoader(item.product_id)
					return response
				})
			)
			// we will merge the quantity of each product with the product details
			const productsWithQuantity = products.map((product, index) => ({
				...product,
				orderedQuantity: cart.cartItems[index].quantity,
			}))
			// we will calculate the total price of the cart by multiplying the price of each product by the quantity of that product and summing them up
			const total = productsWithQuantity.reduce(
				(acc, product) => acc + product.price * product.orderedQuantity,
				0
			)
			setTotal(total)
			setProducts(productsWithQuantity)
		}
		fetchProducts()
	}, [])

	const handleUpdateCartItem = async (productId: string, quantity: number) => {
		axiosPrivate
			.post(
				'/cart',
				{ product_id: productId, quantity: quantity },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)
			.then(
				(response) => {
					console.log(
						response.data.cart.cartItems.filter(
							(item: CartItem) => item.product_id === productId
						)
					)
				},
				(error) => {
					console.error(error)
				}
			)
	}

	// 1. Define your form.
	const form = useForm<LoginType>({
		resolver: zodResolver(CheckoutSchema),
		defaultValues: {
			email: user?.email || '',
		},
	})

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof CheckoutSchema>) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}

	return (
		<main className=' '>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex flex-row h-screen '>
						<section className=' bg-primary/20 h-full w-[50dvw]  shadow-2xl py-20  px-10 flex flex-col  text-gray-500'>
							{!cart ? (
								<div className='flex flex-col justify-center items-center h-full text-background'>
									<h1 className='text-6xl font-bold '>Cart</h1>
									<p className=''>Your cart is empty</p>
								</div>
							) : (
								<div className=' mt-40 '>
									<Card>
										<CardHeader>
											<span
												className='text-sm text-start underline cursor-pointer'
												onClick={() => {
													navigate(-1)
												}}>
												Back to previous page
											</span>
											<CardTitle>Products</CardTitle>
											<CardDescription>
												Manage your products and view their sales performance.
											</CardDescription>
										</CardHeader>
										<CardContent>
											<Table>
												<TableBody>
													{products?.map((product) => (
														<TableRow key={product.id}>
															<TableCell className='hidden sm:table-cell'>
																<img
																	alt='Product image'
																	className='aspect-square rounded-md object-cover h-16'
																	src={product.image_url}
																/>
															</TableCell>
															<TableCell className='font-medium'>
																{product.name}
															</TableCell>

															<TableCell>${product.price}</TableCell>
															<TableCell className='table-cell'>
																<Input
																	type='number'
																	min='1'
																	className={`w-24 text-center ${
																		product.orderedQuantity === 0
																			? 'text-red-500'
																			: ''
																	} `}
																	defaultValue={product.orderedQuantity}
																	// when goes out of focus, update the quantity
																	onBlur={(e) => {
																		handleUpdateCartItem(
																			product.id,
																			parseInt(e.target.value)
																		)
																	}}
																	onChange={(e) => {
																		const newQuantity = parseInt(e.target.value)
																		// update the quantity in the state, if the quantity is 0, we will delete the product from the cart
																		const newProducts = products.map((p) =>
																			p.id === product.id
																				? {
																						...p,
																						orderedQuantity: newQuantity,
																						// eslint-disable-next-line no-mixed-spaces-and-tabs
																				  }
																				: p
																		)
																		setProducts(newProducts)

																		// update the total
																		const total = newProducts.reduce(
																			(acc, product) =>
																				acc +
																				product.price * product.orderedQuantity,
																			0
																		)
																		setTotal(total)
																	}}
																/>
															</TableCell>
															<TableCell>
																<Button
																	variant='outline'
																	className='w-24'
																	onClick={() => {
																		const newProducts = products.filter(
																			(p) => p.id !== product.id
																		)
																		setProducts(newProducts)
																		const total = newProducts.reduce(
																			(acc, product) =>
																				acc +
																				product.price * product.orderedQuantity,
																			0
																		)
																		setTotal(total)
																		handleUpdateCartItem(product.id, 0)
																	}}>
																	Delete Product
																</Button>
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</CardContent>
										<CardFooter>
											<div className='text-xs text-muted-foreground'>
												Total: {USDollar.format(total)}
											</div>
										</CardFooter>
									</Card>

									<div className='ml-auto bg-black'></div>
								</div>
							)}
						</section>
						<section className='bg-white h-full w-[50dvw] shadow-2xl p-20 flex flex-col text-gray-500'>
							<div className='grid gap-4 w-full mt-40'>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl className='rounded'>
												<Input placeholder='' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button
								type='submit'
								className='w-full mt-4 transition-all'
								onClick={form.handleSubmit(onSubmit)}>
								Pay {USDollar.format(total)}
							</Button>
						</section>
					</div>
				</form>
			</Form>
		</main>
	)
}

export { Cart }
