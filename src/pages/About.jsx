import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { AnimatedPAfterH1, AnimatedH1 } from '../components/AnimatedText';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../components/Paragraph';
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
		<div>
			{/* HERO */}
			<div className=' grid lg:grid-cols-4 lg:gap-x-[100px] '>
				<div className=' block col-span-2'>
					<div className='lg:sticky top-0 lg:h-screen h-[50vh] bg-cover  bg-no-repeat' style={{ backgroundImage: `url(${bg})` }} />
				</div>

				<div className='pt-[40px] lg:pt-[100px] col-span-2 lg:pl-0 px-3'>
					<div className='lg:pr-[100px]'>
						<AnimatedPAfterH1 className='tracking-wide leading-[1.3] font-[500] text-[1.2rem] text-black '>
							<PortableText value={about.content} components={portableTextComponents} />
						</AnimatedPAfterH1>
					</div>
					<div className='grid grid-cols-2 lg:gap-x-[100px] '>
						<div className='col-span-1 mt-[60px] flex flex-col'>
							<AnimatedH1 className='font-[500] text-[0.85rem] '>Informações</AnimatedH1>
							<AnimatedPAfterH1 className=''>Para marcações ou workshops contactar bla bla... Lorem</AnimatedPAfterH1>
						</div>
						<div className='col-span-1 mt-[60px] flex flex-col'>
							<AnimatedH1 className='font-[500] text-[0.85rem] '>Contactos</AnimatedH1>
							<AnimatedPAfterH1 className=''>E-mail</AnimatedPAfterH1>
							<AnimatedPAfterH1 className=''>Instagram</AnimatedPAfterH1>
						</div>
					</div>
				</div>
			</div>

			{/* FOOTER */}
			<div className='grid grid-cols-2 md:grid-cols-4 align-bottom items-baseline gap-x-[100px] pt-[60px] lg:fixed lg:bottom-4 lg:left-5 lg:right-5 '>
				<AnimatedPAfterH1 className='hidden lg:block text-white mix-blend-difference lg:col-span-2 font-[500] text-[0.85rem]'>ALIMENTO © 2026</AnimatedPAfterH1>

				<AnimatedPAfterH1 className='lg:col-span-1 font-[500] text-[0.85rem]'>
					<img src='/logo.webp' alt='logo ' className='w-[120px] pointer-events-none' />
				</AnimatedPAfterH1>

				<AnimatedPAfterH1 className='lg:col-span-1 font-[500] text-[0.85rem]'>
					Website{' '}
					<a href='https://www.diogobrito.xyz' className='underline' target='_blank' rel='noreferrer'>
						Diogo Brito
					</a>
				</AnimatedPAfterH1>
			</div>
		</div>
	);
}
