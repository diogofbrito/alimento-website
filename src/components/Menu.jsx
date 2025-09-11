import { Link } from 'react-router-dom';
import { AnimatedH1 } from './AnimatedText';

export function Menu() {
	return (
		<>
			<div className='relative top-0 w-full left-0 right-0 flex px-12 py-6 justify-between z-90 tracking-[0.02em] font-[500] text-[1rem] '>
				<div className='fixed '>
					<AnimatedH1 >
						<Link to='/'>ALIMENTO</Link>
					</AnimatedH1>
				</div>
				<div className='w-full flex justify-end '>
					<div className='flex gap-12'>
						<AnimatedH1>
							<Link to='/projetos'>Projetos</Link>
						</AnimatedH1>
						<AnimatedH1>
							<Link to='/imaisd'>I + D</Link>
						</AnimatedH1>
						<AnimatedH1>
							<Link to='/sobre'>Sobre </Link>
						</AnimatedH1>
						<AnimatedH1>
							<Link to='/press'>Press</Link>
						</AnimatedH1>
						<AnimatedH1>
							<Link to='/contactos'>Contactos</Link>
						</AnimatedH1>
					</div>
				</div>
			</div>
		</>
	);
}
