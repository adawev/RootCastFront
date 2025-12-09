import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import store from "./store/store";
import {BrowserRouter} from "react-router";
import {Toaster} from "sonner";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary>
        <BrowserRouter>
            <Provider store={store}>
                <Toaster position="top-center" richColors/>
                <App/>
            </Provider>
        </BrowserRouter>
    </ErrorBoundary>
);
