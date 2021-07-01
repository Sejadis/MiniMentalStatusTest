import React, {useState} from 'react';
import {Text, View} from 'react-native';
import evaluationData from '../data/evaluationData.json';

const TestScreen = ({route}) => {
  const points = route.params.points;
  const getEvaluation = () => {
    for (let key in evaluationData) {
      if (points <= key) {
        return evaluationData[key];
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 30}}>{points} Punkte</Text>
      <Text style={{fontSize: 30}}>Die Beurteilung ist: {getEvaluation()}</Text>
    </View>
  );
};

export default TestScreen;
