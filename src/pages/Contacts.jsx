import { AnimatedButton, AnimatedH1, AnimatedPAfterH1 } from '../components/AnimatedText';
import video from '../assets/Images/contacts.mp4';

export function Contacts() {
	return (
		<div className='px-12 grid grid-cols-3 gap-12 '>
			<div className='col-span-1 flex flex-col gap-1'>
				<AnimatedH1 className='epilogueRegular'>MARCAÇÕES</AnimatedH1>
				<AnimatedPAfterH1 className=' font-medium tracking-wide leading-[1.3] gambarino'>Sobre consulta, etc etc...</AnimatedPAfterH1>
			</div>
			<div className='col-span-1 flex flex-col gap-1'>
				<AnimatedH1 className='epilogueRegular'>CONTACTOS</AnimatedH1>
				<div>
					<AnimatedPAfterH1 className=' epilogueRegular'>
						<a href='patriciaagabriel@gmail.com'>EMAIL</a>
					</AnimatedPAfterH1>
					<AnimatedPAfterH1 className=' epilogueRegular'>
						<a href='https://www.instagram.com/___alimento___/' target='_blank'>
							INSTAGRAM
						</a>
					</AnimatedPAfterH1>
				</div>
			</div>
			<div className='col-span-1 '>
				<video src={video} autoPlay loop muted />
			</div>
		</div>
	);
}
