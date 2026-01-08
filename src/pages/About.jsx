import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { AnimatedPAfterH1 } from '../components/AnimatedText';
import video from '../assets/studio.mp4';
import bg from '../assets/patricia.jpg';

export function About() {
	const [press, setPress] = useState([]);

	useEffect(() => {
		const fetchPress = async () => {
			try {
				const data = await sanityClient.fetch(
					`*[_type == "press"] | order(year desc) {
            _id,
            title,
            link,
            year,
            placeholderImage
          }`,
				);
				setPress(data);
			} catch (error) {
				console.error('Erro ao buscar Press:', error.message);
			}
		};

		fetchPress();
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
							Texto sobre o projeto Alimento e quem é a Patrícia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores iste fuga veniam itaque! Recusandae cum odit voluptas rerum nobis
							atque quibusdam expedita reiciendis quos possimus dignissimos nisi dolorem, tempora placeat! Optio corrupti laboriosam dignissimos beatae deserunt ad eligendi itaque animi ipsum quis
							vitae esse perferendis dolorum quo provident fuga, expedita id nisi, voluptatem eveniet laudantium tenetur voluptates. Laudantium, doloremque inventore.
							<br />
							<br />
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum eaque suscipit sequi voluptatem nisi, atque nihil iste eius cum natus! Molestiae incidunt dolores non laudantium cumque
							praesentium! Delectus, voluptate adipisci!
						</AnimatedPAfterH1>
					</div>
				</div>
			</div>

			{/* FOOTER */}
			<div className='grid lg:grid-cols-4 gap-x-[100px] pt-[60px] absolute bottom-5 left-5 text-white'>
				<AnimatedPAfterH1 className='col-span-1 font-[500] text-[0.85rem]'>© 2026, Alimento Studio</AnimatedPAfterH1>

				<AnimatedPAfterH1 className='col-span-1 font-[500] text-[0.85rem]'>Projeto Spin-off | Instituto Superior de Agronomia da U.L.</AnimatedPAfterH1>

				<AnimatedPAfterH1 className='col-span-1 font-[500] text-[0.85rem]'>
					Website Design{' '}
					<a href='https://www.diogobrito.xyz' className='underline' target='_blank' rel='noreferrer'>
						Diogo Brito
					</a>
				</AnimatedPAfterH1>
			</div>
		</div>
	);
}
