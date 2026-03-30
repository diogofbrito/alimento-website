import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { h1SlideUp } from './animations/variants.js';

import videoDesktop from '../assets/mao1-web.mp4';
import videoMobile from '../assets/videoIntroAlimento-web.mp4';
import posterDesktop from '../assets/mao1-poster.jpg';
import posterMobile from '../assets/videoIntroAlimento-poster.jpg';

export function IntroLoader({ onFadeStart, onFinish }) {
	const [showTitle, setShowTitle] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [isDesktop, setIsDesktop] = useState(true);
	const [videoReady, setVideoReady] = useState(false);

	const videoRef = useRef(null);
	const firedFadeRef = useRef(false);

	const videoSrc = isDesktop ? videoDesktop : videoMobile;
	const posterSrc = isDesktop ? posterDesktop : posterMobile;
	const fadeDelay = isDesktop ? 7000 : 4200;

	useEffect(() => {
		const mq = window.matchMedia('(min-width: 1024px)');

		const apply = () => {
			setIsDesktop(mq.matches);
			setVideoReady(false);
		};

		apply();
		mq.addEventListener?.('change', apply);

		return () => mq.removeEventListener?.('change', apply);
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const tryPlay = async () => {
			try {
				video.muted = true;
				video.defaultMuted = true;
				video.playsInline = true;
				video.setAttribute('muted', '');
				video.setAttribute('playsinline', '');
				video.setAttribute('webkit-playsinline', '');

				await video.play();
			} catch (error) {
				console.warn('Autoplay falhou, poster visível até haver interação.', error);
			}
		};

		tryPlay();
	}, [videoSrc]);

	useEffect(() => {
		const titleTimer = setTimeout(() => setShowTitle(true), 2000);

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
	}, [fadeDelay, onFadeStart]);

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
				<motion.div
					className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black'
					initial={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
				>
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
						ref={videoRef}
						key={videoSrc}
						src={videoSrc}
						poster={posterSrc}
						autoPlay
						muted
						playsInline
						preload='auto'
						onClick={handleSkip}
						onLoadedData={() => setVideoReady(true)}
						onCanPlay={() => setVideoReady(true)}
						className='absolute inset-0 w-full h-full object-cover z-10'
						initial={{ opacity: 0 }}
						animate={{ opacity: videoReady ? 1 : 0 }}
						exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
						transition={{ duration: 0.6, ease: 'easeOut' }}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
