import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView, Platform } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { v4 as uuidv4 } from "uuid";
import TodoCard from "./TodoCard";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("my todo");

  const [completedTodos, setCompletedTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);

  useEffect(() => {
    const completed = todos.filter((todo) => todo.completed);
    const notCompleted = todos.filter((todo) => !todo.completed);

    setPendingTodos(notCompleted);
    setCompletedTodos(completed);
  }, [todos]);

  const handleAdd = (e) => {
    if (inputValue) {
      // Check duplicate
      const foundIndex = todos.findIndex((todo) => {
        if (todo.name == inputValue) {
          return true;
        } else {
          return false;
        }
      });

      if (foundIndex === -1) {
        const taskToAdd = {
          id: uuidv4(),
          name: inputValue,
          completed: false,
        };
        // setTodos(todos.push(taskToAdd));
        setTodos([...todos, taskToAdd]);

        // After task has been created reset input field
        setInputValue("");
      } else {
        alert("Task already exists. Add a different one!");
      }
    } else {
      alert("Please type something..");
    }
  };

  const handleCheck = (id) => {
    // todos = [
    //   {
    //     id: 'unique_id',
    //     name: 'task name',
    //     completed: false
    //   },
    //   {
    //     id: 'unique_id',
    //     name: 'task name',
    //     completed: false
    //   }
    // ]

    const modifiedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: true,
        };
      } else {
        return todo;
      }
    });

    setTodos(modifiedTodos);

    console.log("Checking the task ", id, modifiedTodos);
  };

  const handleDelete = (id) => {
    // todos = [
    //   {
    //     id: 'unique_id',
    //     name: 'task name',
    //     completed: false
    //   },
    //   {
    //     id: 'unique_id',
    //     name: 'task name',
    //     completed: false
    //   }
    // ]

    const modifiedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(modifiedTodos);
  };

  const handleUndo = (id) => {
    // todos = [
    //   {
    //     id: 'unique_id',
    //     name: 'task name',
    //     completed: false
    //   },
    //   {
    //     id: 'unique_id',
    //     name: 'task name',
    //     completed: false
    //   }
    // ]

    const modifiedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: false,
        };
      } else {
        return todo;
      }
    });

    setTodos(modifiedTodos);
  };

  return (
    <SafeAreaView
      style={{
        width: "100%",
        flex: 1,
        paddingTop: Platform.OS === "android" && StatusBar.currentHeight,
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        <Input
          label="Enter Todo"
          placeholder="Do something..."
          value={inputValue}
          onChangeText={(textInputValue) => {
            setInputValue(textInputValue);
            console.log(textInputValue);
          }}
        />
        <Button title="Add todo" onPress={handleAdd} />
      </View>

      {/* Pending todos */}
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginVertical: 10,
          }}
        >
          My Todos
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {pendingTodos.length === 0 ? (
            <Text>No todos</Text>
          ) : (
            pendingTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                name={todo.name}
                completed={todo.completed}
                onCheckPress={handleCheck}
                onDeletePress={handleDelete}
              />
            ))
          )}
        </View>
      </View>

      {/* Completed todos */}
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginVertical: 10,
          }}
        >
          Completed Todos
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {completedTodos.length === 0 ? (
            <Text>No todos</Text>
          ) : (
            completedTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                name={todo.name}
                completed={todo.completed}
                onCheckPress={handleCheck}
                onDeletePress={handleDelete}
                onUndoPress={handleUndo}
              />
            ))
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Todo;

const styles = StyleSheet.create({});
