import { useEffect, useState } from 'react';
import sanityClient from '../SanityClient';
import { HeaderSingleIPlusD } from '../components/HeaderSingleIPlusD';
import { AnimatedH1, AnimatedP, AnimatedPAfterH1 } from '../components/AnimatedText';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../components/Paragraph';
import { motion } from 'framer-motion';
import { IMAISD_INFO_QUERY, IMAISD_SINGLE_QUERY, IMAISD_PAGE_SETTINGS_QUERY } from '../lib/sanity.queries';
import { imageUrl } from '../utils/sanity.image';
import { SanityImage } from '../components/SanityImage';
import { AnimatedSanityImage } from '../components/AnimatedSanityImage';


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
	const [introText, setIntroText] = useState(null);
	const [description, setDescription] = useState(null);

	const isDesktop = useIsDesktop();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [projectsData, singleData, pageSettings] = await Promise.all([
					sanityClient.fetch(IMAISD_INFO_QUERY),
					sanityClient.fetch(IMAISD_SINGLE_QUERY),
					sanityClient.fetch(IMAISD_PAGE_SETTINGS_QUERY),
				]);

				const docs = projectsData || [];
				setProjects(docs);
				setDescription(null);
				setIntroText(pageSettings?.introText || null);


				const flattened = (singleData || [])
					.flatMap((doc, docIndex) =>
						(doc.gallery || []).map((g, imageIndex) => ({
							_key: g.image?.asset?._id || `iad-${docIndex}-${imageIndex}`,
							image: g.image,
							imageTitle: g.title,
							projectTitle: doc.title,
							projectYear: doc.year,
							projectDescription: doc.description,
						})),
					)
					.filter(it => it.image?.asset?._id);

				setItems(flattened);
				setCurrentImageIndex(0);
			} catch (error) {
				console.error('Erro ao buscar I + D:', error.message);
			}
		};

		fetchData();
	}, []);

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
				const src = imageUrl(items[i].image, 'singleMain');
				if (!src) return;

				const image = new Image();
				image.src = src;
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
				title='I + D'
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

			{isListOpen && (
				<div className='inset-0 z-40 pt-[30px] px-3 pb-3 lg:px-5 lg:pt-[100px] lg:pb-5'>
					<div className='grid lg:grid-cols-6 items-start grid-cols-2 gap-3 lg:gap-x-[10px] lg:gap-y-[50px]'>
						{items.map((it, i) => (
							<button
								key={it._key}
								type='button'
								className='group block cursor-pointer text-left'
								onClick={() => {
									setCurrentImageIndex(i);
									setIsListOpen(false);
								}}
							>
								<AnimatedSanityImage
									image={it.image}
									preset='singleList'
									alt=''
									className='w-full'
									imgClassName='w-full h-auto object-cover group-hover:scale-104 transition-transform duration-800 '
									loading='lazy'
									sizes='(max-width: 1023px) 50vw, 16vw'
								/>
							</button>
						))}
					</div>
				</div>
			)}

			{isInfoOpen && (
				<div className='z-40 px-3 pt-[20px] pb-3 lg:px-5 lg:pt-[100px] lg:pb-5 tracking-wide leading-[1.3]'>
					<div className='lg:grid lg:grid-cols-4 lg:gap-x-[100px]'>
						<div className='col-span-2'>
							<AnimatedH1 className='text-[0.85rem] font-[500]'>INVESTIGAÇÃO + DESENVOLVIMENTO</AnimatedH1>
							{introText ? (
								<AnimatedPAfterH1 className='tracking-wide leading-[1.3]'>
									<PortableText value={introText} components={portableTextComponents} />
								</AnimatedPAfterH1>
							) : null}

							{description ? (
								<div className='pt-6'>
									<AnimatedP>
										<PortableText value={description} components={portableTextComponents} />
									</AnimatedP>
								</div>
							) : null}
						</div>
					</div>

					<div className='pt-12 lg:pt-16 pb-5'>
						<AnimatedH1 className='font-[500] text-[0.85rem] '>Publicações</AnimatedH1>

						<div className='pt-4 grid lg:grid-cols-4 gap-x-[100px] lg:gap-y-[80px] gap-y-[70px]'>
							{projects.map((p, index) => {
								const href = p.pdfUrl || null;
								const hasImg2 = isDesktop && p.coverImage2?.asset;

								return (
									<a
										key={p._id}
										href={href || undefined}
										target={href ? '_blank' : undefined}
										rel={href ? 'noopener noreferrer' : undefined}
										className={`contents ${href ? '' : 'pointer-events-none opacity-40'}`}
									>
										<motion.div
											className='col-span-2 relative h-[200px] lg:h-[300px]'
											initial='rest'
											animate='rest'
											whileHover={hasImg2 ? 'hover' : undefined}
											transition={{
												duration: 0.5,
												ease: 'easeOut',
												delay: index * 0.03,
											}}
										>
											<div className='grid grid-cols-2 h-full w-full'>
												<div className='relative h-full w-full flex items-center uppercase opacity-50 text-[0.8rem] font-[500] tracking-[0.03em]' />
												<div className='relative h-full w-full' />

												<motion.div className='absolute top-0 left-0 h-full w-1/2 overflow-hidden' variants={movingImageVariants} transition={{ duration: 0.5, ease: 'easeOut' }}>
													<motion.div className='absolute inset-0' variants={img1Variants} transition={{ duration: 0.5, ease: 'easeOut' }}>
														<SanityImage
															image={p.coverImage}
															preset='iadInfoCard'
															alt={p.title || ''}
															className='w-full h-full'
															imgClassName='w-full h-full object-cover'
															loading='lazy'
															sizes='(max-width: 1023px) 50vw, 25vw'
														/>
													</motion.div>

													{hasImg2 && (
														<motion.div className='absolute inset-0' variants={img2Variants} transition={{ duration: 0.5, ease: 'easeOut' }}>
															<SanityImage
																image={p.coverImage2}
																preset='iadInfoCard'
																alt={p.title || ''}
																className='w-full h-full'
																imgClassName='w-full h-full object-cover'
																loading='lazy'
																sizes='25vw'
															/>
														</motion.div>
													)}
												</motion.div>
											</div>

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

			{!isListOpen && !isInfoOpen && (
				<>
					<div className='z-40 hidden lg:grid lg:grid-cols-5 justify-between px-5 pt-[100px] pb-5 gap-x-[100px]'>
						<div className='col-span-1'>
							{prevIndex !== null && (
								<button type='button' className='group block w-full text-left' onClick={() => setCurrentImageIndex(prevIndex)}>
									<SanityImage
										image={items[prevIndex].image}
										preset='singleSide'
										alt=''
										className='w-full'
										imgClassName='w-full h-auto object-contain opacity-80 transition-transform duration-800 ease-out group-hover:scale-104 cursor-pointer'
										loading='lazy'
										sizes='20vw'
									/>
								</button>
							)}
						</div>

						<div className='col-span-3 flex flex-col gap-4 items-center justify-center'>
							<SanityImage
								key={items[currentImageIndex].image?.asset?._id || currentImageIndex}
								image={items[currentImageIndex].image}
								preset='singleMain'
								alt='I + D'
								className='w-full max-h-[80vh]'
								imgClassName='w-full h-auto object-contain pointer-events-none'
								loading='eager'
								sizes='60vw'
							/>

							{items[currentImageIndex]?.imageTitle?.length ? (
								<AnimatedP className='text-center'>
									<PortableText value={items[currentImageIndex].imageTitle} components={portableTextComponents} />
								</AnimatedP>
							) : (
								<div className='h-[24px]' />
							)}
						</div>

						<div className='col-span-1'>
							{nextIndex !== null && (
								<button type='button' className='group block w-full text-left' onClick={() => setCurrentImageIndex(nextIndex)}>
									<SanityImage
										image={items[nextIndex].image}
										preset='singleSide'
										alt=''
										className='w-full'
										imgClassName='w-full h-auto object-contain opacity-80 transition-transform duration-800 ease-out group-hover:scale-104 cursor-pointer'
										loading='lazy'
										sizes='20vw'
									/>
								</button>
							)}
						</div>
					</div>

					<div className='z-40 lg:hidden flex flex-col gap-8 px-3 pb-3 pt-[20px]'>
						<div className='w-full flex flex-col gap-4 items-center justify-center'>
							<SanityImage
								key={items[currentImageIndex].image?.asset?._id || currentImageIndex}
								image={items[currentImageIndex].image}
								preset='singleMain'
								alt='I + D'
								className='w-full h-[35vh] overflow-hidden'
								imgClassName='w-full h-full object-cover'
								loading='eager'
								sizes='100vw'
							/>

							{items[currentImageIndex]?.imageTitle?.length ? (
								<AnimatedP className='text-center h-[70px]'>
									<PortableText value={items[currentImageIndex].imageTitle} components={portableTextComponents} />
								</AnimatedP>
							) : (
								<div className='h-[70px]' />
							)}
						</div>

						<div className='mt-9 h-[120px] flex justify-center'>
							{nextIndex !== null && (
								<button type='button' className='block h-full text-left opacity-80' onClick={() => setCurrentImageIndex(nextIndex)}>
									<SanityImage image={items[nextIndex].image} preset='singleSide' alt='' className='w-full h-full' imgClassName='w-full h-full object-cover ' loading='lazy' sizes='40vw' />
								</button>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
}
