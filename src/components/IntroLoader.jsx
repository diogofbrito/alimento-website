import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import videoFile from '../assets/introAlimento.mp4';
import {  AnimatedButton } from './AnimatedText';



export function IntroLoader({ onFinish }) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		// Iniciar fade-out aos 5s (caso o user não clique em skip)
		const fadeOutTimer = setTimeout(() => {
			setIsVisible(false);
		}, 5000);

		return () => {
			clearTimeout(fadeOutTimer);
		};
	}, []);

	const handleSkip = () => {
		setIsVisible(false); // dispara o exit → fade-out → onFinish no App
	};

	return (
		<AnimatePresence onExitComplete={onFinish}>
			{isVisible && (
				<motion.div className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden' initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}>
					{/* Fundo */}
					<div className='absolute inset-0 z-0 bg-black' />

					{/* Vídeo de fundo */}
					<motion.video
						src={videoFile}
						autoPlay
						onClick={handleSkip}
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
