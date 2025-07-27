
import React from 'react';
import {render} from '@testing-library/react-native';
import Card from '../src/components/Card'; 
import {Text} from 'react-native';

const mockIcon = <Text>Icon</Text>; 

describe('Card Component', () => {
  const mockProps = {
    title: 'Heart Rate',
    value: 72,
    unit: 'bpm',
    color: '#FF5733',
    icon: mockIcon,
  };

  it('renders the Card component with the correct title, value, unit, and icon', () => {
     const {getByText, getByTestId} =  render(<Card {...mockProps} />);
    const icon = getByTestId('card-icon');
    expect(icon).toBeTruthy();
  
    expect(getByText('Heart Rate')).toBeTruthy();
    expect(getByText('bpm')).toBeTruthy();
  });

});
