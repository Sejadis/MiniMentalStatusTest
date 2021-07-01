import React, {useState} from 'react';
import {Text, View} from 'react-native';
import taskData from '../data/taskData.json';
import Task from './Task';

const TestScreen = ({navigation}) => {
  const [points, setPoints] = useState(0);
  const [currentTask, setCurrentTask] = useState(1);

  const incrementPoints = () => {
    setPoints(points + 1);
  };
  const decrementPoints = () => {
    setPoints(points - 1);
  };

  const completeTask = () => {
    if (currentTask == taskData.length - 1) {
      navigation.navigate('Evaluation', {points: points});
    } else {
      setCurrentTask(currentTask + 1);
    }
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          padding: 15,
        }}>
        <Task
          task={taskData[currentTask]}
          completeTask={completeTask}
          incrementPoints={() => incrementPoints()}
          decrementPoints={() => decrementPoints()}
        />
      </View>
    </>
  );
};

export default TestScreen;
