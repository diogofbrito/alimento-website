import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { urlFor } from '../utils/imageUrlBuilder.js';

export function IPlusD() {
	const [projetos, setProjetos] = useState([]);
	const [hoverIndex, setHoverIndex] = useState(null);

	useEffect(() => {
		const fetchProjetos = async () => {
			try {
				const data = await sanityClient.fetch(
					`*[_type == "projetos"] | order(year desc) {
            _id,
            title,
            "slug": slug.current,
            year,
            placeholderImage
          }`,
				);
				setProjetos(data);
			} catch (error) {
				console.error('Erro ao buscar Projetos:', error.message);
			}
		};

		fetchProjetos();
	}, []);

	return (
		<div className='w-full px-12 grid grid-cols-5 gap-8'>
			{/* Lista de Projetos */}
			<div className='col-span-2 flex flex-col gap-2'>
				{projetos.map((item, index) => (
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
						<Link to={`/projetos/${item.slug}`} className='flex justify-between items-center  uppercase opacity-30 hover:opacity-100 transition-opacity duration-300 ease-in-out epilogueRegular'>
							<span>{item.title}</span>
							<span className='opacity-70'>{item.year}</span>
						</Link>
					</motion.div>
				))}
			</div>

			<div className='col-span-1'></div>

			{/* Imagem Placeholder */}
			<div className='col-span-2 flex items-center justify-center relative'>
				{hoverIndex !== null && projetos[hoverIndex]?.placeholderImage && (
					<motion.img
						key={projetos[hoverIndex]._id}
						src={urlFor(projetos[hoverIndex].placeholderImage).width(1000).quality(80).auto('format').url()}
						alt={projetos[hoverIndex].title}
						className='max-h-[70vh] object-contain'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4, ease: 'easeInOut' }}
					/>
				)}
			</div>
		</div>
	);
}
