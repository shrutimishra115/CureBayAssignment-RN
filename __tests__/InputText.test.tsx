import React from 'react';
import {render} from '@testing-library/react-native';
import InputText from '../src/components/InputText';
import {Text} from 'react-native';

describe('InputText Component', () => {
  const mockOnChange = jest.fn(); 
  const mockIcon = <Text>Icon</Text>; 

  const mockProps = {
    icon: mockIcon,
    label: 'Height',
    value: '170',
    onChange: mockOnChange,
    unit: 'cm',
    error: null, // No error
  };

  it('renders correctly with label, value, and unit', () => {
     const {getByText, getByDisplayValue, getByPlaceholderText} = render(
       <InputText {...mockProps} />,
     );
    expect(getByText('Icon')).toBeTruthy();
    expect(getByPlaceholderText('Enter Height')).toBeTruthy();
    expect(getByDisplayValue('170')).toBeTruthy(); 
    expect(getByText('cm')).toBeTruthy(); 
  });
});
