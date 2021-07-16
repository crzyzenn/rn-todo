import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";

// https://icons.expo.fyi/

const TodoCard = ({
  id,
  name,
  completed,
  onCheckPress,
  onDeletePress,
  onUndoPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Text>{name}</Text>
      <Text>{completed ? "Task Completed" : "Task Pending"}</Text>
      {completed ? (
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => onUndoPress(id)}
            icon={<Icon name="undo" size={15} color="white" />}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => onCheckPress(id)}
            icon={<Icon name="check" size={15} color="white" />}
          />
          <Button
            onPress={() => onDeletePress(id)}
            icon={<Icon name="delete" size={15} color="white" />}
          />
        </View>
      )}
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 2,
    borderColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
});
