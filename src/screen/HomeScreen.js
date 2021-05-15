import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserGames from "../components/UserGames";

import * as all_games from "../assets/games.json";
import AnimatedHeader from "../components/AnimatedHeader";
import { Animated, FlatList, View } from "react-native";
import Header from "../components/Header";
import GameLists from "../components/GameLists";
import { useHomeData, usePopular } from "../utils/api";

const HomeScreen = () => {
  const scroll = React.useRef(new Animated.Value(0)).current;

  const { isLoading: isPopularLoading, data: popular, isError: isPopularError, error: popularError } = usePopular()


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
        <UserGames data={popular} loading={isPopularLoading} error={popularError} isError={isPopularError} />
        <Header action="See all">Release Week</Header>
        <GameLists games={all_games}/>
        <Header action="See all">Platforms</Header>
        <GameLists games={all_games}/>
        <Header action="See all">Popular Games</Header>
        <GameLists games={all_games}/>
        <View style={{ height: 100}}/>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
