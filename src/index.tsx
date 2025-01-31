import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DataProvider } from './contexts/DataContext';
import { StatsProvider } from './contexts/StatsContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
            <DataProvider>
                <StatsProvider>
                    <App />
                </StatsProvider>
            </DataProvider>
    </React.StrictMode>
);
