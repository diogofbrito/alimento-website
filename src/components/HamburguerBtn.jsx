import { motion } from 'framer-motion';

export function HamburgerButton({ isOpen, toggle }) {
	return (
		<button onClick={toggle} aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={isOpen} className='relative w-8 h-8 '>
			{/* linha de cima */}
			<motion.span
				className='absolute left-1/2 top-1/2 h-[1px] w-6 bg-current -translate-x-1/2 -translate-y-1/2'
				animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
				transition={{ duration: 0.35, ease: 'easeInOut' }}
			/>

			{/* linha de baixo */}
			<motion.span
				className='absolute left-1/2 top-1/2 h-[1px] w-6 bg-current -translate-x-1/2 -translate-y-1/2'
				animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
				transition={{ duration: 0.35, ease: 'easeInOut' }}
			/>
		</button>
	);
}
