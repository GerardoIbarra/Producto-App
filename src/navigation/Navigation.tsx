import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import { LoadingScreem } from '../screens/LoadingScreem';
import { ProductsNavigator } from './ProductsNavigator';

const Stack = createStackNavigator();

export const Navigation = () => {
  const {status} = useContext(AuthContext);

  if(status === 'checking') return <LoadingScreem />

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {status !== 'authenticated' ? (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      ) : (
       <>
         <Stack.Screen name="ProductsNavigator" component={ProductsNavigator} />
         <Stack.Screen name="HomeScreen" component={HomeScreen} />
       </>
)}
    </Stack.Navigator>
  );
};
