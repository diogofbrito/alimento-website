import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { IntroLoader } from './components/IntroLoader';
import { pageTransition } from './components/animations/variants.js';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from './components/Menu';

function App() {
	const location = useLocation();
	const [showLoader, setShowLoader] = useState(false);
	const [isFirstLoad, setIsFirstLoad] = useState(true);

	useEffect(() => {
		if (location.pathname === '/' && isFirstLoad) {
			setShowLoader(true);
		} else {
			setShowLoader(false);
		}
	}, [location.pathname, isFirstLoad]);

	const isWorkSingle = /^\/projetos\/[^/]+$/.test(location.pathname);

	return (
		<>
			{location.pathname !== '/' && !isWorkSingle && <Menu />}

			<motion.div key={location.pathname} variants={pageTransition} initial={isFirstLoad ? false : 'hidden'} animate={isFirstLoad ? false : 'enter'} exit='exit' className='min-h-screen relative z-0'>
				<Outlet />
			</motion.div>

			<AnimatePresence>
				{showLoader && (
					<div className='absolute inset-0 z-50'>
						<IntroLoader
							onFinish={() => {
								setShowLoader(false);
								setIsFirstLoad(false);
							}}
						/>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}

export default App;
