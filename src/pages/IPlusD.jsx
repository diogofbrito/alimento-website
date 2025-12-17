import { useEffect, useState } from 'react';
import sanityClient from '../SanityClient';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { HeaderSingleIPlusD } from '../components/HeaderSingleIPlusD';
import { AnimatedImage1, AnimatedP } from '../components/AnimatedText';
import { PortableText } from '@portabletext/react';
import { Paragraph } from '../components/Paragraph';

export function IPlusD() {
	const [items, setItems] = useState([]); 
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isListOpen, setIsListOpen] = useState(false);
	const [isInfoOpen, setIsInfoOpen] = useState(false);
	const [isMainLoaded, setIsMainLoaded] = useState(false);


	useEffect(() => {
		sanityClient
			.fetch(
				`
        *[_type == "imaisd"] | order(year desc, _createdAt desc) {
          _id,
          title,
          year,
          description,
          "slug": slug.current,
          gallery[]{
            _key,
            "image": coalesce(image, @),
            title
          }
        }
      `,
			)
			.then(data => {
				const flattened = (data || []).flatMap(
					doc =>
						(doc.gallery || [])
							.map(g => ({
								_key: g._key || `${doc._id}-${Math.random()}`,
								image: g.image, // imagem do item
								imageTitle: g.title, // título desta imagem (blockContent)
								projectTitle: doc.title,
								projectYear: doc.year,
								projectDescription: doc.description,
								projectSlug: doc.slug,
								projectId: doc._id,
							}))
							.filter(it => it.image?.asset?._ref), // evita urlFor(null)
				);

				// se quiseres manter por ano desc (e manter ordem “ok”)
				flattened.sort((a, b) => (b.projectYear || 0) - (a.projectYear || 0));

				setItems(flattened);
				setCurrentImageIndex(0);
			});
	}, []);


useEffect(() => {
	setIsMainLoaded(false); 
}, [currentImageIndex]);

	useEffect(() => {
		const handleKeyDown = e => {
			if (isListOpen || isInfoOpen) return;
			if (!items?.length) return;

			if (e.key === 'ArrowRight') {
				setCurrentImageIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
			}

			if (e.key === 'ArrowLeft') {
				setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [items, isListOpen, isInfoOpen]);

	useEffect(() => {
		if (items?.length) {
			const preload = [currentImageIndex - 1, currentImageIndex, currentImageIndex + 1];
			preload.forEach(i => {
				if (i >= 0 && i < items.length) {
					const image = new Image();
					image.src = urlFor(items[i].image).width(1600).quality(80).auto('format').url();
				}
			});
		}
	}, [currentImageIndex, items]);

	if (!items?.length) return null;

	const current = items[currentImageIndex];

	let prevIndex = null;
	let nextIndex = null;

	if (items.length > 1) {
		if (currentImageIndex > 0) prevIndex = currentImageIndex - 1;
		else if (currentImageIndex === 0) prevIndex = null;

		if (currentImageIndex < items.length - 1) nextIndex = currentImageIndex + 1;
		else nextIndex = 0;
	}

	return (
		<div>
			<HeaderSingleIPlusD
				title={current?.projectTitle || 'I + D'}
				currentIndex={currentImageIndex}
				totalImages={items.length}
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
				<div className='inset-0 z-40 px-5 pt-[100px] pb-13'>
					<div className='grid grid-cols-6 gap-x-[100px] gap-y-[60px]'>
						{items.map((it, i) => (
							<AnimatedImage1
								key={it._key}
								src={urlFor(it.image).width(500).quality(80).auto('format').url()}
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

			{/* Informações */}
			{isInfoOpen && (
				<div className='fixed z-40 mx-5 pt-[100px] pb-13 grid grid-cols-4 gap-x-[100px] tracking-wide leading-[1.3]'>
					<div className='col-span-2 opacity-90'>I + D é um arquivo de investigação, referências e processos — imagens, materiais e exercícios que alimentam a prática do Alimento.</div>

					<div className='col-span-4 pt-12'>
						<div className='grid grid-cols-4 gap-x-[100px]'>
							<div className='col-span-1 flex flex-col'>
								<div className='opacity-45'>Projeto</div>
								<div>{current?.projectTitle}</div>
							</div>
							<div className='col-span-1 flex flex-col'>
								<div className='opacity-45'>Ano</div>
								<div>{current?.projectYear || '—'}</div>
							</div>
							<div className='col-span-2 flex flex-col'>
								<div className='opacity-45'>Tipo</div>
								<div>[Publicação de receitas]</div>
							</div>
						</div>
					</div>

					{current?.projectDescription && (
						<AnimatedP className='col-span-4 pt-12'>
							<PortableText value={current.projectDescription} components={{ block: { normal: Paragraph } }} />
						</AnimatedP>
					)}
				</div>
			)}

			{!isListOpen && !isInfoOpen && (
				<div className='z-40 grid grid-cols-5 justify-between px-5 pt-[100px] pb-13 gap-x-[100px]'>
					{/* foto anterior */}
					<div className='col-span-1'>
						{prevIndex !== null && (
							<div className='group block'>
								<img
									src={urlFor(items[prevIndex].image).width(400).quality(60).auto('format').url()}
									alt=''
									className='w-full object-contain cursor-pointer transition-transform duration-1000 ease-out group-hover:scale-101 opacity-80'
									onClick={() => setCurrentImageIndex(prevIndex)}
								/>
							</div>
						)}
					</div>

					{/* foto principal + titulo da imagem */}
					<div className='col-span-3 flex flex-col gap-5 items-center justify-center'>
						<img
							key={currentImageIndex}
							src={urlFor(items[currentImageIndex].image).width(1800).quality(80).auto('format').url()}
							alt={current?.projectTitle || ''}
							className='max-h-[60vh] object-contain image-main opacity-0 pointer-events-none'
							onLoad={e => {
								e.currentTarget.classList.add('opacity-100');
								setIsMainLoaded(true);
							}}
						/>

						{isMainLoaded && items[currentImageIndex]?.imageTitle?.length ? (
							<AnimatedP className='text-center opacity-90'>
								<PortableText value={items[currentImageIndex].imageTitle} components={{ block: { normal: Paragraph } }} />
							</AnimatedP>
						) : (
							<div className='h-[24px]' /> // mantém o layout sem “salto” (ajusta a altura)
						)}
					</div>

					{/* foto posterior */}
					<div className='col-span-1'>
						{nextIndex !== null && (
							<div className='group block'>
								<img
									src={urlFor(items[nextIndex].image).width(400).quality(60).auto('format').url()}
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
