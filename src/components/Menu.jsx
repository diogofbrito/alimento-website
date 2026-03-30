import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedH1 } from './AnimatedText';
import { HamburgerButton } from './HamburguerBtn';
import { AnimatePresence, motion } from 'framer-motion';

export function Menu() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* HEADER */}
			<div className='fixed left-0 lg:left-5 top-0 lg:top-4 right-0 lg:right-5 z-50 lg:mix-blend-difference lg:text-white'>
				<div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-x-[100px] uppercase tracking-[0.02em] font-[500] lg:text-[0.9rem] text-[1.1rem] items-center border-b border-b-gray-200 lg:border-0 bg-white lg:bg-transparent px-3 lg:px-0 pt-3 pb-0 lg:pt-0'>
					{/* LOGO */}
					<AnimatedH1>
						<Link to='/' className='hover:underline tracking-[0.2em]'>
							Alimento
						</Link>
					</AnimatedH1>

					<div className='col-span-1 flex justify-end lg:hidden'>
						<HamburgerButton isOpen={isOpen} toggle={() => setIsOpen(prev => !prev)} />
					</div>

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
									Sobre
								</Link>
							</AnimatedH1>
						</li>
					</menu>
				</div>
			</div>

			{/* OVERLAY MOBILE (com fade in/out) */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className='fixed inset-0 z-40 bg-[#f7f7f7] flex flex-col justify-center px-3'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5, ease: 'easeInOut' }}
					>
						{/* opcional: ligeiro “soft entrance” do conteúdo */}
						<motion.nav
							className='flex flex-col  gap-1 text-[1.4rem] tracking-[0.02em] font-[500] uppercase'
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 6 }}
							transition={{ duration: 0.5, ease: 'easeInOut' }}
						>
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
						</motion.nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
