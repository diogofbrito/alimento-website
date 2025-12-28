import { useEffect } from 'react';

export function ScrollToTop() {
	useEffect(() => {
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}
	}, []);

	return null;
}
