import { useLoaderData } from 'react-router-dom'

interface ProductType {
	id: string
	name: string
	description: string
	category_id: number
	price: number
	quantity: number
	available: boolean
	image_url: string
	created_at: string
	updated_at: string
}

const Product = () => {
	const product = useLoaderData() as ProductType
	console.log(product)
	return (
		<div>
			<h1>{product.name}</h1>
			<p>{product.description}</p>
			<p>${product.price}</p>
			<img src={product.image_url} alt={product.name} />
			<button>Add to Cart</button>
		</div>
	)
}

export { Product }
