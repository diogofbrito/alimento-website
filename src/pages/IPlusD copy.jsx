import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { Link } from 'react-router-dom';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { AnimatedH1, AnimatedImage1 } from '../components/AnimatedText';
import { motion } from 'framer-motion';

const IMAGE_SIZES = {
	4: { height: 310, width: '100%' },
	3: { height: 290, width: '100%' },
	2: { height: 450, width: '100%' },
};

export function IPlusD() {
	const [images, setImages] = useState([]);
	const [columns, setColumns] = useState(4); // 4, 3 ou 2 (grid)
	const [isList, setIsList] = useState(false); // lista on/off

	useEffect(() => {
		const fetchImaisd = async () => {
			try {
				const data = await sanityClient.fetch(`
          *[_type == "imaisd"] | order(_createdAt desc) {
            _id,
            title,
            "slug": slug.current,
            year,
            gallery
          }
        `);

				const flattened = data.flatMap(doc =>
					(doc.gallery || []).map(img => ({
						_id: `${doc._id}-${img._key || Math.random()}`,
						image: img,
						slug: doc.slug,
						title: doc.title,
						year: doc.year,
					})),
				);

				setImages(flattened);
			} catch (error) {
				console.error('Erro ao buscar ImaisD:', error.message);
			}
		};

		fetchImaisd();
	}, []);

	const gridColsClass = columns === 4 ? 'grid-cols-4' : columns === 3 ? 'grid-cols-3' : 'grid-cols-2';

	const { height, width } = IMAGE_SIZES[columns];

	return (
		<div className='w-full px-5 pt-13 pb-5'>
			{/* SELECTOR */}
			<div className='fixed bottom-4 left-5 right-5 z-9999 text-right'>
				<div className='inline-flex gap-1 tracking-[0.02em] font-[500] text-[0.9rem]'>
					{/* 4 colunas */}
					<button
						onClick={() => {
							setIsList(false);
							setColumns(4);
						}}
						className={`px-3 py-1 rounded-full transition ${!isList && columns === 4 ? 'underline text-black' : 'text-black/50 hover:text-black'}`}
					>
						4
					</button>

					{/* 3 colunas */}
					<button
						onClick={() => {
							setIsList(false);
							setColumns(3);
						}}
						className={`px-3 py-1 rounded-full transition ${!isList && columns === 3 ? 'underline text-black' : 'text-black/50 hover:text-black'}`}
					>
						3
					</button>

					{/* 2 colunas */}
					<button
						onClick={() => {
							setIsList(false);
							setColumns(2);
						}}
						className={`px-3 py-1 rounded-full transition ${!isList && columns === 2 ? 'underline text-black' : 'text-black/50 hover:text-black'}`}
					>
						2
					</button>

					{/* Lista */}
					<button onClick={() => setIsList(true)} className={`px-3 py-1 rounded-full transition ${isList ? 'underline text-black' : 'text-black/50 hover:text-black'}`}>
						LISTA
					</button>
				</div>
			</div>

			{/* GRID MODES (4 / 3 / 2) – mantém o mesmo efeito suave do teu código antigo */}
			{!isList && (
				<motion.div layout className={`grid ${gridColsClass} gap-x-[100px] gap-y-[60px]`} transition={{ duration: 0.5, ease: 'easeInOut' }}>
					{images.map(item => (
						<motion.div key={item._id} layout>
							<Link className='relative block group w-[85%]' to={`/imaisd/${item.slug}`}>
								<AnimatedImage1 src={urlFor(item.image).width(1000).quality(80).auto('format').url()} alt={item.title} className='object-cover' style={{ height: `${height}px`, width }} />
							</Link>
						</motion.div>
					))}
				</motion.div>
			)}

			{/* LIST MODE – layout separado, sem motion/layout */}
			{isList && (
				<div className='grid grid-cols-4 gap-x-[100px] gap-y-[60px]'>
					{images.map(item => (
						<div key={item._id} className='contents'>
							{/* imagem ocupa 2 colunas */}
							<Link to={`/imaisd/${item.slug}`} className='col-span-2 block w-[40%]'>
								<AnimatedImage1 src={urlFor(item.image).width(1000).quality(80).auto('format').url()} alt={item.title} className='object-cover w-full' style={{ height: '370px' }} />
							</Link>

							{/* título */}
							<div className='flex items-center text-[0.8rem] font-[500] tracking-[0.03em] uppercase'>
								<AnimatedH1>{item.title}</AnimatedH1>
							</div>

							{/* ano */}
							<div className='flex items-center text-[0.8rem] font-[500] tracking-[0.03em] uppercase'>
								<AnimatedH1>{item.year}</AnimatedH1>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
