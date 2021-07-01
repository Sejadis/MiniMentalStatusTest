import React, {useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Choice = ({data, decrementPoints, incrementPoints}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const onPressHandler = () => {
    if (toggleCheckBox) {
      decrementPoints();
    } else {
      incrementPoints();
    }
    setToggleCheckBox(!toggleCheckBox);
  };
  return (
    <TouchableHighlight
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={onPressHandler}>
      <>
        <Text style={{fontSize: 20}}>{data}</Text>
        <CheckBox value={toggleCheckBox} disabled={true} />
      </>
    </TouchableHighlight>
  );
};

export default Choice;
