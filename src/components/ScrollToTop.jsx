import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
	const { pathname } = useLocation();

	// 1) dizer ao browser para NÃO restaurar o scroll automaticamente
	useEffect(() => {
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}
	}, []);

	// 2) sempre que o pathname muda, força scroll para o topo
	useEffect(() => {
		const id = setTimeout(() => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'auto', // nada de smooth aqui
			});
		}, 0); // se mobile continuar marado, experimenta 50

		return () => clearTimeout(id);
	}, [pathname]);

	return null;
}
