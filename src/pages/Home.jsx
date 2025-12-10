import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import img1 from '/introGalleryImgs/alimentoIntro.jpg';
import img2 from '/introGalleryImgs/alimentoIntro1.jpg';
import img3 from '/introGalleryImgs/alimentoIntro2.jpg';
import img4 from '/introGalleryImgs/alimentoIntro3.jpg';
import img5 from '/introGalleryImgs/alimentoIntro4.jpg';
import img6 from '/introGalleryImgs/alimentoIntro5.jpg';
import img7 from '/introGalleryImgs/alimentoIntro6.webp';
import img8 from '/introGalleryImgs/alimentoIntro7.webp';
import img9 from '/introGalleryImgs/alimentoIntro8.jpg';
import { MenuIntro } from '../components/MenuIntro';

const introImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const DISPLAY_TIME = 5000; 
const FADE_TIME = 2000; 

export function Home() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIndex(prev => (prev + 1) % introImages.length);
		}, DISPLAY_TIME + FADE_TIME);

		return () => clearTimeout(timeout);
	}, [index]);

	return (
		<>
			<MenuIntro />
			<div className='relative w-screen h-screen overflow-hidden'>
				<AnimatePresence mode='popLayout'>
					<motion.img
						key={index}
						src={introImages[index]}
						alt=''
						className='absolute inset-0 w-full h-full object-cover'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: FADE_TIME / 1000,
							ease: 'easeInOut',
						}}
					/>
				</AnimatePresence>
			</div>
		</>
	);
}
