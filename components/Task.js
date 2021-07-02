import React, {useEffect, useRef, useState} from 'react';
import {Button, Text, StyleSheet, View, Image} from 'react-native';
import Choice from './Choice';
import DrawView from 'react-native-draw-view';

const Task = ({task, completeTask, incrementPoints, decrementPoints}) => {
  const [points, setPoints] = useState(0);
  const drawRef = useRef(null);
  let choices = task.choices.map(choice => (
    <Choice
      style={styles.choices}
      data={choice}
      key={choice}
      incrementPoints={() => incrementPoints()}
      decrementPoints={() => decrementPoints()}
    />
  ));
  return (
    <View style={{height: '100%'}}>
      <Text style={styles.task}>{task.task}</Text>
      {choices}
      <View style={{flex: 5, paddingBottom: 10}}>
        {task.type.includes('template') && (
          <View
            style={{
              height: '25%',
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 10,
            }}>
            <Image
              style={{flex: 1, height: undefined, width: undefined}}
              source={require('../data/t11_template_pentagon.png')}
              resizeMode="contain"
            />
          </View>
        )}
        {task.type.includes('drawing') && (
          <View style={{flex: 4}}>
            <DrawView
              style={{flex: 4, backgroundColor: 'rgba(252,179,117,0.35)'}}
              onRef={el => 0}
              color="#000000"
              strokeWidth={2}
              onSaved={res => console.log('Save', res.nativeEvent)}
              onError={error => console.log('Error', error.nativeEvent)}
            />
          </View>
        )}
      </View>
      <Button
        style={styles.continueButton}
        title="Weiter"
        onPress={() => completeTask()}
      />
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
  continueButton: {
    flex: 3,
    fontSize: 18,
    paddingTop: 15,
  },
});
export default Task;
