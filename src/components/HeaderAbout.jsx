import { Link } from 'react-router-dom';
import { AnimatedH1 } from './AnimatedText';

export function HeaderAbout() {
	return (
		<div className='z-90 absolute top-0 w-full left-0 right-0 px-5 pt-5 grid grid-cols-4 gap-x-[50px] tracking-[0.02em] font-[500] text-[0.9rem] gap-12 uppercase'>
			<AnimatedH1 className='col-span-1 '>
				<Link to='/'>Alimento</Link>
			</AnimatedH1>
			<div className='hidden'></div>
			<menu className='col-span-3 grid grid-cols-3 gap-x-[50px]'>
				<li className='col-span-1 '>
					<AnimatedH1>
						<Link to='/projetos'>Projetos</Link>
					</AnimatedH1>
				</li>
				<li className='col-span-1 '>
					<AnimatedH1>
						<Link to='/imaisd'>I + D</Link>
					</AnimatedH1>
				</li>

				<li className='col-span-1 grid grid-cols-2  gap-x-[50px]'>
					<AnimatedH1>
						<Link to='/press'>press</Link>
					</AnimatedH1>
					<AnimatedH1 className='text-right'>
						<Link to='/sobre'>Sobre</Link>
					</AnimatedH1>
				</li>
			</menu>
		</div>
	);
}
