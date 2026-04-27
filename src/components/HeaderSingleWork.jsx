import { useNavigate } from 'react-router-dom';
import { AnimatedH1, AnimatedButton } from '../components/AnimatedText';

export function HeaderSingleWork({ title, currentIndex, isListOpen, isInfoOpen, totalImages, onToggleList, onToggleInfo }) {
	const navigate = useNavigate();

	const handleClose = () => {
		if (window.history.length > 1) {
			navigate(-1);
		} else {
			navigate('/projetos');
		}
	};

	return (
		<>
			<div className='hidden z-90 fixed w-full left-0 right-0 top-4 px-5  lg:grid grid-cols-4 gap-x-[100px] tracking-[0.02em] font-[500] text-[0.9rem] uppercase  mix-blend-difference text-white'>
				<div className='col-span-1'>
					<AnimatedH1>{title}</AnimatedH1>
				</div>
				<div className='col-span-1 '>
					<AnimatedH1>
						imagem: {currentIndex + 1}/{totalImages}
					</AnimatedH1>
				</div>

				<div className='col-span-1 '>
					<AnimatedButton onClick={onToggleList} >
						{isListOpen ? ' SLIDER ' : ' LISTA '}
					</AnimatedButton>
				</div>
				<div className='col-span-1 flex justify-between '>
					<AnimatedButton onClick={onToggleInfo}>{isInfoOpen ? '  - INFO ' : ' + INFO '}</AnimatedButton>

					<AnimatedButton onClick={handleClose} className='text-right'>
						FECHAR{' '}
					</AnimatedButton>
				</div>
			</div>

			<div className='lg:hidden z-90 m-3 tracking-[0.02em] font-[500] text-[1rem] leading-5 uppercase '>
				<div className='grid grid-cols-3'>
					<div className='col-span-2'>
						<AnimatedH1>{title}</AnimatedH1>
					</div>
					<div className='col-span-1 text-right'>
						<AnimatedButton onClick={handleClose}> FECHAR </AnimatedButton>
					</div>
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
