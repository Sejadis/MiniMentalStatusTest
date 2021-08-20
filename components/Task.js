import {Text, StyleSheet, View, Image} from 'react-native';
import Choice from './Choice';
import DrawView from 'react-native-draw-view';
import React from 'react';

const Task = ({task, continueButton, incrementPoints, decrementPoints}) => {
  let choices = task.choices.map((choice, index) => (
    <Choice
      style={styles.choices}
      data={choice}
      key={index + '_' + choice}
      incrementPoints={() => incrementPoints()}
      decrementPoints={() => decrementPoints()}
    />
  ));
  return (
    <View style={styles.container}>
      <Text style={styles.task}>{task.task}</Text>
      {choices}
      <View style={styles.taskContainer}>
        {task.type.includes('template') && (
          <View style={styles.templateImageContainer}>
            <Image
              style={styles.templateImage}
              source={require('../data/t11_template_pentagon.png')}
              resizeMode="contain"
            />
          </View>
        )}
        {task.type.includes('drawing') && (
          <View style={{flex: 4}}>
            <DrawView
              style={styles.drawView}
              onRef={el => 0}
              color="#000000"
              strokeWidth={2}
              onSaved={res => console.log('Save', res.nativeEvent)}
              onError={error => console.log('Error', error.nativeEvent)}
            />
          </View>
        )}
        {task.type == 'prompt' && (
          <View style={styles.promptContainer}>
            <Text style={styles.promptText}>{task.prompt}</Text>
          </View>
        )}
      </View>
      {continueButton}
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  choices: {
    flex: 1,
    fontSize: 20,
  },
  container: {height: '100%'},
  taskContainer: {flex: 5, paddingBottom: 10},
  templateImageContainer: {
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  templateImage: {flex: 1, height: undefined, width: undefined},
  drawView: {flex: 4, backgroundColor: 'rgba(252,179,117,0.35)'},
  promptContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  promptText: {fontSize: 55},
});
export default Task;
