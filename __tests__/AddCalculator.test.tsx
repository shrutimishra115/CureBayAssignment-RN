import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AddCalculator from '../src/screens/AddCalculator';


jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

describe('AddCalculator', () => {
    
  it('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(<AddCalculator />);
    expect(getByPlaceholderText('Number 1')).toBeTruthy();
    expect(getByPlaceholderText('Number 2')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
  });

  it('performs addition correctly', () => {
    const {getByPlaceholderText, getByText} = render(<AddCalculator />);

    const num1Input = getByPlaceholderText('Number 1');
    fireEvent.changeText(num1Input, '10');
    const num2Input = getByPlaceholderText('Number 2');
    fireEvent.changeText(num2Input, '5');
    const addButton = getByText('Add');

    fireEvent.press(addButton);

    expect(getByText('Total: 15')).toBeTruthy();
  });

  it('increments and decrements input values', () => {
    const {getByPlaceholderText, getByTestId} = render(<AddCalculator />);

    fireEvent.press(getByTestId('increment-Number 1'));
    expect(getByPlaceholderText('Number 1').props.value).toBe('1');
    fireEvent.press(getByTestId('decrement-Number 1'));
    expect(getByPlaceholderText('Number 1').props.value).toBe('0');

  });

  it('does not calculate sum if inputs are empty', () => {
    const {getByText} = render(<AddCalculator />);
    const addButton = getByText('Add');
    fireEvent.press(addButton);
    expect(getByText('Total: 0')).toBeTruthy(); // total remains unchanged
  });
});
