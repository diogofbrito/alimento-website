import { Link } from 'react-router-dom';
import { AnimatedH1 } from './AnimatedText';

export function MenuIntro() {
	return (
		<>
			<div className='fixed  lg:flex lg:items-center left-5 right-5 bottom-0 top-5 lg:top-0 z-50 pointer-events-none mix-blend-difference text-white '>
				<div className='hidden lg:grid grid-cols-4 uppercase tracking-[0.02em] font-[500] text-[0.9rem] pointer-events-auto w-full'>
					<AnimatedH1 className='col-span-1 '>Alimento</AnimatedH1>
					<menu className='col-span-3 grid grid-cols-3 '>
						<li className='col-span-1 '>
							<AnimatedH1>
								<Link to='/projetos' className='hover:underline'>
									Projetos
								</Link>
							</AnimatedH1>
						</li>
						<li className='col-span-1 '>
							<AnimatedH1>
								<Link to='/imaisd' className='hover:underline'>
									I + D
								</Link>
							</AnimatedH1>
						</li>

						<li className='col-span-1 grid grid-cols-2  gap-x-[100px]'>
							<AnimatedH1>
								<Link to='/press' className='hover:underline'>
									press
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

			<div className='lg:hidden fixed bottom-0 top-0 right-0 left-0 z-50 flex flex-col p-5 justify-between mix-blend-difference text-white uppercase tracking-[0.02em] font-[500] '>
				<AnimatedH1 className='text-[1.1rem]'>Alimento</AnimatedH1>
				<menu className='flex flex-col gap-2 text-[1.4rem]'>
					<li>
						<AnimatedH1>
							<Link to='/projetos'>Projetos</Link>
						</AnimatedH1>
					</li>
					<li>
						<AnimatedH1>
							<Link to='/imaisd'>I + D</Link>
						</AnimatedH1>
					</li>

					<li>
						<AnimatedH1>
							<Link to='/press'>press</Link>
						</AnimatedH1>
					</li>
					<li>
						<AnimatedH1>
							<Link to='/sobre'>Info</Link>
						</AnimatedH1>
					</li>
				</menu>
				<AnimatedH1 className='text-[1.1rem]'>© Alimento 2025</AnimatedH1>
			</div>
		</>
	);
}
