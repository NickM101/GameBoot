import { BlurView } from "expo-blur";
import React from "react";
import { Animated, Button, Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonIcon from "./ButtonIcon";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const AnimatedHeader = ({ scroll }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 15 }]}>
      <AnimatedBlurView
        intensity={100}
        tint="dark"
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: scroll.interpolate({
              inputRange: [0, 50],
              outputRange: [0, 1],
            }),
          },
        ]}
      />
      <View style={styles.headerLeft}>
        <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
      </View>
      <View style={styles.headerRight}>
        <ButtonIcon icon="wifi-outline" style={{ marginRight: 15 }} />
        <ButtonIcon icon="notifications-outline" />
      </View>
    </View>
  );
};

export default AnimatedHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    padding: 15,
    flexDirection: "row",
    zIndex: 1,
  },
  logo: {
    height: 50, 
    width: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
  },
});
