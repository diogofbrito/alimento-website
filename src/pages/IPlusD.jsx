import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { Link } from 'react-router-dom';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { AnimatedH1, AnimatedPAfterH1 } from '../components/AnimatedText';

export function IPlusD() {
	const [imaisd, setImaisd] = useState([]);

	useEffect(() => {
		const fetchImaisd = async () => {
			try {
				const data = await sanityClient.fetch(
					`*[_type == "imaisd"] | order(year desc) {
						_id,
						title,
						"slug": slug.current,
						year,
						placeholderImage
					}`,
				);
				setImaisd(data);
			} catch (error) {
				console.error('Erro ao buscar ImaisD:', error.message);
			}
		};

		fetchImaisd();
	}, []);

	return (
		<div className='w-full px-12 pb-12'>
			<div className='grid grid-cols-3 gap-[100px]'>
				{imaisd.map(item => (
					<div key={item._id} className='relative group overflow-hidden'>
						<Link to={`/imaisd/${item.slug}`} className='block relative'>
							{item.placeholderImage && (
								<img
									src={urlFor(item.placeholderImage).width(1000).quality(80).auto('format').url()}
									alt={item.title}
									className='w-full h-[300px] object-cover transition-all duration-700 ease-out group-hover:opacity-20 group-hover:scale-[1.05]'
								/>
							)}

							<div className='absolute inset-0 flex flex-col items-center justify-center text-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out'>
								<AnimatedH1 className='font-[500] uppercase tracking-[0.03em] text-lg'>{item.title}</AnimatedH1>
								<AnimatedPAfterH1 className='font-[400] text-base mt-1'>{item.year}</AnimatedPAfterH1>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
