import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// importa as tuas imagens
import img1 from '/introGalleryImgs/alimentoIntro.jpg';
import img2 from '/introGalleryImgs/alimentoIntro1.jpg';
import img3 from '/introGalleryImgs/alimentoIntro2.jpg';
import img4 from '/introGalleryImgs/alimentoIntro3.jpg';
import img5 from '/introGalleryImgs/alimentoIntro4.jpg';
import img6 from '/introGalleryImgs/alimentoIntro5.jpg';
import img7 from '/introGalleryImgs/alimentoIntro6.webp';
import img8 from '/introGalleryImgs/alimentoIntro7.webp';
import img9 from '/introGalleryImgs/alimentoIntro8.jpg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

export function BackgroundGallery() {
	const [index, setIndex] = useState(0);
	const [current, setCurrent] = useState(null);

	useEffect(() => {
		let timeout;

		const showNext = () => {
			const img = images[index % images.length];

			// posição aleatória (não ultrapassa 80% da tela)
			const randomTop = Math.random() * 80;
			const randomLeft = Math.random() * 80;

			// tamanho aleatório entre 30vw–50vw e 30vh–50vh
			const randomSize = 30 + Math.random() * 20; // 30–50

			setCurrent({
				src: img,
				top: `${randomTop}%`,
				left: `${randomLeft}%`,
				maxSize: randomSize,
			});

			// próxima imagem após 7s
			timeout = setTimeout(() => {
				setIndex(prev => (prev + 1) % images.length);
			}, 7000);
		};

		showNext();

		return () => clearTimeout(timeout);
	}, [index]);

	return (
		<div className='fixed inset-0 pointer-events-none overflow-hidden z-0'>
			<AnimatePresence mode='wait'>
				{current && (
					<motion.img
						key={index}
						src={current.src}
						alt=''
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 2, ease: 'easeInOut' }}
						style={{
							position: 'absolute',
							top: current.top,
							left: current.left,
							width: 'auto',
							height: 'auto',
							maxWidth: `${current.maxSize}vw`,
							maxHeight: `${current.maxSize}vh`,
							objectFit: 'contain',
						}}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
