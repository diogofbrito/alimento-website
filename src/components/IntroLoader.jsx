import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { h1SlideUp } from './animations/variants.js';
import videoFile from '../assets/videoIntroAlimento.mp4';

export function IntroLoader({ onFinish }) {
	const [showTitle, setShowTitle] = useState(false);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const titleFramer = setTimeout(() => {
			setShowTitle(true);
		}, 2000);

		const fadeOutTimer = setTimeout(() => {
			setIsVisible(false);
		}, 10000);

		return () => {
			clearTimeout(titleFramer);
			clearTimeout(fadeOutTimer);
		};
	}, []);

	const handleSkip = () => {
		setIsVisible(false);
	};

	return (
		<AnimatePresence onExitComplete={onFinish}>
			{isVisible && (
				<motion.div className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden' initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}>
					{showTitle && (
						<motion.div
							className='overflow-hidden inline-block z-20 text-white mix-blend-difference'
							initial='hidden'
							animate='show'
							exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
						>
							<motion.h1 variants={h1SlideUp} className='inline-block will-change-transform  uppercase tracking-[0.02em] font-[500] text-[0.9rem]  '>
								Alimento
							</motion.h1>
						</motion.div>
					)}

					<div className='absolute inset-0 z-0 bg-black' />

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
