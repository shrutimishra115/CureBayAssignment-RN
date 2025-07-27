import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export const VitalFields = [
  {
    key: 'height',
    label: 'Height',
    unit: 'cm',
    icon: <Ionicons name="body" size={20} color="#888" />,
  },
  {
    key: 'weight',
    label: 'Weight',
    unit: 'kg',
    icon: <FontAwesome5 name="weight" size={20} color="#888" />,
  },
  {
    key: 'respirationRate',
    label: 'Respiration Rate',
    unit: 'breaths/min',
    icon: <MaterialCommunityIcons name="lungs" size={20} color="#888" />,
  },
  {
    key: 'temperature',
    label: 'Temperature',
    unit: '°F',
    icon: <MaterialCommunityIcons name="thermometer" size={20} color="#888" />,
  },
  {
    key: 'bloodPressureSys',
    label: 'Blood Pressure SYS',
    unit: 'mmHg',
    icon: <MaterialCommunityIcons name="blood-bag" size={20} color="#888" />,
  },
  {
    key: 'bloodPressureDia',
    label: 'Blood Pressure DIA',
    unit: 'mmHg',
    icon: <MaterialCommunityIcons name="blood-bag" size={20} color="#888" />,
  },
  {
    key: 'oxygen',
    label: 'Pulse OX',
    unit: '%',
    icon: (
      <MaterialCommunityIcons name="water-percent" size={20} color="#888" />
    ),
  },
  {
    key: 'heartRate',
    label: 'Heart Rate',
    unit: 'BPM',
    icon: <MaterialCommunityIcons name="heart-pulse" size={20} color="#888" />,
  },
  {
    key: 'glucose',
    label: 'Blood Glucose',
    unit: 'mg/dL',
    icon: <MaterialCommunityIcons name="scale" size={20} color="#888" />,
  },
];

export const oxyLevelData = [
  {value: 70, label: '10'},
  {value: 75, label: '50'},
  {value: 80, label: '90'},
  {value: 90, label: '130'}, // peak
  {value: 92, label: '170'},
  {value: 93, label: '210'},
  {value: 88, label: '250'},
  {value: 82, label: '290'},
];

export const getVitalData = (latest, lastUpdated) => {
  if (!latest) return [];

  return [
    {
      label: 'Heart Rate',
      value: latest.heartRate,
      unit: 'bpm',
      normalMin: 60,
      normalMax: 120,
      dangerMax: 200,
    },
    {
      label: 'Blood Pressure (SYS)',
      value: latest.bloodPressureSys,
      unit: 'mmHg',
      normalMin: 90,
      normalMax: 120,
      dangerMax: 180,
    },
    {
      label: 'Blood Pressure (DIA)',
      value: latest.bloodPressureDia,
      unit: 'mmHg',
      normalMin: 60,
      normalMax: 80,
      dangerMax: 120,
    },
    {
      label: 'Temperature',
      value: latest.temperature,
      unit: '°F',
      normalMin: 97,
      normalMax: 99,
      dangerMax: 104,
    },
    {
      label: 'Blood Sugar',
      value: latest.glucose,
      unit: 'mg/dL',
      normalMin: 70,
      normalMax: 100,
      dangerMax: 180,
    },
    {
      label: 'Oxy Level',
      value: latest.oxygen,
      unit: '%',
      normalMin: 95,
      normalMax: 100,
      dangerMax: 100,
    },
    {
      label: 'Respiration Rate',
      value: latest.respirationRate,
      unit: 'rpm',
      normalMin: 10,
      normalMax: 20,
      dangerMax: 100,
    },
    {
      label: 'BMI',
      value: latest.bmi,
      unit: '',
      normalMin: 18.5,
      normalMax: 24.9,
      dangerMax: 40,
    },
  ].map(item => ({...item, lastUpdated}));
};

export const getIconForVital = label => {
  switch (label) {
    case 'Heart Rate':
      return (
        <MaterialCommunityIcons name="heart-pulse" size={20} color="#888" />
      );
    case 'Blood Pressure (SYS)':
      return <MaterialCommunityIcons name="blood-bag" size={20} color="#888" />;
    case 'Blood Pressure (DIA)':
      <MaterialCommunityIcons name="blood-bag" size={20} color="#888" />;
    // eslint-disable-next-line no-fallthrough
    case 'Temperature':
      return (
        <MaterialCommunityIcons name="thermometer" size={20} color="#888" />
      );
    case 'Blood Sugar':
      return <MaterialCommunityIcons name="scale" size={20} color="#888" />;
    case 'Oxy Level':
      return (
        <MaterialCommunityIcons name="water-percent" size={20} color="#888" />
      );
    case 'Respiration Rate':
      return <MaterialCommunityIcons name="lungs" size={20} color="#888" />;
    case 'Height':
      return <Ionicons name="body" size={20} color="#888" />;
    case 'Weight':
      return <FontAwesome5 name="weight" size={20} color="#888" />;
    default:
      return '';
  }
};
export const getFieldKey = label => {
  switch (label) {
    case 'Heart Rate':
      return 'heartRate';
    case 'Blood Pressure (SYS)':
      return 'bloodPressureSys';
    case 'Blood Pressure (DIA)':
      return 'bloodPressureDia';
    case 'Temperature':
      return 'temperature';
    case 'Blood Sugar':
      return 'glucose';
    case 'Oxy Level':
      return 'oxygen';
    case 'Respiration Rate':
      return 'respirationRate';
    case 'BMI':
      return 'bmi';
    default:
      return '';
  }
};