// @ts-nocheck
import React, {useState} from 'react';
import {
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addVital} from '../redux/VitalSlice';
import InputText from '../components/InputText';
import {calculateBMI} from '../Utils/Calculation';
import {VitalFields} from '../Utils/DataConstants';

interface VitalsInputProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const VitalsInput: React.FC<VitalsInputProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    respirationRate: '',
    bloodPressureSys: '',
    bloodPressureDia: '',
    oxygen: '',
    glucose: '',
    heartRate: '',
    temperature: '',
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Handle input change
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    setErrors(prev => ({...prev, [field]: ''}));
  };

  // Validation function
  const isValid = (value: string) => !isNaN(Number(value)) && value !== '';

  // Handle form submission
  const handleAdd = () => {
    // Type for newErrors object
    const newErrors: {[key: string]: string} = {};

    // Validate form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (!isValid(value)) newErrors[key] = 'Invalid or empty';
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const h = parseFloat(formData.height);
    const w = parseFloat(formData.weight);

    // Calculate BMI (ensure it is a valid number)
    const bmi = calculateBMI(formData.height, formData.weight);

    if (isNaN(bmi)) {
      setErrors(prev => ({...prev, bmi: 'Invalid BMI value'}));
      return;
    }

    const date = new Date().toISOString();

    // Dispatch action
    dispatch(
      addVital({
        ...formData,
        height: h,
        weight: w,
        bmi,
        date,
      }),
    );

    // Reset form and errors
    setFormData({
      height: '',
      weight: '',
      respirationRate: '',
      bloodPressureSys: '',
      bloodPressureDia: '',
      oxygen: '',
      glucose: '',
      heartRate: '',
      temperature: '',
    });
    setErrors({});

    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Add New Vitals</Text>
            <FlatList
              data={VitalFields}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <InputText
                  icon={item.icon}
                  label={item.label}
                  unit={item.unit}
                  value={formData[item.key]}
                  onChange={v => handleChange(item.key, v)}
                  error={errors[item.key]}
                />
              )}
              ListFooterComponent={
                <>
                  <TouchableOpacity style={styles.button} onPress={handleAdd}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}>
                    <Text style={styles.closeText}>Close</Text>
                  </TouchableOpacity>
                </>
              }
              contentContainerStyle={{paddingBottom: 40}}
              keyboardShouldPersistTaps="handled"
            />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default VitalsInput;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#063970',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  closeText: {
    color: '#0066cc',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
