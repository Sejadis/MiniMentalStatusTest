import type {Node} from 'react';
import React, {useEffect, useState} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MainScreen from './components/MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TestScreen from './components/TestScreen';
import EvaluationScreen from './components/EvaluationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContextProvider} from './components/UserContext';
import ResultScreen from './components/ResultScreen';
import convertToCSV from './components/convertToCSV';
import MoreInformationScreen from "./components/MoreInformationScreen";

const Stack = createStackNavigator();

const App: () => Node = () => {
  const [userState, setUserState] = useState({});
  const [currentUser, setCurrentUser] = useState(undefined);
  const deleteKey = key => AsyncStorage.removeItem(key);

  useEffect(() => {
    console.log('effect', userState);
    const storeData = async () => {
      for (let key in userState) {
        try {
          console.log('saving', key);
          AsyncStorage.setItem(key, JSON.stringify(userState[key]));
        } catch (error) {
          // Error saving data
          console.log('error saving data', error);
        }
      }
    };

    storeData();
  }, [userState]);

  useEffect(() => {
    async function loadData() {
      try {
        await AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (error, stores) => {
            let state = {};
            stores.map((result, i, store) => {
              // get at each store's key/value so you can work with it
              let key = store[i][0];
              let value = store[i][1];
              console.log(key, JSON.parse(value));
              state[key] = JSON.parse(value);
            });
            setUserState(state);
          });
        });
      } catch (error) {
        // Error retrieving data
      }
    }
    loadData();
  }, []);

  const context = {
    currentUser: currentUser,
    addUser: (name, age, sex) => {
      setUserState(prevState => ({
        ...prevState,
        [name]: {age: age, sex: sex, results: []},
      }));
    },
    addResults: (name, points, date) => {
      setUserState(prevState => {
        let results = prevState[name].results;
        results.push({points: points, date: date});
        let newUserState = {...prevState[name], results: results};
        return {
          ...prevState,
          [name]: newUserState,
        };
      });
    },
    deleteResults: user => {
      if (user === undefined) {
        setUserState({});
      } else {
        const {[user]: removedUser, ...newState} = userState;
        deleteKey(user).then(() => {
          setUserState(newState);
          setCurrentUser(undefined);
        });
      }
    },
    getUserByName: name => {
      return userState[name];
    },
    getAllUsers: () => {
      return Object.keys(userState);
    },
    getResultsForUser: name => {
      return userState[name]?.results;
    },
    getFullState: () => {
      return userState;
    },
    setCurrentUser: name => {
      setCurrentUser(name);
    },
    getCSV: () => {
      return convertToCSV(userState);
    },
  };
  return (
    <UserContextProvider value={context}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{title: 'Mini Mental Status Test'}}
          />
          <Stack.Screen
            name="Test"
            component={TestScreen}
            options={{title: ''}}
          />
          <Stack.Screen
            name="Evaluation"
            component={EvaluationScreen}
            options={{title: 'Auswertung'}}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{title: 'Ergebnisse'}}
          />
          <Stack.Screen
            name="MoreInformation"
            component={MoreInformationScreen}
            options={{title: 'Weitere Informationen'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default App;
