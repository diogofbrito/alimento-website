import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { router } from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
	<LanguageProvider>
		<RouterProvider router={router} />
	</LanguageProvider>,
);
