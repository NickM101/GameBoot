import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserGames from "../components/UserGames";
import AnimatedHeader from "../components/AnimatedHeader";
import { Animated, FlatList, View } from "react-native";
import Header from "../components/Header";
import { usePopular, useReleasedMonthly, useReleasedWeekly } from "../utils/api";
import ReleaseList from "../components/ReleaseList";
import Loading from "../components/Loading";

const HomeScreen = () => {
  const scroll = React.useRef(new Animated.Value(0)).current;

  const { isLoading: isPopularLoading, data: popular, isError: isPopularError, error: popularError } = usePopular();
  const { isLoading: isWeeklyLoading, data: weekly, isError: isWeeklyError, error: weeklyError } = useReleasedWeekly(1);
  const { isLoading: isMonthlyLoading, data: monthly, isError: isMonthlyError, error: monthlyError } = useReleasedMonthly(1);
  // const { isLoading: isPlatformLoading, data: platform, isError: isPlatformError, error: platformError } = useAllPlatforms(1);

  if(isPopularLoading && isWeeklyLoading && isMonthlyLoading){
    return <Loading helper={'Loading ....'}/>
  }
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
        <ReleaseList data={weekly} loading={isWeeklyLoading} error={weeklyError}/>
        <Header action="See all">Release Month</Header>
        <ReleaseList data={monthly} loading={isMonthlyLoading} error={monthlyError}/>
        <View style={{ height: 50}}/>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
