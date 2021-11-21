import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    // add new task
    const id = new Date().getTime();

    setTasks([...tasks , {id, title: newTaskTitle, done: false} ])
  }

  function handleToggleTaskDone(id: number) {
    //toggle task done if exists
    const updatedTasks = tasks.map(el => el.id === id ? { ...el, done: !el.done} : el)
    setTasks([...updatedTasks])

  }

  function handleRemoveTask(id: number) {
    //remove task from state
    setTasks(tasks.filter(item => item.id != id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})