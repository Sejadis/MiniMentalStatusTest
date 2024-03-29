import {Text, View, StyleSheet} from 'react-native';
import React from 'react';

const ResultUserHeader = ({userData}) => {
  return (
    <View style={styles.container}>
      {userData.name == 'all' ? (
        <Text style={styles.text}>Alle Ergebnisse</Text>
      ) : (
        <>
          <Text style={styles.text}>{userData.name}</Text>
          <Text style={styles.text}>{userData.age}</Text>
          <Text style={styles.text}>{userData.sex}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 3,
    width: '95%',
    paddingTop: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ResultUserHeader;
