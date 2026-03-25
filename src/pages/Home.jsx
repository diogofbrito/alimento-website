import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import sanityClient from '../SanityClient';
import { imageUrl } from '../utils/sanity.image';
import { HOME_DESKTOP_QUERY, HOME_MOBILE_QUERY } from '../lib/sanity.queries';
import { MenuIntro } from '../components/MenuIntro';

const DISPLAY_TIME = 2000;
const FADE_TIME = 2000;

export function Home() {
	const { startHomeCarousel } = useOutletContext();

	const [isDesktop, setIsDesktop] = useState(true);
	const [images, setImages] = useState([]);
	const [index, setIndex] = useState(0);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia('(min-width: 1024px)');

		const apply = () => {
			setIsDesktop(mq.matches);
		};

		apply();
		mq.addEventListener?.('change', apply);

		return () => mq.removeEventListener?.('change', apply);
	}, []);

	useEffect(() => {
		let cancelled = false;

		const fetchCarousel = async () => {
			try {
				setIsReady(false);
				setImages([]);
				setIndex(0);

				const query = isDesktop ? HOME_DESKTOP_QUERY : HOME_MOBILE_QUERY;
				const data = await sanityClient.fetch(query);

				if (cancelled) return;

				const list =
					(data?.images || [])
						.map(item => {
							const image = item?.image;
							const src = imageUrl(image, 'home');

							if (!src) return null;

							return {
								src,
								alt: item?.alt || '',
							};
						})
						.filter(Boolean) || [];

				if (!list.length) return;

				const firstImage = new Image();
				firstImage.src = list[0].src;

				firstImage.onload = () => {
					if (cancelled) return;

					setImages(list);
					setIndex(0);
					setIsReady(true);

					list.slice(1).forEach(item => {
						const img = new Image();
						img.src = item.src;
					});
				};

				firstImage.onerror = () => {
					if (cancelled) return;

					setImages(list);
					setIndex(0);
					setIsReady(true);
				};
			} catch (error) {
				console.error('Erro ao buscar carousel da Home:', error.message);
			}
		};

		fetchCarousel();

		return () => {
			cancelled = true;
		};
	}, [isDesktop]);

	useEffect(() => {
		if (!startHomeCarousel) return;
		if (!isReady || images.length <= 1) return;

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
							key={`${isDesktop ? 'desktop' : 'mobile'}-${index}`}
							src={images[index].src}
							alt={images[index].alt || ''}
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
