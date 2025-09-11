import { Link } from 'react-router-dom';
import { AnimatedButton, AnimatedH1 } from './AnimatedText';


export function Menucopy() {
	

	return (
		<div>
			<div className='fixed top-0 w-full left-0 right-0 flex px-4 pb-2 pt-3 justify-between z-70 tracking-[0.02em] font-[400] bg-[#fefcf3] text-lg'>
				<AnimatedH1>
					<Link to='/'>ALIMENTO</Link>
				</AnimatedH1>
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
	);
}
