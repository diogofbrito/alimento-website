import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { Link } from 'react-router-dom';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { AnimatedH1, AnimatedImage } from '../components/AnimatedText';
import { motion } from 'framer-motion';

const IMAGE_SIZES = {
	4: { height: 220, width: '100%' },
	3: { height: 290, width: '100%' },
	2: { height: 420, width: '100%' },
};

export function IPlusD() {
	const [images, setImages] = useState([]);
	const [columns, setColumns] = useState(4);

	useEffect(() => {
		const fetchImaisd = async () => {
			try {
				const data = await sanityClient.fetch(
					`*[_type == "imaisd"] | order(_createdAt desc) {
            _id,
            title,
            "slug": slug.current,
            year,
            gallery
          }`,
				);

				const flattened = data.flatMap(doc =>
					(doc.gallery || []).map(img => ({
						_id: `${doc._id}-${img._key || Math.random()}`,
						image: img,
						slug: doc.slug,
						title: doc.title,
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
			<div className='fixed bottom-4 left-5 right-5 z-99 mix-blend-difference text-white text-right'>
				<div className='inline-flex gap-1 tracking-[0.02em] font-[500] text-[0.9rem]'>
					{[2, 3, 4].map(n => (
						<button key={n} onClick={() => setColumns(n)} className={`px-3 py-1 rounded-full transition ${columns === n ? 'underline text-black' : 'text-black/50 hover:text-black'}`}>
							{n}
						</button>
					))}
				</div>
			</div>

			<motion.div layout className={`grid ${gridColsClass} gap-x-[100px] gap-y-[60px]`} transition={{ duration: 0.5, ease: 'easeInOut' }}>
				{images.map(item => (
					<motion.div key={item._id} layout>
						<Link className='relative block group w-[60%]' to={`/imaisd/${item.slug}`}>
							<AnimatedImage src={urlFor(item.image).width(1000).quality(80).auto('format').url()} alt={item.title} className='object-cover' style={{ height: `${height}px`, width }} />

							<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none'>
								<AnimatedH1 className='text-base uppercase font-[500] tracking-[0.03em]'>{item.title}</AnimatedH1>
							</div>
						</Link>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
