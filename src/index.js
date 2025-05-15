import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { firebaseConfig }  from './firebase-config';
import { FirebaseAppProvider } from 'reactfire'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={"Conectando a la app"}>
        <App />
      </Suspense>
    </FirebaseAppProvider>
  </BrowserRouter>
);


reportWebVitals();
