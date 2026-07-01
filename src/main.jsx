import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import routes from './routes/routes';
import { ThemeProvider } from './hooks/useTheme.jsx';

import './index.scss';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>,
);
