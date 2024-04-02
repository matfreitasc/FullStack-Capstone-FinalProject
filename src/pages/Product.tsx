import { useLoaderData } from 'react-router-dom'

const Product = () => {
	const product = useLoaderData()
	console.log(product)
	return <div>Product</div>
}

export { Product }
