import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SearchBar from '../src/screens/SearchBar';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

describe('SearchBar', () => {
  it('renders input and search button', () => {
    const {getByPlaceholderText, getByTestId} = render(<SearchBar />);
    expect(getByPlaceholderText('Search...')).toBeTruthy();
    expect(getByTestId('search-button')).toBeTruthy();
  });

  it('updates input value on change', () => {
    const {getByPlaceholderText} = render(<SearchBar />);
    const input = getByPlaceholderText('Search...');
    fireEvent.changeText(input, 'React');
    expect(input.props.value).toBe('React');
  });

  it('adds a query to history on search', () => {
    const {getByPlaceholderText, getByTestId, getByText} = render(
      <SearchBar />,
    );
    const input = getByPlaceholderText('Search...');
    const searchButton = getByTestId('search-button');

    fireEvent.changeText(input, 'React Native');
    fireEvent.press(searchButton);

    expect(input.props.value).toBe('');
    expect(getByText('React Native')).toBeTruthy();
  });

  it('does not add duplicate entries to history', () => {
    const {getByPlaceholderText, getByTestId, queryAllByText} = render(
      <SearchBar />,
    );
    const input = getByPlaceholderText('Search...');
    const searchButton = getByTestId('search-button');

    fireEvent.changeText(input, 'Expo');
    fireEvent.press(searchButton);

    fireEvent.changeText(input, 'Expo');
    fireEvent.press(searchButton);

    expect(queryAllByText('Expo').length).toBe(1);
  });

  it('hides dropdown when close button is pressed', () => {
    const {getByPlaceholderText, getByTestId, queryByText} = render(
      <SearchBar />,
    );
    const input = getByPlaceholderText('Search...');
    const searchButton = getByTestId('search-button');

    fireEvent.changeText(input, 'Query');
    fireEvent.press(searchButton);

    const closeButton = getByTestId('close-button');
    expect(queryByText('Query')).toBeTruthy();

    fireEvent.press(closeButton);
    expect(queryByText('Query')).toBeNull();
  });
});