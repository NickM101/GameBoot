import React from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import HomeScreen from '../screen/HomeScreen';
import EmptyScreen from '../screen/EmptyScreen';
import Icon from '../components/Icon';


const Tab = createBottomTabNavigator();

function BlurryBottomBar(props) {
  return (
    <BlurView
      intensity={100}
      tint="dark"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomTabBar {...props} />
    </BlurView>
  );
}

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: 'transparent',
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderTopColor: "transparent"
        },
      }}
      tabBar={BlurryBottomBar}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              color={focused ? 'white' : color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Browse"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'compass' : 'compass-outline'}
              color={focused ? 'white' : color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'search' : 'search-outline'}
              color={focused ? 'white' : color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Library"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'library' : 'library-outline'}
              color={focused ? 'white' : color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name={
                focused ? 'person-circle' : 'person-circle-outline'
              }
              color={focused ? 'white' : color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}