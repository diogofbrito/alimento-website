import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function ErrorPage() {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/');
		}, 2000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<section className='grid grid-cols-4 gap-x-[100px] pt-[7rem] px-5'>
			<div className='col-start-3 col-end-4 tracking-wide leading-[1.3] font-[500] text-[1.2rem] text-black'>Página não encontrada.</div>
		</section>
	);
}
