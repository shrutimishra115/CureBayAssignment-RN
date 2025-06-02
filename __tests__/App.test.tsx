/**
 * @format
 */

import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

jest.mock('@react-navigation/native', () => {
  const React = require('react');
  return {
    NavigationContainer: ({children}: any) => <>{children}</>,
  };
});

jest.mock('../src/navigation/BottomTabBar', () => {
  
  return () => <MockedTabs />;
});

const MockedTabs = () => <MockedScreen />;
const MockedScreen = () => {
  const React = require('react');
  const {Text} = require('react-native');
  return (
    <>
      <Text testID="mocked-tabs">Tabs Rendered</Text>
    </>
  );
};

describe('App Component', () => {
  it('renders BottomTabs inside NavigationContainer', () => {
    const {getByTestId} = render(<App />);
    expect(getByTestId('mocked-tabs')).toBeTruthy();
  });
});
