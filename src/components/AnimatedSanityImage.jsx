import { motion } from 'framer-motion';
import { pFadeInAfterH1 } from './animations/variants.js';
import { SanityImage } from './SanityImage';

export function AnimatedSanityImage({
	image,
	preset = 'workCard',
	alt = '',
	className = '',
	imgClassName = '',
	loading = 'lazy',
	decoding = 'async',
	fetchPriority = 'auto',
	onClick,
	sizes,
	viewport = { once: true, amount: 0.15 },
}) {
	return (
		<motion.div variants={pFadeInAfterH1} initial='hidden' whileInView='show' viewport={viewport}>
			<SanityImage
				image={image}
				preset={preset}
				alt={alt}
				className={className}
				imgClassName={imgClassName}
				loading={loading}
				decoding={decoding}
				fetchPriority={fetchPriority}
				onClick={onClick}
				sizes={sizes}
			/>
		</motion.div>
	);
}
