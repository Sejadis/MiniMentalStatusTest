import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.text}>{points} Punkte</Text>
      <Text style={styles.text}>Die Beurteilung ist: {evaluation.text}</Text>
      <View
        style={{
          ...styles.evaluationIndicator,
          backgroundColor: evaluation.color,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 30},
  evaluationIndicator: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
});
export default EvaluationScreen;
