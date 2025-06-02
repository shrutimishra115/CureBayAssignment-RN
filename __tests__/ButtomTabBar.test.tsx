import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from '../src/navigation/BottomTabBar';

jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: ({children}: any) => children,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock('@react-navigation/bottom-tabs', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    createBottomTabNavigator: () => {
      return {
        Navigator: ({children}: any) => <>{children}</>,
        Screen: ({name, component: Component}: any) => (
          <View testID={`tab-${name.toLowerCase()}`}>
            <Component />
          </View>
        ),
      };
    },
  };
});

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

describe('BottomTabs Navigation', () => {
  it('navigates between tabs correctly', async () => {
    const {getByText, getByTestId, getByPlaceholderText} = render(
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>,
    );

    // Screen 1: Calculator (initial)
    expect(getByText('Add')).toBeTruthy(); // Update this based on actual text in AddCalculator

    // Navigate to Search
    const searchTab = getByTestId('tab-search');
    fireEvent.press(searchTab);
    // fireEvent.press(getByText('Search'));
    await waitFor(() => {
      expect(getByPlaceholderText('Search...')).toBeTruthy(); // Placeholder in SearchBar
    });

    // Navigate to TwoSum
    const twosumTab = getByTestId('tab-twosum');
    fireEvent.press(twosumTab);
    await waitFor(() => {
      expect(getByPlaceholderText('Numbers (comma-separated)')).toBeTruthy(); // Placeholder in SearchBar
    });

    // Navigate to calculator
    const calculatorTab = getByTestId('tab-calculator');
    fireEvent.press(calculatorTab);
    await waitFor(() => {
      expect(getByPlaceholderText('Number 1')).toBeTruthy(); // Placeholder in SearchBar
    });
  });
});
