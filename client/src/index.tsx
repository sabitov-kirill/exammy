import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider } from "@chakra-ui/react";

import reportWebVitals from './reportWebVitals';
import { store } from './store'
import { App } from './pages/App';
import { theme } from "./theme";
import './index.css';



const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
