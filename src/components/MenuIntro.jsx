import { Link } from 'react-router-dom';
import { AnimatedH1 } from './AnimatedText';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../lang/translations';


export function MenuIntro() {
	const { lang, setLang } = useLanguage();
	const t = translations[lang];
	return (
		<>
			<div className='fixed  lg:flex lg:items-center left-5 right-5 bottom-0 top-5 lg:top-0 z-50 pointer-events-none mix-blend-difference text-white '>
				<div className='hidden lg:grid grid-cols-4 uppercase tracking-[0.02em] font-[500] text-[0.9rem] pointer-events-auto w-full'>
					<AnimatedH1 className='col-span-1 tracking-[0.2em]'>Alimento</AnimatedH1>
					<menu className='col-span-3 grid grid-cols-3 '>
						<li className='col-span-1 '>
							<AnimatedH1>
								<Link to='/projetos'>{t.nav.projects}</Link>
							</AnimatedH1>
						</li>
						<li className='col-span-1 '>
							<AnimatedH1>
								<Link to='/imaisd'>{t.nav.research}</Link>
							</AnimatedH1>
						</li>

						<li className='col-span-1 grid grid-cols-2  gap-x-[100px]'>
							<AnimatedH1>
								<Link to='/press'>{t.nav.press}</Link>
							</AnimatedH1>
							<AnimatedH1 className='text-right'>
								<Link to='/sobre'>{t.nav.about}</Link>
							</AnimatedH1>
						</li>
					</menu>
					<div className='absolute top-5 right-0 '>
						<AnimatedH1>
							<button type='button' onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} className='uppercase'>
								{lang === 'pt' ? 'EN' : 'PT'}
							</button>
						</AnimatedH1>
					</div>
				</div>
			</div>

			<div className='lg:hidden fixed bottom-0 top-0 right-0 left-0 z-50 flex flex-col p-3 justify-between mix-blend-difference text-white uppercase tracking-[0.02em] font-[500] '>
				<AnimatedH1 className='text-[1.1rem] tracking-[0.2em]'>Alimento</AnimatedH1>
				<nav className='flex  flex-col gap-1 text-[1.5rem] '>
					<AnimatedH1>
						<Link to='/projetos'>{t.nav.projects}</Link>
						<ArrowUpRight size={25} strokeWidth={2} className='inline-block align-[-3px]' />
					</AnimatedH1>

					<AnimatedH1>
						<Link to='/imaisd'>{t.nav.research}</Link>
						<ArrowUpRight size={25} strokeWidth={2} className='inline-block align-[-3px]' />
					</AnimatedH1>

					<AnimatedH1>
						<Link to='/press'>{t.nav.press}</Link>
						<ArrowUpRight size={25} strokeWidth={2} className='inline-block align-[-3px]' />
					</AnimatedH1>

					<AnimatedH1>
						<Link to='/sobre'>{t.nav.about}</Link>
						<ArrowUpRight size={25} strokeWidth={2} className='inline-block align-[-3px]' />
					</AnimatedH1>
				</nav>
			</div>
		</>
	);
}
