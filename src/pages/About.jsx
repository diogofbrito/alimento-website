import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { AnimatedH1, AnimatedPAfterH1, AnimatedImage } from '../components/AnimatedText';
import video from '../assets/abouvid.mp4';

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
		<div className='px-5 pt-16'>
			<div className='grid grid-cols-4  gap-x-[100px] '>
				<div className='col-span-2  flex flex-col gap-1 '>
					<AnimatedPAfterH1 className='tracking-wide leading-[1.3] text-xl'>
						Alimento é Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores iste fuga veniam itaque! Recusandae cum odit voluptas rerum nobis atque quibusdam expedita reiciendis quos
						possimus dignissimos nisi dolorem, tempora placeat! Optio corrupti laboriosam dignissimos beatae deserunt ad eligendi itaque animi ipsum quis vitae esse perferendis dolorum quo provident
						fuga, expedita id nisi, voluptatem eveniet laudantium tenetur voluptates. Laudantium, doloremque inventore.
					</AnimatedPAfterH1>
				</div>
				<div className='col-span-2'>
					<video src={video} autoPlay loop muted />
				</div>
			</div>

			<div className='grid grid-cols-4 gap-x-[100px] h-[300px] '>
				<div className='col-span-1  flex flex-col '>
					<div className='opacity-45'>Tipo</div>
					<div>Almoço para 14 pax</div>
				</div>
				<div className='col-span-1 flex flex-col '>
					<div className='opacity-45'>Cliente</div>
					<div>Escola de Agronomia</div>
				</div>
				<div className='col-span-1 flex flex-col'>
					<div className='opacity-45'>Ano</div>
					<div>2021</div>
				</div>
				<div className='col-span-1 flex flex-col'>
					<div className='opacity-45'>Créditos</div>
					<div>lorem ipsum</div>
				</div>
			</div>
		</div>
	);
}
