import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
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
      style={styles.container}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={onPressHandler}>
      <>
        <Text style={styles.choiceText}>{data}</Text>
        <CheckBox value={toggleCheckBox} disabled={true} />
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  choiceText: {
    fontSize: 20,
  },
});
export default Choice;
