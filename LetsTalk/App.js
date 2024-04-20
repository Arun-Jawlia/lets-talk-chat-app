/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React from 'react';
import StackNavigator from './Components/Navigation/StackNavigator';
import {UserContext} from './ContextApi/UserContext';

function App() {
  return (
    <UserContext>
      <StackNavigator />
    </UserContext>
  );
}

export default App;
