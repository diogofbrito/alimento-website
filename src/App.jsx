import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { IntroLoader } from './components/IntroLoader';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Menu } from './components/Menu';

function App() {
	const location = useLocation();
	const [showLoader, setShowLoader] = useState(false);
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [revealHome, setRevealHome] = useState(false);
	const [startHomeCarousel, setStartHomeCarousel] = useState(false);

	useEffect(() => {
		if (location.pathname === '/' && isFirstLoad) {
			setShowLoader(true);
			setRevealHome(false);
			setStartHomeCarousel(false);
		} else {
			setShowLoader(false);
		}
	}, [location.pathname, isFirstLoad]);

	const isHome = location.pathname === '/';
	const isWorkSingle = /^\/projetos\/[^/]+$/.test(location.pathname);
	const isIPlusDSingle = /^\/imaisd\/[^/]+$/.test(location.pathname);
	const isIPlusD = location.pathname === '/imaisd';

	return (
		<>
			{!isHome && !isWorkSingle && !isIPlusDSingle && !isIPlusD && <Menu />}

		
			<div style={isHome && showLoader ? { opacity: revealHome ? 1 : 0 } : undefined}>
				<Outlet context={{ startHomeCarousel }} />
			</div>
			<Analytics />
			<AnimatePresence>
				{showLoader && (
					<IntroLoader
						onFadeStart={() => {
							
							setRevealHome(true);
							setStartHomeCarousel(true);
						}}
						onFinish={() => {
							setShowLoader(false);
							setIsFirstLoad(false);
						}}
					/>
				)}
			</AnimatePresence>
		</>
	);
}

export default App;
