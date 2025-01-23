import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from 'app/ui/App';
import { BrowserRouter } from 'react-router-dom';
import 'shared/static/index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
);
