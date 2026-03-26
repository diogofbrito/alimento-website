import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { IntroLoader } from './components/IntroLoader';
import { AnimatePresence, motion } from 'framer-motion';
import { pageTransition } from './components/animations/variants.js';
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

			{/* Outlet SEMPRE renderizado (para preload), mas na Home controlamos opacidade */}
			<motion.div
				key={location.pathname}
				variants={pageTransition}
				initial={isFirstLoad ? false : 'hidden'}
				animate={isFirstLoad ? false : 'enter'}
				exit='exit'
				style={
					isHome && showLoader
						? { opacity: revealHome ? 1 : 0 } 
						: undefined
				}
				
			>
				<Outlet context={{ startHomeCarousel }} />
			</motion.div>

			<AnimatePresence>
				{showLoader && (
					<IntroLoader
						onFadeStart={() => {
							// começa o fade do loader → mostra a Home já com a imagem 0
							setRevealHome(true);
						}}
						onFinish={() => {
							setShowLoader(false);
							setIsFirstLoad(false);
							// loader já saiu → agora sim pode arrancar a galeria
							setStartHomeCarousel(true);
						}}
					/>
				)}
			</AnimatePresence>
		</>
	);
}

export default App;
