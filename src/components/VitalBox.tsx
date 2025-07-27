// @ts-nocheck
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getTooltipColor} from '../utils/Calculation';

interface VitalBoxProps {
  label: string;
  value: number;
  unit?: string;
  normalMin: number;
  normalMax: number;
  dangerMax: number;
  lastUpdated: string;
}

const VitalBox = ({
  label,
  value,
  unit = '',
  normalMin,
  normalMax,
  dangerMax,
  lastUpdated,
}: VitalBoxProps) => {
  const normalized =
    value <= normalMin
      ? 0
      : value >= dangerMax
      ? 1
      : (value - normalMin) / (dangerMax - normalMin);
  const leftPercent = `${normalized * 100}%` as 'string' | number;
  const tooltipColor = getTooltipColor(normalized);
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.updated}>
          Last Updated: <Text style={{fontWeight: 'bold'}}>{lastUpdated}</Text>
        </Text>
      </View>
      <Text style={styles.subLabel}>
        Normal Range: {normalMin}–{normalMax} {unit}
      </Text>

      <View style={styles.barContainer}>
        <View style={[styles.tooltip, {left: leftPercent}]} testID="tooltip">
          <Text style={[styles.tooltipText, {color: tooltipColor}]}>
            {value}
            {unit}
          </Text>
        </View>
        <View style={styles.barBackground}>
          <LinearGradient
            colors={['#4caf50', '#f44336']} // green →  red
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.barGradient}
          />
        </View>
      </View>
    </View>
  );
};

export default VitalBox;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0070C0',
  },
  subLabel: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  updated: {
    fontSize: 12,
    color: '#666',
  },
  barContainer: {
    marginTop: 30,
    height: 40,
    position: 'relative',
    justifyContent: 'center',
  },
  tooltip: {
    position: 'absolute',
    top: -20,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 10,
    alignItems: 'center',
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  barBackground: {
    height: 6,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 3,
  },
});
