import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedButton, AnimatedH1 } from './AnimatedText';

export function Menu() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* HEADER */}
			<div className='fixed left-3 lg:left-5 top-3 lg:top-4 right-3 lg:right-5 z-50 mix-blend-difference text-white'>
				<div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-x-[100px] uppercase tracking-[0.02em] font-[500] lg:text-[0.9rem] text-[1.1rem] items-center'>
					{/* LOGO */}
					<AnimatedH1>
						<Link to='/' className='hover:underline'>
							Alimento
						</Link>
					</AnimatedH1>

					<AnimatedButton onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} className='block lg:hidden text-right' aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}>
						{isOpen ? 'Fechar' : 'Menu'}
					</AnimatedButton>

					{/* MENU DESKTOP */}
					<menu className='col-span-3 lg:grid grid-cols-3 gap-x-[100px] hidden'>
						<li>
							<AnimatedH1>
								<Link to='/projetos' className='hover:underline'>
									Projetos
								</Link>
							</AnimatedH1>
						</li>

						<li>
							<AnimatedH1>
								<Link to='/imaisd' className='hover:underline'>
									I + D
								</Link>
							</AnimatedH1>
						</li>

						<li className='grid grid-cols-2 gap-x-[100px]'>
							<AnimatedH1>
								<Link to='/press' className='hover:underline'>
									Press
								</Link>
							</AnimatedH1>
							<AnimatedH1 className='text-right'>
								<Link to='/sobre' className='hover:underline'>
									Info
								</Link>
							</AnimatedH1>
						</li>
					</menu>
				</div>
			</div>

			{/* OVERLAY MOBILE */}
			{isOpen && (
				<div className='fixed inset-0 z-40 bg-[#f7f7f7] flex flex-col justify-center px-3 '>
					<nav className='flex flex-col gap-1 text-[1.4rem] tracking-[0.02em] font-[500] uppercase '>
						<AnimatedH1>
							<Link onClick={() => setIsOpen(false)} to='/projetos'>
								Projetos
							</Link>
						</AnimatedH1>
						<AnimatedH1>
							<Link onClick={() => setIsOpen(false)} to='/imaisd'>
								I + D
							</Link>
						</AnimatedH1>
						<AnimatedH1>
							<Link onClick={() => setIsOpen(false)} to='/press'>
								Press
							</Link>
						</AnimatedH1>
						<AnimatedH1>
							<Link onClick={() => setIsOpen(false)} to='/sobre'>
								Sobre
							</Link>
						</AnimatedH1>
					</nav>

					<div className='absolute bottom-0 left-3 text-[1.1rem] uppercase tracking-[0.02em] font-[500]'>
						<AnimatedH1>© Alimento 2025</AnimatedH1>
					</div>
				</div>
			)}
		</>
	);
}
