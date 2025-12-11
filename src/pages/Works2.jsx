import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { Link } from 'react-router-dom';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { AnimatedH1, AnimatedPAfterH1, AnimatedImage } from '../components/AnimatedText';

export function Works2() {
	const [projetos, setProjetos] = useState([]);

	useEffect(() => {
		const fetchProjetos = async () => {
			try {
				const data = await sanityClient.fetch(
					`*[_type == "projetos"] | order(year desc) {
            _id,
            title,
            "slug": slug.current,
            year,
            placeholderImage,
            subtitle
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
		<div className='w-full px-5 py-13'>
			<div className='grid grid-cols-2 gap-x-[100px] gap-y-[60px]'>
				{projetos.map(item => (
					<div key={item._id} className='relative group overflow-hidden'>
						<Link to={`/projetos/${item.slug}`} className='block relative'>
							{/* Imagem */}
							{item.placeholderImage && <AnimatedImage src={urlFor(item.placeholderImage).width(1000).quality(80).auto('format').url()} alt={item.title} className='w-full h-[500px] object-cover  ' />}

							<div className='absolute inset-0 flex flex-col items-center justify-center text-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none'>
								<AnimatedH1 className='font-[500] uppercase tracking-[0.03em] text-base'>{item.title}</AnimatedH1>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
