import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { motion } from 'framer-motion';
import { PRESS_QUERY } from '../lib/sanity.queries';
import { SanityImage } from '../components/SanityImage.jsx';

export function Press() {
	const [press, setPress] = useState([]);
	const [hoverIndex, setHoverIndex] = useState(null);
	const [hoverPos, setHoverPos] = useState({ top: 0, left: 0 });

	useEffect(() => {
		const fetchPress = async () => {
			try {
				const data = await sanityClient.fetch(PRESS_QUERY);
				setPress(data || []);
			} catch (error) {
				console.error('Erro ao buscar Press:', error.message);
			}
		};

		fetchPress();
	}, []);

	return (
		<>
			<div className='px-3 lg:px-5 pt-[70px] lg:pt-[100px] lg:pb-5 lg:grid lg:grid-cols-2 lg:gap-x-[100px]'>
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
							className='py-1.5 border-b border-dashed border-black/100 '
							onMouseEnter={e => {
								const rect = e.currentTarget.getBoundingClientRect();
								setHoverIndex(index);
								setHoverPos({
									top: rect.bottom + 10,
									left: rect.left,
								});
							}}
							onMouseLeave={() => setHoverIndex(null)}
						>
							{href ? (
								<a
									href={href}
									target='_blank'
									rel='noopener noreferrer'
									className='flex justify-between gap-12 lg:gap-0 lg:items-center text-[0.85rem] tracking-[0.03em] hover:underline transition-opacity duration-300 ease-in-out'
								>
									<span className='font-[500] uppercase'>{item.title}</span>
									<span className='font-[400]'>{item.year}</span>
								</a>
							) : (
								<div className='flex justify-between gap-12 lg:gap-0 lg:items-center text-[0.85rem] opacity-40 tracking-[0.03em]'>
									<span className='font-[500] uppercase'>{item.title}</span>
									<span className='font-[400]'>{item.year}</span>
								</div>
							)}
						</motion.div>
					);
				})}
			</div>


			{hoverIndex !== null && press[hoverIndex]?.placeholderImage && (
				<div
					className='hidden md:block fixed -z-2 pointer-events-none'
					style={{
						top: hoverPos.top,
						left: hoverPos.left,
					}}
				>
					<SanityImage image={press[hoverIndex].placeholderImage} preset='pressThumb' alt='' className='w-[300px]' imgClassName='w-full h-auto object-cover' loading='eager' sizes='300px' />
				</div>
			)}
		</>
	);
}
