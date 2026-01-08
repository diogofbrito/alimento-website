import { useEffect, useState } from 'react';
import sanityClient from '../SanityClient';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { HeaderSingleIPlusD } from '../components/HeaderSingleIPlusD';
import { AnimatedImage1, AnimatedH1, AnimatedP, AnimatedPAfterH1 } from '../components/AnimatedText';
import { PortableText } from '@portabletext/react';
import { Paragraph } from '../components/Paragraph';
import { motion } from 'framer-motion';

/* ✅ IGUAL AO TEU WORKS */
function useIsDesktop() {
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
		setIsDesktop(mq.matches);

		const handler = e => setIsDesktop(e.matches);
		mq.addEventListener('change', handler);

		return () => mq.removeEventListener('change', handler);
	}, []);

	return isDesktop;
}

/* ✅ IGUAL AO WORKS */
const movingImageVariants = {
	rest: { x: '0%' },
	hover: { x: '100%' },
};

const img1Variants = {
	rest: { opacity: 1 },
	hover: { opacity: 0 },
};

const img2Variants = {
	rest: { opacity: 0 },
	hover: { opacity: 1 },
};

export function IPlusD() {
	const [projects, setProjects] = useState([]);
	const [items, setItems] = useState([]);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isListOpen, setIsListOpen] = useState(false);
	const [isInfoOpen, setIsInfoOpen] = useState(false);
	const [isMainLoaded, setIsMainLoaded] = useState(false);

	const isDesktop = useIsDesktop();

	useEffect(() => {
		sanityClient
			.fetch(
				`
        *[_type == "imaisd"] | order(year desc, _createdAt desc) {
          _id,
          title,
          year,
          coverImage,
          coverImage2,
          description,
          "pdfUrl": pdf.asset->url,
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
				const docs = data || [];
				setProjects(docs);

				const flattened = docs
					.flatMap(doc =>
						(doc.gallery || [])
							.map(g => ({
								_key: g._key || `${doc._id}-${Math.random()}`,
								image: g.image,
								imageTitle: g.title,

								projectTitle: doc.title,
								projectYear: doc.year,
								projectDescription: doc.description,
								projectSlug: doc.slug,
								projectId: doc._id,

								coverImage: doc.coverImage,
								coverImage2: doc.coverImage2,
								pdfUrl: doc.pdfUrl,
							}))
							.filter(it => it.image?.asset?._ref),
					)
					.sort((a, b) => (b.projectYear || 0) - (a.projectYear || 0));

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

			if (e.key === 'ArrowRight') setCurrentImageIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
			if (e.key === 'ArrowLeft') setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [items, isListOpen, isInfoOpen]);

	useEffect(() => {
		if (!items?.length) return;

		const preload = [currentImageIndex - 1, currentImageIndex, currentImageIndex + 1];
		preload.forEach(i => {
			if (i >= 0 && i < items.length) {
				const image = new Image();
				image.src = urlFor(items[i].image).width(1600).quality(80).auto('format').url();
			}
		});
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
		<>
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

			{/* LISTA */}
			{isListOpen && (
				<div className='inset-0 z-40 pt-[30px] px-3 pb-3 lg:px-5 lg:pt-[100px] lg:pb-5'>
					<div className='grid lg:grid-cols-6 grid-cols-2 gap-6 lg:gap-x-[10px] lg:gap-y-[50px]'>
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

			{/* INFO — AGORA COM A MESMA LÓGICA DO WORKS */}
			{isInfoOpen && (
				<div className='z-40 px-3 pt-[30px] pb-3 lg:px-5 lg:pt-[100px] lg:pb-5 tracking-wide leading-[1.3]'>
					<div className='lg:grid lg:grid-cols-4 lg:gap-x-[100px]'>
						<div className='col-span-2'>
							<AnimatedP className='tracking-[0.02em] text-[1.2rem] font-[500]'>
								I + D é um arquivo de investigação, referências, receitas e processos: imagens, materiais e exercícios que alimentam a prática de Alimento.
							</AnimatedP>
						</div>
					</div>

					{/* GRID CARDS (TIPO WORKS) */}
					<div className='pt-12 lg:pt-16 pb-5'>
						<AnimatedH1 className='font-[500] text-[0.85rem] pb-4'>Publicações</AnimatedH1>
						<div className='grid lg:grid-cols-4 gap-x-[100px] lg:gap-y-[80px] gap-y-[70px]'>
							{projects.map(p => {
								const href = p.pdfUrl || null;

								const img1 = p.coverImage?.asset ? urlFor(p.coverImage).width(1200).quality(85).auto('format').url() : null;

								// ✅ só carrega img2 em desktop real
								const img2 = isDesktop && p.coverImage2?.asset ? urlFor(p.coverImage2).width(1200).quality(85).auto('format').url() : null;

								return (
									<a
										key={p._id}
										href={href || undefined}
										target={href ? '_blank' : undefined}
										rel={href ? 'noopener noreferrer' : undefined}
										className={`contents ${href ? '' : 'pointer-events-none opacity-40'}`}
									>
										<motion.div className='col-span-2 relative h-[200px] lg:h-[400px]' initial='rest' animate='rest' whileHover={isDesktop && img2 ? 'hover' : undefined}>
											{/* ✅ MESMA ESTRUTURA DO WORKS */}
											<div className='grid grid-cols-2 h-full w-full'>
												<div className='relative h-full w-full flex items-center uppercase opacity-50 text-[0.8rem] font-[500] tracking-[0.03em]' />
												<div className='relative h-full w-full' />

												<motion.div className='absolute top-0 left-0 h-full w-1/2 overflow-hidden' variants={movingImageVariants} transition={{ duration: 0.5, ease: 'easeOut' }}>
													{img1 ? (
														<motion.img src={img1} alt={p.title} className='w-full h-full object-cover absolute inset-0' variants={img1Variants} transition={{ duration: 0.5, ease: 'easeOut' }} />
													) : (
														<div className='absolute inset-0 bg-black/5' />
													)}

													{/* img2 só existe em desktop */}
													{img2 && (
														<motion.img src={img2} alt={p.title} className='w-full h-full object-cover absolute inset-0' variants={img2Variants} transition={{ duration: 0.5, ease: 'easeOut' }} />
													)}
												</motion.div>
											</div>

											{/* ✅ em baixo só title + year (sem “PDF”) */}
											<div className='lg:mt-2 mt-4 flex justify-between text-[0.85rem] tracking-[0.03em] uppercase'>
												<div className='lg:max-w-[70%] font-[500]'>
													<AnimatedH1>{p.title}</AnimatedH1>
												</div>
												<AnimatedH1>{p.year || '—'}</AnimatedH1>
											</div>
										</motion.div>
									</a>
								);
							})}
						</div>
					</div>
				</div>
			)}

			{/* SLIDER */}
			{!isListOpen && !isInfoOpen && (
				<>
					{/* desktop */}
					<div className='z-40 hidden lg:grid lg:grid-cols-5 justify-between px-5 pt-[100px] pb-5 gap-x-[100px]'>
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

						<div className='col-span-3 flex flex-col gap-4 items-center justify-center'>
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
								<AnimatedP className='text-center'>
									<PortableText value={items[currentImageIndex].imageTitle} components={{ block: { normal: Paragraph } }} />
								</AnimatedP>
							) : (
								<div className='h-[24px]' />
							)}
						</div>

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

					{/* mobile */}
					<div className='z-40 lg:hidden flex flex-col gap-6 px-3 pt-[30px]'>
						<div className='w-full flex flex-col gap-3 items-center justify-center'>
							<img
								key={currentImageIndex}
								src={urlFor(items[currentImageIndex].image).width(1800).quality(80).auto('format').url()}
								alt={current?.projectTitle || ''}
								className='h-[300px] object-cover image-main opacity-0 pointer-events-none'
								onLoad={e => {
									e.currentTarget.classList.add('opacity-100');
									setIsMainLoaded(true);
								}}
							/>

							{isMainLoaded && items[currentImageIndex]?.imageTitle?.length ? (
								<AnimatedP className='text-center'>
									<PortableText value={items[currentImageIndex].imageTitle} components={{ block: { normal: Paragraph } }} />
								</AnimatedP>
							) : (
								<div className='h-[24px]' />
							)}
						</div>

						<div className='h-[120px] flex justify-center'>
							{nextIndex !== null && (
								<img
									src={urlFor(items[nextIndex].image).width(400).quality(60).auto('format').url()}
									alt=''
									className='h-full object-contain cursor-pointer transition-transform duration-1000 ease-out group-hover:scale-101 opacity-80'
									onClick={() => setCurrentImageIndex(nextIndex)}
								/>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
}
