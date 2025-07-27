import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Dashboard from '../src/screens/Dashboard';


jest.mock('../src/screens/VitalsInput', () => {
      const React = require('react');
      const {Text, TouchableOpacity} = require('react-native');
  return ({visible, onClose, onSuccess}) => {
    return visible ? (
      <>
        <Text testID="VitalsInputMock">VitalsInput is open</Text>
        <TouchableOpacity
          testID="mockSuccessButton"
          onPress={() => {
            onSuccess();
            onClose();
          }}>
          <Text>Save</Text>
        </TouchableOpacity>
      </>
    ) : null;
  };
});

describe('Dashboard', () => {
  it('renders title and add button', () => {
    const {getByText} = render(<Dashboard />);
    expect(getByText('Vitals Dashboard')).toBeTruthy();
    expect(getByText('+ Add Vitals')).toBeTruthy();
  });

  it('opens VitalsInput modal on button press', () => {
    const {getByText, getByTestId} = render(<Dashboard />);
    fireEvent.press(getByText('+ Add Vitals'));
    expect(getByTestId('VitalsInputMock')).toBeTruthy();
  });

  it('shows success message after saving vitals', async () => {
    const {getByText, getByTestId, queryByText} = render(<Dashboard />);

    fireEvent.press(getByText('+ Add Vitals'));

 
    fireEvent.press(getByTestId('mockSuccessButton'));

    expect(getByText('Vitals added successfully!')).toBeTruthy();

    await waitFor(
      () => {
        expect(queryByText('Vitals added successfully!')).toBeNull();
      },
      {timeout: 1500},
    );
  });
});
