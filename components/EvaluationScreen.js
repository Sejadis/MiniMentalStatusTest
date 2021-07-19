import React, {useLayoutEffect, useState} from 'react';
import {Text, View} from 'react-native';
import getEvaluation from './getEvaluation';
import {HeaderBackButton} from '@react-navigation/stack';

const EvaluationScreen = ({navigation, route}) => {
  const points = route.params.points;
  const evaluation = getEvaluation(points);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            navigation.navigate('Main');
          }}
        />
      ),
    });
  }, [navigation]);
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

export default EvaluationScreen;
