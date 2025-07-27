import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Alert {
  text: string;
  action: string;
}

interface AlertCardProps {
  alert: Alert;
}

const AlertCard = ({alert}: AlertCardProps) => (
  <View style={styles.alertCard}>
    <Text style={styles.alertText}>{alert.text}</Text>
    <Text style={styles.action}>👉 {alert.action}</Text>
  </View>
);

export default AlertCard;

const styles = StyleSheet.create({
  alertCard: {
    backgroundColor: '#F9E1E5',
    borderLeftWidth: 5,
    borderLeftColor: '#BB0223',
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
  },
  alertText: {
    fontSize: 16,
    color: '#BB0223',
  },
  action: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
});
