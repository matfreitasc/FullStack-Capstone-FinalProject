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
import { axiosPrivate } from '@/utils/api/axios'

const loginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, 'Password needs to be at least 8 characters long'),
})

type LoginType = z.infer<typeof loginSchema>

export function Login() {
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
	const from = location.state?.from?.pathname || '/'

	const form = useForm<LoginType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	if (!setAuth) return
	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		setLoadingState({ loading: true, content: 'Please wait...' })
		await axiosPrivate
			.post('/auth/login', values)
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
				if (!error?.response) {
					form.setError('email', {
						type: 'server',
						message:
							'There is a problem with the server. Please try again later.',
					})
					return
				}
				form.setError('email', {
					type: 'server',
					message: data.message,
				})
			})
	}

	return (
		<main className='h-screen justify-normal items-center flex'>
			<Card className='max-w-sm mx-auto'>
				<CardHeader>
					<CardTitle className='text-2xl mb-2'>Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
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
							{!loadingState.loading ? (
								<Button type='submit' className='w-full transition-all'>
									Login
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
							Don&apos;t have an account?{' '}
							<Link to='/signup' className='underline'>
								Sign up
							</Link>
						</div>
					</Form>
				</CardContent>
			</Card>
		</main>
	)
}
