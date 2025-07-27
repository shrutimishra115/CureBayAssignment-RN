// @ts-nocheck
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the interface for a single vital record
interface VitalRecord {
  date: string;
  height: number | string;
  weight: number | string;
  bmi: number | string;
  respirationRate: number | string;
  temperature: number | string;
  bloodPressureSys: number | string;
  bloodPressureDia: number | string;
  oxygen: number | string;
  glucose: number | string;
  heartRate: number | string;
}

// Define the initial state interface
interface VitalsState {
  records: VitalRecord[];
}

// Define the action payloads for `addVital` and `updateVitalField`
interface AddVitalPayload {
  height: number;
  weight: number;
  bmi: number;
  respirationRate: number;
  temperature: number;
  bloodPressureSys: number;
  bloodPressureDia: number;
  oxygen: number;
  glucose: number;
  heartRate: number;
}

interface UpdateVitalFieldPayload {
  field: keyof VitalRecord; // field should be one of the keys of VitalRecord
  value: string | number | {height: number; weight: number; bmi: number};
}

// Initial state
const initialState: VitalsState = {
  records: [],
};

const vitalsSlice = createSlice({
  name: 'vitals',
  initialState,
  reducers: {
    // Action to add a vital record
    addVital: (state, action: PayloadAction<AddVitalPayload>) => {
      const entry: VitalRecord = {
        date: new Date().toISOString(),
        height: action.payload.height,
        weight: action.payload.weight,
        bmi: action.payload.bmi,
        respirationRate: action.payload.respirationRate,
        temperature: action.payload.temperature,
        bloodPressureSys: action.payload.bloodPressureSys,
        bloodPressureDia: action.payload.bloodPressureDia,
        oxygen: action.payload.oxygen,
        glucose: action.payload.glucose,
        heartRate: action.payload.heartRate,
      };
      state.records.push(entry);
    },

    // Action to update a vital field
    updateVitalField: (
      state,
      action: PayloadAction<UpdateVitalFieldPayload>,
    ) => {
      const {field, value} = action.payload;

      if (state.records.length === 0) return;

      const latestIndex = state.records.length - 1;
      const updated = {...state.records[latestIndex]};

      // Use keyof VitalRecord to ensure field is a valid key of VitalRecord
      if (field === 'bmi' && typeof value === 'object') {
        // Bulk update: height, weight, and bmi
        updated.height = value.height;
        updated.weight = value.weight;
        updated.bmi = value.bmi;
      } else {
        // Single field update
        updated[field] = value;
      }

      updated.date = new Date().toISOString();
      state.records[latestIndex] = updated;
    },
  },
});

// Export actions and reducer
export const {addVital, updateVitalField} = vitalsSlice.actions;
export default vitalsSlice.reducer;
