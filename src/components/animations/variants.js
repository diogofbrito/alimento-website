// Smooth slide-up para títulos (<h1>)
export const h1SlideUp = {
	hidden: { y: '100%' },
	show: {
		y: '0%',
		transition: { duration: 0.6, ease: [0.77, 0, 0.175, 0.6] },
	},
};

export const ButtonSlideUp = {
	hidden: { y: '100%' },
	show: {
		y: '0%',
		transition: { duration: 0.6, ease: [0.77, 0, 0.175, 0.6] },
	},
};


// Fade-in para parágrafos (<p>) com delay de 0.8s (após o h1)
export const pFadeInAfterH1 = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			duration: 0.7,
			ease: 'easeOut',
			delay: 0.5, // começa depois do h1 terminar
		},
	},
};

// Fade-in para parágrafos (<p>)
export const pFadeIn = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
};

// Transição de páginas (App.jsx)
export const pageTransition = {
	hidden: { opacity: 0 },
	enter: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
	exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};


