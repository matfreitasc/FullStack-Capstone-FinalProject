import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'
import { ReloadIcon } from '@radix-ui/react-icons'
import axios from '@/utils/api/axios'

const loginSchema = z
	.object({
		first_name: z
			.string()
			.min(2, 'First name needs to be at least 2 characters long'),
		last_name: z
			.string()
			.min(2, 'Last name needs to be at least 2 characters long'),
		email: z.string().email(),
		password: z
			.string()
			.min(8, 'Password needs to be at least 8 characters long'),
		ConfirmPassword: z
			.string()
			.min(8, 'Password needs to be at least 8 characters long'),
	})
	.refine((data) => data.password === data.ConfirmPassword, {
		message: 'Passwords do not match',
		path: ['ConfirmPassword'],
	})

type LoginType = z.infer<typeof loginSchema>

export function SignUp() {
	// Fun stuff
	const title = 'Login'
	useEffect(() => {
		document.title = title
	}, [title])

	useEffect(() => {
		window.onblur = () => {
			document.title = 'Come Back!'
		}
		window.onfocus = () => {
			document.title = title
		}
		return () => {
			window.onblur = null
			window.onfocus = null
		}
	}, [])

	// Login System

	const [loadingState, setLoadingState] = useState({
		loading: false,
		content: 'Pleaes wait...',
	})
	const { setAuth } = useAuth()

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from || '/'

	const form = useForm<LoginType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			ConfirmPassword: '',
		},
	})

	if (!setAuth) return
	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		setLoadingState({ loading: true, content: 'Please wait...' })
		await axios
			.post('/auth/register', values)
			.then((res) => {
				console.log(res)
				const data = res.data.user
				setAuth(data)
				localStorage.setItem('token', JSON.stringify(data.access_token))
				setLoadingState({ loading: true, content: 'Redirecting...' })
				new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
					setLoadingState({ loading: true, content: 'Almost there...' })
				)
				new Promise((resolve) => setTimeout(resolve, 4000)).then(() =>
					navigate(from, { replace: true })
				)
			})
			.catch((error) => {
				setLoadingState({ loading: false, content: '' })
				const data = error.response.data
				form.setError('email', {
					type: 'server',
					message: data.message,
				})
			})
	}

	return (
		<main className='h-screen justify-normal items-center flex'>
			<Card className='max-w-md mx-auto'>
				<CardHeader>
					<CardTitle className='text-2xl mb-2'>Sign Up</CardTitle>
					<CardDescription>
						Welcome to! Sign up to start shopping.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
							<div className='flex flex-row gap-4'>
								<FormField
									control={form.control}
									name='first_name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input placeholder='John' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='last_name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input placeholder='Doe' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder='email@email.com'
												{...field}
												autoComplete='email'
											/>
										</FormControl>
										<FormDescription>
											We&apos;ll never share your email.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type='password'
												{...field}
												autoComplete='current-password'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='ConfirmPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												type='password'
												{...field}
												autoComplete='current-password'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{!loadingState.loading ? (
								<Button type='submit' className='w-full transition-all'>
									Register
								</Button>
							) : (
								<Button disabled>
									<ReloadIcon className='mr-2 h-4 w-4 animate-spin transition-all' />
									{loadingState.content}
								</Button>
							)}
							{/* <Button variant='outline' className='w-full'>
							Login with Google
						</Button> */}
						</form>
						<div className='mt-4 text-sm text-center'>
							Already have an account?{' '}
							<Link to='/login' className='underline'>
								Login
							</Link>
						</div>
					</Form>
				</CardContent>
			</Card>
		</main>
	)
}
