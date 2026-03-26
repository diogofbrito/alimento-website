import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Home } from './pages/Home.jsx';
import { Works } from './pages/Works.jsx';
import { WorkSingle } from './pages/WorkSingle.jsx';
import { IPlusD } from './pages/IPlusD.jsx';
import { About2 } from './pages/About2.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';
import { Press } from './pages/Press';


export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				path: '/',
				element: <Home />,
			},
			{
				path: '/projetos',
				element: <Works />,
			},

			{
				path: '/projetos/:slug',
				element: <WorkSingle />,
			},

			{
				path: '/imaisd',
				element: <IPlusD />,
			},
			{
				path: '/press',
				element: <Press />,
			},
			
			{
				path: '/sobre',
				element: <About2 />,
			},

			{
				path: '*',
				element: <ErrorPage />,
			},
		],
	},
]);
