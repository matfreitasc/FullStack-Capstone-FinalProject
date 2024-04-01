import { Link } from 'react-router-dom'
// import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const ivalid_type_error = 'Invalid type provided. Please provide a valid type.'
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const required_error = 'This field is required.'

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const SignUpSchema = z.object({
// 	firstName: z.string(),
// 	lastName: z.string(),
// 	email: z.string().email('Invalid email address'),
// 	password: z.string(),
// })

const SignUp = () => {
	return (
		<main className='h-screen justify-normal items-center flex'>
			<Card className='max-w-sm mx-auto'>
				<CardHeader>
					<CardTitle className='text-xl'>Sign Up</CardTitle>
					<CardDescription>
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='grid gap-2'>
								<Label htmlFor='first-name'>First name</Label>
								<Input id='first-name' placeholder='Max' required />
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='last-name'>Last name</Label>
								<Input id='last-name' placeholder='Robinson' required />
							</div>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='mmmm@example.com'
								required
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='password'>Password</Label>
							<Input id='password' type='password' />
						</div>
						<Button type='submit' className='w-full'>
							Create an account
						</Button>
						<Button variant='outline' className='w-full'>
							Login with Google
						</Button>
					</div>
					<div className='mt-4 text-sm text-center'>
						Already have an account?{' '}
						<Link to='/login' className='underline'>
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</main>
	)
}

export { SignUp }
