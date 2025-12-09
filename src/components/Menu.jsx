import { Link } from 'react-router-dom';
import { AnimatedH1 } from './AnimatedText';

export function Menu() {
	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 pointer-events-none mix-blend-difference text-white '>
			<div className='grid grid-cols-4 gap-x-[100px] uppercase tracking-[0.02em] font-[500] text-[0.9rem] pointer-events-auto w-full mx-5 '>
				<AnimatedH1 className='col-span-1 '>
					<Link to='/'>Alimento</Link>
				</AnimatedH1>
				<div className='hidden'></div>
				<menu className='col-span-3 grid grid-cols-3 gap-x-[100px]'>
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

					<li className='col-span-1 grid grid-cols-2  gap-x-[100px]'>
						<AnimatedH1>
							<Link to='/press'>press</Link>
						</AnimatedH1>
						<AnimatedH1 className='text-right'>
							<Link to='/sobre'>Sobre</Link>
						</AnimatedH1>
					</li>
				</menu>
			</div>
		</div>
	);
}
