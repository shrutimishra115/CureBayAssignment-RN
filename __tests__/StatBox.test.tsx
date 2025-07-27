import React from 'react';
import {render} from '@testing-library/react-native';
import StatBox from '../src/components/StatBox';

describe('StatBox Component', () => {
  it('renders the label and value correctly when value is a string', () => {
    const mockProps = {
      label: 'Heart Rate',
      value: '72 bpm',
    };

    const {getByText} = render(<StatBox {...mockProps} />);
    expect(getByText('Heart Rate')).toBeTruthy();
    expect(getByText('72 bpm')).toBeTruthy();
  });

  it('renders label and value with correct styles', () => {
    const mockProps = {
      label: 'Oxygen Level',
      value: '98%',
    };

    const {getByText} = render(<StatBox {...mockProps} />);
    const label = getByText('Oxygen Level');
    expect(label.props.style).toEqual(
      expect.objectContaining({fontSize: 12, color: '#777'}),
    );
    const value = getByText('98%');
    expect(value.props.style).toEqual(
      expect.objectContaining({fontSize: 16, color: '#2E7D32'}),
    );
  });
});
