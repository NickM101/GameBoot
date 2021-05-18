import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ButtonList = ({ item, category }) => {
  if (category === "genres") {
    return (
      <View style={styles.BTListContainer}>
        {item.genres.map((item) => {
          return (
            <View style={styles.BTButton}>
              <Text style={styles.BTText}>{item.name}</Text>
            </View>
          );
        })}
      </View>
    );
  }

  if (category === "stores") {
    return (
      <View style={styles.BTListContainer}>
        {item.stores.map((item) => {
          return (
            <View style={styles.BTButton}>
              <Text style={styles.BTText}>{item.store.name}</Text>
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <View style={styles.BTListContainer}>
      {item.platforms.map((item) => {
        return (
          <View style={styles.BTButton}>
            <Text style={styles.BTText}>{item.platform.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default ButtonList;

const styles = StyleSheet.create({
  BTListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  BTButton: {
    borderColor: "#fff",
    backgroundColor: "rgba(0,0,0,0)",
    borderRadius: 5,
    borderWidth: 1,
    margin: 2,
  },
  BTText: {
    fontSize: 10,
    color: "#fff",
    padding: 5,
  },
});
