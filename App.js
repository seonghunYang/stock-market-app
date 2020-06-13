import * as React from 'react';
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
import { useDispatch, useSelector } from 'react-redux'

import NewsScreen from "./Screen/NewsScreen";
import SearchScreen from "./Screen/SearchScreen";
import DetailScreen from "./Screen/DetailScreen";

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
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

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
          } else if (route.name === 'Wishlist') {
            iconName = "bookmark";
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
      <Tab.Screen name="Wishlist" component={SettingsScreen}  />
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
             headerTitle: "liveStock",
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
              title: route.params.symbol
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}