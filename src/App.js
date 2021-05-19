import React from "react";
import { StatusBar, LogBox } from "react-native";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { DEVELOPMENT } from '@env';
import AppNavigator from "./navigation/AppNavigator";

LogBox.ignoreWarnings = (['Setting a timer']);

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
          <AppNavigator />
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
