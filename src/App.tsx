import React from 'react'
import Navigation from '@navigation/Navigation'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import '../reanimatedConfig.js';

// Rest of your code

const App = () => {
  return (
    <GestureHandlerRootView>
      <Navigation />
    </GestureHandlerRootView>
  )
}

export default App