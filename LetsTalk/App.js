/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import StackNavigator from './Components/Navigation/StackNavigator';



function App() {
 
  return(
    <NavigationContainer>
    <StackNavigator />
  </NavigationContainer>
  )
}


export default App;
