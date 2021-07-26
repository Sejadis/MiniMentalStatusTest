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

const TestStartModal = ({startTest, closeModal}) => {
  const userContext = useContext(UserContext);
  const [newUserState, setNewUserState] = useState({
    name: undefined,
    age: undefined,
    sex: 'm',
  });
  const [isNameUndef, setIsNameUndef] = useState(false);
  const [isAgeUndef, setIsAgeUndef] = useState(false);
  const addUser = () => {
    var canAdd = true;
    if (!newUserState.name) {
      canAdd = false;
      setIsNameUndef(true);
    }
    if (!newUserState.age) {
      canAdd = false;
      setIsAgeUndef(true);
    }
    if (canAdd) {
      userContext.addUser(
        newUserState.name,
        newUserState.age,
        newUserState.sex,
      );
      setIsNameUndef(false);
      setIsAgeUndef(false);
      userContext.setCurrentUser(newUserState.name);
      setNewUserState({sex: 'm'});
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={StyleSheet.absoluteFillObject}
        onPressOut={closeModal}>
        <View style={styles.modalBackground} />
      </TouchableOpacity>
      <View style={styles.modal}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContentStyle}>
          <View
            style={{
              ...styles.sectionContainer,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <UserPicker style={styles.userPicker} />
            <Button title={'Start'} onPress={startTest} />
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Name</Text>
              <TextInput
                value={newUserState.name}
                style={isNameUndef ? styles.errorInput : styles.input}
                onChangeText={text => {
                  if (text !== undefined) {
                    setIsNameUndef(false);
                  }
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
                style={isAgeUndef ? styles.errorInput : styles.input}
                keyboardType="number-pad"
                onChangeText={text => {
                  if (text !== undefined) {
                    setIsAgeUndef(false);
                  }
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
                style={styles.sexPicker}
                onValueChange={(itemValue, itemIndex) =>
                  setNewUserState({...newUserState, sex: itemValue})
                }>
                <Picker.Item label={'männlich'} value={'m'} />
                <Picker.Item label={'weiblich'} value={'w'} />
                <Picker.Item label={'divers'} value={'d'} />
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
        </ScrollView>
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
  modalBackground: {flex: 1, backgroundColor: 'rgba(158,158,158,0.64)'},
  modal: {
    width: '75%',
    height: '75%',
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  scrollViewContentStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  userPicker: {width: '85%'},
  sexPicker: {width: '65%', borderWidth: 1},
  background: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
  sectionContainer: {
    flexWrap: 'wrap',
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
    width: '100%',
  },
  input: {
    backgroundColor: 'rgb(233,241,255)',
    width: '50%',
    borderColor: 'grey',
    borderWidth: 1,
  },
  errorInput: {
    backgroundColor: 'rgba(255,49,49,0.75)',
    width: '50%',
    borderColor: 'grey',
    borderWidth: 1,
  },
  text: {
    width: '25%',
  },
});

export default TestStartModal;
