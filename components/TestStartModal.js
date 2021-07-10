import React, {useContext, useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import UserContext from './UserContext';
import UserPicker from './UserPicker';
import {Picker} from '@react-native-picker/picker';

const TestStartModal = ({startTest, closeModal}) => {
  const userContext = useContext(UserContext);
  const [newUserState, setNewUserState] = useState({
    name: undefined,
    age: undefined,
    sex: undefined,
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
        <View
          style={{
            ...styles.sectionContainer,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>Nutzer wählen: </Text>
          <UserPicker style={{width: '45%'}} />
          <Button title={'Start'} onPress={startTest} />
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              value={newUserState.name}
              style={styles.input}
              onChangeText={text => {
                setNewUserState({
                  ...newUserState,
                  name: text,
                });
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Alter </Text>
            <TextInput
              value={newUserState.age}
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={text => {
                setNewUserState({
                  ...newUserState,
                  age: text.replace(/[^0-9]/g, ''),
                });
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Geschlecht </Text>
            <Picker
              selectedValue={newUserState.sex}
              style={{width: '65%', borderWidth: 1}}
              onValueChange={(itemValue, itemIndex) =>
                setNewUserState({...newUserState, sex: itemValue})
              }>
              <Picker.Item label={'männlich'} value={'m'} />
              <Picker.Item label={'weiblich'} value={'w'} />
            </Picker>
          </View>
          <Button title={'Neuen Nutzer erstellen'} onPress={addUser} />
        </View>
        <View style={styles.sectionContainer}>
          <Button
            title={'Anonym Starten'}
            onPress={() => {
              userContext.setCurrentUser(undefined);
              startTest();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '50%',
    height: '50%',
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
  },
  background: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
  sectionContainer: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
    padding: 15,
    width: '85%',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  input: {
    backgroundColor: 'rgb(233,241,255)',
    width: '50%',
    borderColor: 'grey',
    borderWidth: 1,
  },
  text: {
    width: '25%',
  },
});

export default TestStartModal;