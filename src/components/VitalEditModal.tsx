import React, {useState, useEffect} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import InputText from './InputText';
import {getIconForVital} from '../Utils/DataConstants';
import {calculateBMI} from '../Utils/Calculation';

// Type for the vital prop
interface Vital {
  label: string;
  value: number | string;
  unit: string;
  height?: number | string;
  weight?: number | string;
}

// Type for the props of the VitalEditModal component
interface VitalEditModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void; // The onSave function, accepts an object with height, weight, or value
  vital: Vital | null; // vital prop can be an object with the shape of `Vital` or `null`
}

const VitalEditModal = ({
  visible,
  onClose,
  onSave,
  vital,
}: VitalEditModalProps) => {
  const isBMI = vital?.label === 'BMI';

  const [inputValue, setInputValue] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (vital) {
      setInputValue(vital?.value?.toString() || '');
      setHeight(vital?.height?.toString() || '');
      setWeight(vital?.weight?.toString() || '');
      setError('');
    }
  }, [vital]);

  const handleSave = () => {
    if (isBMI) {
      const h = parseFloat(height);
      const w = parseFloat(weight);

      if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
        setError('Please enter valid height and weight');
        return;
      }

      const bmi = calculateBMI(height, weight);

      onSave({bmi, height: h, weight: w});
      onClose();
    } else {
      const val = parseFloat(inputValue);
      if (isNaN(val) || val < 0) {
        setError('Please enter a valid number');
        return;
      }
      onSave(val);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <Text style={styles.title}>Edit {vital?.label}</Text>

          {isBMI ? (
            <>
              <InputText
                label="Height"
                value={height}
                onChange={setHeight}
                unit="cm"
                icon={getIconForVital('Height')}
                error={error}
              />
              <View style={{marginTop: 40}}>
                <InputText
                  label="Weight"
                  value={weight}
                  onChange={setWeight}
                  unit="kg"
                  icon={getIconForVital('Weight')}
                  error={error}
                />
              </View>
            </>
          ) : (
            <InputText
              label={vital?.label}
              value={inputValue}
              onChange={setInputValue}
              unit={vital?.unit || ''}
              icon={getIconForVital(vital?.label || '')}
              error={error}
            />
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={{color: '#555'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
              <Text style={{color: '#fff'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    width: '85%',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 56,
  },
  cancelBtn: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  saveBtn: {
    backgroundColor: '#0070C0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
});

export default VitalEditModal;
