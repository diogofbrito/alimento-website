import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { h1SlideUp } from './animations/variants.js';
import videoFile from '../assets/introAlimento.mp4';

export function IntroLoader({ onFinish }) {
	const [showTitle, setShowTitle] = useState(false);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		// Mostrar título aos 2s
		const titleTimer = setTimeout(() => {
			setShowTitle(true);
		}, 2000);

		// Iniciar fade-out aos 5s
		const fadeOutTimer = setTimeout(() => {
			setIsVisible(false);
		}, 5000);

		return () => {
			clearTimeout(titleTimer);
			clearTimeout(fadeOutTimer);
		};
	}, []);

	return (
		<AnimatePresence onExitComplete={onFinish}>
			{isVisible && (
				<motion.div className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden' initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}>
					<div className='absolute inset-0  z-0' />

					{/* Vídeo de fundo */}
					<motion.video
						src={videoFile}
						autoPlay
						muted
						playsInline
						className='absolute inset-0 w-full h-full object-cover z-10'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
