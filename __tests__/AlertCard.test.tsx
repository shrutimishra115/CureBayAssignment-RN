import React from 'react';
import {render} from '@testing-library/react-native';
import AlertCard from '../src/components/AlertCard';

const mockAlert = {
  text: '⚠️ High Heart Rate',
  action: 'Take rest',
};

describe('AlertCard Component', () => {
  it('renders alert text and action correctly', () => {
    const {getByText} = render(<AlertCard alert={mockAlert} />);

    expect(getByText('⚠️ High Heart Rate')).toBeTruthy();

    expect(getByText('👉 Take rest')).toBeTruthy();
  });
});
