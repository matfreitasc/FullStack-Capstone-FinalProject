import useAuth from '@/hooks/useAuth'
import useRefreshToken from '@/hooks/useRefreshToken'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const PersistLogin = () => {
	const [loading, setLoading] = useState(true)
	const refresh = useRefreshToken()

	const { auth } = useAuth()

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh()
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}
		!auth?.access_token ? verifyRefreshToken() : setLoading(false)
	}, [])


	return (
		<>
			{loading ? (
				<div className='flex justify-center items-center justify-items-center h-screen relative'>
					<motion.div
						className='w-36 aspect-square bg-primary rounded-full relative'
						animate={{
							scale: [1, 2, 2, 1, 1],
							rotate: [0, 0, 180, 180, 0],
							borderRadius: ['0%', '0%', '50%', '50%', '0%'],
						}}
						transition={{
							duration: 3,
							ease: 'easeInOut',
							times: [0, 0.2, 0.5, 0.8, 1],
							repeat: Infinity,
							repeatDelay: 2,
						}}>
						<div className='sr-only'>Loading...</div>
					</motion.div>
					<span className='absolute text-secondary-foreground bg-primary-foreground p-6 py-10 rounded-full'>
						Loading
					</span>
				</div>
			) : (
				<Outlet />
			)}
		</>
	)
}

export default PersistLogin
