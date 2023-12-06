import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './state/store.js'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'sonner'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline>
        <Toaster />
        <App />
      </CssBaseline>
    </Provider>
  </React.StrictMode>
);
