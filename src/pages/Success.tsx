import { Button } from '@/components/ui/button'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
	const location = useLocation()
	const message = location.state?.message
	return (
		<div className='w-full lg:min-h-[600px]  xl:min-h-[800px] flex flex-col justify-center text-center '>
			<div className='flex items-center justify-center py-12'>
				<div className='mx-auto grid w-[350px] gap-6'>
					<div className='grid gap-8'>
						<h1 className='text-3xl font-semibold'>{message}</h1>
						<Button variant='outline' className='w-full'>
							<Link to='/' className='underline'>
								Return to Home Page
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export { Success }
