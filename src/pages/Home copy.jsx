import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundGallery } from '../components/BackgroundGallery';
import bgAlimento from '../assets/Images/sobreAlimento.jpg';
import bgProjetos from '../assets/Images/sobreAlimento.jpg';
import bgID from '../assets/Images/sobreAlimento.jpg';
import bgSobre from '../assets/Images/sobreAlimento.jpg';
import bgPress from '../assets/Images/sobreAlimento.jpg';
import bgContactos from '../assets/Images/sobreAlimento.jpg';

export function HomeCopy() {
	const [hovered, setHovered] = useState(null);

	const bgImages = {
		ALIMENTO: bgAlimento,
		Projetos: bgProjetos,
		'I + D': bgID,
		Sobre: bgSobre,
		Press: bgPress,
		Contactos: bgContactos,
	};

	return (
		<div className='relative w-screen h-screen  overflow-hidden'>
			<BackgroundGallery />

			{/* Background com transição */}
			<AnimatePresence>
				{hovered && (
					<motion.img
						key={hovered}
						src={bgImages[hovered]}
						alt={hovered}
						className='absolute inset-0 w-full h-full object-cover z-0'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.6, ease: 'easeInOut' }}
					/>
				)}
			</AnimatePresence>

			{/* Menu */}
			<div className='relative w-screen h-screen flex gap-4 items-center justify-between px-12 tracking-[0.02em] font-[500] text-[1rem] '>
				{Object.keys(bgImages).map(item => (
					<Link
						key={item}
						to={`/${item.toLowerCase() === 'alimento' ? '' : item.toLowerCase()}`}
						onMouseEnter={() => setHovered(item)}
						onMouseLeave={() => setHovered(null)}
						className=' hover:opacity-100 transition-opacity duration-300'
					>
						{item}
					</Link>
				))}
			</div>
		</div>
	);
}
