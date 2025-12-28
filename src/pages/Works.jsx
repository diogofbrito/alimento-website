function useIsDesktop() {
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
		setIsDesktop(mq.matches);

		const handler = e => setIsDesktop(e.matches);
		mq.addEventListener('change', handler);

		return () => mq.removeEventListener('change', handler);
	}, []);

	return isDesktop;
}



import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { Link } from 'react-router-dom';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { AnimatedH1 } from '../components/AnimatedText';
import { motion } from 'framer-motion';

const movingImageVariants = {
	rest: { x: '0%' },
	hover: { x: '100%' },
};

const img1Variants = {
	rest: { opacity: 1 },
	hover: { opacity: 0 },
};

const img2Variants = {
	rest: { opacity: 0 },
	hover: { opacity: 1 },
};

export function Works() {
	const [projetos, setProjetos] = useState([]);
	 const isDesktop = useIsDesktop();

	useEffect(() => {
		const fetchProjetos = async () => {
			try {
				const data = await sanityClient.fetch(
					`*[_type == "projetos"] | order(year desc) {
            _id,
            title,
            "slug": slug.current,
            year,
            subtitle,
			hoverPair,
			"img1": hoverPair[0],
			"img2": hoverPair[1]
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
		<div className='w-full lg:px-5 px-3 pt-[60px] lg:pt-[100px] lg:pb-12 '>
			{/* 6 colunas no total */}
			<div className='grid lg:grid-cols-4 gap-x-[100px] lg:gap-y-[80px] gap-y-[70px]'>
				{projetos.map(item => {
					const img1 = item.img1 ? urlFor(item.img1).width(1000).quality(80).auto('format').url() : null;

					const img2 = isDesktop && item.img2 ? urlFor(item.img2).width(1000).quality(80).auto('format').url() : null;

					return (
						<Link key={item._id} to={`/projetos/${item.slug}`} className='contents'>
							<motion.div className='col-span-2 relative h-[200px] lg:h-[300px]' initial='rest' animate='rest' whileHover={isDesktop ? 'hover' : undefined}>
								<div className='grid grid-cols-2 h-full w-full'>
									<div className='relative h-full w-full flex items-center uppercase opacity-50 text-[0.8rem] font-[500] tracking-[0.03em] '></div>

									<div className='relative h-full w-full' />

									<motion.div className='absolute top-0 left-0 h-full w-1/2 overflow-hidden' variants={movingImageVariants} transition={{ duration: 0.5, ease: 'easeOut' }}>
										<motion.img src={img1} alt={item.title} className='w-full h-full object-cover absolute inset-0' variants={img1Variants} transition={{ duration: 0.5, ease: 'easeOut' }} />
										<motion.img src={img2} alt={item.title} className='w-full h-full object-cover absolute inset-0' variants={img2Variants} transition={{ duration: 0.5, ease: 'easeOut' }} />
									</motion.div>
								</div>

								<div className='lg:mt-2 mt-4 flex justify-between text-[0.85rem]  tracking-[0.03em] uppercase'>
									<div className='lg:max-w-[70%] font-[500] '>
										<AnimatedH1>{item.title}</AnimatedH1>
									</div>
									{item.year && <AnimatedH1>{item.year}</AnimatedH1>}
								</div>
							</motion.div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
