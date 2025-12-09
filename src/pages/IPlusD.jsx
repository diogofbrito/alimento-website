import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { Link } from 'react-router-dom';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { AnimatedH1, AnimatedImage } from '../components/AnimatedText';

export function IPlusD() {
	const [images, setImages] = useState([]);

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

				// Achatar todas as galerias num único array de imagens
				const flattened = data.flatMap(doc =>
					(doc.gallery || []).map(img => ({
						_id: `${doc._id}-${img._key || Math.random()}`, // key única
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

	return (
		<div className='w-full px-5 py-5'>
			<div className='grid grid-cols-4 gap-x-[100px] gap-y-[60px]'>
				{images.map(item => (
					<Link key={item._id} to={`/imaisd/${item.slug}`} className='relative group overflow-hidden block'>
						<AnimatedImage
							src={urlFor(item.image).width(1000).quality(80).auto('format').url()}
							alt={item.title}
							className='w-full h-[240px] object-cover transition-all duration-700 ease-out group-hover:scale-[1.05]'
						/>

						<div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white mix-blend-exclusion opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out'>
							<AnimatedH1 className='font-[500] uppercase tracking-[0.03em] text-sm'>{item.title}</AnimatedH1>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
