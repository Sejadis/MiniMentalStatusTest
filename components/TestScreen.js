import React, {useContext, useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import taskData from '../data/taskData.json';
import Task from './Task';
import UserContext from './UserContext';

const TestScreen = ({navigation}) => {
  const [points, setPoints] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const userContext = useContext(UserContext);

  const incrementPoints = () => {
    setPoints(points + 1);
  };
  const decrementPoints = () => {
    setPoints(points - 1);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Aufgabe ' + (currentTask + 1) + ' von ' + taskData.length,
    });
  }, [currentTask, navigation]);

  const completeTask = () => {
    if (currentTask == taskData.length - 1) {
      navigation.navigate('Evaluation', {points: points});
    } else {
      setCurrentTask(currentTask + 1);
    }
  };

  const saveResult = () => {
    if (userContext.currentUser !== undefined) {
      userContext.addResults(
        userContext.currentUser,
        points,
        new Date().toLocaleString(),
      );
    }
    navigation.navigate('Main');
  };
  const continueButton = (
    <Button
      style={{
        flex: 3,
        fontSize: 18,
        paddingTop: 15,
      }}
      title={currentTask == taskData.length - 1 ? 'Test beenden' : 'Weiter'}
      onPress={
        currentTask == taskData.length - 1
          ? () => saveResult()
          : () => completeTask()
      }
    />
  );
  return (
    <>
      <View
        style={{
          flex: 1,
          padding: 15,
        }}>
        <Task
          task={taskData[currentTask]}
          continueButton={continueButton}
          incrementPoints={() => incrementPoints()}
          decrementPoints={() => decrementPoints()}
        />
      </View>
    </>
  );
};

export default TestScreen;
