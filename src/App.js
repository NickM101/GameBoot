import React from "react";
import { StatusBar } from "react-native";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomNavigator from "./navigation/BottomNavigator";
import { QueryClient, QueryClientProvider } from "react-query";
import { DEVELOPMENT } from '@env';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: DEVELOPMENT,
      refetchOnWindowFocus: DEVELOPMENT,
    },
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer theme={DarkTheme}>
        <QueryClientProvider client={queryClient}>
          <BottomNavigator />
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
