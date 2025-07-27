// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import VitalBox from '../components/VitalBox';
import AlertCard from '../components/AlertCard';
import VitalEditModal from '../components/VitalEditModal';
import {getAlerts, getTimeAgo} from '../Utils/Calculation';
import {getVitalData, getFieldKey} from '../Utils/DataConstants';
import {updateVitalField} from '../redux/VitalSlice';

// Define types for the props and state
interface Vital {
  label: string;
  value: number | string;
  unit: string;
  normalMin: number;
  normalMax: number;
  dangerMax: number;
  lastUpdated: string;
  height?: number | string;
  weight?: number | string;
}


const VitalsAlertScreen = () => {
  const records = useSelector((state: any) => state.vitals.records);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedVital, setSelectedVital] = useState<Vital | null>(null);
  const [timeAgo, setTimeAgo] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const latest = records.length > 0 ? records[records.length - 1] : null;
  const alerts = getAlerts(latest);

  useEffect(() => {
    if (!latest) return;

    const updateTime = () => setTimeAgo(getTimeAgo(latest.date));

    updateTime(); // set immediately
    const interval = setInterval(updateTime, 60000); // every minute

    return () => clearInterval(interval); // cleanup on unmount
  }, [latest]);

  const lastUpdated = timeAgo;
  const vitalData = getVitalData(latest, lastUpdated);

  const handleVitalPress = (vital: Vital) => {
    setSelectedVital(vital);
    setModalVisible(true);
  };

  const handleSaveValue = (value: any) => {
    if (selectedVital?.label === 'BMI') {
      dispatch(
        updateVitalField({
          field: 'bmi',
          value: {
            bmi: value.bmi,
            height: value.height,
            weight: value.weight,
          },
        }),
      );
      setSuccessMessage('BMI updated successfully');
    } else {
      dispatch(
        updateVitalField({field: getFieldKey(selectedVital?.label), value}),
      );
      setSuccessMessage(`${selectedVital?.label} updated successfully`);
    }

    setTimeout(() => setSuccessMessage(''), 2000);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {successMessage !== '' && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{successMessage}</Text>
        </View>
      )}
      <FlatList
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            <Text style={styles.header}>Health Records</Text>
            <Text style={styles.subHeader}>Your Vitals</Text>

            {alerts.map((alert, index) => (
              <AlertCard key={index} alert={alert} />
            ))}

            {vitalData.length === 0 && (
              <Text style={{textAlign: 'center', marginTop: 20}}>
                No vitals available
              </Text>
            )}
          </>
        }
        data={vitalData}
        keyExtractor={(item: Vital) => item.label}
        renderItem={({item}: {item: Vital}) => (
          <TouchableOpacity onPress={() => handleVitalPress(item)}>
            <VitalBox
              label={item.label}
              value={item.value}
              unit={item.unit}
              normalMin={item.normalMin}
              normalMax={item.normalMax}
              dangerMax={item.dangerMax}
              lastUpdated={item.lastUpdated}
            />
          </TouchableOpacity>
        )}
      />
      <VitalEditModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveValue}
        vital={selectedVital}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    color: '#555',
  },
  toast: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
    zIndex: 99,
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default VitalsAlertScreen;
