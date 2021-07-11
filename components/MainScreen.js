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
        title={'Test starten'}
        onPress={startTest}
      />
      <Button
        title={'Mehr Informationen'}
        onPress={showAdditionalInformation}
      />
      <Button
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
});
export default MainScreen;
