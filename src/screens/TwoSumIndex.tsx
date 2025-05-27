import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';

/**
 * The function `twoSum` takes an array of numbers and a target number, and returns an array of two
 * indices whose corresponding values add up to the target.
 * @param {number[]} numbers - An array of numbers that you will search for a pair that sums up to the
 * target value.
 * @param {number} target - The `target` parameter in the `twoSum` function represents the sum that we
 * are trying to find by adding two numbers from the `numbers` array. The function iterates through the
 * array to find two numbers that add up to the target value. If such a pair is found, the function
 * @returns An array containing the indices of the two numbers in the input array `numbers` that add up
 * to the `target` number is being returned. If no such pair is found, an empty array is returned.
 */
const twoSum = (numbers: number[], target: number): number[] => {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }

  return [];
};

const TwoSumIndex = () => {
  const [nums, setNums] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState<number[]>([]);

  /**
   * The function `handleCalculate` parses input numbers, performs a calculation using the `twoSum`
   * function, and sets the result.
   */
  const handleCalculate = () => {
    const parsedNums = nums.split(',').map(n => parseInt(n.trim()));
    const res = twoSum(parsedNums, parseInt(target));
    setResult(res);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Numbers (comma-separated)"
        style={styles.input}
        value={nums}
        onChangeText={setNums}
      />
      <TextInput
        placeholder="Target"
        style={styles.input}
        value={target}
        onChangeText={setTarget}
        keyboardType="numeric"
      />
      <Button title="Find Indices" onPress={handleCalculate} />
      {result.length > 0 && (
        <Text style={styles.result}>Result: [{result.join(', ')}]</Text>
      )}
    </View>
  );
};

export default TwoSumIndex;

const styles = StyleSheet.create({
  container: {padding: 20},
  input: {borderWidth: 1, marginVertical: 10, padding: 10, borderRadius: 5},
  result: {marginTop: 20, fontSize: 18},
});
