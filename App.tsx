import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './ThemeContext'; 
import AppNavigation from './AppNavigation';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
