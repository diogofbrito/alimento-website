import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { AnimatedPAfterH1, AnimatedH1 } from '../components/AnimatedText';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../components/Paragraph';
import bg from '../assets/patricia1.jpg';

export function About2() {
	const [about, setAbout] = useState([]);

	useEffect(() => {
		const fetchAbout = async () => {
			try {
				const data = await sanityClient.fetch(
					`*[_type == "about"] [0] {
           content
          }`,
				);
				setAbout(data);
			} catch (error) {
				console.error('Erro ao buscar About:', error.message);
			}
		};

		fetchAbout();
	}, []);

	return (
		/* BACKGROUND FIXO */
		<div className='relative h-screen bg-cover bg-center lg:bg-fixed' style={{ backgroundImage: `url(${bg})` }}>
			{/* HERO */}
			<div className='pt-[300px] grid lg:grid-cols-4 lg:gap-x-[100px] '>
				<div className='col-span-2 '></div>
				<div className='col-span-2 lg:pl-0 pr-3 lg:lg:pr-[100px] '>
					<div>
						<AnimatedPAfterH1 className='tracking-wide leading-[1.3]   text-white'>
							<PortableText value={about.content} components={portableTextComponents} />
						</AnimatedPAfterH1>
					</div>

						<div className='mt-[40px] flex flex-col text-white'>
							<AnimatedH1 className='font-[500] text-[0.85rem]'>Contactos</AnimatedH1>
							<AnimatedPAfterH1>E-mail</AnimatedPAfterH1>
							<AnimatedPAfterH1>Instagram</AnimatedPAfterH1>
						</div>
					
				</div>
			</div>

			{/* FOOTER */}
			<div className='grid lg:grid-cols-4 gap-x-[100px] pt-[60px] absolute bottom-4 left-5 right-5 text-white '>
				<AnimatedPAfterH1 className='lg:col-span-1 font-[500] text-[0.85rem]'>© ALIMENTO 2026 </AnimatedPAfterH1>

				<AnimatedPAfterH1 className='lg:col-span-2 font-[500] text-[0.85rem]'>Projeto Spin-off | Instituto Superior de Agronomia da U.L.</AnimatedPAfterH1>

				<AnimatedPAfterH1 className='lg:col-span-1 font-[500] text-[0.85rem]'>
					Website Design{' '}
					<a href='https://www.diogobrito.xyz' className='underline' target='_blank' rel='noreferrer'>
						Diogo Brito
					</a>
				</AnimatedPAfterH1>
			</div>
		</div>
	);
}
