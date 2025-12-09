import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { motion } from 'framer-motion';
import { HeaderAbout } from '../components/HeaderAbout.jsx';
import { urlFor } from '../utils/imageUrlBuilder.js';

export function Press() {
	const [press, setPress] = useState([]);
	const [hoverIndex, setHoverIndex] = useState(null);

	useEffect(() => {
		const fetchPress = async () => {
			try {
				const data = await sanityClient.fetch(
					`*[_type == "press"] | order(year desc) {
            _id,
            title,
            link,
            year,
            placeholderImage
          }`,
				);
				setPress(data);
			} catch (error) {
				console.error('Erro ao buscar Press:', error.message);
			}
		};

		fetchPress();
	}, []);

	return (
		<>
			<HeaderAbout />
			<div className='px-5 pt-16  grid grid-cols-4 gap-x-[50px]'>
				{/* Lista de Projetos */}
				<div className='col-span-2  flex flex-col gap-1 '>
					{press.map((item, index) => (
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
							<a href={item.link} target='_blank' className='flex justify-between items-center  text-lg tracking-[0.02em] hover:opacity-60 transition-opacity duration-300 ease-in-out '>
								<span className='font-[500]'>{item.title}</span>
								<span className='font-[400]'>{item.year}</span>
							</a>
						</motion.div>
					))}
				</div>


				<div className='col-span-2  flex items-center justify-end relative'>
					{hoverIndex !== null && press[hoverIndex]?.placeholderImage && (
						<motion.img
							key={press[hoverIndex]._id}
							src={urlFor(press[hoverIndex].placeholderImage).width(1000).quality(80).auto('format').url()}
							alt={press[hoverIndex].title}
							className='max-h-[70vh] object-contain'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.4, ease: 'easeInOut' }}
						/>
					)}
				</div>
			</div>
		</>
	);
}
