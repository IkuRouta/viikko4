import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskRow, { TaskItem } from './components/TaskRow';

export default function App() {
  const [text, setText] = useState('');
  const [list, setList] = useState<TaskItem[]>([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const data = await AsyncStorage.getItem('TASKS');
      if (data) {
        setList(JSON.parse(data));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function saveData(newList: TaskItem[]) {
    try {
      await AsyncStorage.setItem('TASKS', JSON.stringify(newList));
    } catch (err) {
      console.log(err);
    }
  }

  function addNew() {
    if (text.trim() == '') {
      return;
    }
    const newTask: TaskItem = {
      id: Date.now().toString() + Math.random().toString(),
      name: text.trim(),
      done: false,
    };
    const updated = [...list, newTask];
    setList(updated);
    saveData(updated);
    setText('');
  }

  function pressTask(id: string) {
    const updated = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done,
        };
      }
      return item;
    });
    setList(updated);
    saveData(updated);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo list</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={addNew}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        extraData={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskRow item={item} pressTask={pressTask} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginRight: 10,
  },
  saveText: {
    fontSize: 18,
    color: '#007aff',
  },
});