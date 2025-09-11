import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Home } from './pages/Home.jsx';
import { Works } from './pages/Works.jsx';
import { WorkSingle } from './pages/WorkSingle.jsx';
import { IPlusD } from './pages/IPlusD.jsx';
import { About } from './pages/About.jsx';
import { Contacts } from './pages/Contacts.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';
import { LostFound } from './pages/LostFound';
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
				element: <About />,
			},
			{
				path: '/contactos',
				element: <Contacts />,
			},
			{
				path: '*',
				element: <ErrorPage />,
			},
		],
	},
]);
