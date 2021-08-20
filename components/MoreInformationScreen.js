import React from 'react';
import { View, StyleSheet, Text } from "react-native";

const MoreInformationScreen = ({navigation}) => {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Das ist ein Platzhalter.</Text>
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
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default MoreInformationScreen;
