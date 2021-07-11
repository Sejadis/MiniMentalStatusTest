import {Text, View} from 'react-native';
import React from 'react';

const ResultUserHeader = ({userData}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 3,
        width: '95%',
        paddingTop: 10,
      }}>
      {userData.name == 'all' ? (
        <Text style={{fontSize: 20}}>Alle Ergebnisse</Text>
      ) : (
        <>
          <Text style={{fontSize: 20}}>{userData.name}</Text>
          <Text style={{fontSize: 20}}>{userData.age}</Text>
          <Text style={{fontSize: 20}}>{userData.sex}</Text>
        </>
      )}
    </View>
  );
};

export default ResultUserHeader;
