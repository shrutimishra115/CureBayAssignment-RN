import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TwoSumIndex from '../src/screens/TwoSumIndex';

describe('TwoSumIndex', () => {
  it('renders inputs and button', () => {
    const {getByPlaceholderText, getByText} = render(<TwoSumIndex />);
    expect(getByPlaceholderText('Numbers (comma-separated)')).toBeTruthy();
    expect(getByPlaceholderText('Target')).toBeTruthy();
    expect(getByText('Find TwoSum')).toBeTruthy();
  });

  it('shows error if numbers input is invalid', () => {
    const {getByPlaceholderText, getByText, queryByText} = render(
      <TwoSumIndex />,
    );
    fireEvent.changeText(
      getByPlaceholderText('Numbers (comma-separated)'),
      'a,b,c',
    );
    fireEvent.changeText(getByPlaceholderText('Target'), '10');
    fireEvent.press(getByText('Find TwoSum'));

    expect(
      queryByText('Please enter valid numbers separated by commas.'),
    ).toBeTruthy();
  });

  it('shows error if target input is invalid', () => {
    const {getByPlaceholderText, getByText, queryByText} = render(
      <TwoSumIndex />,
    );
    fireEvent.changeText(
      getByPlaceholderText('Numbers (comma-separated)'),
      '1,2,3',
    );
    fireEvent.changeText(getByPlaceholderText('Target'), 'abc');
    fireEvent.press(getByText('Find TwoSum'));

    expect(queryByText('Please enter a valid target number.')).toBeTruthy();
  });

  it('shows result for valid input', () => {
    const {getByPlaceholderText, getByText, queryByText} = render(
      <TwoSumIndex />,
    );
    fireEvent.changeText(
      getByPlaceholderText('Numbers (comma-separated)'),
      '2, 7, 11, 15',
    );
    fireEvent.changeText(getByPlaceholderText('Target'), '9');
    fireEvent.press(getByText('Find TwoSum'));

    expect(queryByText('Result: [1, 2]')).toBeTruthy();
  });

  it('shows error if no valid pair found', () => {
    const {getByPlaceholderText, getByText, queryByText} = render(
      <TwoSumIndex />,
    );
    fireEvent.changeText(
      getByPlaceholderText('Numbers (comma-separated)'),
      '1,2,3',
    );
    fireEvent.changeText(getByPlaceholderText('Target'), '100');
    fireEvent.press(getByText('Find TwoSum'));

    expect(
      queryByText('No two numbers found that sum up to the target.'),
    ).toBeTruthy();
  });
});
