import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { CartData, CartItem } from '@/context/CartProvider'
import useAuth from '@/hooks/useAuth'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useEffect, useState } from 'react'
import { ProductType } from './Home'

const CheckoutSchema = z.object({
	email: z.string().email(),
})

type LoginType = z.infer<typeof CheckoutSchema>

const USDollar = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
})

const Cart = () => {
	const { auth } = useAuth()
	const [products, setProducts] = useState<ProductType[]>()
	const [total, setTotal] = useState(0)
	const [cart, setCart] = useState<CartData>()
	const axiosPrivate = useAxiosPrivate()

	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const fetchData = async () => {
			await axiosPrivate
				.get(`/cart`)
				.then((response) => {
					setCart(response.data.cart)
					setProducts(response.data.cart.cartItems)
					const total = response.data.cart.cartItems.reduce(
						(acc: number, cartItem: CartItem) =>
							acc + cartItem.price * cartItem.quantity,
						0
					)
					setTotal(total)
				})
				.catch((e) => {
					navigate('/login', {
						state: {
							message: 'Please login to view your cart',
							from: location,
							replace: true,
						},
					})
					console.error(e)
				})
		}
		fetchData()
	}, [])

	const handleUpdateCartItem = async (productId: string, quantity: number) => {
		axiosPrivate
			.post('/cart', { product_id: productId, quantity: quantity })
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
			email: auth?.email || '',
		},
	})

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof CheckoutSchema>) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
		const deleteCart = await axiosPrivate.delete('/cart')
		if (deleteCart.status === 200) {
			navigate('/success', {
				state: { message: 'Payment successful', email: values.email },
			})
		} else {
			navigate('/error', {
				state: { message: 'Payment failed', email: values.email },
			})
		}
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
								<div className='mt-40 space-y-4'>
									<span
										className='text-sm  cursor-pointer bg-primary-foreground p-2 text-primary hover:text-primary-foreground hover:bg-primary hover:bg-opacity-10 rounded-md'
										onClick={() => {
											navigate(-1)
										}}>
										Back to previous page
									</span>
									<Card>
										<CardHeader>
											<CardTitle>Products</CardTitle>
											<CardDescription>
												Manage your products and view their sales performance.
											</CardDescription>
										</CardHeader>
										<CardContent>
											<Table>
												<TableBody>
													{products?.map((product, index) => (
														<TableRow key={index}>
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
																	className={`w-24 text-center px-0 py-2 `}
																	defaultValue={product.quantity}
																	// when goes out of focus, update the quantity
																	onBlur={(e) => {
																		handleUpdateCartItem(
																			product.product_id,
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
																						quantity: newQuantity,
																						// eslint-disable-next-line no-mixed-spaces-and-tabs
																				  }
																				: p
																		)
																		setProducts(newProducts)

																		// update the total
																		const total = newProducts.reduce(
																			(acc, product) =>
																				acc + product.price * product.quantity,
																			0
																		)
																		setTotal(total)
																	}}
																/>
															</TableCell>
															<TableCell>
																<Button
																	variant='outline'
																	className='w-24 px-2 py-1'
																	onClick={() => {
																		const newProducts = products.filter(
																			(p) => p.id !== product.product_id
																		)
																		setProducts(newProducts)
																		const total = newProducts.reduce(
																			(acc, product) =>
																				acc + product.price * product.quantity,
																			0
																		)
																		setTotal(total)
																		handleUpdateCartItem(product.product_id, 0)
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
