import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { Link } from 'react-router-dom';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { AnimatedH1, AnimatedImage, AnimatedPAfterH1 } from '../components/AnimatedText';
import Masonry from 'react-masonry-css';


export function Works() {
	const [projetos, setProjetos] = useState([]);

	const breakpointColumnsObj = {
		default: 2,
	
		500: 1,
	};

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
		<div className='w-full  px-12 '>
			<Masonry breakpointCols={breakpointColumnsObj} className='flex gap-12' columnClassName='masonry-column'>
				{projetos.map((item, index) => (
					<div key={item._id} className='mb-12'>
						{' '}
						<Link to={`/projetos/${item.slug}`} className='group block'>
							{item.placeholderImage && (
								<AnimatedImage
									src={urlFor(item.placeholderImage).width(1000).quality(80).auto('format').url()}
									alt={item.title}
									className='object-cover mb-2 pointer-events-none  transition-transform duration-500 ease-out group-hover:scale-101'
								/>
							)}
							<div className='flex justify-between items-start text-lg tracking-[0.02em] '>
								<AnimatedH1 className='font-[500] uppercase'>{item.title}</AnimatedH1>
								<AnimatedPAfterH1 className='font-[400]'>{item.year}</AnimatedPAfterH1>
							</div>
						</Link>
					</div>
				))}
			</Masonry>
		</div>
	);
}
