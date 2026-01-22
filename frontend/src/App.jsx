import React from 'react';
import Routes from './Routes';
import { FirebaseProvider } from './context/FirebaseContext';

const App = () => (
  <FirebaseProvider>
    <Routes />
  </FirebaseProvider>
);

export default App;
