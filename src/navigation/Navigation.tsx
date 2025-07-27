import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import VitalsHistory from '../screens/VitalHistory';
import AlertsScreen from '../screens/AlertScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="History" component={VitalsHistory} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />
    </Tab.Navigator>
  );
}
export default Navigation;