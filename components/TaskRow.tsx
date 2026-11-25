import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type TaskItem = {
  id: string;
  name: string;
  done: boolean;
};

type Props = {
  item: TaskItem;
  pressTask: (id: string) => void;
};

export default function TaskRow(props: Props) {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => props.pressTask(props.item.id)}
    >
      <View style={styles.textWrap}>
        <Text
          style={[
            styles.text,
            props.item.done && styles.doneText,
          ]}
        >
          {props.item.name}
        </Text>
        {props.item.done && <View style={styles.strike} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  textWrap: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 18,
    color: 'black',
    textDecorationLine: 'line-through',
  },
  doneText: {
    color: 'black',
    textDecorationLine: 'line-through',
  },
  strike: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '55%',
    height: 1.5,
    backgroundColor: 'black',
  },
});