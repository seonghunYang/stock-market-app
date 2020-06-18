import React, {useEffect} from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Col, Row, Grid } from "react-native-easy-grid";
import * as SplashScreen from 'expo-splash-screen';
import { connect } from 'react-redux'

import {CreateGeneralNews} from '../actions/news';
import {mainDataLoader} from '../actions/index';
import MainCard from '../components/MainCard';
import WishList from '../components/WishList';

const FlatList = styled.FlatList`
  width :100% ;
`;

const ActivityIndicator = styled.ActivityIndicator`
`;
const ScrollView = styled.ScrollView`
`

const Text = styled.Text``
const FlexView = styled.View`
  flex-flow: row;
  align-items: center;
  justify-content: center;
  `;
const InfoView = styled.View`
  width: 95%;
  backgroundColor: #fff;
  margin-bottom: 5px;
  border-color: #eee;
  border-width: 1px;
  border-radius: 10px;
  margin-top: 20px;
`
class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isReady : false
    };
  }

  async componentDidMount() {
    if(!this.props.mainData){
      try {
        await SplashScreen.preventAutoHideAsync();
        await this.props.dispatch(mainDataLoader());
        await SplashScreen.hideAsync();
        this.setState({ isReady: true })
      } catch (e) {
        console.warn(e);
      }
    }
  }

  render() {
    if (!this.state.isReady) {
      return null;
    }
    return (
      <ScrollView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.props.mainData.map((data) => <MainCard data={data} />)}
        </ScrollView>
        <FlexView>
          <InfoView>
            <WishList navigation={this.props.navigation} />
          </InfoView>
        </FlexView>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  const { mainData } = state
  return { mainData: mainData }
}

export default connect(mapStateToProps)(HomeScreen)



