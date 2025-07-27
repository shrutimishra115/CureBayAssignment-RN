/**
 * @format
 */

import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import vitalsReducer from '../src/redux/VitalSlice';

jest.mock('@react-navigation/native', () => {
  const React = require('react');
  return {
    NavigationContainer: ({children}: any) => <>{children}</>,
  };
});

jest.mock('../src/navigation/Navigation', () => {
  
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
const MockStore = configureStore({
  reducer: {
    vitals: vitalsReducer,
  },
});

describe('App Component with Redux Provider', () => {
  it('renders BottomTabs inside NavigationContainer with Redux provider', () => {
    const {getByTestId} = render(
      <Provider store={MockStore}>
        <App />
      </Provider>,
    );

    expect(getByTestId('mocked-tabs')).toBeTruthy();
  });
});