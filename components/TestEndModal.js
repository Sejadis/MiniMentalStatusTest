import React from 'react';
import {Button, View, StyleSheet, TouchableOpacity} from 'react-native';

const TestEndModal = ({navToEvaluation, navToHome, closeModal}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={StyleSheet.absoluteFillObject}
        onPressOut={closeModal}>
        <View style={styles.background} />
      </TouchableOpacity>
      <View style={styles.modal}>
        <Button title={'Startseite'} onPress={navToHome} />
        <Button title={'Auswertung'} onPress={navToEvaluation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {flex: 1, backgroundColor: 'rgba(158,158,158,0.64)'},
  modal: {
    width: '75%',
    height: '35%',
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default TestEndModal;
