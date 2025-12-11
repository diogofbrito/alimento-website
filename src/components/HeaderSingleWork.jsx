import { useNavigate } from 'react-router-dom';
import { AnimatedH1, AnimatedButton } from '../components/AnimatedText';

export function HeaderSingleWork({ title, currentIndex, isListOpen, isInfoOpen, totalImages, onToggleList, onToggleInfo }) {
	const navigate = useNavigate();

	return (
		<div className='z-90 absolute w-full left-0 right-0 top-4 px-5  grid grid-cols-4 gap-x-[100px] tracking-[0.02em] font-[500] text-[0.9rem] uppercase '>
			<div className='col-span-1  '>
				<AnimatedH1>{title}</AnimatedH1>
			</div>
			<div className='col-span-1'>
				<AnimatedH1>
					imagem: {currentIndex + 1}/{totalImages}
				</AnimatedH1>
			</div>

			<div className='col-span-1 '>
				<AnimatedButton onClick={onToggleList}className='hover:underline'>{isListOpen ? ' SLIDER ' : ' LISTA '}</AnimatedButton>
			</div>
			<div className='col-span-1 grid grid-cols-2 gap-x-[100px]'>
				<AnimatedButton onClick={onToggleInfo}>{isInfoOpen ? '  INFORMAÇÃO - ' : ' INFORMAÇÃO + '}</AnimatedButton>
				<AnimatedButton onClick={() => navigate(-1)} className='text-right'> FECHAR </AnimatedButton>
			</div>
			
		</div>
	);
}
