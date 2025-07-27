import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {LineChart} from 'react-native-gifted-charts';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getWeekdays, calcStats} from '../Utils/Calculation';
import {oxyLevelData} from '../Utils/DataConstants';
import Card from '../components/Card';
import StatBox from '../components/StatBox';

interface VitalRecord {
  date: string;
  heartRate: string;
  bmi: string;
  bloodPressureSys: string;
  bloodPressureDia: string;
  oxygen: string;
  glucose: string;
  respirationRate: string;
  temperature: string;
}

interface RootState {
  vitals: {
    records: VitalRecord[];
  };
}

const screenWidth = Dimensions.get('window').width;

const VitalsHistory =() => {
  const records = useSelector((state: RootState) => state.vitals.records);
  const [dateFilter, setDateFilter] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  // Function to filter records by selected date
  const filterByDate = (data: VitalRecord[]) => {
    const selectedDate = dateFilter.toISOString().split('T')[0];
    return data.filter(item => item.date.startsWith(selectedDate));
  };

  const filtered = filterByDate(records);

  const getChartDataWithLabels = (key: keyof VitalRecord) =>
    filtered
      .map((item, idx) => ({
        value: parseFloat(item[key]),
        label: getWeekdays()[idx] || `#${idx + 1}`,
      }))
      .filter(item => !isNaN(item.value));

  const systolicData = getChartDataWithLabels('bloodPressureSys');
  const diastolicData = getChartDataWithLabels('bloodPressureDia');
  const oxygenData = getChartDataWithLabels('oxygen');

  const latest = filtered[filtered.length - 1] || {};
  const latestPulse = latest.heartRate || '--';
  const latestBMI = latest.bmi || '--';

  const bpStats = calcStats(systolicData);
  const oxyStats = calcStats(oxygenData);
  const pulseStats = calcStats(getChartDataWithLabels('heartRate'));

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Overview of Vitals</Text>

        <Text style={styles.subHeading}>Select Date:</Text>
        <Text onPress={() => setShowPicker(true)} style={styles.dateText}>
          {dateFilter.toDateString()}{' '}
        </Text>
        {showPicker && (
          <DateTimePicker
            value={dateFilter}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDateFilter(selectedDate);
            }}
          />
        )}

        {/* Cards */}
        <View style={styles.cardContainer}>
          <Card
            title="Pulse"
            value={latestPulse}
            unit="bpm"
            color="#F06292"
            icon="heart-pulse"
          />
          <Card
            title="BMI"
            value={latestBMI}
            unit=""
            color="#1976D2"
            icon="scale-bathroom"
          />
        </View>

        {/* Blood Pressure */}
        <View style={styles.chartContainer}>
          <View style={styles.headerStatRow}>
            <View style={styles.leftLabel}>
              <View style={styles.sideLine} />
              <Text style={styles.sectionTitle}>Blood Pressure</Text>
            </View>
            <View style={styles.statGroup}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}> {bpStats.min}</Text>
                <Text style={styles.statLabel}>Min</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>
                  {' '}
                  {bpStats.avg === '--'
                    ? bpStats.avg
                    : Number(bpStats.avg).toFixed(0)}
                </Text>
                <Text style={styles.statLabel}>Average</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}> {bpStats.max}</Text>
                <Text style={styles.statLabel}>Max</Text>
              </View>
            </View>
          </View>

          <LineChart
            data={systolicData}
            data2={diastolicData}
            width={screenWidth - 80}
            height={180}
            spacing={30}
            thickness={2}
            color1="#C62828"
            color2="#1565C0"
            hideDataPoints={false}
            yAxisTextStyle={{color: '#555'}}
            xAxisLabelTextStyle={{color: '#555'}}
            rulesColor="#eee"
          />

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: '#C62828'}]} />
              <Text style={styles.legendText}>Systolic</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: '#1565C0'}]} />
              <Text style={styles.legendText}>Diastolic</Text>
            </View>
          </View>
        </View>

        {/* Oxy Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.labelRow}>
            <View style={styles.leftLabel}>
              <View style={styles.sideLine} />
              <Text style={styles.sectionTitle}>Oxy Level</Text>
            </View>
            <View style={styles.statGroup}>
              <StatBox label="Min SpO2%" value={`${oxyStats.min}%`} />
              <StatBox
                label="Min PR"
                value={`${pulseStats.min}-${pulseStats.max}`}
              />
            </View>
          </View>

          <View style={{width: '100%', alignItems: 'center', marginBottom: 32}}>
            <Text style={styles.verticalLabel}>Percentage Saturation%</Text>

            <LineChart
              data={oxyLevelData}
              width={screenWidth - 80}
              height={180}
              spacing={40}
              thickness={2}
              color="#1565C0"
              yAxisLabelTexts={['10', '30', '50', '70', '90', '100']}
              xAxisLabelTexts={[
                '10',
                '50',
                '90',
                '130',
                '170',
                '210',
                '250',
                '290',
              ]}
              xAxisLabelTextStyle={{color: '#555'}}
              yAxisTextStyle={{color: '#555'}}
              dataPointsShape="circle"
              hideDataPoints={false}
              hideRules={false}
              rulesColor="#eee"
            />

            <Text style={styles.bottomLabel}>Pulse Rate</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VitalsHistory;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    padding: 10,
    backgroundColor: '#e6f0fb',
    borderRadius: 6,
    color: '#063970',
    marginBottom: 10,
  },

  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  chartContainer: {
    marginBottom: 32,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  // Blood Pressure + Oxy header layout
  headerStatRow: {
    marginBottom: 10,
  },
  leftLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideLine: {
    width: 4,
    height: 18,
    backgroundColor: '#d81b60',
    marginRight: 6,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },

  statGroup: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
    minWidth: 50,
  },
  statValue: {
    fontSize: 16,
    color: '#2E7D32', // green color
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
  },

  legendRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 20,
    height: 10,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#444',
  },
  verticalLabel: {
    position: 'absolute',
    left: -70,
    top: 80,
    transform: [{rotate: '-90deg'}],
    fontSize: 12,
    color: '#777',
  },
  bottomLabel: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#777',
  },
});
