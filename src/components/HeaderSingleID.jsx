// HeaderSingleID.jsx
import { useNavigate } from 'react-router-dom';
import { AnimatedH1, AnimatedButton } from './AnimatedText';

export function HeaderSingleID({ title, currentIndex, totalImages, isListOpen, isInfoOpen, onToggleList, onToggleInfo }) {
	const navigate = useNavigate();

	return (
		<div className='z-90 absolute top-0 w-full left-0 right-0 px-5 pt-5 grid grid-cols-4 gap-x-[50px] tracking-[0.02em] font-[500] text-[0.9rem] gap-12 uppercase'>
			<div className='col-span-2 '>
				<AnimatedH1>{title}</AnimatedH1>
			</div>

			<div className='col-span-1 '>
				<AnimatedButton onClick={onToggleList}>{isListOpen ? ' SLIDER ' : ' LISTA '}</AnimatedButton>
			</div>

			<div className='col-span-1 text-right '>
				<AnimatedButton onClick={() => navigate(-1)} >
					{' '}
					FECHAR{' '}
				</AnimatedButton>
			</div>
		</div>
	);
}
