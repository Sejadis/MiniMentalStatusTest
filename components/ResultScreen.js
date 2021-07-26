import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {Button, SectionList, Text, View} from 'react-native';
import UserPicker from './UserPicker';
import UserContext from './UserContext';
import Share from 'react-native-share';
import ResultUserHeader from './ResultUserHeader';
import {Picker} from '@react-native-picker/picker';
import UserResult from './UserResult';
import {Buffer} from 'buffer';

const ResultScreen = ({navigation}) => {
  const [pickerSelection, setPickerSelection] = useState('all');
  const userContext = useContext(UserContext);
  const shareResults = useCallback(async () => {
    const csv = userContext.getCSV();
    const encodedCSV = Buffer.from(csv, 'binary').toString('base64'); //btoa(userContext.getCSV());
    const url = `data:text/csv;base64,${encodedCSV}`;
    console.log(url);
    const fileName = 'mmst_result_export';
    // +
    // new Date()
    //   .toLocaleDateString('de-DE', {
    //     day: '2-digit',
    //     month: '2-digit',
    //     year: 'numeric',
    //   })
    //   .replace(/\./g, '_');
    console.log(fileName);
    const options = {
      url: url,
      filename: fileName,
    };

    await Share.open(options)
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        err && console.log('err', err);
      });
  }, [userContext]);

  useEffect(() => {
    console.log('selection changed', pickerSelection);
  }, [pickerSelection]);

  useLayoutEffect(() => {
    const headerButtons = () => (
      <View>
        <Button onPress={deleteResults} title="Löschen" />
        <Button onPress={shareResults} title="Exportieren" />
      </View>
    );

    const deleteResults = () => {
      console.log('picker', pickerSelection);
      userContext.deleteResults(
        pickerSelection === 'all' ? undefined : pickerSelection,
      );
      setPickerSelection('all');
    };

    navigation.setOptions({
      headerRight: headerButtons,
    });
  }, [navigation, shareResults, pickerSelection]);

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
              setPickerSelection(itemValue);
            }}
            injectedItems={<Picker.Item label="Alle anzeigen" value={'all'} />}
          />
        </View>
      ),
    });
  }, [navigation, pickerSelection, shareResults]);

  const userResults = userContext.getResultsForUser(pickerSelection);
  const results = userResults?.map(result => <UserResult result={result} />);

  const userData = userContext.getUserByName(pickerSelection);

  const getAllResultsList = () => {
    const userState = userContext.getFullState();
    let allData = [];
    Object.keys(userState).forEach(key => {
      let userData = {
        user: {
          name: key,
          age: userState[key].age,
          sex: userState[key].sex,
        },
        data: [],
      };
      userState[key].results.forEach(result => {
        userData.data.push(result);
      });
      allData.push(userData);
    });
    return allData;
  };

  const createList = () => {
    const Item = item => <UserResult result={item.result} />;

    return (
      <View style={{height: '100%', width: '85%', alignItems: 'center'}}>
        <SectionList
          sections={getAllResultsList()}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => {
            return <Item result={item} />;
          }}
          renderSectionHeader={({section: {user}}) => (
            <ResultUserHeader userData={user} />
          )}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <ResultUserHeader userData={{...userData, name: pickerSelection}} />
      {pickerSelection === 'all' ? (
        createList()
      ) : results?.length > 0 ? (
        results
      ) : (
        <Text style={{fontSize: 23}}>Keine Ergebnisse vorhanden</Text>
      )}
    </View>
  );
};

export default ResultScreen;
