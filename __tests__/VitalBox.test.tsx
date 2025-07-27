import React from 'react';
import {render} from '@testing-library/react-native';
import VitalBox from '../src/components/VitalBox'; 

jest.mock('../src/utils/Calculation', () => ({
  getTooltipColor: jest.fn().mockReturnValue('green'),
}));

describe('VitalBox Component', () => {
  const mockProps = {
    label: 'Heart Rate',
    value: 72,
    unit: 'bpm',
    normalMin: 60,
    normalMax: 100,
    dangerMax: 120,
    lastUpdated: '2021-09-01 12:30 PM',
  };

  it('renders label, value, unit, and last updated correctly', () => {
    const {getByText} = render(<VitalBox {...mockProps} />);

    expect(getByText('Heart Rate')).toBeTruthy();
    expect(getByText('2021-09-01 12:30 PM')).toBeTruthy();
  });

  it('applies tooltip color based on value (mocked)', () => {
    const {getByText} = render(<VitalBox {...mockProps} />);

    const tooltipText = getByText('72bpm');
    expect(tooltipText.props.style[1].color).toBe('green');
  });


  it('calculates normalized value and left position correctly', () => {
    const normalized =
      (mockProps.value - mockProps.normalMin) /
      (mockProps.dangerMax - mockProps.normalMin);
    const expectedLeftPercent = `${normalized * 100}%`;

    const {getByTestId} = render(<VitalBox {...mockProps} />);

    const tooltip = getByTestId('tooltip');
    expect(tooltip.props.style[1].left).toBe(expectedLeftPercent);
  });
});
