import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native';
import styled from 'styled-components/native'
import { Col, Row, Grid } from "react-native-easy-grid";
import noneImg from "../none.jpg";
import * as Linking from 'expo-linking';

const TouchableHighlight = styled.TouchableHighlight`
`;
const ItemRow = styled.View`
  flex-flow: row;
  align-items: center;
  margin-left: 15px;
  margin-right: 35px;
  margin-top: 10px;
  `;
const TextHead = styled.Text`
  font-size: 13px;
  color: #636e72;
`;
const TextMain = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;
const TextSub = styled.Text`
  font-size: 10px;
  color: #636e72;
`;
const Image = styled.Image`
  border-radius: 10px;
`
export default function NewsItem({ item } ) {
  let date = new Date(item.datetime * 1000);
  date = date.toString().slice(0,21);
  return (
    <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#EFF7F6"
    onPress={() => {Linking.openURL(item.url)}}
    >
      <ItemRow>
        <Col size={90}> 
          <Row>
          {item.related !== "" &&
            <TextHead>{item.related === "" ? null : item.related}</TextHead>
          }
          </Row>
          <Row>
            <TextMain>{item.headline}</TextMain>
          </Row>
          <Row>
            <TextSub>{date}  </TextSub>
            <TextSub> {item.source}</TextSub>
          </Row>
        </Col>
        <Col size={10}>
          <Image source={{uri: item.image !== "" ? item.image : "https://upload.wikimedia.org/wikipedia/commons/2/2a/Flag_of_None.svg"}}
            style={{width: 60, height: 60}} />
        </Col>
      </ItemRow>
    </TouchableHighlight>
  )
}
