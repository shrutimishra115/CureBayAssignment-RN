import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';

/**
 * The `twoSum` function in TypeScript React finds two numbers in an array that add up to a target sum.
 * @param {number[]} numbers - An array of numbers that you will search for a pair that sums up to the
 * target value.
 * @param {number} target - The `target` parameter in the `twoSum` function represents the sum that we
 * are trying to find by adding two numbers from the `numbers` array. The function iterates through the
 * array to find two numbers that add up to the target value. If such a pair is found, the function
 * @returns The function `twoSum` returns an array containing the indices of the two numbers in the
 * input `numbers` array that add up to the `target` number. If no such pair is found, an empty array
 * is returned.
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
  const [error, setError] = useState('');

/**
 * The handleCalculate function in TypeScript React takes a string of numbers and a target number,
 * validates the input, and finds two numbers that sum up to the target.
 * @returns The `handleCalculate` function is returning the result of calling the `twoSum` function
 * with the `numArray` and `parsedTarget` as arguments. The result is then stored in the `res` variable
 * and checked for its length. If the length is 0, an error message is set. Finally, the result is set
 * using the `setResult` function.
 */
  const handleCalculate = () => {
    setError('');
    const parsedNums = nums
      .split(',')
      .map(n => n.trim())
      .filter(n => n !== '');
    const numArray = parsedNums.map(Number);

    if (parsedNums.some(n => isNaN(Number(n)))) {
      setError('Please enter valid numbers separated by commas.');
      setResult([]);
      return;
    }

    const parsedTarget = parseInt(target);
    if (isNaN(parsedTarget)) {
      setError('Please enter a valid target number.');
      setResult([]);
      return;
    }

    const res = twoSum(numArray, parsedTarget);
    if (res.length === 0) {
      setError('No two numbers found that sum up to the target.');
    }
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
      <Button title="Find TwoSum" onPress={handleCalculate} />
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      {result.length > 0 && (
        <Text style={styles.result}>Result: [{result.join(', ')}]</Text>
      )}
    </View>
  );
};

export default TwoSumIndex;

const styles = StyleSheet.create({
  container: {padding: 20},
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
  error: {
    marginTop: 10,
    color: 'red',
    fontSize: 14,
  },
});
