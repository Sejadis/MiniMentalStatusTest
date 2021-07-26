import {StyleSheet, Text, View} from 'react-native';
import getEvaluation from './getEvaluation';
import React from 'react';

const UserResult = ({result}) => {
  const evaluation = getEvaluation(result.points);
  return (
    <View key={result.date} style={styles.container}>
      <View style={styles.pointContainer}>
        <Text style={styles.pointDescriptionText}>
          Punkte:
          <Text style={styles.boldText}> {result.points}</Text>
        </Text>
        <View
          style={{
            width: 25,
            height: 25,
            borderRadius: 25 / 2,
            backgroundColor: evaluation.color,
          }}
        />
      </View>
      <Text style={styles.dateDescriptionText}>
        Datum:
        <Text style={styles.boldText}> {result.date}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointDescriptionText: {paddingRight: 15, fontSize: 23},
  dateDescriptionText: {flex: 1, width: '35%', fontSize: 23},
  boldText: {fontWeight: 'bold'},
});
export default UserResult;
