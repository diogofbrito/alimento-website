import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import sanityClient from '../SanityClient';
import { urlFor } from '../utils/imageUrlBuilder';
import { MenuIntro } from '../components/MenuIntro';

const DISPLAY_TIME = 5000;
const FADE_TIME = 2000;

export function Home() {
	const { startHomeCarousel } = useOutletContext();
	const [carouselType, setCarouselType] = useState('carouselHome'); 
	const [images, setImages] = useState([]);
	const [alts, setAlts] = useState([]);
	const [index, setIndex] = useState(0);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia('(min-width: 1024px)');

		const apply = () => {
			setCarouselType(mq.matches ? 'carouselHome' : 'carouselHomeMobile');
		};

		apply();
		mq.addEventListener?.('change', apply);
		return () => mq.removeEventListener?.('change', apply);
	}, []);

	useEffect(() => {
		let cancelled = false;

		const fetchAndPreload = async () => {
			try {
				setIsReady(false);
				setImages([]);
				setAlts([]);
				setIndex(0);

				const query = `
          *[_type == "${carouselType}"][0]{
            images[]{ image, alt }
          }
        `;

				const data = await sanityClient.fetch(query);
				if (cancelled) return;

				if (!data?.images?.length) return;

				const urls = data.images.map(img => urlFor(img.image).auto('format').quality(80).url());

				const altTexts = data.images.map(img => img?.alt || '');

				
				let loadedCount = 0;
				const total = urls.length;

				urls.forEach(src => {
					const img = new Image();
					img.src = src;
					img.onload = img.onerror = () => {
						loadedCount += 1;
						if (loadedCount === total && !cancelled) {
							setImages(urls);
							setAlts(altTexts);
							setIsReady(true);
							setIndex(0); 
						}
					};
				});
			} catch (error) {
				console.error('Erro ao buscar carousel da Home:', error.message);
			}
		};

		fetchAndPreload();
		return () => {
			cancelled = true;
		};
	}, [carouselType]);

	useEffect(() => {
		if (!startHomeCarousel) return;
		if (!isReady || images.length === 0) return;

		const timeout = setTimeout(() => {
			setIndex(prev => (prev + 1) % images.length);
		}, DISPLAY_TIME + FADE_TIME);

		return () => clearTimeout(timeout);
	}, [index, startHomeCarousel, isReady, images]);

	return (
		<>
			<MenuIntro />

			<div className='relative w-screen h-screen overflow-hidden bg-black'>
				<AnimatePresence mode='popLayout'>
					{isReady && images.length > 0 && (
						<motion.img
							key={`${carouselType}-${index}`}
							src={images[index]}
							alt={alts[index] || ''}
							className='absolute inset-0 w-full h-full object-cover pointer-events-none'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: FADE_TIME / 1000, ease: 'easeInOut' }}
						/>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}
