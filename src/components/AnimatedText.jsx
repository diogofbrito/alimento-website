import { motion } from 'framer-motion';
import { h1SlideUp, pFadeIn, pFadeInAfterH1 } from './animations/variants.js';

export function AnimatedH1({ children, className = '' }) {
	return (
		<motion.div className={`overflow-hidden inline-block ${className}`} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.2 }}>
			<motion.h1 variants={h1SlideUp} className='inline-block will-change-transform '  transition={{ duration: 0.3, ease: 'easeInOut' }}>
				{children}
			</motion.h1>
		</motion.div>
	);
}

export function AnimatedButton({ children, onClick, className = '' }) {
	return (
		<motion.div className={`overflow-hidden inline-block ${className}`} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.2 }}>
			<motion.button onClick={onClick} variants={h1SlideUp} whileHover={{ opacity: 0.6 }} className='inline-block will-change-transform cursor-pointer '>
				{children}
			</motion.button>
		</motion.div>
	);
}

export function AnimatedP({ children, className = '' }) {
	return (
		<motion.p variants={pFadeIn} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.2 }} className={className}>
			{children}
		</motion.p>
	);
}

export function AnimatedPAfterH1({ children, className = '' }) {
	return (
		<motion.p variants={pFadeInAfterH1} initial='hidden' whileInView='show'  viewport={{ once: true, amount: 0.2 }} className={className}>
			{children}
		</motion.p>
	);
}

export function AnimatedImage({ src, alt, className = '', style={}, onClick }) {
	return (
		<motion.img
			src={src}
			alt={alt}
			className={className}
			onClick={onClick}
			style={style}
			variants={pFadeIn}
			initial='hidden'
			whileInView='show'
			whileHover={{ opacity: 0.25, scale: 1.05 }}
			transition={{ duration: 0.5, ease: 'easeOut' }} // 👈 hover aqui
			viewport={{ once: true, amount: 0.2 }}
		/>
	);
}

export function AnimatedImage1({ src, alt, className = '', onClick }) {
	return (
		<motion.img
			src={src}
			alt={alt}
			className={className}
			onClick={onClick}
			variants={pFadeIn}
			initial='hidden'
			whileInView='show'
			viewport={{ once: true, amount: 0.2 }}
		/>
	);
}
