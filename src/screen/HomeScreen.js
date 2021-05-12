import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserGames from "../components/UserGames";

import * as all_games from "../assets/games.json";
import AnimatedHeader from "../components/AnimatedHeader";
import { Animated } from "react-native";

const HomeScreen = () => {
  const scroll = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView
      edges={["right", "bottom", "left"]}
      style={{ flex: 1, backgroundColor: "#222" }}
    >
      <AnimatedHeader scroll={scroll} />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scroll } } }],
          { useNativeDriver: true }
        )}
      >
        <UserGames data={all_games} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
