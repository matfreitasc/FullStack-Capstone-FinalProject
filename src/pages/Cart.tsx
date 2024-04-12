import { useLoaderData } from 'react-router-dom'

const Cart = () => {
	const cart = useLoaderData()
	console.log(cart)
	return (
		<main className=' h-screen flex flex-row'>
			<section className=' bg-primary/20 h-full w-[50dvw]'>
				<div className='flex flex-col justify-center items-center h-full text-background'>
					<h1 className='text-6xl font-bold '>Cart</h1>
					<p className=''>Your cart is empty</p>
				</div>
			</section>
			<section className='bg-white h-full w-[50dvw] shadow-2xl'></section>
		</main>
	)
}

export { Cart }
