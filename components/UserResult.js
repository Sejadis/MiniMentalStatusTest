import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import getEvaluation from './getEvaluation';
import React, {useState} from 'react';

const UserResult = ({result}) => {
  const [showDetails, setShowDetails] = useState(false);
  const evaluation = getEvaluation(result.points.totalPoints);
  const createDetails = () => {
    const {totalPoints, ...taskData} = result.points;
    const details = [];
    console.log(taskData);
    for (let key in taskData) {
      console.log(key);
      details.push(
        <View style={{borderWidth: 1, padding: 2}}>
          <Text>{parseInt(key) + 1}</Text>
          <Text>{taskData[key]}</Text>
        </View>,
      );
    }
    return details;
  };
  return (
    <TouchableOpacity onPressOut={() => setShowDetails(!showDetails)}>
      <View key={result.date} style={styles.container}>
        <View style={styles.pointContainer}>
          <Text style={styles.pointDescriptionText}>
            Punkte:
            <Text style={styles.boldText}> {result.points.totalPoints}</Text>
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
      {showDetails && (
        <View style={{flexDirection: 'row', justifyContent: 'space-around', borderWidth: 1, width: '90%'}}>
          {createDetails()}
        </View>
      )}
    </TouchableOpacity>
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
