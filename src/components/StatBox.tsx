import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface StatBoxProps {
  label: string;
  value: string | number;
}

const StatBox = ({label, value}: StatBoxProps) => {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statBox: {
    alignItems: 'center',
    minWidth: 50,
  },
  statValue: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
  },
});

export default StatBox;
