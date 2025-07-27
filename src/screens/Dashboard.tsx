import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import VitalsInput from './VitalsInput';

const Dashboard =()=> {
  const [modalVisible, setModalVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showSuccess && (
        <Text style={styles.success}>Vitals added successfully!</Text>
      )}
      <Text style={styles.title}>Vitals Dashboard</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addText}>+ Add Vitals</Text>
      </TouchableOpacity>

      <VitalsInput
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSuccess={handleSuccess}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 20},
  success: {
    backgroundColor: '#AAFF8D',
    padding: 10,
    borderRadius: 6,
    fontSize: 14,
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#063970',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addText: {color: '#fff', fontSize: 16},
});

export default Dashboard;