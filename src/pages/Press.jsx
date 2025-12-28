import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { motion } from 'framer-motion';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { AnimatedImage1 } from '../components/AnimatedText';

export function Press() {
	const [press, setPress] = useState([]);
	const [hoverIndex, setHoverIndex] = useState(null);

	useEffect(() => {
		const fetchPress = async () => {
			try {
				const data = await sanityClient.fetch(`
          *[_type == "press"] | order(year desc) {
            _id,
            title,
            year,
            link,
            "pdfUrl": pdf.asset->url,
            placeholderImage
          }
        `);
				setPress(data);
			} catch (error) {
				console.error('Erro ao buscar Press:', error.message);
			}
		};

		fetchPress();
	}, []);

	return (
		<>
			<div className='px-3 lg:px-5 pt-[100px] lg:pb-13 lg:grid lg:grid-cols-2 gap-x-[100px]'>
				{press.map((item, index) => {
					const href = item.pdfUrl || item.link;

					return (
						<motion.div
							key={item._id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								ease: 'easeInOut',
								delay: index * 0.05,
							}}
							onMouseEnter={() => setHoverIndex(index)}
							onMouseLeave={() => setHoverIndex(null)}
						>
							{href ? (
								<a
									href={href}
									target='_blank'
									rel='noopener noreferrer'
									className='flex justify-between items-center text-[0.9rem] tracking-[0.03em] hover:underline transition-opacity duration-300 ease-in-out'
								>
									<span className='font-[500] uppercase'>{item.title}</span>
									<span className='font-[400]'>{item.year}</span>
								</a>
							) : (
								<div className='flex justify-between items-center text-[0.9rem] opacity-40 tracking-[0.03em]'>
									<span className='font-[500] uppercase'>{item.title}</span>
									<span className='font-[400]'>{item.year}</span>
								</div>
							)}
						</motion.div>
					);
				})}
			</div>

			{/* PREVIEW FIXO */}
			{hoverIndex !== null && press[hoverIndex]?.placeholderImage && (
				<AnimatedImage1
					key={press[hoverIndex]._id}
					src={urlFor(press[hoverIndex].placeholderImage).width(420).quality(80).auto('format').url()}
					alt=''
					className='hidden md:block fixed -z-2 pointer-events-none'
					style={{
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					}}
				/>
			)}
		</>
	);
}
