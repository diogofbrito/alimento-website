import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { AnimatedPAfterH1 } from '../components/AnimatedText';
import { PortableText } from '@portabletext/react';
import { Paragraph } from '../components/Paragraph';
import bg from '../assets/patricia.jpg';

export function About() {
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
			<div className='pt-[200px] grid lg:grid-cols-4 lg:gap-x-[100px] '>
				<div className='col-span-2 '></div>
				<div className='col-span-2 lg:pl-0 pr-3 lg:pr-5 pl-3'>
					<div>
						<AnimatedPAfterH1 className='font-[500] text-[0.85rem] pb-6 text-white '>Alimento de Patrícia Gabriel</AnimatedPAfterH1>

						<AnimatedPAfterH1 className='tracking-wide leading-[1.3] font-[500] text-[1.2rem] text-white'>
							<PortableText  value={about.content} components={{ block: { normal: Paragraph } }} />
						</AnimatedPAfterH1>
					</div>
				</div>
			</div>

			{/* FOOTER */}
			<div className='grid lg:grid-cols-4 gap-x-[100px] pt-[60px] absolute bottom-4 left-5 right-5 text-white '>
				<AnimatedPAfterH1 className='lg:col-span-1 font-[500] text-[0.85rem]'>© 2026, Alimento Studio</AnimatedPAfterH1>

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
