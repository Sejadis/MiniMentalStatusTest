import React, {useContext, useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import UserContext from './UserContext';
import UserPicker from './UserPicker';
import {Picker} from '@react-native-picker/picker';

const TestEndModal = ({navToEvaluation, navToHome, closeModal}) => {
  const userContext = useContext(UserContext);
  const [newUserState, setNewUserState] = useState({
    name: undefined,
    age: undefined,
    sex: 'm',
  });
  const addUser = () => {
    userContext.addUser(newUserState.name, newUserState.age, newUserState.sex);
    userContext.setCurrentUser(newUserState.name);
    setNewUserState({});
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={StyleSheet.absoluteFillObject}
        onPressOut={closeModal}>
        <View style={{flex: 1, backgroundColor: 'rgba(158,158,158,0.64)'}} />
      </TouchableOpacity>
      <View style={styles.modal}>
        <Button title={'Startseite'} onPress={navToHome} />
        <Button title={'Auswertung'} onPress={navToEvaluation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
