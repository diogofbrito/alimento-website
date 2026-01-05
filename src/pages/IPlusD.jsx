import { useEffect, useState } from 'react';
import sanityClient from '../SanityClient';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { HeaderSingleIPlusD } from '../components/HeaderSingleIPlusD';
import { AnimatedImage1, AnimatedH1, AnimatedP } from '../components/AnimatedText';
import { PortableText } from '@portabletext/react';
import { Paragraph } from '../components/Paragraph';

export function IPlusD() {
	const [projects, setProjects] = useState([]);
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
		  coverImage,
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
				setProjects(data || []);
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
								coverImage: doc.coverImage,
								pdfUrl: doc.pdfUrl,
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

			{/* Lista de imagens */}
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

			{/* INFORMAÇÕES (todas as publicações) */}
			{isInfoOpen && (
				<div className='z-40 px-3 pt-[30px] pb-3 lg:px-5 lg:pt-[100px] lg:pb-5 tracking-wide leading-[1.3] '>
					<div className='lg:grid lg:grid-cols-4 lg:gap-x-[100px]'>
						<div className='col-span-2 '>
							<AnimatedP className=' tracking-[0.02em] text-[1.2rem] font-[500]'>
								I + D é um arquivo de investigação, referências e processos: imagens, materiais e exercícios que alimentam a prática de Alimento.
							</AnimatedP>
						</div>
					</div>

					<div className='lg:pt-16 pt-12'>
						<div className='hidden lg:grid grid-cols-4 gap-x-[100px] font-[500]  pb-4 text-[0.85rem]'>
							<AnimatedH1>Publicações de receitas</AnimatedH1>
							<AnimatedH1>Nome</AnimatedH1>
							<AnimatedH1>Ano</AnimatedH1>
							<AnimatedH1>Ver</AnimatedH1>
						</div>

						<div className='grid gap-y-6'>
							{projects.map(p => (
								<>
									<div key={p._id} className='hidden lg:grid grid-cols-4 gap-x-[100px] items-start'>
										{/* capa */}
										<div>
											{p.coverImage?.asset ? (
												<AnimatedImage1 src={urlFor(p.coverImage).width(330).quality(90).auto('format').url()} alt={p.title} className='object-contain pointer-events-none' />
											) : (
												<div className='opacity-40'>—</div>
											)}
										</div>

										{/* nome */}
										<AnimatedH1 className='uppercase tracking-[0.02em] font-[500] text-[0.9rem]'>{p.title}</AnimatedH1>

										{/* ano */}
										<AnimatedH1 className='uppercase text-[0.9rem] tracking-[0.02em] '>{p.year || '—'}</AnimatedH1>

										{/* pdf */}
										<AnimatedH1>
											{p.pdfUrl ? (
												<a href={p.pdfUrl} target='_blank' rel='noopener noreferrer' className='underline tracking-[0.02em]  text-[0.9rem] hover:opacity-60 transition'>
													PDF
												</a>
											) : (
												<div className='opacity-40'>—</div>
											)}
										</AnimatedH1>
									</div>

									<div key={p._id} className='lg:hidden grid grid-cols-2 gap-6'>
										<div>
											{p.coverImage?.asset ? (
												<AnimatedImage1 src={urlFor(p.coverImage).width(330).quality(90).auto('format').url()} alt={p.title} className='object-contain pointer-events-none' />
											) : (
												<div className='opacity-40'>—</div>
											)}
										</div>

										<div className='flex flex-col gap-1'>
											{/* nome */}
											<AnimatedH1 className='uppercase tracking-[0.02em] font-[500] text-[0.9rem]'>{p.title}</AnimatedH1>

											{/* ano */}
											<AnimatedH1 className='uppercase text-[0.9rem] tracking-[0.02em] '>{p.year || '—'}</AnimatedH1>

											{/* pdf */}
											<AnimatedH1>
												{p.pdfUrl ? (
													<a href={p.pdfUrl} target='_blank' rel='noopener noreferrer' className='underline tracking-[0.02em]  text-[0.9rem] hover:opacity-60 transition'>
														PDF
													</a>
												) : (
													<div className='opacity-40'>—</div>
												)}
											</AnimatedH1>
										</div>
									</div>
								</>
							))}
						</div>
					</div>
				</div>
			)}

			{!isListOpen && !isInfoOpen && (
				<>
					<div className='z-40 hidden lg:grid lg:grid-cols-5 justify-between px-5 pt-[100px] pb-5 gap-x-[100px]'>
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
								<AnimatedP className='text-center'>
									<PortableText value={items[currentImageIndex].imageTitle} components={{ block: { normal: Paragraph } }} />
								</AnimatedP>
							) : (
								<div className='h-[24px]' />
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

					{/* mobile */}
					<div className=' z-40 lg:hidden flex flex-col gap-6 px-3 pt-[30px]  '>
						{/* foto principal */}
						<div className='w-full  flex flex-col gap-3 items-center justify-center '>
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
						{/* foto posterior */}
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
