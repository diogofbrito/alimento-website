import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { Link } from 'react-router-dom';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { AnimatedH1, AnimatedImage, AnimatedPAfterH1 } from '../components/AnimatedText';

export function LostFound() {
	const [lostFound, setLostFound] = useState([]);

	useEffect(() => {
		const fetchLostFound = async () => {
			try {
				const data = await sanityClient.fetch(
					`*[_type == "lostFound"] | order(year desc) {
            _id,
            title,
            "slug": slug.current,
            year,
            placeholderImage,
          }`,
				);
				setLostFound(data);
			} catch (error) {
				console.error('Erro ao carregar Lost & Found:', error.message);
			}
		};

		fetchLostFound();
	}, []);

	return (
		<div className='w-full min-h-screen px-4 pt-4 pb-14'>
			{/* Grid responsivo */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 '>
				{lostFound.map(item => (
					<Link to={`/lostfound/${item.slug}`} key={item._id} className='group block '>
						{/* Imagem */}
						{item.placeholderImage && (
							<AnimatedImage src={urlFor(item.placeholderImage).width(1000).quality(80).auto('format').url()} alt={item.title} className='w-full object-cover mb-2 pointer-events-none' />
						)}

						{/* Texto */}
						<div className='flex justify-between items-start hover:underline  uppercase'>
							<div>
								<AnimatedH1 className=' uppercase '>{item.title}</AnimatedH1>
							</div>
							<AnimatedPAfterH1 className=' opacity-80 '>{item.year}</AnimatedPAfterH1>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
