import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import sanityClient from '../SanityClient.js';
import { urlFor } from '../utils/imageUrlBuilder.js';

export function IPlusDSingle() {
	const { slug } = useParams();
	const [recipe, setRecipe] = useState(null);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const data = await sanityClient.fetch(
					`*[_type == "imaisd" && slug.current == $slug][0]{
						title,
						year,
						placeholderImage,
						ingredients,
						preparation,
						description
					}`,
					{ slug },
				);
				setRecipe(data);
			} catch (error) {
				console.error('Erro ao buscar receita:', error.message);
			}
		};

		fetchRecipe();
	}, [slug]);

	if (!recipe) {
		return <p>Carregando...</p>;
	}

	return (
		<div className='max-w-4xl mx-auto px-6 py-12'>
			<h1 className='text-3xl font-bold mb-4'>{recipe.title}</h1>
			<p className='text-gray-600 mb-6'>{recipe.year}</p>

			{recipe.placeholderImage && <img src={urlFor(recipe.placeholderImage).width(1200).auto('format').url()} alt={recipe.title} className='w-full h-auto mb-8 object-cover rounded-lg shadow-md' />}

			{recipe.description && (
				<div className='mb-8'>
					<p>{recipe.description}</p>
				</div>
			)}

			<h2 className='text-2xl font-semibold mb-4'>Ingredientes</h2>
			<ul className='list-disc pl-6 mb-8'>
				{recipe.ingredients?.map((ing, i) => (
					<li key={i}>
						{ing.quantity} {ing.item} {ing.note && `(${ing.note})`}
					</li>
				))}
			</ul>

			<h2 className='text-2xl font-semibold mb-4'>Preparação</h2>
			<ol className='list-decimal pl-6'>
				{recipe.preparation
					?.sort((a, b) => a.stepNumber - b.stepNumber)
					.map((step, i) => (
						<li key={i} className='mb-3'>
							{step.instruction}
						</li>
					))}
			</ol>
		</div>
	);
}
