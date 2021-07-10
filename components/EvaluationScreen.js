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
  const evaluation = getEvaluation();
  console.log(evaluation);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 30}}>{points} Punkte</Text>
      <Text style={{fontSize: 30}}>Die Beurteilung ist: {evaluation.text}</Text>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100 / 2,
          backgroundColor: evaluation.color,
        }}
      />
    </View>
  );
};

export default TestScreen;
