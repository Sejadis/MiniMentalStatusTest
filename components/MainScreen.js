import React, {useState} from 'react';
import {Button} from 'react-native';

const MainScreen = ({navigation}) => {

  const startTest = () => {
    navigation.navigate('Test');
  };

  const showAdditionalInformation = () => {};

  return (
    <>
      <Button title={'Test starten'} onPress={startTest} />
      <Button
        title={'Mehr Informationen'}
        onPress={showAdditionalInformation()}
      />
    </>
  );
};

export default MainScreen;
