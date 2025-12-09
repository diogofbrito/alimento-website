import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import sanityClient from '../SanityClient';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { HeaderSingleWork } from '../components/HeaderSingleWork';
import { AnimatedImage,AnimatedImage1, AnimatedP } from '../components/AnimatedText';
import { PortableText } from '@portabletext/react';
import { Paragraph } from '../components/Paragraph';

export function WorkSingle() {
	const { slug } = useParams();
	const [projeto, setProjeto] = useState(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isListOpen, setIsListOpen] = useState(false);
	const [isInfoOpen, setIsInfoOpen] = useState(false);

	const breakpointColumnsObj = {
		default: 5,
		1100: 4,
		700: 3,
		500: 2,
	};

	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == "projetos" && slug.current == $slug][0]{
          title,
          "slug": slug.current,
          placeholderImage,
          gallery,
          description,
        }`,
				{ slug },
			)
			.then(data => setProjeto(data));
	}, [slug]);

	useEffect(() => {
		if (projeto?.gallery) {
			const preload = [currentImageIndex - 1, currentImageIndex, currentImageIndex + 1];
			preload.forEach(i => {
				if (i >= 0 && i < projeto.gallery.length) {
					const image = new Image();
					image.src = urlFor(projeto.gallery[i]).width(1600).quality(80).auto('format').url();
				}
			});
		}
	}, [currentImageIndex, projeto]);

	if (!projeto) return null;

	let prevIndex = null;
	let nextIndex = null;

	if (projeto.gallery.length > 1) {
		if (currentImageIndex > 0) {
			prevIndex = currentImageIndex - 1;
		} else if (currentImageIndex === 0) {
			prevIndex = null;
		}

		if (currentImageIndex < projeto.gallery.length - 1) {
			nextIndex = currentImageIndex + 1;
		} else {
			nextIndex = 0;
		}
	}

	return (
		<div>
			<HeaderSingleWork
				title={projeto.title}
				currentIndex={currentImageIndex}
				totalImages={projeto.gallery.length}
				description={projeto.description}
				ingredients={projeto.ingredients}
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

			{/* Lista de imagens */}
			{isListOpen && (
				<div className='inset-0 z-40  px-5 pt-16 '>
					<div className='grid grid-cols-6 gap-x-[50px]'>
						{projeto.gallery.map((img, i) => (
							<AnimatedImage1
								key={i}
								src={urlFor(img).width(500).quality(80).auto('format').url()}
								alt=''
								className=' cursor-pointer mb-5 transition-transform duration-1000 ease-out group-hover:scale-101'
								onClick={() => {
									setCurrentImageIndex(i);
									setIsListOpen(false);
								}}
							/>
						))}
					</div>
				</div>
			)}

			{/* Informações */}
			{isInfoOpen && (
				<div className='fixed inset-0 z-40 mx-5 mt-15 grid grid-cols-4 gap-x-[50px] tracking-wide leading-[1.3] '>
					<div className='col-span-2 '>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus assumenda dolores sapiente. Unde exercitationem eum possimus quod itaque error facilis non deserunt suscipit repellendus?
						Architecto consectetur quasi quas adipisci sequi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius rem porro ut voluptatum reprehenderit nihil nobis omnis sapiente aliquid
						perferendis facilis sed vitae asperiores, doloremque architecto dicta alias exercitationem neque.
					</div>
					<div className='col-span-4 '>
						<div className='grid grid-cols-4 gap-x-[50px] h-[300px] gap-12'>
							<div className='col-span-1  flex flex-col '>
								<div className='opacity-45'>Tipo</div>
								<div>Almoço para 14 pax</div>
							</div>
							<div className='col-span-1 flex flex-col '>
								<div className='opacity-45'>Cliente</div>
								<div>Escola de Agronomia</div>
							</div>
							<div className='col-span-1 flex flex-col'>
								<div className='opacity-45'>Ano</div>
								<div>2021</div>
							</div>
							<div className='col-span-1 flex flex-col'>
								<div className='opacity-45'>Créditos</div>
								<div>lorem ipsum
								</div>
							</div>
						</div>
					</div>

					<AnimatedP>
						<PortableText value={projeto.description} components={{ block: { normal: Paragraph } }} />
					</AnimatedP>
				</div>
			)}

			{!isListOpen && !isInfoOpen && (
				<div className='z-40 grid grid-cols-5 justify-between px-5 pt-16 gap-x-[50px] '>
					{/* foto anterior */}
					<div className='col-span-1'>
						{prevIndex !== null && (
							<div className='group block'>
								<img
									src={urlFor(projeto.gallery[prevIndex]).width(400).quality(60).auto('format').url()}
									alt=''
									className='w-full object-contain cursor-pointer transition-transform duration-1000 ease-out group-hover:scale-101  opacity-80'
									onClick={() => setCurrentImageIndex(prevIndex)}
								/>
							</div>
						)}
					</div>

					{/* foto principal */}
					<div className='col-span-3 flex items-center justify-center'>
						<img
							key={currentImageIndex}
							src={urlFor(projeto.gallery[currentImageIndex]).width(1800).quality(80).url()}
							alt={projeto.title}
							className='max-h-[90vh] object-contain image-main opacity-0 pointer-events-none '
							onLoad={e => e.currentTarget.classList.add('opacity-100')}
						/>
					</div>

					{/* foto posterior */}
					<div className='col-span-1 '>
						{nextIndex !== null && (
							<div className='group block'>
								<img
									src={urlFor(projeto.gallery[nextIndex]).width(400).quality(60).auto('format').url()}
									alt=''
									className='w-full object-contain cursor-pointer transition-transform duration-1000 ease-out group-hover:scale-101 opacity-80'
									onClick={() => setCurrentImageIndex(nextIndex)}
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
