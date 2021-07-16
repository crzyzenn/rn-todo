import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Input, Button } from "react-native-elements";

const Todo = () => {
  const [inputValue, setInputValue] = useState("my todo");
  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <Text>Todo</Text>
      <TextInput
        placeholder="Enter todo"
        value={inputValue}
        onChangeText={(textInputValue) => {
          setInputValue(textInputValue);
          console.log(textInputValue);
        }}
      />
      <Input
        label="Enter Todo"
        placeholder="Do something..."
        value={inputValue}
        onChangeText={(textInputValue) => {
          setInputValue(textInputValue);
          console.log(textInputValue);
        }}
      />
      <Button title="Add todo" />
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({});
