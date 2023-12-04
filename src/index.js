import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './state/store.js'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import { Toaster } from 'sonner'

const darkMode = store.getState().data.darkMode

const theme = createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: '#002837',
      dark: '#BC9275'
    },
    background: {
      default: '#E7E7E7',
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <Toaster/>
          <App />
        </ThemeProvider>
      </CssBaseline>
    </Provider>
  </React.StrictMode>
);
