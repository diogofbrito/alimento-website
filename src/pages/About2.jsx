import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { AnimatedPAfterH1, AnimatedH1 } from '../components/AnimatedText';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '../components/Paragraph';
import bg from '../assets/patricia1.jpg';
import spin from '../assets/logo_bw.png';

export function About2() {
	const [about, setAbout] = useState([]);
	const [mobileOverlayOpacity, setMobileOverlayOpacity] = useState(0);

	useEffect(() => {
		const fetchAbout = async () => {
			try {
				const data = await sanityClient.fetch(
					`*[_type == "about"][0]{
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

	useEffect(() => {
		const handleScroll = () => {
			if (window.innerWidth >= 1024) return;

			const maxDarkness = 0.5; // 40%
			const fadeDistance = window.innerHeight * 0.5; // 50vh
			const progress = Math.min(window.scrollY / fadeDistance, 1);

			setMobileOverlayOpacity(progress * maxDarkness);
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, []);

	return (
		<>
			{/* DESKTOP */}
			<div className='relative hidden lg:block h-screen bg-cover bg-center bg-fixed'>
				<div
					className='fixed inset-0 bg-cover -z-10'
					style={{
						backgroundImage: `url(${bg})`,
					}}
				/>

				<div className='pt-[210px] pb-4 grid lg:grid-cols-4 lg:gap-x-[100px]'>
					<div className='col-span-2' />

					<div className='col-span-2 pr-3 2xl:pr-[150px] lg:pr-3 '>
						<div>
							<AnimatedPAfterH1 className='tracking-wide leading-[1.3] text-white lg:pt-[1rem]'>
								<PortableText value={about.content} components={portableTextComponents} />
							</AnimatedPAfterH1>
						</div>

						<div className='mt-[40px] flex flex-col text-white'>
							<AnimatedH1 className='font-[500] text-[0.85rem]'>Contactos</AnimatedH1>
							<AnimatedPAfterH1>
								<a href='mailto:hello@alimento.studio' className='underline transition hover:opacity-60'>
									E-mail
								</a>
							</AnimatedPAfterH1>
							<AnimatedPAfterH1>
								<a href='https://www.instagram.com/alimento_______/' className='underline transition hover:opacity-60' target='_blank' rel='noreferrer'>
									Instagram
								</a>
							</AnimatedPAfterH1>

							<div className=' pt-6 '>
								<AnimatedPAfterH1>
									<img src={spin} className='w-[100px] pointer-events-none pb-4' alt='Spin-off logo' />
								</AnimatedPAfterH1>

								<div className='flex flex-col pt-3'>
									<AnimatedH1 className='font-[500] text-[0.85rem]'>Website</AnimatedH1>
									<AnimatedPAfterH1>
										<a href='https://www.diogobrito.xyz' className='underline transition hover:opacity-60' target='_blank' rel='noreferrer'>
											Diogo Brito
										</a>
									</AnimatedPAfterH1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* MOBILE */}
			<div className='lg:hidden relative'>
				<div
					className='fixed inset-0 bg-cover -z-10'
					style={{
						backgroundImage: `url(${bg})`,
						backgroundPosition: '12% center',
					}}
				/>

				<div
					className='fixed inset-0 bg-black pointer-events-none -z-10'
					style={{
						opacity: mobileOverlayOpacity,
					}}
				/>

				<div className='h-[70vh]' />

				<div className='relative z-10  '>
					<div className='text-white p-3'>
						<AnimatedPAfterH1 className='tracking-wide leading-[1.3]'>
							<PortableText value={about.content} components={portableTextComponents} />
						</AnimatedPAfterH1>

						<div className='mt-[40px] flex flex-col'>
							<AnimatedH1 className='font-[500] text-[0.85rem]'>Contactos</AnimatedH1>

							<AnimatedPAfterH1>
								<a href='mailto:hello@alimento.studio' className='underline transition hover:opacity-60'>
									E-mail
								</a>
							</AnimatedPAfterH1>

							<AnimatedPAfterH1>
								<a href='https://www.instagram.com/___alimento___' className='underline transition hover:opacity-60' target='_blank' rel='noreferrer'>
									Instagram
								</a>
							</AnimatedPAfterH1>
						</div>

						<div className=' pt-6 '>
							<AnimatedPAfterH1>
								<img src={spin} className='w-[100px] pointer-events-none pb-4' alt='Spin-off logo' />
							</AnimatedPAfterH1>

							<div className='flex flex-col pt-3'>
								<AnimatedH1 className='font-[500] text-[0.85rem]'>Website</AnimatedH1>
								<AnimatedPAfterH1>
									<a href='https://www.diogobrito.xyz' className='underline transition hover:opacity-60' target='_blank' rel='noreferrer'>
										Diogo Brito
									</a>
								</AnimatedPAfterH1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
