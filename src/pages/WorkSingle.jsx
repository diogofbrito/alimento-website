import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import sanityClient from '../SanityClient';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { HeaderSingleWork } from '../components/HeaderSingleWork';
import { AnimatedImage, AnimatedP } from '../components/AnimatedText';
import { PortableText } from '@portabletext/react';
import { Paragraph } from '../components/Paragraph';
import Masonry from 'react-masonry-css';

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
				<div className='inset-0 z-40  px-12 pt-19 '>
					<Masonry breakpointCols={breakpointColumnsObj} className='flex gap-6' columnClassName='masonry-column'>
						{projeto.gallery.map((img, i) => (
							<div className='group block'>
								<AnimatedImage
									key={i}
									src={urlFor(img).width(500).quality(80).auto('format').url()}
									alt=''
									className=' cursor-pointer mb-6 transition-transform duration-500 ease-out group-hover:scale-101'
									onClick={() => {
										setCurrentImageIndex(i);
										setIsListOpen(false);
									}}
								/>
							</div>
						))}
					</Masonry>
				</div>
			)}

			{/* Informações */}
			{isInfoOpen && (
				<div className='fixed inset-0 z-40 p-4 overflow-y-auto w-1/2 tracking-wide leading-[1.3] gambarino'>
					<AnimatedP>
						<PortableText value={projeto.description} components={{ block: { normal: Paragraph } }} />
					</AnimatedP>
				</div>
			)}

			{!isListOpen && !isInfoOpen && (
				<div className='z-40 grid grid-cols-5 justify-between px-12 pt-19  gap-12 '>
					{/* foto anterior */}
					<div className='col-span-1'>
						{prevIndex !== null && (
							<div className='group block'>
								<img
									src={urlFor(projeto.gallery[prevIndex]).width(400).quality(60).auto('format').url()}
									alt=''
									className='w-full object-contain cursor-pointer transition-transform duration-500 ease-out group-hover:scale-101 '
									onClick={() => setCurrentImageIndex(prevIndex)}
								/>
							</div>
						)}
					</div>

					{/* foto principal */}
					<div className='col-span-3 flex justify-center'>
						<img
							key={currentImageIndex}
							src={urlFor(projeto.gallery[currentImageIndex]).width(1800).quality(80).url()}
							alt={projeto.title}
							className='max-h-[80vh] object-contain image-main opacity-0 pointer-events-none '
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
									className='w-full object-contain cursor-pointer transition-transform duration-500 ease-out group-hover:scale-101'
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
