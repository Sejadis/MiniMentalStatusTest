import React, {useState} from 'react';
import {Button, Modal, View, StyleSheet} from 'react-native';
import TestStartModal from './TestStartModal';

const MainScreen = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const startTest = () => {
    console.log('starting test');
    setIsModalVisible(true);
  };
  const showResults = () => {
    navigation.navigate('Result');
  };

  const showAdditionalInformation = () => {};

  return (
    <View style={styles.main}>
      <Button
        style={styles.button}
        title={'Test starten'}
        onPress={startTest}
      />
      <Button
        style={styles.button}
        title={'Mehr Informationen'}
        onPress={showAdditionalInformation}
      />
      <Button
        style={styles.button}
        title={'Testergebnisse'}
        onPress={showResults}
      />
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <TestStartModal
          startTest={() => {
            setIsModalVisible(false);
            navigation.navigate('Test');
          }}
          closeModal={() => {
            setIsModalVisible(false);
          }}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    height: '30%',
  },
  button: {
    width: '50%',
    padding: 25,
  },
});
export default MainScreen;
