import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import { Button, Modal, StyleSheet, View } from "react-native";
import taskData from '../data/taskData.json';
import Task from './Task';
import UserContext from './UserContext';
import TestEndModal from './TestEndModal';

const TestScreen = ({navigation}) => {
  const [points, setPoints] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [showEndModal, setShowEndModal] = useState(false);
  const userContext = useContext(UserContext);

  const incrementPoints = () => {
    setPoints(points + 1);
  };
  const decrementPoints = () => {
    setPoints(points - 1);
  };

  useLayoutEffect(() => {
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
    const date = new Date().toLocaleString('de-DE');
    console.log(date);
    if (userContext.currentUser !== undefined) {
      userContext.addResults(userContext.currentUser, points, date);
    }
  };

  const navToHome = () => {
    saveResult();
    navigation.navigate('Main');
  };

  const navToEvaluation = () => {
    saveResult();
    navigation.navigate('Evaluation', {points: points});
  };
  const continueButton = (
    <Button
      title={currentTask == taskData.length - 1 ? 'Test beenden' : 'Weiter'}
      onPress={
        currentTask == taskData.length - 1
          ? () => setShowEndModal(true)
          : () => completeTask()
      }
    />
  );
  return (
    <>
      <View
        style={styles.container}>
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={showEndModal}
          onRequestClose={() => setShowEndModal(false)}>
          <TestEndModal
            closeModal={() => setShowEndModal(false)}
            navToHome={navToHome}
            navToEvaluation={navToEvaluation}
          />
        </Modal>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
export default TestScreen;
