import { useNavigate } from 'react-router-dom';
import { AnimatedH1, AnimatedButton } from '../components/AnimatedText';

export function HeaderSingleWork({ title, currentIndex, isListOpen, isInfoOpen, totalImages, onToggleList, onToggleInfo }) {
	const navigate = useNavigate();

	return (
		<div className='z-90 absolute top-0 w-full left-0 right-0 px-12 pt-6 grid grid-cols-5 tracking-[0.02em] font-[500] text-[1rem] gap-12 uppercase'>
			<div className='col-span-1 '>
				<AnimatedH1>{title}</AnimatedH1>
			</div>
			<div className='col-span-1 '>
				<AnimatedH1>
					Imagem: {String(currentIndex + 1).padStart(2, '0')}/{String(totalImages).padStart(2, '0')}
				</AnimatedH1>
			</div>
			<div className='col-span-1'>
				<AnimatedButton onClick={onToggleList}>{isListOpen ? ' SLIDER ' : ' LISTA '}</AnimatedButton>
			</div>
			<div className='col-span-1'>
				<AnimatedButton onClick={onToggleInfo}>{isInfoOpen ? '  INFORMAÇÃO - ' : ' INFORMAÇÃO + '}</AnimatedButton>
			</div>
			<div className='col-span-1 text-right'>
				<AnimatedButton onClick={() => navigate(-1)}> FECHAR </AnimatedButton>
			</div>
		</div>
	);
}
