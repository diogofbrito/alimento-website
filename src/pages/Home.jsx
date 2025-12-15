import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sanityClient from '../SanityClient';
import { urlFor } from '../utils/imageUrlBuilder';
import { MenuIntro } from '../components/MenuIntro';

const DISPLAY_TIME = 5000; 
const FADE_TIME = 2000; 

export function Home() {
	const [images, setImages] = useState([]); 
	const [index, setIndex] = useState(0);
	const [isReady, setIsReady] = useState(false); 

	useEffect(() => {
		const fetchAndPreload = async () => {
			try {
				const data = await sanityClient.fetch(`
          *[_type == "carouselHome"][0]{
            images[]{
              image,
              alt
            }
          }
        `);

				if (!data?.images || data.images.length === 0) return;

				const urls = data.images.map(img => urlFor(img.image).auto('format').quality(80).url());

				let loadedCount = 0;
				const total = urls.length;

				urls.forEach(src => {
					const img = new Image();
					img.src = src;
					img.onload = img.onerror = () => {
						loadedCount += 1;
						if (loadedCount === total) {
							setImages(urls);
							setIsReady(true);
						}
					};
				});
			} catch (error) {
				console.error('Erro ao buscar carousel da Home:', error.message);
			}
		};

		fetchAndPreload();
	}, []);

	useEffect(() => {
		if (!isReady || images.length === 0) return;

		const timeout = setTimeout(() => {
			setIndex(prev => (prev + 1) % images.length);
		}, DISPLAY_TIME + FADE_TIME);

		return () => clearTimeout(timeout);
	}, [index, isReady, images]);

	return (
		<>
			<MenuIntro />

			<div className='relative w-screen h-screen overflow-hidden bg-black'>
				<AnimatePresence mode='popLayout'>
					{isReady && images.length > 0 && (
						<motion.img
							key={index}
							src={images[index]}
							alt=''
							className='absolute inset-0 w-full h-full object-cover pointer-events-none'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{
								duration: FADE_TIME / 1000,
								ease: 'easeInOut',
							}}
						/>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}
