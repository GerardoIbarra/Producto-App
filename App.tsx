import React from 'react'
import { Text, View } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import { Navigation } from './src/navigation/Navigation'
import { AuthProvider } from './src/context/AuthContext'
import { ProductsProvider } from './src/context/ProductContext'

const Appstate = ({children}:any)=>{
  
  return(
    <AuthProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Appstate>
        <Navigation />
      </Appstate>
    </NavigationContainer>
    )
}
export default App;