import { Link } from 'react-router-dom';
import { BackgroundGallery } from '../components/BackgroundGallery';

export function Home() {
	return (
		<div className='relative w-screen h-screen overflow-hidden'>
			<BackgroundGallery />

			{/* Menu */}
			<div className='relative w-screen h-screen flex gap-4 items-center justify-between px-12 tracking-[0.02em] font-[500] text-[1rem] '>
				<Link to='/'>ALIMENTO</Link>
				<Link to='/projetos' className='hover:opacity-60 transition-opacity duration-300 ease-in-out uppercase'>
					Projetos
				</Link>
				<Link to='/imaisd' className='hover:opacity-60 transition-opacity duration-300 ease-in-out uppercase'>
					I + D
				</Link>
				<Link to='/sobre' className='hover:opacity-60 transition-opacity duration-300 ease-in-out uppercase'>
					Sobre
				</Link>
				<Link to='/press' className='hover:opacity-60 transition-opacity duration-300 ease-in-out uppercase'>
					Press
				</Link>
				<Link to='/contactos' className='hover:opacity-60 transition-opacity duration-300 ease-in-out uppercase'>
					Contactos
				</Link>
			</div>
		</div>
	);
}
