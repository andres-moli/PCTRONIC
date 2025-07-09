import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './screens/Home/HomeScreen';
import FormScreen from './screens/FormScreen';
import CalendarHome from './screens/Calendar/CalendarHome';
import LoginScreen from './screens/auth/LoginScreen';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigator from './navigation/Navigator';
import { UserProvider } from './context/UserContext';
const App: React.FC = () => {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigator />
        </GestureHandlerRootView>
      </ApolloProvider>
    </UserProvider>
  );
};

export default App;
