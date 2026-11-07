import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import GemListScreen from './src/screens/GemListScreen';
import GemDetailsScreen from './src/screens/GemDetailsScreen';
import CompareScreen from './src/screens/CompareScreen';
import CollectionScreen from './src/screens/CollectionScreen';
import TipsScreen from './src/screens/TipsScreen';
import { COLORS } from './src/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const icons = { Home: '🏠', Gems: '💎', Collection: '📒', Tips: '💡' };

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
        tabBarActiveTintColor: COLORS.primary,
        tabBarIcon: () => <Text style={{ fontSize: 18 }}>{icons[route.name]}</Text>,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'GemGlow LK', tabBarLabel: 'Home' }} />
      <Tab.Screen name="Gems" component={GemListScreen} options={{ title: 'Gem Guide', tabBarLabel: 'Gems' }} />
      <Tab.Screen name="Collection" component={CollectionScreen} options={{ title: 'My Collection', tabBarLabel: 'Collection' }} />
      <Tab.Screen name="Tips" component={TipsScreen} options={{ title: 'Care & Buying Tips', tabBarLabel: 'Tips' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="GemDetails" component={GemDetailsScreen} options={{ title: 'Gem Details' }} />
        <Stack.Screen name="Compare" component={CompareScreen} options={{ title: 'Compare Gems' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
