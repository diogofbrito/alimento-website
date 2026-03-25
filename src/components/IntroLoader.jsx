import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { h1SlideUp } from './animations/variants.js';
import videoDesktop from '../assets/mao.mp4';
import videoMobile from '../assets/videoIntroAlimento.mp4';

export function IntroLoader({ onFadeStart, onFinish }) {
	const [showTitle, setShowTitle] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [videoSrc, setVideoSrc] = useState(videoDesktop);
	const firedFadeRef = useRef(false);

	useEffect(() => {
		const mq = window.matchMedia('(min-width: 1024px)');
		const apply = () => setVideoSrc(mq.matches ? videoDesktop : videoMobile);
		apply();
		mq.addEventListener?.('change', apply);
		return () => mq.removeEventListener?.('change', apply);
	}, []);

	useEffect(() => {
		const titleTimer = setTimeout(() => setShowTitle(true), 2000);

		const fadeDelay = videoSrc === videoMobile ? 4500 : 8000;

		const fadeStartTimer = setTimeout(() => {
			if (!firedFadeRef.current) {
				firedFadeRef.current = true;
				onFadeStart?.();
			}
			setIsVisible(false);
		}, fadeDelay);

		return () => {
			clearTimeout(titleTimer);
			clearTimeout(fadeStartTimer);
		};
	}, [onFadeStart, videoSrc]);

	const handleSkip = () => {
		if (!firedFadeRef.current) {
			firedFadeRef.current = true;
			onFadeStart?.();
		}
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
							<motion.h1 variants={h1SlideUp} className='inline-block uppercase tracking-[0.62em] font-[500] text-[1.1rem]'>
								Alimento
							</motion.h1>
						</motion.div>
					)}

					<div className='absolute inset-0 z-0 bg-black' />

					<motion.video
						key={videoSrc}
						src={videoSrc}
						autoPlay
						muted
						playsInline
						preload='auto'
						onClick={handleSkip}
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
