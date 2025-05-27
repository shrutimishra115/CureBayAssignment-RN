import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddCalculator from '../screens/AddCalculator';
import SearchBar from '../screens/SearchBar';
import TwoSumIndex from '../screens/TwoSumIndex';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Calculator" component={AddCalculator} />
      <Tab.Screen name="Search" component={SearchBar} />
      <Tab.Screen name="TwoSum" component={TwoSumIndex} />
    </Tab.Navigator>
  );
}
