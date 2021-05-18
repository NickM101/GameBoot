import React from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Rating from "../components/Rating";
import { Ionicons } from "@expo/vector-icons";
import ButtonList from "../components/ButtonList";
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

const GameScreen = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <SafeAreaView edges={["right", "bottom", "left"]} style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <ScrollView>
        <View style={styles.artContainer}>
          <Image style={styles.art} source={{ uri: item.background_image }} />
          <Pressable
            style={styles.backArrow}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={45}
              color={"white"}
            />
          </Pressable>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.cover}>
            <Image style={styles.thumbnail} source={{ uri: item.background_image }} />
          </View>
          <View style={styles.info}>
            <Text style={{...styles.text, fontSize: 15, fontWeight: '700' }}>{item.name}</Text>
            <Text style={{...styles.text, fontSize: 10, fontWeight: '500' }}>{format(parseISO(item.released), 'do EE MMMM YYY')}</Text>
            <Text style={{...styles.text, fontSize: 10, color: 'grey'}}>Stores</Text>
            <ButtonList item={item} category={"stores"} />
            <Text style={{...styles.text, fontSize: 10, color: 'grey'}}>Genres</Text>
            <ButtonList item={item} category={"genres"} />
          </View>
        </View>
        <Rating item={item} />
        <View style={styles.screenShotsContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.screenShots}
          >
            {item.short_screenshots.slice().map((screenshot, index) => {
              return (
                <View key={index} style={styles.screenShotContainer}>
                  <Image
                    style={styles.screenShot}
                    source={{ uri: screenshot.image }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  backArrow: {
    position: "absolute",
    top: 30,
    left: 15,
  },
  artContainer: {
    position: "relative",
  },
  art: {
    height: 270,
    width: "100%",
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 32,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 180,
  },
  cover: {
    height: 150,
    width: 120,
    borderRadius: 15,
    marginHorizontal: 24,
  },
  info: {
    width: 0,
    flexGrow: 1,
    marginLeft: -30,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
  text: {
    color: "white",
  },
  screenShotsContainer: {
    marginLeft: 8,
  },
  thumbnail: {
    height: 150,
    width: 100,
    borderRadius: 20
  },
  screenShotContainer: {
    padding: 16,
    shadowColor: "#0000",
  },
  screenShot: {
    height: 200,
    width: 300,
    borderRadius: 12,
  },
});
