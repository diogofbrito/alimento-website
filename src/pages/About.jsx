import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { AnimatedH1, AnimatedPAfterH1, AnimatedImage1 } from '../components/AnimatedText';
import video from '../assets/studio.mp4';
import bg from '../assets/patricia.jpg';

export function About() {
	const [press, setPress] = useState([]);
	const [hoverIndex, setHoverIndex] = useState(null);

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
		<div className='lg:px-5 lg:pb-5 px-3 pb-3'>
			<div className='lg:mt-[100px] mt-[70px] h-[calc(100vh-200px)] grid lg:grid-cols-4  lg:gap-x-[100px] '>
				<div className='col-span-2 h-full flex  items-center '>
					<div>
						<AnimatedPAfterH1 className=' font-[500] text-[0.85rem] pb-6'>Alimento de Patrícia Gabriel</AnimatedPAfterH1>
						<AnimatedPAfterH1 className='tracking-wide leading-[1.3] font-[500] text-[1.2rem]'>
							Sobre sobre Alimento e quem é a patricia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores iste fuga veniam itaque! Recusandae cum odit voluptas rerum nobis atque
							quibusdam expedita reiciendis quos possimus dignissimos nisi dolorem, tempora placeat! Optio corrupti laboriosam dignissimos beatae deserunt ad eligendi itaque animi ipsum quis vitae
							esse perferendis dolorum quo provident fuga, expedita id nisi, voluptatem eveniet laudantium tenetur voluptates. Laudantium, doloremque inventore.
							<br></br>
							<br></br>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum eaque suscipit sequi voluptatem nisi, atque nihil iste eius cum natus! Molestiae incidunt dolores non laudantium cumque
							praesentium! Delectus, voluptate adipisci! Ullam illum perspiciatis praesentium expedita labore quos quaerat odit provident, officiis, impedit quas recusandae numquam obcaecati cumque
							doloremque corporis earum non adipisci cupiditate. Nemo adipisci quae, illo delectus dolorem pariatur.
						</AnimatedPAfterH1>
					</div>
				</div>
				<div className='col-span-2 h-full '>
					<AnimatedImage1 src={bg} alt='Patricia Gabriel' className='w-full h-full object-cover object-left-bottom pointer-events-none' />
				</div>
			</div>

			<div className='h-[50vh]  grid lg:grid-cols-4  lg:gap-x-[100px] mt-[100px] '>
				<div className='col-span-2 h-full overflow-hidden'>
					<video src={video} autoPlay loop muted className='w-full h-full object-cover  pointer-events-none' />
				</div>
				<div className='col-span-2  flex  items-center '>
					<div>
						<AnimatedPAfterH1 className=' font-[500] text-[0.85rem] pb-6'>Alimento Studio</AnimatedPAfterH1>
						<AnimatedPAfterH1 className='tracking-wide leading-[1.3] font-[500] text-[1.2rem]'>
							Um pequeno texto sobre o studio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum eaque suscipit sequi voluptatem nisi, atque nihil iste eius cum natus! Molestiae incidunt dolores non laudantium cumque
							praesentium! Delectus, voluptate adipisci! Ullam illum perspiciatis praesentium expedita labore quos quaerat odit provident, officiis, impedit quas recusandae numquam obcaecati cumque
							doloremque corporis earum non adipisci cupiditate. Nemo adipisci quae, illo delectus dolorem pariatur.
						</AnimatedPAfterH1>
					</div>
				</div>
			</div>

			<div className='h-[30vh] grid grid-cols-4 gap-x-[100px] mt-[100px] '>
				<div className='col-span-1  '>
					<AnimatedPAfterH1 className=' font-[500] text-[0.85rem] pb-1'>Reservas & Colaborações</AnimatedPAfterH1>
					<u>geral@alimento.studio</u>
				</div>
				<div className='col-span-1 flex flex-col '>
					<AnimatedPAfterH1 className=' font-[500] text-[0.85rem] pb-1'>Social</AnimatedPAfterH1>
					<a href='https://www.instagram.com/___alimento___/' className='underline' target='_blank'>
						Instagram
					</a>
					<a
						href='https://linktr.ee/patriciagabriel?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnmDa3gKRt3Citq-xduwGYwL8FLL3tcHfsF7fS4uC4uxlcVevS0AhPl2WWI_M_aem_hMKmhYM7dx3oGTlTAmylUg'
						className='underline'
						target='_blank'
					>
						Linktree
					</a>
				</div>
				<div className='col-span-2 flex flex-col'>
					<AnimatedPAfterH1 className=' font-[500] text-[0.85rem] pb-1'>Info</AnimatedPAfterH1>
					<div>
						disclaimer qualquer aqui Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe accusantium, quod dolore magnam alias reprehenderit sapiente nihil ipsa nulla corporis quo ea nam
						accusamus voluptate distinctio laboriosam vel beatae nisi.
						<br></br>
						Para visitar o estudio apenas com marcação prévia.
					</div>
				</div>
			</div>
			<div className='grid grid-cols-4 gap-x-[100px] '>
				<AnimatedPAfterH1 className='col-span-1 font-[500] text-[0.85rem] '>© 2026, Alimento Studio</AnimatedPAfterH1>
				<AnimatedPAfterH1 className='col-span-2 font-[500] text-[0.85rem] '>Projeto Spin off | Instituto Superior de Agronomia de Lisboa</AnimatedPAfterH1>
				<AnimatedPAfterH1 className='col-span-1 font-[500] text-[0.85rem] '>
					Website Design{' '}
					<a href='https://www.diogobrito.xyz' className='underline' target='_blank'>
						Diogo Brito
					</a>
				</AnimatedPAfterH1>
			</div>
		</div>
	);
}
