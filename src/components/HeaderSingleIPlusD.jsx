import { useNavigate } from 'react-router-dom';
import { AnimatedH1, AnimatedButton } from '../components/AnimatedText';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../lang/translations.js';

export function HeaderSingleIPlusD({ title, currentIndex, totalImages, isListOpen, isInfoOpen, onToggleList, onToggleInfo }) {
	const navigate = useNavigate();
		const { lang } = useLanguage();
		const t = translations[lang];

	return (
		<>
			<div className='hidden z-90 fixed w-full left-0 right-0 top-4 px-5 lg:grid grid-cols-4 gap-x-[100px] tracking-[0.02em] font-[500] text-[0.9rem] uppercase mix-blend-difference text-white'>
				<div className='col-span-1 '>
					<AnimatedH1>{t.nav.research}</AnimatedH1>
				</div>

				<div className='col-span-1'>
					<AnimatedH1>
						{t.header.image}: {totalImages ? currentIndex + 1 : 0}/{totalImages || 0}
					</AnimatedH1>
				</div>

				<div className='col-span-1'>
					<AnimatedButton onClick={onToggleList}> {isListOpen ? t.header.slider : t.header.list}</AnimatedButton>
				</div>

				<div className='col-span-1 grid grid-cols-2 gap-x-[100px]'>
					<AnimatedButton onClick={onToggleInfo}> {isInfoOpen ? t.header.infoClose : t.header.infoOpen}</AnimatedButton>

					<AnimatedButton onClick={() => navigate(-1)} className='text-right'>
						{t.header.close}
					</AnimatedButton>
				</div>
			</div>

			<div className='lg:hidden z-90 m-3 tracking-[0.02em] font-[500] text-[1rem] uppercase leading-5'>
				<div className='flex justify-between'>
					<AnimatedH1>{title}</AnimatedH1>
					<AnimatedButton onClick={() => navigate(-1)} className='text-right'>
						{t.header.close}
					</AnimatedButton>
				</div>
				<div className='flex justify-between pt-3'>
					<AnimatedButton onClick={onToggleList}> {isListOpen ? t.header.slider : t.header.list}</AnimatedButton>
					<AnimatedH1>
						{t.header.image}: {currentIndex + 1}/{totalImages}
					</AnimatedH1>
					<AnimatedButton onClick={onToggleInfo}> {isInfoOpen ? t.header.infoClose : t.header.infoOpen}</AnimatedButton>
				</div>
			</div>
		</>
	);
}
