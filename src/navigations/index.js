import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as React from 'react';
import HomeScreen from '../screens/Home/home'
import ProductScreen from '../screens/Products/products'

// In App.js in a new project

const Tab = createBottomTabNavigator();

const index = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Products" component={ProductScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default index;

