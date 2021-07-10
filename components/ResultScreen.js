import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {Button, Text, View} from 'react-native';
import UserPicker from './UserPicker';
import UserContext from './UserContext';
import Share from 'react-native-share';
import ResultUserHeader from './ResultUserHeader';
import {Picker} from '@react-native-picker/picker';

const ResultScreen = ({navigation}) => {
  const [pickerSelection, setPickerSelection] = useState('all');
  const userContext = useContext(UserContext);
  const shareResults = useCallback(async () => {
    const encodedCSV = btoa(userContext.getCSV());
    console.log(encodedCSV);
    const options = {
      title: 'MMST Ergbnisse',
      url: 'data:text/csv;base64,' + encodedCSV,
      type: 'text/csv',
      filename:
        'mmst_result_export_' +
        new Date()
          .toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          .replace(/\./g, '_'),
    };

    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  }, [userContext]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={shareResults} title="Exportieren" />,
    });
  }, [navigation, shareResults]);

  useEffect(() => {
    return () => {
      if (userContext.currentUser === undefined) {
        userContext.setCurrentUser(userContext.getAllUsers()[0]);
      }
    };
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Text>Ergebnisse </Text>
          <UserPicker
            style={{
              width: '40%',
            }}
            selectedValue={pickerSelection}
            onValueChange={(itemValue, itemIndex) => {
              console.log('changing value 2', itemValue);
              setPickerSelection(itemValue);
            }}
            injectedItems={<Picker.Item label="Alle anzeigen" value={'all'} />}
          />
        </View>
      ),
    });
  }, [navigation, pickerSelection, shareResults]);

  const getAllResults = () => {
    const userState = userContext.getFullState();
    const results = [];
    Object.keys(userState).forEach(key => {
      userState[key].results.forEach(result => {
        results.push(result);
      });
    });
    return results;
  };

  const userResults =
    pickerSelection === 'all'
      ? getAllResults()
      : userContext.getResultsForUser(pickerSelection);
  const results = userResults?.map(result => (
    <View
      key={result.date}
      style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={{width: '25%', fontSize: 23}}>Punkte: {result.points}</Text>
      <Text style={{width: '35%', fontSize: 23}}>Datum: {result.date}</Text>
    </View>
  ));

  const userData = userContext.getUserByName(pickerSelection);
  return (
    <View style={{alignItems: 'center'}}>
      <ResultUserHeader userData={{...userData, name: pickerSelection}} />
      {results?.length > 0 ? (
        results
      ) : (
        <Text style={{fontSize: 23}}>Keine Ergebnisse vorhanden</Text>
      )}
    </View>
  );
};

export default ResultScreen;
