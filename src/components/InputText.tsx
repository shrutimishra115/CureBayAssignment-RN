/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';


interface InputTextProps {
  icon: React.ReactNode;
  label: string| undefined;
  value: string;
  onChange: (text: string) => void;
  unit: string;
  error?: string | null;
}

const InputText = ({
  icon,
  label,
  value,
  onChange,
  unit,
  error,
}: InputTextProps) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>
      {label}
      <Text style={{color: 'red'}}>*</Text>
    </Text>
    <View style={{flexDirection: 'row', flex: 1}}>
      <View style={styles.circle}>{icon}</View>
      <View style={[styles.inputContainer, error && {borderColor: 'red'}]}>
        <TextInput
          style={styles.input}
          placeholder={`Enter ${label}`}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChange}
          keyboardType="numeric"
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 6,
    color: '#2c3e50',
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 48,
  },
  circle: {
    backgroundColor: '#e6f0fb',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  input: {
    flex: 0.8,
    fontSize: 12,
    color: '#000',
    paddingVertical: 10,
    paddingHorizontal: 8,
    height: '100%',
  },
  unit: {
    flex: 0.2,
    fontSize: 10,
    color: '#333',
    paddingVertical: 15,
    paddingHorizontal: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f0fb',
    borderLeftWidth: 1,
    borderColor: '#ccc',
    height: '100%',
  },
  error: {
    color: 'red',
    fontSize: 11,
    marginTop: 4,
    marginLeft: 40,
  },
});

export default InputText;
