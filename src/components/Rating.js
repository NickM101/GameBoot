import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Rating = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.textTitle}>Metacritic</Text>
        <Text style={styles.textDetail}>{item.metacritic ? item.metacritic : '- -'}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.textTitle}>ESRB Rating</Text>
        <Text style={styles.textDetail}>{item.esrb_rating ? item.esrb_rating.name : '- -'}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.textTitle}>Rating</Text>
        <Text style={styles.textDetail}>{item.rating ? item.rating : '- -'}</Text>
      </View>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  section: {
    flex: 1,
    alignItems: "center",
  },
  textTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 13, 
    fontWeight: '600'
  },
  textDetail: {
    textAlign: "center",
    color: "white",
    fontSize: 12, 
    fontWeight: 'bold'
  }
});
