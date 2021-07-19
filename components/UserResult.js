import {Text, View} from 'react-native';
import getEvaluation from './getEvaluation';
import React from 'react';

const UserResult = ({result}) => {
  const evaluation = getEvaluation(result.points);
  return (
    <View
      key={result.date}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{paddingRight: 15, fontSize: 23}}>
          Punkte:
          <Text style={{fontWeight: 'bold'}}> {result.points}</Text>
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
      <Text style={{flex: 1, width: '35%', fontSize: 23}}>
        Datum:
        <Text style={{fontWeight: 'bold'}}> {result.date}</Text>
      </Text>
    </View>
  );
};

export default UserResult;
