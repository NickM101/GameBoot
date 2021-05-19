import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Animated,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  Image
} from "react-native";
import ButtonList from "./ButtonList";
import { useNavigation } from '@react-navigation/native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


const UserGames = ({ data }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const renderGames = React.useCallback(({ item }) => {
    return (
      <Pressable key={item.id} style={styles.game} onPress={() => navigation.push("Game", { item })}>
        <ImageBackground
          source={{ uri: item.background_image }}
          style={styles.cover}
        >
          <LinearGradient
            style={styles.overlay}
            colors={["transparent", "rgba(0,0,0,0.6)"]}
          >
            <Text style={styles.title}>{item.name}</Text>
           <ButtonList item={item} category={'platforms'}/>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    );
  });

  return (
    <>
      {data.results.map((game, index) => (
        <Animated.Image
          key={game.id}
          source={{ uri: game.background_image }}
          blurRadius={30}
          style={{
            position: "absolute",
            height: 400,
            width: "100%",
            zIndex: 0,
            left: 0,
            right: 0,
            opacity: scrollX.interpolate({
              inputRange: [(index - 1) * 350, index * 350, (index + 1) * 350],
              outputRange: [0, 1, 0],
            }),
          }}
        />
      ))}
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.3)", "#222"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 400,
        }}
      />
      <AnimatedFlatList
        horizontal
        style={{ height: 450 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={React.useCallback((item) => item.id.toString(), [])}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        data={data.results}
        renderItem={renderGames}
        snapToInterval={365}
        decelerationRate={"fast"}
        snapToAlignment={"start"}
      />
    </>
  );
};

export default UserGames;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 120,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  game: {
    top: 90,
    marginRight: 20,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.6,
  },
  cover: {
    height: 350,
    width: 350,
    borderRadius: 6,
    overflow: "hidden",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "flex-end",
    paddingBottom: 30,
    paddingHorizontal: 15,
  },
  title: {
    color: "white",
    fontSize: 30,
  },
  editor: {
    color: "white",
  },
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
