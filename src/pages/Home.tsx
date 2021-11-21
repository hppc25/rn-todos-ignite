import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    // add new task

    if (tasks.find(({ title }) => title === newTaskTitle)) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [{ text: "OK", onPress: () => console.log("ok") }]
      );
      return;
    }

    addNewTask(newTaskTitle);
  }

  function addNewTask(newTaskTitle: string) {
    const id = new Date().getTime();
    setTasks([...tasks, { id, title: newTaskTitle, done: false }]);
  }

  function handleToggleTaskDone(taskId: number) {
    //toggle task done if exists
    const updatedTasks = tasks.map((el) =>
      el.id === taskId ? { ...el, done: !el.done } : el
    );
    setTasks([...updatedTasks]);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    //edit task title
    const updatedTasks = tasks.map((el) =>
      el.id === taskId ? { ...el, title: taskNewTitle } : el
    );
    setTasks([...updatedTasks]);
  }

  function handleRemoveTask(id: number) {
    //remove task from state

    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => setTasks(tasks.filter((item) => item.id != id)),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
