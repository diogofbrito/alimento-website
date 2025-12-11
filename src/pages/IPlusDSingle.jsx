// IPlusDSingle.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import sanityClient from '../SanityClient.js';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { HeaderSingleID } from '../components/HeaderSingleID';
import { AnimatedImage1, AnimatedP } from '../components/AnimatedText';
import { PortableText } from '@portabletext/react';
import { Paragraph } from '../components/Paragraph';

export function IPlusDSingle() {
	const { slug } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isListOpen, setIsListOpen] = useState(false);
	const [isInfoOpen, setIsInfoOpen] = useState(false);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const data = await sanityClient.fetch(
					`*[_type == "imaisd" && slug.current == $slug][0]{
            title,
            year,
            placeholderImage,
            gallery,
            ingredients,
            preparation,
            description
          }`,
					{ slug },
				);
				setRecipe(data);
				setCurrentImageIndex(0); // reset quando muda de receita
			} catch (error) {
				console.error('Erro ao buscar receita:', error.message);
			}
		};

		fetchRecipe();
	}, [slug]);

	// preload de imagens (opcional, copia do WorkSingle)
	useEffect(() => {
		if (recipe?.gallery) {
			const preload = [currentImageIndex - 1, currentImageIndex, currentImageIndex + 1];
			preload.forEach(i => {
				if (i >= 0 && i < recipe.gallery.length) {
					const image = new Image();
					image.src = urlFor(recipe.gallery[i]).width(1600).quality(80).auto('format').url();
				}
			});
		}
	}, [currentImageIndex, recipe]);

	if (!recipe) return null;

	// cálculo prev/next igual ao WorkSingle, mas com recipe.gallery
	let prevIndex = null;
	let nextIndex = null;

	if (recipe.gallery && recipe.gallery.length > 1) {
		if (currentImageIndex > 0) {
			prevIndex = currentImageIndex - 1;
		} else if (currentImageIndex === 0) {
			prevIndex = null;
		}

		if (currentImageIndex < recipe.gallery.length - 1) {
			nextIndex = currentImageIndex + 1;
		} else {
			nextIndex = 0;
		}
	}

	return (
		<div>
			<HeaderSingleID
				title={recipe.title}
				currentIndex={currentImageIndex}
				totalImages={recipe.gallery?.length || 0}
				isListOpen={isListOpen}
				isInfoOpen={isInfoOpen}
				onToggleList={() => {
					setIsListOpen(prev => !prev);
					setIsInfoOpen(false);
				}}
				onToggleInfo={() => {
					setIsInfoOpen(prev => !prev);
					setIsListOpen(false);
				}}
			/>

			{/* LISTA – grelha com todas as imagens */}
			{isListOpen && recipe.gallery && (
				<div className='inset-0 z-40 px-5 pb-5 pt-13'>
					<div className='grid grid-cols-6 gap-x-[100px] gap-y-[50px]'>
						{recipe.gallery.map((img, i) => (
							<AnimatedImage1
								key={i}
								src={urlFor(img).width(500).quality(80).auto('format').url()}
								alt=''
								className='cursor-pointer transition-transform duration-1000 ease-out group-hover:scale-101'
								onClick={() => {
									setCurrentImageIndex(i);
									setIsListOpen(false);
								}}
							/>
						))}
					</div>
				</div>
			)}

			{/* INFORMAÇÃO – descrição + ingredientes + preparação */}
			{isInfoOpen && (
				<div className='fixed inset-0 z-40 px-5 mt-[150px] overflow-y-auto w-1/2 tracking-wide leading-[1.3] gambarino'>
					{recipe.description && (
						<AnimatedP className='mb-6'>
							<PortableText value={recipe.description} components={{ block: { normal: Paragraph } }} />
						</AnimatedP>
					)}

					{recipe.ingredients?.length > 0 && (
						<div className='mb-6'>
							<h3 className='uppercase text-xs mb-2'>Ingredientes</h3>
							<ul className='text-sm leading-relaxed'>
								{recipe.ingredients.map((ing, i) => (
									<li key={i}>
										<strong>{ing.quantity}</strong> {ing.item}
										{ing.note && <span> — {ing.note}</span>}
									</li>
								))}
							</ul>
						</div>
					)}

					{recipe.preparation?.length > 0 && (
						<div className='mb-6'>
							<h3 className='uppercase text-xs mb-2'>Preparação</h3>
							<ol className='text-sm leading-relaxed list-decimal list-inside'>
								{recipe.preparation
									.sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0))
									.map((step, i) => (
										<li key={i}>{step.instruction}</li>
									))}
							</ol>
						</div>
					)}
				</div>
			)}

			{!isListOpen && !isInfoOpen && (
				<div className='grid grid-cols-4 gap-x-[100px]  px-5 '>
					<div className='col-span-2 mt-13 '>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam perspiciatis rem quidem hic. Ea aliquam eos quis fugit dignissimos ut amet accusamus odit. At incidunt ut voluptatem,
						autem nesciunt sequi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque autem inventore beatae impedit voluptates magnam ipsa, in excepturi magni iste esse nesciunt
						quod tempora sunt perferendis. Voluptas, dolore eaque.
						<div className='grid grid-cols-2 grid-rows-2 gap-x-[50px] pt-12 h-[300px] gap-12'>
							<div className='col-span-1 row-span-1 opacity-45 '>Tipo</div>
							<div className='col-span-1 row-span-1 '>Livro de receitas</div>
							<div className='col-span-1 row-span-2  flex flex-col '>
								<div className='opacity-45'>Cliente</div>
								<div>Escola de Agronomia</div>
							</div>
							<div className='col-span-1 row-span-2  flex flex-col'>
								<div className='opacity-45'>Ano</div>
								<div>2021</div>
							</div>
						</div>
					</div>
					<div className='col-span-2 h-[calc(100vh-0px)] pt-13 overflow-y-auto '>
						{recipe.gallery?.map((img, i) => (
							<div key={i} className='w-full pb-[50px]'>
								<AnimatedImage1 src={urlFor(img).width(1600).quality(80).auto('format').url()} alt={recipe.title} className='w-full  object-cover pointer-events-none' />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
