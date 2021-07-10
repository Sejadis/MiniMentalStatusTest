import React, {useContext} from 'react';
import UserContext from './UserContext';
import {Picker} from '@react-native-picker/picker';

const UserPicker = ({style, onValueChange, selectedValue, injectedItems}) => {
  const userContext = useContext(UserContext);
  const selection =
    selectedValue == undefined ? userContext.currentUser : selectedValue;
  const valueChange = (itemValue, itemIndex) => {
    onValueChange == undefined
      ? userContext.setCurrentUser(itemValue)
      : onValueChange(itemValue, itemIndex);
  };

  return (
    <Picker
      selectedValue={selection}
      style={{...style, height: 50}}
      onValueChange={(itemValue, itemIndex) => {
        valueChange(itemValue, itemIndex);
      }}>
      {selection == undefined ? (
        <Picker.Item
          key={-1}
          label="Nutzer auswählen"
          value={-1}
          enabled={false}
        />
      ) : null}
      {injectedItems}
      {userContext.getAllUsers().map(user => {
        return <Picker.Item key={user} label={user} value={user} />;
      })}
    </Picker>
  );
};

export default UserPicker;
