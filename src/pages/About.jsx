import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { AnimatedH1, AnimatedPAfterH1, AnimatedImage } from '../components/AnimatedText';
import video from '../assets/Images/contacts.mp4';

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
		<>
			<div className='h-screen grid grid-cols-4 grid-rows-2 px-5 pt-16 gap-x-[50px] '>
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

			
		</>
	);
}
