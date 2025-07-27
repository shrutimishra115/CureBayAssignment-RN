import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CardProps {
  title: string;
  value: string | number;
  unit: string;
  color: string;
  icon: string;
}

const Card = ({title, value, unit, color, icon}: CardProps) => (
  <View style={[styles.card, {borderColor: color}]}>
    <View style={styles.cardRow}>
      <Icon
        name={icon}
        size={20}
        color={color}
        style={styles.icon}
        testID="card-icon"
      />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <Text style={[styles.cardValue, {color}]} >
      {value}
      <Text style={styles.unit}> {unit}</Text>
    </Text>
  </View>
);
const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 16,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 6,
  },
  unit: {
    fontSize: 14,
    color: '#777',
  },
});
export default Card;
