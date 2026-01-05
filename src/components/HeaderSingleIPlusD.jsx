import { useNavigate } from 'react-router-dom';
import { AnimatedH1, AnimatedButton } from '../components/AnimatedText';

export function HeaderSingleIPlusD({ title, currentIndex, totalImages, isListOpen, isInfoOpen, onToggleList, onToggleInfo }) {
	const navigate = useNavigate();

	return (
		<>
			<div className='hidden z-90 fixed w-full left-0 right-0 top-4 px-5 lg:grid grid-cols-4 gap-x-[100px] tracking-[0.02em] font-[500] text-[0.9rem] uppercase '>
				<div className='col-span-1 '>
					<AnimatedH1>i + d</AnimatedH1>
				</div>

				<div className='col-span-1'>
					<AnimatedH1>
						imagem: {totalImages ? currentIndex + 1 : 0}/{totalImages || 0}
					</AnimatedH1>
				</div>

				<div className='col-span-1'>
					<AnimatedButton onClick={onToggleList} className='hover:underline'>
						{isListOpen ? 'SLIDER' : 'LISTA'}
					</AnimatedButton>
				</div>

				<div className='col-span-1 grid grid-cols-2 gap-x-[100px]'>
					<AnimatedButton onClick={onToggleInfo}>{isInfoOpen ? '- INFO' : '+ INFO'}</AnimatedButton>

					<AnimatedButton onClick={() => navigate(-1)} className='text-right'>
						FECHAR
					</AnimatedButton>
				</div>
			</div>

			<div className='lg:hidden z-90 m-3 tracking-[0.02em] font-[500] text-[1.1rem] uppercase leading-5'>
				<div className='flex justify-between'>
					<AnimatedH1>i + d</AnimatedH1>
					<AnimatedButton onClick={() => navigate(-1)} className='text-right'>
						{' '}
						FECHAR{' '}
					</AnimatedButton>
				</div>
				<div className='flex justify-between pt-3'>
					<AnimatedButton onClick={onToggleList}>{isListOpen ? ' SLIDER ' : ' LISTA '}</AnimatedButton>
					<AnimatedH1>
						imagem: {currentIndex + 1}/{totalImages}
					</AnimatedH1>
					<AnimatedButton onClick={onToggleInfo}>{isInfoOpen ? '  - INFO ' : ' + INFO '}</AnimatedButton>
				</div>
			</div>
		</>
	);
}
