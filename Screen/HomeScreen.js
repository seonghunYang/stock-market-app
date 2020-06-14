import React, {useEffect} from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Col, Row, Grid } from "react-native-easy-grid";
import * as SplashScreen from 'expo-splash-screen';

import {CreateGeneralNews} from '../actions/news';
const FlatList = styled.FlatList`
  width :100% ;
`;

const ActivityIndicator = styled.ActivityIndicator`
`;
const ScrollView = styled.ScrollView``

const Text = styled.Text``
export default class App extends React.Component {
  constructor(props){
    super(props);
    const { dispatch } = this.props;
    this.state = {
      isReady : false
    };
  }

  async componentDidMount() {
    // Prevent native splash screen from autohiding
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
  }

  /**
   * Method that serves to load resources and make API calls
   */
  prepareResources = async () => {
    // dispatch(CreateGeneralNews())
    await SplashScreen.hideAsync();
    this.setState({ isReady: true })
  };

  render() {
    if (!this.state.isReady) {
      return null;
    }

    return (
      <View >
        <Text >SplashScreen Demo! 👋</Text>
      </View>
    );
  }
}









