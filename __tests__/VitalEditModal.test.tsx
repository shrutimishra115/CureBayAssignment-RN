import React from 'react';
import {render} from '@testing-library/react-native';
import VitalEditModal from '../src/components/VitalEditModal';

describe('VitalEditModal', () => {
    jest.mock('react-native-vector-icons', () => ({
      Ionicons: 'Ionicons',
      FontAwesome5: 'FontAwesome5',
      MaterialCommunityIcons: 'MaterialCommunityIcons',
      // Add other icon sets you use here if needed
    }));
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();



  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip('renders correctly for non-BMI vital', () => {
    const vital = {label: 'Heart Rate', value: 80, unit: 'bpm'};
    const {getByText, getByDisplayValue} = render(
      <VitalEditModal
        visible={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        vital={vital}
      />,
    );

    expect(getByText('Edit Heart Rate')).toBeTruthy();
    expect(getByDisplayValue('80')).toBeTruthy();
  });

  it.skip('renders both height and weight inputs when editing BMI', () => {
    const vital = {
      label: 'BMI',
      value: 25,
      height: 170,
      weight: 72,
      unit: '',
    };

    const {getByText, getByDisplayValue} = render(
      <VitalEditModal
        visible={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        vital={vital}
      />,
    );

    expect(getByText('Edit BMI')).toBeTruthy();
    expect(getByDisplayValue('170')).toBeTruthy(); // Height
    expect(getByDisplayValue('72')).toBeTruthy(); // Weight
  });
});
