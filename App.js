import React, {useEffect} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';
import logger from 'redux-logger';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native'

import NewsScreen from "./Screen/NewsScreen";
import SearchScreen from "./Screen/SearchScreen";
import DetailScreen from "./Screen/DetailScreen";
import HomeScreen from "./Screen/HomeScreen";
import WishButton from "./components/WishButton";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));

const TextInput = styled.TextInput`
  color: #636e72;
`
const RowView = styled.View`
  flex-flow: row;
  align-items: center;
`
const MarginFontAwesome = styled(FontAwesome)`
  margin-right: 10px;
`

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = "home";
          } else if (route.name === 'News') {
            iconName = "news";
          }

          // You can return any component that you like here!
          return <Entypo name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}  />
      <Tab.Screen name="News" component={NewsScreen}  />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [value, onChangeText] = React.useState('');
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
           name="Home" 
           component={Home} 
           options={({navigation}) => ({
             headerTitle: "Go Up",
             headerRight: () => (
              <FontAwesome.Button name="search" backgroundColor="white" color="gray" onPress={() => {navigation.navigate('Screen',{term: ""})}}/>
             )
             })} />
          <Stack.Screen 
            name="Screen" 
            component={SearchScreen} 
            options={({navigation, route}) => ({
              headerTitle: () => (
                <RowView>
                  <MarginFontAwesome name="search" backgroundColor="white" color="gray" size={18}/>
                  <TextInput
                    onChangeText={text => {
                      onChangeText(text)
                      navigation.setParams({
                        term: text
                      })
                    }}
                    value={value}
                    placeholder="Search stock"
                    autoFocus={true}
                  />
                </RowView>
              )
            })}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={({navigation, route}) => ({
              headerTitle: route.params.symbol,
              headerRight: () => (
                <WishButton symbol={route.params.symbol}></WishButton>
                )
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}