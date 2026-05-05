import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import sanityClient from '../SanityClient';
import { HeaderSingleWork } from '../components/HeaderSingleWork';
import { AnimatedH1, AnimatedPAfterH1 } from '../components/AnimatedText';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../components/Paragraph';
import { ArrowUpRight } from 'lucide-react';
import { WORK_SINGLE_QUERY } from '../lib/sanity.queries';
import { imageUrl } from '../utils/sanity.image';
import { SanityImage } from '../components/SanityImage';
import { ErrorPage } from './ErrorPage';
import { AnimatedSanityImage } from '../components/AnimatedSanityImage';
import { useLanguage } from '../contexts/LanguageContext';

export function WorkSingle() {
	const { slug } = useParams();
	const [projeto, setProjeto] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isListOpen, setIsListOpen] = useState(false);
	const [isInfoOpen, setIsInfoOpen] = useState(false);
	const { lang } = useLanguage();

	useEffect(() => {
		const fetchProjeto = async () => {
			try {
				setLoading(true);
				const data = await sanityClient.fetch(WORK_SINGLE_QUERY, { slug });
				setProjeto(data || null);
			} catch (error) {
				console.error('Erro ao buscar projeto:', error.message);
				setProjeto(null);
			} finally {
				setLoading(false);
			}
		};

		fetchProjeto();
	}, [slug]);

	useEffect(() => {
		if (loading) return;
		if (isListOpen || isInfoOpen) return;
		if (!projeto?.gallery?.length) return;

		const handleKeyDown = e => {
			if (e.key === 'ArrowRight') {
				setCurrentImageIndex(prev => (prev < projeto.gallery.length - 1 ? prev + 1 : 0));
			}

			if (e.key === 'ArrowLeft') {
				setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : projeto.gallery.length - 1));
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [loading, projeto, isListOpen, isInfoOpen]);

	useEffect(() => {
		if (!projeto?.gallery) return;

		const preload = [currentImageIndex - 1, currentImageIndex, currentImageIndex + 1];

		preload.forEach(i => {
			if (i >= 0 && i < projeto.gallery.length) {
				const src = imageUrl(projeto.gallery[i], 'singleMain');
				if (!src) return;

				const image = new Image();
				image.src = src;
			}
		});
	}, [currentImageIndex, projeto]);

	if (loading) return null;

	if (!projeto) return <ErrorPage />;

	const title = lang === 'en' ? projeto.titleEN || projeto.title : projeto.title;
	const description = lang === 'en' ? projeto.descriptionEN || projeto.description : projeto.description;
	const data = lang === 'en' ? projeto.dataEN || projeto.data : projeto.data;
	const tipo = lang === 'en' ? projeto.tipoEN || projeto.tipo : projeto.tipo;
	const local = lang === 'en' ? projeto.localEN || projeto.local : projeto.local;
	const cliente = lang === 'en' ? projeto.clienteEN || projeto.cliente : projeto.cliente;
	const creditos = lang === 'en' ? projeto.creditosEN || projeto.creditos : projeto.creditos;
	const agradecimentos = lang === 'en' ? projeto.agradecimentosEN || projeto.agradecimentos : projeto.agradecimentos;

	let prevIndex = null;
	let nextIndex = null;

	if (projeto.gallery.length > 1) {
		if (currentImageIndex > 0) prevIndex = currentImageIndex - 1;
		if (currentImageIndex < projeto.gallery.length - 1) nextIndex = currentImageIndex + 1;
		else nextIndex = 0;
	}


	return (
		<div>
			<HeaderSingleWork
				title={title}
				currentIndex={currentImageIndex}
				totalImages={projeto.gallery.length}
				description={projeto.description}
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
				<div className='inset-0 z-40 px-3 pb-3 lg:px-5 pt-[20px] lg:pt-[100px] lg:pb-5'>
					<div className='grid lg:grid-cols-6 grid-cols-2 items-start gap-3 lg:gap-x-[10px] lg:gap-y-[50px]'>
						{projeto.gallery.map((img, i) => (
							<button
								key={img.asset?._id || i}
								type='button'
								className='group block cursor-pointer text-left'
								onClick={() => {
									setCurrentImageIndex(i);
									setIsListOpen(false);
								}}
							>
								<AnimatedSanityImage
									image={img}
									preset='singleList'
									alt=''
									className='w-full'
									imgClassName='w-full h-auto object-cover transition-transform duration-800 group-hover:scale-104'
									loading='lazy'
									sizes='(max-width: 1023px) 50vw, 16vw'
								/>
							</button>
						))}
					</div>
				</div>
			)}

			{isInfoOpen && (
				<div className='z-40 px-3 pb-3 lg:px-5 lg:pb-5 pt-[20px] lg:pt-[100px] lg:grid lg:grid-cols-4 gap-x-[100px] tracking-wide leading-[1.3]'>
					<div className='col-span-2'>
						<AnimatedPAfterH1>
							<PortableText value={description} components={portableTextComponents} />
						</AnimatedPAfterH1>
					</div>

					<div className='col-span-2 pt-12 lg:pt-0'>
						<div className='grid grid-cols-2  gap-x-[30px] lg:gap-x-[100px] gap-y-[30px]'>
							<div className='col-span-1 flex flex-col'>
								<AnimatedH1 className='text-[0.85rem] font-[500]'>{lang === 'en' ? 'Type' : 'Tipo'}</AnimatedH1>
								<AnimatedPAfterH1>{tipo}</AnimatedPAfterH1>
							</div>

							<div className='col-span-1 flex flex-col'>
								<AnimatedH1 className='text-[0.85rem] font-[500]'>{lang === 'en' ? 'Date' : 'Data'}</AnimatedH1>

								<AnimatedPAfterH1>{data ? `${data} ${projeto.year}` : projeto.year}</AnimatedPAfterH1>
							</div>

							{local && (
								<div className='col-span-1 flex flex-col'>
									<AnimatedH1 className='text-[0.85rem] font-[500]'>{lang === 'en' ? 'Location' : 'Local'}</AnimatedH1>
									<AnimatedPAfterH1>{local}</AnimatedPAfterH1>
								</div>
							)}

							{cliente && (
								<div className='col-span-1 flex flex-col'>
									<AnimatedH1 className='text-[0.85rem] font-[500]'> {lang === 'en' ? 'Client' : 'Cliente'}</AnimatedH1>
									<AnimatedPAfterH1>{cliente}</AnimatedPAfterH1>
								</div>
							)}

							{creditos && (
								<div className='col-span-1 flex flex-col'>
									<AnimatedH1 className='text-[0.85rem] font-[500]'>{lang === 'en' ? 'Photography' : 'Fotografias'}</AnimatedH1>
									<AnimatedPAfterH1>{creditos}</AnimatedPAfterH1>
								</div>
							)}
						</div>

						<div className='grid lg:grid-cols-2 lg:gap-x-[100px] gap-y-[30px] pt-[30px] lg:pt-[80px]'>
							{projeto.fichaTecnica?.length > 0 && (
								<div className='col-span-1 flex flex-col'>
									<AnimatedH1 className='font-[500] text-[0.85rem]'> {lang === 'en' ? 'Credits' : 'Ficha técnica'}</AnimatedH1>

									<div className='flex flex-col gap-4 pt-2'>
										{projeto.fichaTecnica.map((item, index) => (
											<div key={index} className='flex flex-col'>
												<AnimatedPAfterH1 className='font-[500] text-[0.85rem]'> {lang === 'en' ? item.tituloEN || item.titulo : item.titulo}</AnimatedPAfterH1>
												<AnimatedPAfterH1>{lang === 'en' ? item.conteudoEN || item.conteudo : item.conteudo}</AnimatedPAfterH1>
											</div>
										))}
									</div>
								</div>
							)}

							<div className='col-span-1 flex flex-col'>
								{agradecimentos && (
									<div className='flex flex-col'>
										<AnimatedH1 className='text-[0.85rem] font-[500]'> {lang === 'en' ? 'Acknowledgements' : 'Agradecimentos'}</AnimatedH1>
										<AnimatedPAfterH1>{agradecimentos}</AnimatedPAfterH1>
									</div>
								)}
								{((projeto.links?.pdfs?.length ?? 0) > 0 || (projeto.links?.urls?.length ?? 0) > 0) && (
									<div className='col-span-1 flex flex-col pt-[30px]'>
										<AnimatedH1 className='text-[0.85rem] font-[500]'>Links</AnimatedH1>

										<div className='flex flex-col gap-2 lg:gap-2'>
											{projeto.links?.pdfs?.map((pdf, index) => (
												<a key={index} href={pdf.url} target='_blank' rel='noopener noreferrer' className='underline transition hover:opacity-60'>
													<AnimatedPAfterH1>
														{lang === 'en' ? pdf.titleEN?.trim() || pdf.title?.trim() || 'Open PDF' : pdf.title?.trim() || 'Abrir PDF'}
														<ArrowUpRight size={16} strokeWidth={1.5} className='inline-block align-[-2px]' />
													</AnimatedPAfterH1>
												</a>
											))}

											{projeto.links?.urls?.map((link, index) => (
												<a key={index} href={link.url} target='_blank' rel='noopener noreferrer' className='underline transition hover:opacity-60'>
													<AnimatedPAfterH1>
														{lang === 'en' ? link.titleEN || link.title : link.title} <ArrowUpRight size={16} strokeWidth={1.5} className='inline-block align-[-2px]' />
													</AnimatedPAfterH1>
												</a>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{!isListOpen && !isInfoOpen && (
				<>
					<div className='z-40 hidden lg:grid grid-cols-5 justify-between px-5 pt-[100px] pb-5 gap-x-[100px]'>
						<div className='col-span-1'>
							{prevIndex !== null && (
								<button type='button' className='group w-full h-full flex items-start cursor-w-resize text-left' onClick={() => setCurrentImageIndex(prevIndex)}>
									<SanityImage
										image={projeto.gallery[prevIndex]}
										preset='singleSide'
										alt=''
										className='w-full'
										imgClassName='w-full h-auto object-contain opacity-80 transition-transform duration-800 ease-out group-hover:scale-104 '
										loading='lazy'
										sizes='20vw'
									/>
								</button>
							)}
						</div>

						<div className='col-span-3 flex items-center justify-center'>
							<SanityImage
								key={projeto.gallery[currentImageIndex]?.asset?._id || currentImageIndex}
								image={projeto.gallery[currentImageIndex]}
								preset='singleMain'
								alt={title || ''}
								className='w-full max-h-[80vh]'
								imgClassName='w-full h-auto object-contain pointer-events-none'
								loading='eager'
								sizes='60vw'
							/>
						</div>

						{nextIndex !== null && (
							<div className='col-span-1 cursor-e-resize' onClick={() => setCurrentImageIndex(nextIndex)}>
								<button type='button' className='group block w-full text-left '>
									<SanityImage
										image={projeto.gallery[nextIndex]}
										preset='singleSide'
										alt=''
										className='w-full'
										imgClassName='w-full h-auto object-contain opacity-80 transition-transform duration-800 ease-out group-hover:scale-104 cursor-e-resize'
										loading='lazy'
										sizes='20vw'
									/>
								</button>
							</div>
						)}
					</div>

					<div className='z-40 lg:hidden flex flex-col gap-16 px-3 pt-[20px]'>
						<div className='h-[300px] flex justify-center'>
							<SanityImage
								key={projeto.gallery[currentImageIndex]?.asset?._id || currentImageIndex}
								image={projeto.gallery[currentImageIndex]}
								preset='singleMain'
								alt={title || ''}
								className='h-full'
								imgClassName='w-full h-full object-cover'
								loading='eager'
								sizes='100vw'
							/>
						</div>

						{nextIndex !== null && (
							<div className='h-[120px] flex justify-center mt-9' onClick={() => setCurrentImageIndex(nextIndex)}>
								<button type='button' className='block h-full text-left opacity-80'>
									<SanityImage image={projeto.gallery[nextIndex]} preset='singleSide' alt='' className='h-full' imgClassName='h-full object-contain opacity-80' loading='lazy' sizes='40vw' />
								</button>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
