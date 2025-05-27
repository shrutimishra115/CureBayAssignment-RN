/* eslint-disable react/no-unstable-nested-components */
import {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const AddCalculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [total, setTotal] = useState<number | null>(0);

/**
 * The calculateSum function takes two input numbers, trims any whitespace, calculates their sum, and
 * sets the total value.
 * @returns If either `num1` or `num2` is an empty string after trimming, nothing is returned.
 */
  const calculateSum = () => {
    if (num1.trim() === '' || num2.trim() === '') return;
    const sum = parseFloat(num1) + parseFloat(num2);
    setTotal(sum);
  };

/**
 * The `increment` function takes a setter function and a value, increments the value by 1, and updates
 * the value using the setter function.
 * @param setter - The `setter` parameter is a function that takes a string value as an argument and
 * does something with it, such as updating a state variable or performing some other action in the
 * code.
 * @param {string} value - The `value` parameter is a string that represents a number which will be
 * incremented by 1 in the `increment` function.
 */
  const increment = (setter: (val: string) => void, value: string) => {
    const updated = (parseFloat(value || '0') + 1).toString();
    setter(updated);
  };

  const decrement = (setter: (val: string) => void, value: string) => {
    const updated = (parseFloat(value || '0') - 1).toString();
    setter(updated);
  };

/**
 * The `InputWithControls` component in TypeScript React renders an input field with numeric keyboard
 * type and increment/decrement controls using Ionicons.
 * @param  - The `InputWithControls` component takes in three props:
 */
  const InputWithControls = ({
    value,
    setValue,
    placeholder,
  }: {
    value: string;
    setValue: (val: string) => void;
    placeholder: string;
  }) => (
    <View style={styles.inputWrapper}>
      <TextInput
        placeholder={placeholder}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={setValue}
        value={value}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => increment(setValue, value)}>
          <Ionicons name="caret-up" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => decrement(setValue, value)}>
          <Ionicons name="caret-down" size={15} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <InputWithControls
        value={num1}
        setValue={setNum1}
        placeholder="Number 1"
      />
      <InputWithControls
        value={num2}
        setValue={setNum2}
        placeholder="Number 2"
      />
      <Button title="Add" onPress={calculateSum} />
      <Text style={styles.total}>Total: {total}</Text>
    </View>
  );
};

export default AddCalculator;

const styles = StyleSheet.create({
  container: {padding: 20},
  inputWrapper: {
    position: 'relative',
    marginVertical: 10,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    paddingRight: 40,
  },
  controls: {
    position: 'absolute',
    right: 8,
    // top: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: 2,
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
